'use client';

import Link from 'next/link';
import { ArrowRightIcon, StarIcon, SparklesIcon, ShieldCheckIcon, LeafIcon, TruckIcon, ShoppingBagIcon } from '@/components/Icons';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES, REVIEWS, BRAND_VALUES } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/format';

export default function HomePage() {
  const { buyNow } = useCart();
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const wearableProducts = PRODUCTS.filter((p) => p.category === 'wearables');

  return (
    <div>
      {/* HERO SECTION */}
      <section
        style={{
          position: 'relative',
          paddingTop: '3.5rem',
          paddingBottom: '5rem',
          backgroundColor: 'var(--color-cream-100)',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            {/* Hero Left Content */}
            <div style={{ maxWidth: '580px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-sage-100)',
                  color: 'var(--color-sage-700)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                  letterSpacing: '0.04em',
                }}
              >
                <SparklesIcon size={15} style={{ color: 'var(--color-sage-600)' }} />
                <span>HANDMADE CROCHET STUDIO &bull; BY REET BHADANI</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4.5vw + 0.5rem, 3.8rem)',
                  lineHeight: 1.15,
                  marginBottom: '1.25rem',
                  color: 'var(--text-primary)',
                }}
              >
                Slow-crafted crochet, made to be held &amp; cherished.
              </h1>

              <p
                style={{
                  fontSize: '1.15rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                }}
              >
                Cardigans, floral bags, bucket hats, and charming amigurumi plushies—individually
                crocheted by hand with patience and love by Reet Bhadani. Small-batch and made to order.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  flexWrap: 'wrap',
                }}
              >
                <Link href="/shop" className="btn btn-primary btn-lg">
                  <span>Shop Collection</span>
                  <ArrowRightIcon size={18} />
                </Link>
                <Link href="/about" className="btn btn-outline btn-lg">
                  <span>Our Craft Ethos</span>
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  marginTop: '2.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--border-color)',
                }}
              >
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                    4.9 / 5.0
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px', color: '#DDA15E' }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={14} fill="#DDA15E" />
                    ))}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Over 500+ hand-stitched orders
                  </div>
                </div>

                <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border-color)' }} />

                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage-700)' }}>
                    Zero automated machinery
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Single-artisan handmade
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual - Full View Sunflower Bouquet */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-hover)',
                  border: '8px solid #FFFFFF',
                  width: '100%',
                  maxWidth: '440px',
                  aspectRatio: '4 / 5',
                  backgroundColor: '#FAF5EA',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="/images/sunflower-bouquet.jpg"
                  alt="Crafted by Reet — Everlasting sunflower crochet bouquet handcrafted by Reet Bhadani"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />

                {/* Badge showing Full View */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(6px)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--color-sage-700)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                >
                  Full Bouquet View
                </div>
              </div>

              {/* Maker badge with Instant Checkout action */}
              <div
                style={{
                  marginTop: '-30px',
                  position: 'relative',
                  zIndex: 2,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '12px 18px',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '1px solid var(--border-color)',
                  maxWidth: '420px',
                  width: '92%',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-honey)',
                    color: '#4A3500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <SparklesIcon size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Everlasting Sunflower Bouquet
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Single stem in florist wrap &bull; ₹899
                  </div>
                </div>
                <button
                  onClick={() =>
                    buyNow({
                      productId: 'prod-01',
                      slug: 'everlasting-sunflower-crochet-bouquet',
                      name: 'Everlasting Sunflower Crochet Bouquet',
                      price: 89900,
                      image: '/images/sunflower-bouquet.jpg',
                      leadTimeDays: 3,
                    })
                  }
                  className="btn btn-primary btn-sm"
                  style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  Buy ₹899
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">Handpicked Creations</span>
            <h2>Shop by Category</h2>
            <p className="section-subtitle">
              From cozy wearable statement pieces to heirloom home accents, explore pieces crafted one loop at a time.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
                }}
                className="category-card"
              >
                <div
                  style={{
                    aspectRatio: '4 / 3',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-cream-100)',
                    position: 'relative',
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform var(--transition-smooth)',
                    }}
                    className="cat-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-sage-700)',
                    }}
                  >
                    {cat.itemCount} items
                  </div>
                </div>

                <div style={{ padding: '16px' }}>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontFamily: 'var(--font-serif)',
                      marginBottom: '4px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* SPECIAL SUNSHINE TRIO COMBO SPOTLIGHT */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: '#FFFDF9',
              border: '2px solid var(--color-honey)',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 44px)',
              boxShadow: 'var(--shadow-hover)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top decorative accent ribbon */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--color-honey)',
                color: '#4A3500',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '1.25rem',
              }}
            >
              <SparklesIcon size={16} />
              <span>LIMITED VALUE COMBO &bull; SAVE ₹698 (41% OFF)</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                alignItems: 'center',
              }}
            >
              {/* Left text column */}
              <div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', marginBottom: '12px', color: 'var(--text-primary)' }}>
                  The Sunshine Trio Bundle (All 3 for ₹999)
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Can&rsquo;t decide which piece to choose? Get Reet&rsquo;s 3 best-selling handcrafted favorites bundled together in luxury gift packaging:
                </p>

                <div style={{ display: 'grid', gap: '10px', marginBottom: '22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.96rem' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-sage-100)', color: 'var(--color-sage-700)', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 700, fontSize: '0.85rem' }}>1</div>
                    <div><strong>Everlasting Sunflower Bouquet</strong> (Individual: ₹899)</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.96rem' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-sage-100)', color: 'var(--color-sage-700)', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 700, fontSize: '0.85rem' }}>2</div>
                    <div><strong>Twin Tulip Hanging Charm</strong> in Soft Pink (Individual: ₹449)</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.96rem' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-sage-100)', color: 'var(--color-sage-700)', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 700, fontSize: '0.85rem' }}>3</div>
                    <div><strong>Blooming Sunflower Keychain</strong> with leaf (Individual: ₹349)</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-terracotta-700)', fontFamily: 'var(--font-serif)' }}>
                    ₹999
                  </span>
                  <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                    ₹1,697
                  </span>
                  <span style={{ backgroundColor: 'var(--color-sage-100)', color: 'var(--color-sage-700)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 700 }}>
                    FREE SHIPPING INCLUDED
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() =>
                      buyNow({
                        productId: 'prod-combo-01',
                        slug: 'sunshine-trio-gift-bundle-999',
                        name: 'Sunshine Trio Gift Bundle (3-in-1 Combo)',
                        price: 99900,
                        image: '/images/sunflower-bouquet.jpg',
                        leadTimeDays: 3,
                      })
                    }
                    className="btn btn-primary btn-lg"
                    style={{
                      backgroundColor: 'var(--color-terracotta-600)',
                      borderColor: 'var(--color-terracotta-600)',
                      fontSize: '1.05rem',
                      padding: '14px 28px',
                      cursor: 'pointer',
                    }}
                  >
                    <span>⚡ Order Sunshine Trio for ₹999</span>
                    <ArrowRightIcon size={18} />
                  </button>
                  <Link href="/product/sunshine-trio-gift-bundle-999" className="btn btn-outline btn-lg">
                    <span>View Bundle Details</span>
                  </Link>
                </div>
              </div>

              {/* Right: 3 item preview grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                }}
              >
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '3px solid #FFFFFF', boxShadow: 'var(--shadow-card)', aspectRatio: '3/4' }}>
                  <img src="/images/sunflower-bouquet.jpg" alt="Sunflower Bouquet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '3px solid #FFFFFF', boxShadow: 'var(--shadow-card)', aspectRatio: '3/4' }}>
                  <img src="/images/pink-tulip-charm.jpg" alt="Twin Tulip Charm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '3px solid #FFFFFF', boxShadow: 'var(--shadow-card)', aspectRatio: '3/4' }}>
                  <img src="/images/sunflower-keychain.jpg" alt="Sunflower Keychain" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="section section-cream">
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2.5rem',
            }}
          >
            <div>
              <span className="section-eyebrow">Studio Favorites</span>
              <h2 style={{ margin: 0 }}>Featured Handmade Pieces</h2>
              <p style={{ marginTop: '6px', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                Beloved designs stitched with our signature sage and terracotta natural palettes.
              </p>
            </div>
            <Link href="/shop" className="btn btn-outline">
              <span>View All Pieces ({PRODUCTS.length})</span>
              <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div className="product-grid product-grid-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW HANDCRAFTED WEARABLES & HAIR ACCESSORIES SECTION */}
      <section className="section" style={{ backgroundColor: '#FAF6EE', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">Wearable Crochet Art &bull; New Drop</span>
            <h2>Handcrafted Wearables &amp; Hair Adornments</h2>
            <p className="section-subtitle">
              Intricately crocheted wearable statements by Reet Bhadani—spiral arm cuffs and non-slip braided hairbands crafted for effortless bohemian elegance.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {/* Wearable Card 1: Spiral Armlet */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Dual image preview */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '4px',
                  backgroundColor: 'var(--color-cream-100)',
                  aspectRatio: '16 / 11',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'relative', height: '100%' }}>
                  <img
                    src="/images/spiral-armlet-worn.jpg"
                    alt="Handmade spiral crochet armlet bajuband worn on arm"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--color-terracotta-600)',
                    }}
                  >
                    Worn Styling
                  </div>
                </div>
                <div style={{ position: 'relative', height: '100%' }}>
                  <img
                    src="/images/spiral-armlet-hand.jpg"
                    alt="Handmade spiral crochet armlet held in hand"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--color-sage-700)',
                    }}
                  >
                    Artisan Stitch Detail
                  </div>
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-terracotta">New Release &bull; Tri-Color</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#DDA15E', fontSize: '0.85rem', fontWeight: 700 }}>
                    <StarIcon size={14} fill="#DDA15E" />
                    <span>5.0 (11 reviews)</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Handmade Spiral Crochet Armlet (Bajuband)
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  A cheerful boho spiral cuff crocheted in blossom pink, sunflower yellow, and deep crimson. Comfortably coils around your upper arm or forearm with gentle natural hold and zero skin pinch.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                    ₹399
                  </span>
                  <span style={{ fontSize: '1rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                    ₹549
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-terracotta-600)' }}>
                    Save ₹150 (27% OFF)
                  </span>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() =>
                      buyNow({
                        productId: 'prod-07',
                        slug: 'handmade-spiral-crochet-armlet',
                        name: 'Handmade Spiral Crochet Armlet (Bajuband)',
                        price: 39900,
                        image: '/images/spiral-armlet-worn.jpg',
                        leadTimeDays: 2,
                      })
                    }
                    className="btn btn-primary"
                    style={{ flex: 1.2, padding: '10px 18px', cursor: 'pointer' }}
                  >
                    <span>⚡ Buy Now (₹399)</span>
                  </button>
                  <Link
                    href="/product/handmade-spiral-crochet-armlet"
                    className="btn btn-outline"
                    style={{ flex: 1, padding: '10px 16px', textAlign: 'center' }}
                  >
                    <span>View Piece</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Wearable Card 2: Braided Headband */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Dual image preview */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '4px',
                  backgroundColor: 'var(--color-cream-100)',
                  aspectRatio: '16 / 11',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'relative', height: '100%' }}>
                  <img
                    src="/images/braided-headband-worn.jpg"
                    alt="Artisan braided crochet headband worn on hair"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--color-sage-700)',
                    }}
                  >
                    Hair Styling
                  </div>
                </div>
                <div style={{ position: 'relative', height: '100%' }}>
                  <img
                    src="/images/braided-headband-flat.jpg"
                    alt="Artisan braided crochet headband laid flat showing weave"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--color-terracotta-600)',
                    }}
                  >
                    Braided Texture
                  </div>
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-sage">Artisan Favorite &bull; Indigo &amp; Ivory</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#DDA15E', fontSize: '0.85rem', fontWeight: 700 }}>
                    <StarIcon size={14} fill="#DDA15E" />
                    <span>4.9 (16 reviews)</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Artisan Braided Crochet Headband
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  Hand-stitched in deep midnight indigo blue and warm ivory yarn. Features a flexible comfort-grip that stays in place all day without tension or headaches.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                    ₹349
                  </span>
                  <span style={{ fontSize: '1rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                    ₹499
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-sage-700)' }}>
                    Save ₹150 (30% OFF)
                  </span>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() =>
                      buyNow({
                        productId: 'prod-08',
                        slug: 'artisan-braided-crochet-headband',
                        name: 'Artisan Braided Crochet Headband',
                        price: 34900,
                        image: '/images/braided-headband-worn.jpg',
                        leadTimeDays: 2,
                      })
                    }
                    className="btn btn-primary"
                    style={{ flex: 1.2, padding: '10px 18px', cursor: 'pointer' }}
                  >
                    <span>⚡ Buy Now (₹349)</span>
                  </button>
                  <Link
                    href="/product/artisan-braided-crochet-headband"
                    className="btn btn-outline"
                    style={{ flex: 1, padding: '10px 16px', textAlign: 'center' }}
                  >
                    <span>View Piece</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "MADE BY HAND" BRAND STORY SECTION */}
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
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  aspectRatio: '4 / 3',
                  boxShadow: 'var(--shadow-card)',
                  border: '6px solid #FFFFFF',
                }}
              >
                <img
                  src="/images/crimson-rose.jpg"
                  alt="Reet Bhadani holding handcrafted velvet crimson rose"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Decorative detail card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-24px',
                  right: '-16px',
                  backgroundColor: 'var(--color-sage-600)',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '18px 24px',
                  maxWidth: '260px',
                  boxShadow: 'var(--shadow-hover)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.2 }}>
                  &ldquo;A stitch in time is a quiet meditation.&rdquo;
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '8px' }}>
                  — Reet Bhadani, Creator &amp; Artisan
                </div>
              </div>
            </div>

            <div style={{ maxWidth: '540px' }}>
              <span className="section-eyebrow">Meet the Maker</span>
              <h2>Crafted with Patience, Intention &amp; Heart</h2>
              <p style={{ marginTop: '1rem', lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
                In a world of mass-manufactured fast fashion, <strong>Crafted by Reet</strong> is dedicated to the slow art of genuine crochet. Every single piece is made completely by hand by Reet Bhadani with patience and care.
              </p>
              <p style={{ marginTop: '1rem', lineHeight: 1.7, fontSize: '1.02rem', color: 'var(--text-secondary)' }}>
                True crochet cannot be produced by machines—every loop you hold was shaped one by one. We don&rsquo;t mass-produce in factories; we create thoughtfully in small, limited releases and custom orders.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginTop: '2rem',
                }}
              >
                <div
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-cream-100)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--color-sage-700)', fontSize: '1rem' }}>
                    Zero Waste Yarns
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Every remnant scrap is recycled into amigurumi filling or fringe.
                  </div>
                </div>

                <div
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-terracotta-50)',
                    border: '1px solid var(--color-terracotta-100)',
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--color-terracotta-600)', fontSize: '1rem' }}>
                    Lifetime Mending
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Send any piece back anytime for complimentary repair stitches.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Link href="/about" className="btn btn-secondary">
                  <span>Read Full Studio Story</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS SECTION */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">Words from Our Community</span>
            <h2>Loved by Fiber Enthusiasts</h2>
            <p className="section-subtitle">
              Read real stories from customers who welcomed our handcrafted pieces into their everyday lives.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '24px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                <div>
                  {/* Star Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#DDA15E', marginBottom: '12px' }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} size={16} fill="#DDA15E" />
                    ))}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                      lineHeight: 1.35,
                    }}
                  >
                    &ldquo;{review.title}&rdquo;
                  </h3>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '16px',
                    }}
                  >
                    {review.content}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-color-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {review.author}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-sage-600)', fontWeight: 500 }}>
                      Verified Buyer &bull; {review.productName}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND VALUES GRID */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            {BRAND_VALUES.map((val, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--color-cream-100)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color-subtle)',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-sage-100)',
                    color: 'var(--color-sage-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}
                >
                  <SparklesIcon size={20} />
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                  {val.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
