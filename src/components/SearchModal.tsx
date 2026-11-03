'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SearchIcon, XIcon } from './Icons';
import { PRODUCTS } from '@/data/products';
import { formatINR } from '@/lib/format';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search catalog"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(35, 30, 27, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 20px 20px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-modal"
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-modal)',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color-subtle)',
            gap: '12px',
          }}
        >
          <SearchIcon size={22} style={{ color: 'var(--color-sage-600)' }} />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search cozy cardigans, daisy totes, amigurumi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              boxShadow: 'none',
              padding: 0,
              fontSize: '1.05rem',
              backgroundColor: 'transparent',
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close search"
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

        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '16px 20px' }}>
          {query.trim() === '' ? (
            <div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  marginBottom: '10px',
                }}
              >
                Popular Searches
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Cardigan', 'Daisy Tote', 'Fox Plushie', 'Bucket Hat', 'Waffle Blanket'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-cream-100)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-color-subtle)',
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  marginBottom: '6px',
                }}
              >
                Found {filteredProducts.length} handcrafted items
              </div>
              {filteredProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '10px',
                    borderRadius: '10px',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-cream-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <img
                    src={p.images[0].url}
                    alt={p.name}
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      backgroundColor: 'var(--color-cream-100)',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {p.categoryLabel} &bull; Made in ~{p.leadTimeDays} days
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-sage-600)', fontSize: '0.95rem' }}>
                    {formatINR(p.price)}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
              <p>No handmade pieces found for &ldquo;{query}&rdquo;.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                Try searching for &ldquo;tote&rdquo;, &ldquo;blanket&rdquo;, or &ldquo;cardigan&rdquo;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
