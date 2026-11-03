import crypto from 'crypto';
import Razorpay from 'razorpay';

export function getRazorpayClient(): Razorpay | null {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    return null;
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
}

/**
 * Creates a Razorpay order on the server
 * @param amountInPaise Total amount in integer paise (e.g. 149900)
 * @param receipt Unique internal order identifier
 * @param notes Custom metadata attached to the order
 */
export async function createRazorpayOrder({
  amountInPaise,
  receipt,
  notes = {},
}: {
  amountInPaise: number;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const razorpay = getRazorpayClient();
  if (!razorpay) {
    throw new Error('Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
  }

  const options = {
    amount: amountInPaise,
    currency: 'INR',
    receipt,
    notes,
  };

  const order = await razorpay.orders.create(options);
  return order;
}

/**
 * Verifies the Razorpay payment signature returned by the client checkout modal
 * Generated as: HMAC-SHA256(order_id + "|" + razorpay_payment_id, secret)
 */
export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    throw new Error('RAZORPAY_KEY_SECRET is not configured on the server.');
  }

  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'utf-8'),
    Buffer.from(signature, 'utf-8')
  );
}

/**
 * Verifies the Razorpay webhook signature from the "x-razorpay-signature" header
 */
export function verifyRazorpayWebhookSignature({
  rawBody,
  signature,
}: {
  rawBody: string;
  signature: string;
}): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('RAZORPAY_WEBHOOK_SECRET is not configured on the server.');
  }

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'utf-8'),
    Buffer.from(signature, 'utf-8')
  );
}
