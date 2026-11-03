'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { FilterIcon, SlidersIcon, XIcon, SearchIcon } from '@/components/Icons';
import { formatINR } from '@/lib/format';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(600000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync category changes with URL
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      router.push('/shop', { scroll: false });
    } else {
      router.push(`/shop?category=${catId}`, { scroll: false });
    }
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Max price match
      if (product.price > maxPrice) {
        return false;
      }
      // In stock
      if (inStockOnly && product.stockQuantity <= 0) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesCat = product.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (selectedSort === 'rating') return b.rating - a.rating;
      // Default 'featured'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedSort, maxPrice, inStockOnly, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(600000);
    setInStockOnly(false);
    setSearchQuery('');
    router.push('/shop', { scroll: false });
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || maxPrice < 600000 || inStockOnly || searchQuery.trim() !== '';

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', paddingBottom: '5rem' }}>
      {/* Shop Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-cream-100)',
          borderBottom: '1px solid var(--border-color)',
          padding: '3rem 0',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <span className="section-eyebrow">Studio Catalog</span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Handcrafted Collection</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
              Each item is handmade in small batches in our Pacific Northwest studio using ethical organic fibers and
              warm, tactile earth tones.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Top Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '2rem',
          }}
        >
          {/* Mobile Filter Toggle & Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="btn btn-outline btn-sm mobile-filter-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <FilterIcon size={16} />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>
            <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} handmade pieces
            </span>
          </div>

          {/* Quick Search & Sort dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Inline search input */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  paddingLeft: '34px',
                  paddingRight: '12px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  fontSize: '0.88rem',
                  borderRadius: 'var(--radius-full)',
                  width: '200px',
                }}
              />
              <div style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)', display: 'flex' }}>
                <SearchIcon size={15} />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '10px', color: 'var(--text-muted)' }}
                  aria-label="Clear search"
                >
                  <XIcon size={14} />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                style={{
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 16px',
                  fontSize: '0.88rem',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                <option value="featured">Featured Favorites</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Drops</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Active Filters:
            </span>

            {selectedCategory !== 'all' && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: 'var(--color-sage-100)',
                  color: 'var(--color-sage-700)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                Category: {CATEGORIES.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                <button
                  onClick={() => handleCategoryChange('all')}
                  style={{ display: 'flex', alignItems: 'center', color: 'var(--color-sage-700)' }}
                  aria-label="Remove category filter"
                >
                  <XIcon size={13} />
                </button>
              </span>
            )}

            {maxPrice < 600000 && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: 'var(--color-cream-200)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                Max Price: {formatINR(maxPrice)}
                <button
                  onClick={() => setMaxPrice(600000)}
                  style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}
                  aria-label="Reset max price filter"
                >
                  <XIcon size={13} />
                </button>
              </span>
            )}

            {searchQuery && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: 'var(--color-terracotta-100)',
                  color: 'var(--color-terracotta-700)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                Query: &ldquo;{searchQuery}&rdquo;
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ display: 'flex', alignItems: 'center', color: 'var(--color-terracotta-700)' }}
                  aria-label="Clear search query"
                >
                  <XIcon size={13} />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-terracotta-600)',
                textDecoration: 'underline',
                marginLeft: '8px',
              }}
            >
              Reset all
            </button>
          </div>
        )}

        {/* Layout: Sidebar Filters + Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '2.5rem',
            alignItems: 'start',
          }}
          className="shop-layout"
        >
          {/* Desktop & Mobile Sidebar */}
          <aside
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              padding: '24px',
              position: 'sticky',
              top: '90px',
            }}
            className={`shop-sidebar ${isMobileFilterOpen ? 'mobile-visible' : ''}`}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-color-subtle)',
                marginBottom: '20px',
              }}
            >
              <h3 style={{ fontSize: '1.15rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersIcon size={18} style={{ color: 'var(--color-sage-600)' }} />
                Filter Pieces
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  style={{ fontSize: '0.8rem', color: 'var(--color-terracotta-600)', fontWeight: 600 }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  marginBottom: '12px',
                }}
              >
                Categories
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  onClick={() => handleCategoryChange('all')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: selectedCategory === 'all' ? 'var(--color-sage-100)' : 'transparent',
                    color: selectedCategory === 'all' ? 'var(--color-sage-700)' : 'var(--text-secondary)',
                    fontWeight: selectedCategory === 'all' ? 700 : 500,
                    fontSize: '0.9rem',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>All Categories</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? 'var(--color-sage-100)' : 'transparent',
                        color: isSelected ? 'var(--color-sage-700)' : 'var(--text-secondary)',
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{cat.name}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {PRODUCTS.filter((p) => p.category === cat.id).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-muted)',
                  }}
                >
                  Max Price
                </span>
                <span style={{ fontWeight: 700, color: 'var(--color-sage-700)', fontSize: '0.95rem' }}>
                  {formatINR(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="600000"
                step="25000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-sage-500)', cursor: 'pointer', padding: 0 }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}
              >
                <span>{formatINR(50000)}</span>
                <span>{formatINR(600000)}</span>
              </div>
            </div>

            {/* In stock toggle */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color-subtle)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-sage-500)' }}
                />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  In Stock Only
                </span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div>
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  padding: '60px 24px',
                  textAlign: 'center',
                }}
              >
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>No pieces match your filters</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Try resetting your price range or clearing category filters to explore all creations.
                </p>
                <button onClick={resetFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Loading handcrafted shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
