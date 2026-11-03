'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MailIcon, SparklesIcon, ShieldCheckIcon, TruckIcon, LeafIcon } from './Icons';
import { useToast } from '@/context/ToastContext';

export const Footer: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Welcome to our Maker Circle! Check your inbox for 10% off.', 'success');
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: '#1E2522',
        color: '#E8E4DF',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        {/* Trust Badges Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--color-honey)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <SparklesIcon size={20} />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>100% Handcrafted</h4>
              <p style={{ color: '#A39E98', fontSize: '0.85rem', margin: 0 }}>
                Every single loop stitched by artisan hands, never automated.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#76B39D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <LeafIcon size={20} />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>Sustainable Fibers</h4>
              <p style={{ color: '#A39E98', fontSize: '0.85rem', margin: 0 }}>
                Fair-trade merino wool, Egyptian organic cotton & natural dyes.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#E0987A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <TruckIcon size={20} />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>Carbon-Neutral Delivery</h4>
              <p style={{ color: '#A39E98', fontSize: '0.85rem', margin: 0 }}>
                FSC-certified paper packaging with zero single-use plastics.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#9FC4B1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheckIcon size={20} />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>Heirloom Guarantee</h4>
              <p style={{ color: '#A39E98', fontSize: '0.85rem', margin: 0 }}>
                Complimentary lifetime stitch repair support on all apparel.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '3.5rem',
          }}
        >
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                color: '#FFFFFF',
                fontWeight: 700,
                marginBottom: '10px',
              }}
            >
              Crafted by Reet
            </div>
            <p style={{ color: '#ABA49C', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Handmade crochet creations by Reet Bhadani. Small-batch wearables, accessories, and plushies made with love, patience, and premium yarn.
            </p>
            <div style={{ color: '#D4CFC7', fontSize: '0.85rem' }}>
              Handcrafted in: <strong>India &bull; Pan-India Shipping &amp; Custom Orders</strong>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '18px',
              }}
            >
              Shop Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link href="/shop?category=wearables" style={{ color: '#ABA49C', fontSize: '0.9rem' }}>
                  Handmade Cardigans &amp; Vests
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bags" style={{ color: '#ABA49C', fontSize: '0.9rem' }}>
                  Daisy Granny Square Totes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=amigurumi" style={{ color: '#ABA49C', fontSize: '0.9rem' }}>
                  Amigurumi Keepsakes &amp; Toys
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" style={{ color: '#ABA49C', fontSize: '0.9rem' }}>
                  Textured Ribbed Bucket Hats
                </Link>
              </li>
              <li>
                <Link href="/shop?category=home-decor" style={{ color: '#ABA49C', fontSize: '0.9rem' }}>
                  Waffle Throws &amp; Coasters
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '18px',
              }}
            >
              Care &amp; Studio
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link href="/about" style={{ color: '#ABA49C', fontSize: '0.9rem' }}>
                  Our Maker Ethos
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" style={{ color: '#ABA49C', fontSize: '0.9rem' }}>
                  Shipping &amp; Lead Times
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns#returns" style={{ color: '#ABA49C', fontSize: '0.9rem' }}>
                  Returns &amp; Exchanges
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: '#ABA49C', fontSize: '0.9rem' }}>
                  Custom Order Inquiries
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns#care-guide" style={{ color: '#ABA49C', fontSize: '0.9rem' }}>
                  Wool Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div style={{ minWidth: '260px' }}>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '12px',
              }}
            >
              The Maker&rsquo;s Circle
            </h4>
            <p style={{ color: '#ABA49C', fontSize: '0.88rem', marginBottom: '14px', lineHeight: 1.5 }}>
              Receive first access to small-batch drops, seasonal yarn stories, and 10% off your first order.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="your.email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-full)',
                  padding: '10px 16px',
                  fontSize: '0.88rem',
                }}
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 'var(--radius-full)', padding: '0 18px' }}
              >
                Join
              </button>
            </form>
            {subscribed && (
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#76B39D', marginTop: '8px' }}>
                ✓ Subscribed! Welcome to the circle.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#8A847C',
          }}
        >
          <div>
            &copy; 2026 Crafted by Reet. Handcrafted by Reet Bhadani.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/shipping-returns" style={{ color: '#8A847C' }}>
              Shipping &amp; Policies
            </Link>
            <Link href="/contact" style={{ color: '#8A847C' }}>
              Contact Reet
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#8A847C' }}
            >
              @craftedbyreet
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
