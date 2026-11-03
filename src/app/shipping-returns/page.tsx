import React from 'react';
import type { Metadata } from 'next';
import { TruckIcon, PackageIcon, ShieldCheckIcon, SparklesIcon } from '@/components/Icons';
import { Accordion } from '@/components/Accordion';

export const metadata: Metadata = {
  title: 'Shipping & Returns Policy | Crafted by Reet — Handmade Crochet',
  description:
    'Learn about our handmade crafting lead times, pan-India delivery, exchange window, and complimentary lifetime mending guarantee.',
};

export default function ShippingReturnsPage() {
  const faqItems = [
    {
      id: 'why-lead-time',
      title: 'Why do items have a 3 to 7 day crafting lead time?',
      defaultOpen: true,
      content: (
        <p>
          Unlike mass retail brands that stock thousands of factory-made garments in warehouses, every Crafted by Reet piece is crocheted completely by hand by Reet Bhadani. True crochet cannot be executed by machine. When you place an order, your piece is handcrafted, gently blocked, hand-steamed, and carefully inspected before dispatch.
        </p>
      ),
    },
    {
      id: 'rush-orders',
      title: 'Can I request a rush order for a birthday or baby shower gift?',
      content: (
        <p>
          Yes! If you need an item for a specific date, please contact us prior to ordering or leave a note in the checkout field. We keep a limited emergency reserve of already-blocked favorites (such as the Woodland Fox Plushie and Daisy Market Tote) for rapid dispatch.
        </p>
      ),
    },
    {
      id: 'tracking-info',
      title: 'How will I track my package once dispatched?',
      content: (
        <p>
          Once your piece is packed and tagged, you will automatically receive an email with USPS Priority or DHL Express tracking details and carbon-offset verification. Domestic packages typically arrive within 2-4 transit days after dispatch.
        </p>
      ),
    },
    {
      id: 'returns-exchange',
      title: 'What is your 30-day return or exchange policy?',
      content: (
        <p>
          We want you to love your handmade treasure unconditionally. If you are not completely delighted with your order, contact us within 30 days of receiving your package to initiate a complimentary exchange or full refund (minus original shipping costs). Items must remain unworn, unwashed, and in original condition with tags attached.
        </p>
      ),
    },
    {
      id: 'lifetime-mending',
      title: 'How does the Lifetime Stitch Guarantee work?',
      content: (
        <p>
          Crochet items are durable, but accidents happen—a caught ring, a curious pet claw, or heavy wear over years. If a yarn loop ever pulls loose or a seam needs reinforcement, you can contact us at any time and Reet will mend it free of charge.
        </p>
      ),
    },
    {
      id: 'international-duties',
      title: 'Do you ship internationally?',
      content: (
        <p>
          Yes! We ship worldwide to Canada, the UK, Europe, Australia, Japan, and beyond. International shipping is calculated at checkout based on weight. Any local import customs or VAT fees are handled transparently through carrier delivery.
        </p>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: 'var(--color-cream-100)',
          borderBottom: '1px solid var(--border-color)',
          padding: '3.5rem 0',
        }}
      >
        <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <span className="section-eyebrow">Studio Transparency</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Shipping, Care &amp; Returns</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
            Everything you need to know about our slow-craft production schedules, plastic-free packaging, and lifetime
            mending guarantee.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3.5rem', maxWidth: '900px' }}>
        {/* Highlight Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}
        >
          <div
            style={{
              padding: '24px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
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
                marginBottom: '14px',
              }}
            >
              <TruckIcon size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Free Shipping ₹1,999+</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Orders above ₹1,999 receive complimentary express delivery across India. Flat ₹149 standard rate for all other orders.
            </p>
          </div>

          <div
            style={{
              padding: '24px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
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
                marginBottom: '14px',
              }}
            >
              <PackageIcon size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>100% Plastic-Free</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Packed in recycled FSC kraft boxes with wildflower seed paper notes and natural jute twine ribbons.
            </p>
          </div>

          <div
            style={{
              padding: '24px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
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
                marginBottom: '14px',
              }}
            >
              <ShieldCheckIcon size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>30-Day Happiness</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Hassle-free 30-day exchange or return on all unworn items, plus complimentary lifetime stitch repair.
            </p>
          </div>
        </div>

        {/* Lead Times Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            border: '1px solid var(--border-color)',
            padding: '28px',
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <SparklesIcon size={20} style={{ color: 'var(--color-terracotta-500)' }} />
            <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Estimated Crafting &amp; Handmaking Lead Times</h3>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '20px' }}>
            Because each piece is made to order, please allow the following studio crafting days prior to carrier dispatch:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { category: 'Hats, Coasters & Small Accessories', days: '2 – 3 business days', hours: '4-6 hours hand-crochet' },
              { category: 'Amigurumi Nursery Keepsakes & Toys', days: '3 – 4 business days', hours: '8-10 hours micro-tension stitch' },
              { category: 'Daisy Market Totes & Shoulder Bags', days: '4 – 5 business days', hours: '12-14 hours assembly' },
              { category: 'Oversized Cardigans & Vests', days: '6 – 8 business days', hours: '24-28 hours granny join' },
              { category: 'Heirloom Waffle Throw Blankets', days: '8 – 10 business days', hours: '36+ hours continuous wool hook' },
            ].map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: idx % 2 === 0 ? 'var(--color-cream-100)' : '#FFFFFF',
                  fontSize: '0.9rem',
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.category}</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-sage-700)' }}>{row.days}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '8px' }}>({row.hours})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div id="returns" style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid var(--border-color)', padding: '32px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Frequently Asked Questions</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
            Answers to common questions regarding delivery, garment care, and our lifetime guarantee.
          </p>
          <Accordion items={faqItems} />
        </div>
      </div>
    </div>
  );
}
