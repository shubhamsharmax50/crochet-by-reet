'use client';

import React, { useState } from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon, CheckIcon, SparklesIcon } from '@/components/Icons';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'custom-order',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Thank you! Your note has been delivered to Reet’s studio desk.', 'success');
    }, 700);
  };

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Page Header */}
      <div
        style={{
          backgroundColor: 'var(--color-cream-100)',
          borderBottom: '1px solid var(--border-color)',
          padding: '3.5rem 0',
        }}
      >
        <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <span className="section-eyebrow">Connect with the Maker</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>We&rsquo;d Love to Hear From You</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
            Questions about yarn types, custom crochet dimensions, colors, or custom gift orders? Reet responds to
            every note personally.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Contact Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              padding: '32px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-sage-100)',
                    color: 'var(--color-sage-600)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <CheckIcon size={30} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Note Received with Warmth</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Thank you, <strong>{formData.name}</strong>. Reet reviews new messages each afternoon between
                  studio stitch sessions and will reply to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', inquiryType: 'custom-order', message: '' });
                  }}
                  className="btn btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '4px' }}>Send a Studio Note</h3>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Chen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="maya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    style={{ width: '100%', cursor: 'pointer' }}
                  >
                    <option value="custom-order">Bespoke Custom Order / Commission</option>
                    <option value="order-tracking">Order Status &amp; Lead Time Check</option>
                    <option value="care-question">Wool Care &amp; Mending Support</option>
                    <option value="wholesale">Stockist &amp; Boutique Inquiries</option>
                    <option value="general">General Hello</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about the project, sizing requirements, or questions you have in mind..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg btn-block"
                  style={{ marginTop: '8px' }}
                >
                  {isSubmitting ? 'Delivering Note...' : 'Send Note to Atelier'}
                </button>
              </form>
            )}
          </div>

          {/* Studio Details & Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                backgroundColor: 'var(--color-cream-100)',
                borderRadius: '18px',
                padding: '28px',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>Studio Information</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPinIcon size={20} style={{ color: 'var(--color-sage-600)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Maker Atelier &amp; Dye Studio</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      218 SE Salmon Street, Suite 4B<br />
                      Portland, Oregon 97214 (By Appointment Only)
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MailIcon size={20} style={{ color: 'var(--color-sage-600)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Direct Email</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      reet@craftedbyreet.com
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <PhoneIcon size={20} style={{ color: 'var(--color-sage-600)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Studio Phone</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      +1 (503) 555-0194
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <ClockIcon size={20} style={{ color: 'var(--color-sage-600)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Studio Stitch Hours</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      Monday &ndash; Friday: 9:00 AM &ndash; 5:00 PM PST<br />
                      Weekends: Quiet crafting &amp; family time
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Commissions Box */}
            <div
              style={{
                backgroundColor: 'var(--color-terracotta-50)',
                border: '1px solid var(--color-terracotta-100)',
                borderRadius: '18px',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <SparklesIcon size={20} style={{ color: 'var(--color-terracotta-600)' }} />
                <h4 style={{ margin: 0, color: 'var(--color-terracotta-700)', fontSize: '1.05rem' }}>
                  Custom Commissions Status: OPEN
                </h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-terracotta-700)', lineHeight: 1.5, margin: 0 }}>
                We are currently accepting custom color palettes and specialized dimensions for delivery in 3-4 weeks.
                Select &ldquo;Bespoke Custom Order&rdquo; on the left to begin collaborating on sketches!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
