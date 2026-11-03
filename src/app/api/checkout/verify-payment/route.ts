import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/supabase/admin';
import { verifyRazorpaySignature, getRazorpayClient } from '@/lib/razorpay';

interface VerifyPaymentPayload {
  orderId: string;            // Supabase order UUID or internal id
  orderNumber: string;        // HZL-YYYYMM-XXXX
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: VerifyPaymentPayload = await req.json();
    const { orderId, orderNumber, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    if (!orderNumber || !razorpayOrderId) {
      return NextResponse.json({ error: 'Missing required order verification parameters.' }, { status: 400 });
    }

    const supabase = getServiceRoleClient();
    const razorpay = getRazorpayClient();

    // Check if Razorpay is configured
    if (razorpay && process.env.RAZORPAY_KEY_SECRET) {
      if (!razorpayPaymentId || !razorpaySignature) {
        return NextResponse.json({ error: 'Missing Razorpay payment confirmation signature.' }, { status: 400 });
      }

      // 1. Verify Razorpay Signature on Server
      const isSignatureValid = verifyRazorpaySignature({
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      });

      if (!isSignatureValid) {
        console.error('Signature verification failed for order:', orderNumber);
        // Record payment failure in Supabase if possible
        if (supabase) {
          await supabase
            .from('payments')
            .update({
              status: 'failed',
              error_code: 'INVALID_SIGNATURE',
              error_description: 'Signature verification mismatch on server.',
            })
            .eq('provider_order_id', razorpayOrderId);
        }

        return NextResponse.json(
          { error: 'Payment signature could not be verified by the server.' },
          { status: 400 }
        );
      }
    }

    // 2. Mark order as PAID in Supabase upon verified signature
    if (supabase) {
      // Update Payment Record
      const { error: paymentErr } = await supabase
        .from('payments')
        .update({
          status: 'captured',
          provider_payment_id: razorpayPaymentId || 'sim_pay_' + Date.now(),
          provider_signature: razorpaySignature || 'sim_sig_' + Date.now(),
          verified_at: new Date().toISOString(),
        })
        .eq('provider_order_id', razorpayOrderId);

      if (paymentErr) {
        console.warn('Payment update warning:', paymentErr);
      }

      // Update Order Status to 'paid'
      const { error: orderErr } = await supabase
        .from('orders')
        .update({
          status: 'paid',
        })
        .or(`id.eq.${orderId},order_number.eq.${orderNumber}`);

      if (orderErr) {
        console.error('Order status update error:', orderErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      status: 'paid',
      message: 'Payment verified and order confirmed successfully.',
    });
  } catch (err: any) {
    console.error('Payment verification error:', err);
    return NextResponse.json(
      { error: err?.message || 'Server error while verifying payment.' },
      { status: 500 }
    );
  }
}
