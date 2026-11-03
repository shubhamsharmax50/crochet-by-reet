import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/supabase/admin';
import { verifyRazorpayWebhookSignature } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing x-razorpay-signature header' }, { status: 400 });
    }

    // 1. Verify Webhook Signature using Webhook Secret
    const isValid = verifyRazorpayWebhookSignature({
      rawBody,
      signature,
    });

    if (!isValid) {
      console.error('Invalid Razorpay webhook signature');
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const eventId = req.headers.get('x-razorpay-event-id') || event.id || event.event_id || `evt_${Date.now()}`;
    const eventType: string = event.event;

    const supabase = getServiceRoleClient();
    if (!supabase) {
      console.warn('Supabase service role client not configured for webhook processing.');
      return NextResponse.json({ received: true, processed: false, reason: 'database_not_configured' });
    }

    // 2. Strict Idempotency Check
    // If this webhook event has already been recorded/processed, return 200 immediately
    const { data: existingEvent, error: selectErr } = await supabase
      .from('webhook_events')
      .select('id')
      .eq('event_id', eventId)
      .single();

    if (existingEvent) {
      // Event was already processed, respond OK without duplicating work
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Record the webhook event for audit trail and idempotency
    await supabase.from('webhook_events').insert({
      event_id: eventId,
      event_type: eventType,
      payload: event,
      status: 'processed',
    });

    // 3. Process Events
    const paymentEntity = event.payload?.payment?.entity;
    const orderEntity = event.payload?.order?.entity;
    const rzpOrderId = paymentEntity?.order_id || orderEntity?.id;
    const rzpPaymentId = paymentEntity?.id;

    if (!rzpOrderId) {
      return NextResponse.json({ received: true, note: 'No order ID in webhook payload' });
    }

    switch (eventType) {
      case 'payment.captured':
      case 'order.paid': {
        // Mark payment captured
        await supabase
          .from('payments')
          .update({
            status: 'captured',
            provider_payment_id: rzpPaymentId,
            verified_at: new Date().toISOString(),
            raw_payload: event,
          })
          .eq('provider_order_id', rzpOrderId);

        // Mark order paid
        await supabase
          .from('orders')
          .update({ status: 'paid' })
          .or(`status.eq.pending,status.eq.payment_failed`);

        break;
      }

      case 'payment.failed': {
        // Mark payment failed
        await supabase
          .from('payments')
          .update({
            status: 'failed',
            error_code: paymentEntity?.error_code || 'PAYMENT_FAILED',
            error_description: paymentEntity?.error_description || 'Payment failed during processing.',
            raw_payload: event,
          })
          .eq('provider_order_id', rzpOrderId);

        // Mark order payment_failed
        await supabase
          .from('orders')
          .update({ status: 'payment_failed' })
          .eq('status', 'pending');

        break;
      }

      case 'refund.created':
      case 'refund.processed': {
        // Mark payment and order refunded
        await supabase
          .from('payments')
          .update({
            status: 'refunded',
            raw_payload: event,
          })
          .eq('provider_order_id', rzpOrderId);

        await supabase
          .from('orders')
          .update({ status: 'refunded' });

        break;
      }

      default:
        console.log(`Unhandled Razorpay event: ${eventType}`);
        break;
    }

    return NextResponse.json({ received: true, event: eventType });
  } catch (err: any) {
    console.error('Webhook processing exception:', err);
    return NextResponse.json(
      { error: err?.message || 'Server error processing webhook.' },
      { status: 500 }
    );
  }
}
