'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { Accordion } from '@/components/Accordion';
import {
  StarIcon,
  ShoppingBagIcon,
  CheckIcon,
  TruckIcon,
  MinusIcon,
  PlusIcon,
  ArrowLeftIcon,
} from '@/components/Icons';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatINR } from '@/lib/format';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, relatedProducts }) => {
  const { addToCart, buyNow } = useCart();
  const { showToast } = useToast();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[activeImageIndex]?.url || product.images[0]?.url,
        selectedColor: selectedColor || undefined,
        selectedSize: selectedSize || undefined,
        leadTimeDays: product.leadTimeDays,
      },
      quantity
    );

    showToast(`Added ${quantity}x "${product.name}" to your basket!`, 'success');

    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const handleBuyNow = () => {
    buyNow(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[activeImageIndex]?.url || product.images[0]?.url,
        selectedColor: selectedColor || undefined,
        selectedSize: selectedSize || undefined,
        leadTimeDays: product.leadTimeDays,
      },
      quantity
    );
  };

  const accordionItems = [
    {
      id: 'materials',
      title: 'Ethical Materials & Fiber Origin',
      defaultOpen: true,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {product.details.materials.map((mat, idx) => (
              <li key={idx}>{mat}</li>
            ))}
          </ul>
          {product.details.yarnOrigin && (
            <div style={{ marginTop: '6px', fontSize: '0.85rem', color: 'var(--color-sage-700)', fontWeight: 500 }}>
              Yarn Sourcing: {product.details.yarnOrigin}
            </div>
          )}
          <div style={{ fontSize: '0.85rem', color: 'var(--color-terracotta-600)', fontStyle: 'italic' }}>
            {product.details.difficultyOrHours}
          </div>
        </div>
      ),
    },
    {
      id: 'fit-dimensions',
      title: 'Measurements & Sizing',
      content: (
        <div>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>{product.details.dimensions || 'Standard relaxed artisan fit.'}</p>
          {product.sizes && (
            <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Note: Because each piece is hand-crocheted, subtle 0.5&quot; variations in gauge may occur, reflecting the unique hand of the maker.
            </p>
          )}
        </div>
      ),
    },
    {
      id: 'care-guide',
      title: 'Washing & Care Instructions',
      content: (
        <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem' }}>
          {product.details.careInstructions.map((care, idx) => (
            <li key={idx}>{care}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'shipping-lead',
      title: 'Handmade Lead Time & Shipping',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
          <p style={{ margin: 0 }}>
            Because this piece is made completely by hand upon order, please allow{' '}
            <strong>{product.leadTimeDays} business days</strong> for crafting prior to shipment.
          </p>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Orders over $75 ship free via carbon-neutral postal carrier. You will receive tracking photos as soon as your piece is blocked, labeled, and wrapped in dried botanical tissue.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: '6rem' }}>
      {/* Breadcrumbs */}
      <div
        style={{
          borderBottom: '1px solid var(--border-color-subtle)',
          backgroundColor: 'var(--color-cream-50)',
          padding: '14px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <Link href="/shop" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ArrowLeftIcon size={14} /> Back to Shop
          </Link>
          <span style={{ color: 'var(--border-color)' }}>/</span>
          <Link href={`/shop?category=${product.category}`} style={{ color: 'var(--text-muted)' }}>
            {product.categoryLabel}
          </Link>
          <span style={{ color: 'var(--border-color)' }}>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* LEFT: Image Gallery */}
          <div>
            {/* Primary Main Image */}
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: 'var(--color-cream-100)',
                aspectRatio: '1 / 1',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
                position: 'relative',
              }}
            >
              <img
                src={product.images[activeImageIndex]?.url || product.images[0]?.url}
                alt={product.images[activeImageIndex]?.alt || product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {product.isBestseller && (
                <span
                  className="badge badge-sage"
                  style={{ position: 'absolute', top: '16px', left: '16px' }}
                >
                  Bestseller
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '16px',
                  overflowX: 'auto',
                  paddingBottom: '4px',
                }}
              >
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid var(--color-sage-600)' : '1px solid var(--border-color)',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0,
                      opacity: activeImageIndex === idx ? 1 : 0.65,
                      transition: 'opacity 0.15s ease, border-color 0.15s ease',
                    }}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Buy Box & Details */}
          <div>
            {/* Category & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--color-terracotta-500)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {product.categoryLabel}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#DDA15E' }}>
                <StarIcon size={16} fill="#DDA15E" />
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  {product.rating.toFixed(1)}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  ({product.reviewCount} verified reviews)
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '8px', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Tagline */}
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {product.tagline}
            </p>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-sage-800)' }}>
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    {formatINR(product.originalPrice)}
                  </span>
                  <span className="badge badge-terracotta">
                    Save {formatINR(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Maker Lead Time Card */}
            <div
              style={{
                backgroundColor: 'var(--color-sage-50)',
                border: '1px solid var(--color-sage-200)',
                borderRadius: '12px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              <TruckIcon size={20} style={{ color: 'var(--color-sage-600)', flexShrink: 0 }} />
              <div style={{ fontSize: '0.88rem', color: 'var(--color-sage-800)' }}>
                <strong>Made-to-order piece:</strong> Ready to dispatch in approximately{' '}
                <strong>{product.leadTimeDays} business days</strong>. Handcrafted specifically for you.
              </div>
            </div>

            {/* Color Swatch Options */}
            {product.colors.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                  Yarn Shade: <span style={{ color: 'var(--color-sage-600)', fontWeight: 500 }}>{selectedColor}</span>
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.name)}
                        aria-label={`Choose shade ${color.name}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: isSelected ? 'var(--color-sage-100)' : 'var(--color-cream-100)',
                          border: isSelected ? '1.5px solid var(--color-sage-600)' : '1px solid var(--border-color)',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: isSelected ? 600 : 500,
                        }}
                      >
                        <span
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            backgroundColor: color.colorHex,
                            display: 'inline-block',
                          }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Options (if applicable) */}
            {product.sizes && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                  Select Size
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? 'var(--color-sage-600)' : '#FFFFFF',
                          color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                          border: isSelected ? '1.5px solid var(--color-sage-600)' : '1px solid var(--border-color)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart Row */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '28px' }}>
              {/* Quantity selector */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 10px',
                  gap: '12px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  style={{
                    width: '26px',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <MinusIcon size={14} />
                </button>
                <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center', fontSize: '0.95rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  style={{
                    width: '26px',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <PlusIcon size={14} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="btn btn-outline btn-lg"
                style={{ flex: 1 }}
              >
                {isAdding ? (
                  <>
                    <CheckIcon size={18} /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon size={18} /> Add to Basket
                  </>
                )}
              </button>

              {/* Instant Buy / Direct Payment Button */}
              <button
                onClick={handleBuyNow}
                className="btn btn-primary btn-lg"
                style={{
                  flex: 1.2,
                  backgroundColor: 'var(--color-terracotta-600)',
                  borderColor: 'var(--color-terracotta-600)',
                }}
              >
                <span>⚡ Buy Now &bull; {formatINR(product.price * quantity)}</span>
              </button>
            </div>

            {/* Accordions: Materials, Fit, Care, Shipping */}
            <div style={{ marginTop: '30px' }}>
              <Accordion items={accordionItems} />
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '5rem', paddingTop: '3.5rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span className="section-eyebrow">Complementary Pieces</span>
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>You Might Also Adore</h2>
            </div>
            <div className="product-grid">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
