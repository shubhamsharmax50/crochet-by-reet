'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { StarIcon, ShoppingBagIcon, CheckIcon } from './Icons';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatINR } from '@/lib/format';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url || '/images/hero.jpg',
        selectedColor: selectedColor || undefined,
        selectedSize: product.sizes ? product.sizes[0] : undefined,
        leadTimeDays: product.leadTimeDays,
      },
      1
    );

    showToast(`Added "${product.name}" to your basket!`, 'success');

    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal)',
      }}
      className="product-card"
    >
      {/* Product Image Area */}
      <Link
        href={`/product/${product.slug}`}
        style={{
          position: 'relative',
          display: 'block',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          backgroundColor: 'var(--color-cream-100)',
        }}
      >
        <img
          src={product.images[0]?.url || '/images/hero.jpg'}
          alt={product.images[0]?.alt || product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-smooth)',
          }}
          className="product-img"
        />

        {/* Badges Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 2,
          }}
        >
          {product.isBestseller && (
            <span className="badge badge-sage">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="badge badge-terracotta">
              New Drop
            </span>
          )}
          {product.originalPrice && (
            <span className="badge badge-cream" style={{ fontWeight: 700, color: 'var(--color-terracotta-600)' }}>
              Save {formatINR(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        {/* Lead time pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            borderRadius: 'var(--radius-full)',
            padding: '3px 10px',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--color-sage-700)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          }}
        >
          Handcrafted in ~{product.leadTimeDays}d
        </div>
      </Link>

      {/* Product Details Area */}
      <div
        style={{
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Category & Rating */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px',
            fontSize: '0.8rem',
          }}
        >
          <span style={{ color: 'var(--color-terracotta-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {product.categoryLabel}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#DDA15E' }}>
            <StarIcon size={14} fill="#DDA15E" />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.82rem' }}>
              {product.rating.toFixed(1)}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.18rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            marginBottom: '6px',
          }}
        >
          {product.name}
        </Link>

        {/* Tagline / Subtitle */}
        <p
          style={{
            fontSize: '0.84rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.tagline}
        </p>

        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '16px',
            }}
          >
            {product.colors.map((color) => {
              const isSelected = selectedColor === color.name;
              return (
                <button
                  key={color.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color.name);
                  }}
                  title={color.name}
                  aria-label={`Select color ${color.name}`}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: color.colorHex || 'var(--color-sage-500)',
                    border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(0,0,0,0.15)',
                    outline: isSelected ? '2px solid var(--color-sage-600)' : 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                    transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              );
            })}
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
              {selectedColor || `${product.colors.length} shades`}
            </span>
          </div>
        )}

        {/* Price & Add to Cart Footer */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-color-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'line-through',
                }}
              >
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            aria-label={`Add ${product.name} to basket`}
            className="btn btn-primary btn-sm"
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
            }}
          >
            {isAdding ? (
              <>
                <CheckIcon size={15} /> Added
              </>
            ) : (
              <>
                <ShoppingBagIcon size={15} /> Add to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
