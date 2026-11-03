'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBagIcon, SearchIcon, MenuIcon, XIcon, SparklesIcon } from './Icons';
import { useCart } from '@/context/CartContext';
import { SearchModal } from './SearchModal';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop All', href: '/shop' },
    { label: 'About Maker', href: '/about' },
    { label: 'Shipping & Care', href: '/shipping-returns' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div
        style={{
          backgroundColor: 'var(--color-sage-700)',
          color: '#FFFFFF',
          fontSize: '0.8rem',
          padding: '8px 16px',
          textAlign: 'center',
          letterSpacing: '0.03em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <SparklesIcon size={14} style={{ color: 'var(--color-honey)' }} />
        <span>
          🌼 <strong>Special Sunshine Trio Bundle:</strong> Sunflower Bouquet + Tulip Charm + Sunflower Keychain — <strong>All for ₹999!</strong> &bull; Free Shipping Across India
        </span>
      </div>

      {/* Main Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: 'rgba(252, 250, 247, 0.94)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border-color)',
          transition: 'all 0.2s ease',
        }}
      >
        <div
          className="container"
          style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              color: 'var(--text-primary)',
              borderRadius: '8px',
            }}
            className="mobile-only-btn"
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}
            >
              Crafted by Reet
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-sage-600)',
                marginTop: '1px',
              }}
            >
              Handmade by Reet Bhadani
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--color-sage-700)' : 'var(--text-secondary)',
                    position: 'relative',
                    padding: '6px 0',
                    transition: 'color var(--transition-fast)',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--color-sage-500)',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search & Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search crochet products"
              style={{
                padding: '10px',
                borderRadius: '50%',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-cream-100)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <SearchIcon size={20} />
            </button>

            <button
              onClick={openCart}
              aria-label={`Open shopping cart with ${itemCount} items`}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-cream-100)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-sage-50)';
                e.currentTarget.style.borderColor = 'var(--color-sage-200)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-cream-100)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <ShoppingBagIcon size={19} style={{ color: 'var(--color-sage-700)' }} />
                {itemCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-7px',
                      right: '-8px',
                      backgroundColor: 'var(--color-terracotta-500)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #FFFFFF',
                    }}
                  >
                    {itemCount}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }} className="desktop-cart-label">
                Cart {itemCount > 0 && `(${itemCount})`}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div
            className="animate-fade-in"
            style={{
              borderTop: '1px solid var(--border-color)',
              backgroundColor: '#FFFFFF',
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: pathname === link.href ? 'var(--color-sage-700)' : 'var(--text-primary)',
                  padding: '8px 0',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
