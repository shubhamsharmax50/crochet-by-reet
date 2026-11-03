'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '@/components/Icons';
import { formatINR, STANDARD_SHIPPING_FEE_PAISE, FREE_SHIPPING_THRESHOLD_PAISE } from '@/lib/format';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    itemCount,
    freeShippingThreshold,
    remainingForFreeShipping,
    openCheckout,
  } = useCart();
  const { showToast } = useToast();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [giftNote, setGiftNote] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MAKER10' || promoCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscountPercent(10);
      showToast('10% Maker discount applied!', 'success');
    } else {
      showToast('Try discount code "MAKER10" or "WELCOME10"', 'info');
    }
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const shippingCost = discountedSubtotal >= FREE_SHIPPING_THRESHOLD_PAISE || items.length === 0 ? 0 : STANDARD_SHIPPING_FEE_PAISE;
  const finalTotal = discountedSubtotal + shippingCost;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD_PAISE) * 100));

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', paddingBottom: '6rem' }}>
      {/* Page Header */}
      <div
        style={{
          backgroundColor: 'var(--color-cream-100)',
          borderBottom: '1px solid var(--border-color)',
          padding: '3rem 0',
        }}
      >
        <div className="container">
          <span className="section-eyebrow">Shopping Basket</span>
          <h1 style={{ fontSize: '2.4rem', margin: 0 }}>Review Your Order</h1>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {items.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              padding: '60px 24px',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-cream-100)',
                color: 'var(--color-terracotta-500)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <ShoppingBagIcon size={36} />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Your craft basket is empty</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              We haven&rsquo;t started making anything for you yet! Explore our studio cardigan collections, daisy
              totes, and nursery plushies.
            </p>
            <Link href="/shop" className="btn btn-primary btn-lg">
              <span>Explore Collection</span>
              <ArrowRightIcon size={18} />
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: '2.5rem',
              alignItems: 'start',
            }}
            className="cart-layout"
          >
            {/* Left: Cart Items List */}
            <div>
              {/* Free Shipping tracker */}
              <div
                style={{
                  backgroundColor: 'var(--color-sage-50)',
                  border: '1px solid var(--color-sage-200)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-sage-700)', marginBottom: '8px' }}>
                  <TruckIcon size={18} />
                  {remainingForFreeShipping > 0 ? (
                    <span>
                      Add <strong>{formatINR(remainingForFreeShipping)}</strong> more for <strong>Free Express Shipping Across India</strong>!
                    </span>
                  ) : (
                    <span>🎉 Congratulations! Your order qualifies for Free Shipping.</span>
                  )}
                </div>
                <div className="shipping-progress">
                  <div className="shipping-progress-bar" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              {/* Items Table / Cards */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '16px 24px',
                    backgroundColor: 'var(--color-cream-50)',
                    borderBottom: '1px solid var(--border-color)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Selected Pieces ({itemCount})
                </div>

                <div style={{ padding: '0 24px' }}>
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr auto',
                        gap: '20px',
                        padding: '20px 0',
                        borderBottom: idx === items.length - 1 ? 'none' : '1px solid var(--border-color-subtle)',
                        alignItems: 'center',
                      }}
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          backgroundColor: 'var(--color-cream-100)',
                          display: 'block',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Link>

                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            lineHeight: 1.3,
                            display: 'block',
                            marginBottom: '4px',
                          }}
                        >
                          {item.name}
                        </Link>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {item.selectedColor && <span>Shade: {item.selectedColor} </span>}
                          {item.selectedSize && <span>&bull; Size: {item.selectedSize} </span>}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-sage-700)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <SparklesIcon size={14} /> Made by hand in ~{item.leadTimeDays}d
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                          {formatINR(item.price * item.quantity)}
                        </div>

                        {/* Quantity Counter */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-full)',
                            padding: '3px 8px',
                            gap: '10px',
                            backgroundColor: 'var(--color-cream-50)',
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                            style={{ color: 'var(--text-secondary)', display: 'flex' }}
                          >
                            <MinusIcon size={13} />
                          </button>
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                            style={{ color: 'var(--text-secondary)', display: 'flex' }}
                          >
                            <PlusIcon size={13} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.78rem',
                            color: 'var(--text-muted)',
                            transition: 'color 0.15s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-terracotta-500)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                          <TrashIcon size={13} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gift Note Box */}
              <div
                style={{
                  marginTop: '20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  padding: '20px',
                }}
              >
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                  Handwritten Gift Message (Complimentary)
                </label>
                <textarea
                  rows={2}
                  placeholder="Sending as a gift? Enter a handwritten message to include on pressed botanical paper..."
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              {/* Continue Shopping button */}
              <div style={{ marginTop: '24px' }}>
                <Link href="/shop" className="btn btn-outline">
                  &larr; Continue Shopping More Creations
                </Link>
              </div>
            </div>

            {/* Right: Order Summary Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                padding: '24px',
                boxShadow: 'var(--shadow-card)',
                position: 'sticky',
                top: '90px',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Order Summary</h3>

              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Promo (try: MAKER10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={{ flex: 1, textTransform: 'uppercase', padding: '8px 12px' }}
                />
                <button type="submit" className="btn btn-outline btn-sm">
                  Apply
                </button>
              </form>

              {/* Cost Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Item Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>

                {discountPercent > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-terracotta-600)' }}>
                    <span>Maker Discount ({discountPercent}%)</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Express Shipping</span>
                  <span>{shippingCost === 0 ? <strong style={{ color: 'var(--color-sage-600)' }}>FREE</strong> : formatINR(shippingCost)}</span>
                </div>
              </div>

              {/* Total */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  margin: '18px 0',
                }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-sage-800)' }}>
                  {formatINR(finalTotal)}
                </span>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={openCheckout}
                className="btn btn-primary btn-block btn-lg"
              >
                Proceed to Checkout ({formatINR(finalTotal)})
              </button>

              {/* Trust micro-text */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <ShieldCheckIcon size={18} style={{ color: 'var(--color-sage-600)' }} />
                <span>Frontend prototype mode &bull; No charge will occur</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
