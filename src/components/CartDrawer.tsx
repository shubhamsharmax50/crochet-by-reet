'use client';

import React from 'react';
import Link from 'next/link';
import { XIcon, TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon, TruckIcon } from './Icons';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/format';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    openCheckout,
    updateQuantity,
    removeFromCart,
    subtotal,
    itemCount,
    freeShippingThreshold,
    remainingForFreeShipping,
  } = useCart();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(35, 30, 27, 0.4)',
          backdropFilter: 'blur(3px)',
          zIndex: 9990,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCart();
        }}
      >
        <div
          className="animate-slide-drawer"
          style={{
            width: '100%',
            maxWidth: '460px',
            height: '100%',
            backgroundColor: '#FFFFFF',
            boxShadow: 'var(--shadow-drawer)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Drawer Header */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--color-cream-50)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBagIcon size={22} style={{ color: 'var(--color-sage-600)' }} />
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                Your Basket ({itemCount})
              </h3>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close cart drawer"
              style={{
                color: 'var(--text-muted)',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div
            style={{
              backgroundColor: 'var(--color-sage-50)',
              padding: '12px 24px',
              borderBottom: '1px solid var(--color-sage-100)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-sage-700)',
                marginBottom: '6px',
              }}
            >
              <TruckIcon size={16} />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong>{formatINR(remainingForFreeShipping)}</strong> more for <strong>Free Shipping</strong>
                </span>
              ) : (
                <span style={{ color: 'var(--color-sage-700)' }}>
                  🎉 You qualify for Free Express Shipping Across India!
                </span>
              )}
            </div>
            <div className="shipping-progress">
              <div
                className="shipping-progress-bar"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List or Empty state */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px 24px',
            }}
          >
            {items.length === 0 ? (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '40px 20px',
                }}
              >
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-cream-100)',
                    color: 'var(--color-terracotta-500)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                  }}
                >
                  <ShoppingBagIcon size={32} />
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Your basket is empty</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Explore our small-batch cardigans, daisy totes, and woodland amigurumi.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="btn btn-primary"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--border-color-subtle)',
                    }}
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      style={{
                        width: '76px',
                        height: '76px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor: 'var(--color-cream-100)',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Link>

                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            style={{
                              fontWeight: 600,
                              fontSize: '0.95rem',
                              color: 'var(--text-primary)',
                              lineHeight: 1.3,
                            }}
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from basket`}
                            style={{
                              color: 'var(--text-muted)',
                              padding: '2px',
                              transition: 'color 0.15s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-terracotta-500)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {item.selectedColor && <span>Color: {item.selectedColor} </span>}
                          {item.selectedSize && <span>&bull; Size: {item.selectedSize}</span>}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        {/* Quantity Counter */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-full)',
                            padding: '2px 6px',
                            gap: '8px',
                            backgroundColor: 'var(--color-cream-50)',
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                            style={{
                              width: '22px',
                              height: '22px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            <MinusIcon size={12} />
                          </button>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                            style={{
                              width: '22px',
                              height: '22px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            <PlusIcon size={12} />
                          </button>
                        </div>

                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-sage-700)' }}>
                          {formatINR(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div
              style={{
                padding: '20px 24px',
                borderTop: '1px solid var(--border-color)',
                backgroundColor: 'var(--color-cream-50)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Subtotal</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {formatINR(subtotal)}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Taxes and shipping calculated at checkout. Small-batch artisan lead times apply.
              </p>

              <button
                onClick={openCheckout}
                className="btn btn-primary btn-block btn-lg"
              >
                Proceed to Checkout
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="btn btn-outline btn-block btn-sm"
                >
                  View Full Cart Page
                </Link>
                <button
                  onClick={closeCart}
                  className="btn btn-ghost btn-block btn-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
