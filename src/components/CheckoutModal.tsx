'use client';

import React, { useState, useEffect } from 'react';
import { XIcon, CheckIcon, ShieldCheckIcon, TruckIcon } from './Icons';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatINR, FREE_SHIPPING_THRESHOLD_PAISE, STANDARD_SHIPPING_FEE_PAISE } from '@/lib/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [step, setStep] = useState<'review' | 'success'>('review');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.artisan@example.com',
    phone: '9876543210',
    address: '42 Lotus Bloom Lane, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postal_code: '560038',
  });

  // Load Razorpay Checkout.js dynamically
  useEffect(() => {
    if (!isOpen) return;
    const existingScript = document.getElementById('razorpay-checkout-js');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'razorpay-checkout-js';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : STANDARD_SHIPPING_FEE_PAISE;
  const orderTotalPaise = subtotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Create order on the server
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            slug: i.slug,
            quantity: i.quantity,
            selectedColor: i.selectedColor,
            selectedSize: i.selectedSize,
          })),
          customer: formData,
        }),
      });

      const orderData = await res.json();

      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to initialize order on server.');
      }

      // 2. If Razorpay Key is configured and script loaded, open Razorpay Standard Checkout
      if (typeof window !== 'undefined' && (window as any).Razorpay && orderData.keyId && !orderData.isTestMode) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'Crafted by Reet',
          description: `Order ${orderData.orderNumber} - Handmade Crochet by Reet Bhadani`,
          image: '/images/sunflower-bouquet.jpg',
          order_id: orderData.razorpayOrderId,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#4F7562',
          },
          handler: async function (response: any) {
            try {
              // 3. Verify Razorpay Signature on Server
              const verifyRes = await fetch('/api/checkout/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: orderData.orderId,
                  orderNumber: orderData.orderNumber,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                setOrderNumber(orderData.orderNumber);
                setStep('success');
                clearCart();
                showToast(`Order ${orderData.orderNumber} confirmed!`, 'success');
              } else {
                setErrorMessage(verifyData.error || 'Payment signature verification failed.');
              }
            } catch (vErr: any) {
              setErrorMessage('Verification error: ' + (vErr?.message || 'Network error'));
            } finally {
              setIsSubmitting(false);
            }
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
              showToast('Payment modal closed. Cart items are preserved.', 'info');
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (resp: any) {
          setErrorMessage(resp.error?.description || 'Payment was declined by bank.');
          setIsSubmitting(false);
        });
        rzp.open();
      } else {
        // Test / Sandbox Mode Fallback (When RAZORPAY_KEY_ID is placeholder)
        // Complete server-side verification pipeline test
        const verifyRes = await fetch('/api/checkout/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderData.orderId,
            orderNumber: orderData.orderNumber,
            razorpayOrderId: orderData.razorpayOrderId,
            razorpayPaymentId: `pay_sim_${Date.now()}`,
            razorpaySignature: `sig_sim_${Date.now()}`,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setOrderNumber(orderData.orderNumber);
          setStep('success');
          clearCart();
          showToast(`Order ${orderData.orderNumber} recorded in database! (Test Mode)`, 'success');
        } else {
          setErrorMessage(verifyData.error || 'Verification error.');
        }
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err?.message || 'Unable to complete checkout.');
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setStep('review');
    setErrorMessage(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secure checkout"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(35, 30, 27, 0.55)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div
        className="animate-modal"
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-modal)',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-color-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-cream-50)',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
              {step === 'review' ? 'Secure Checkout (INR)' : 'Order Confirmed!'}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-sage-600)', fontWeight: 600 }}>
              Razorpay &bull; Server-Verified Flow
            </span>
          </div>
          <button
            onClick={step === 'success' ? handleFinish : onClose}
            style={{ color: 'var(--text-muted)', padding: '6px' }}
            aria-label="Close modal"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ overflowY: 'auto', padding: '24px' }}>
          {step === 'review' ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Trust Badge */}
              <div
                style={{
                  backgroundColor: 'var(--color-sage-50)',
                  border: '1px solid var(--color-sage-200)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                }}
              >
                <ShieldCheckIcon size={22} style={{ color: 'var(--color-sage-600)', flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--color-sage-700)', margin: 0 }}>
                  Payments processed securely in <strong>INR (₹)</strong> via Razorpay. Prices verified on server.
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div
                  style={{
                    backgroundColor: 'var(--color-terracotta-50)',
                    border: '1px solid var(--color-terracotta-200)',
                    color: 'var(--color-terracotta-700)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontSize: '0.88rem',
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* Order Items Preview */}
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '10px' }}>Selected Items ({items.length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.9rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 500 }}>{item.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 600 }}>{formatINR(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping info */}
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '10px' }}>Delivery Address in India</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    required
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email Address"
                    required
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Mobile Phone (for tracking)"
                    required
                  />
                  <input
                    type="text"
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    placeholder="PIN Code (e.g. 560038)"
                    required
                  />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street Address / Flat / Building"
                    style={{ gridColumn: 'span 2' }}
                    required
                  />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City (e.g. Bengaluru)"
                    required
                  />
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State (e.g. Karnataka)"
                    required
                  />
                </div>
              </div>

              {/* Totals */}
              <div
                style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '0.9rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Item Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Shipping Fee</span>
                  <span>{shippingCost === 0 ? <strong style={{ color: 'var(--color-sage-600)' }}>FREE</strong> : formatINR(shippingCost)}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px dashed var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: 'var(--color-sage-700)' }}>{formatINR(orderTotalPaise)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="btn btn-primary btn-block btn-lg"
              >
                {isSubmitting ? 'Preparing Verified Order...' : `Pay via Razorpay (${formatINR(orderTotalPaise)})`}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-sage-100)',
                  color: 'var(--color-sage-600)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <CheckIcon size={34} />
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Thank You for Your Order!</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Your payment has been verified and confirmed on the server. Your piece will now be hand-crocheted on our studio hoop.
              </p>

              <div
                style={{
                  backgroundColor: 'var(--color-cream-100)',
                  borderRadius: '12px',
                  padding: '16px',
                  maxWidth: '380px',
                  margin: '0 auto 24px auto',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order Reference Number</div>
                <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-sage-700)' }}>
                  {orderNumber}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Confirmation sent to: <strong>{formData.email}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                  <TruckIcon size={18} style={{ color: 'var(--color-terracotta-500)' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Dispatched within 4-7 business days across India
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={handleFinish} className="btn btn-primary">
                  Return to Shop
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
