import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SparklesIcon, LeafIcon, ShieldCheckIcon, ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Our Story & Ethos | Crafted by Reet — Handmade Crochet by Reet Bhadani',
  description:
    'Discover the story behind Crafted by Reet. A handmade crochet studio founded by artisan Reet Bhadani, dedicated to small-batch craft, heartfelt detail, and slow living.',
};

export default function AboutPage() {
  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Hero */}
      <section
        style={{
          backgroundColor: 'var(--color-cream-100)',
          borderBottom: '1px solid var(--border-color)',
          padding: '4.5rem 0',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <span className="section-eyebrow">The Artisan Behind the Brand</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', marginBottom: '1.25rem' }}>
            We believe in things made slowly, with human hands and honest fibers.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
            Crafted by Reet began with a single hook, soft skeins of cotton, and a passion for creating tactile, heartwarming pieces that bring comfort to daily life.
          </p>
        </div>
      </section>

      {/* Story with Photo */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-card)', border: '8px solid #FFFFFF' }}>
              <img
                src="/images/pink-tulip-charm.jpg"
                alt="Reet Bhadani holding handcrafted twin tulip charm"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <span className="section-eyebrow">Meet Reet Bhadani</span>
              <h2>One Loop at a Time</h2>
              <p style={{ marginTop: '1rem', lineHeight: 1.7, fontSize: '1.02rem', color: 'var(--text-secondary)' }}>
                Founded by artisan <strong>Reet Bhadani</strong>, Crafted by Reet is a celebration of
                the mindful beauty of crochet. Unlike machine knitting, <strong>true crochet cannot be automated</strong>. Every stitch you see in our shop has been formed individually by human fingers.
              </p>
              <p style={{ marginTop: '1rem', lineHeight: 1.7, fontSize: '1.02rem', color: 'var(--text-secondary)' }}>
                Every cardigan, tote bag, accessory, and plushie is made with love in limited, small batches. We do not mass-produce; each piece is crafted with patience and individual attention.
              </p>

              <div style={{ marginTop: '2rem' }}>
                <Link href="/shop" className="btn btn-primary">
                  <span>Browse Current Drops</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fiber Standards */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">Material Integrity</span>
            <h2>Fibers You Can Feel Good About</h2>
            <p className="section-subtitle">
              We never cut corners with cheap synthetic acrylics. We believe clothing and home goods should return
              gently to the earth when their long life has concluded.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '28px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-sage-100)',
                  color: 'var(--color-sage-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <LeafIcon size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>GOTS-Certified Organic Cotton</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Grown without toxic synthetic pesticides or fertilizers, conserving local groundwater and safeguarding
                the health of agricultural communities.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '28px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-terracotta-100)',
                  color: 'var(--color-terracotta-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <SparklesIcon size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Highland Merino &amp; Alpaca</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Sourced from family-operated shearing mills in the Peruvian Andes where traditional animal-welfare and
                non-mulesed practices have been honored for generations.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '28px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-cream-200)',
                  color: 'var(--color-sage-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <ShieldCheckIcon size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Botanical Dye Kettle Process</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Our sage greens and warm terracotta tones are achieved through kettle baths using madder root, marigold
                petals, onion skins, and iron mordants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio visit invite */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Have a bespoke vision in mind?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '24px' }}>
            We frequently accept custom color commissions for weddings, heirloom baby blankets, and custom cardigan
            proportions.
          </p>
          <Link href="/contact" className="btn btn-secondary btn-lg">
            Inquire About Custom Orders
          </Link>
        </div>
      </section>
    </div>
  );
}
