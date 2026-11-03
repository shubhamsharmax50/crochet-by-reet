import { Product, Review, CategoryMeta } from '@/types';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'bundles',
    name: 'Special Gift Combos',
    description: 'Curated 3-in-1 artisan gift bundles with free express shipping across India.',
    image: '/images/sunflower-bouquet.jpg',
    itemCount: 1,
  },
  {
    id: 'wearables',
    name: 'Wearables & Hair Accents',
    description: 'Handcrafted spiral armlets, bajubands, and braided comfort headbands.',
    image: '/images/spiral-armlet-worn.jpg',
    itemCount: 2,
  },
  {
    id: 'bouquets',
    name: 'Flowers & Bouquets',
    description: 'Everlasting sunflower bouquets and romantic blooming roses that never wilt.',
    image: '/images/sunflower-bouquet.jpg',
    itemCount: 2,
  },
  {
    id: 'charms',
    name: 'Charms & Hangings',
    description: 'Handcrafted twin tulip and cherry charms for car mirrors, bags, and cozy spaces.',
    image: '/images/pink-tulip-charm.jpg',
    itemCount: 2,
  },
  {
    id: 'keychains',
    name: 'Keychains & Mini Plushies',
    description: 'Charming amigurumi octopus and sunflower keychains to brighten your daily carry.',
    image: '/images/octopus-keychain.jpg',
    itemCount: 2,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-combo-01',
    slug: 'sunshine-trio-gift-bundle-999',
    name: 'Sunshine Trio Gift Bundle (3-in-1 Combo)',
    tagline: 'Sunflower Bouquet + Pink Tulip Charm + Sunflower Keychain — All 3 for ₹999!',
    price: 99900, // ₹999 in paise
    originalPrice: 169700, // ₹1,697 in paise (Save ₹698 / 41% OFF)
    category: 'bundles',
    categoryLabel: 'Special Gift Combos',
    rating: 5.0,
    reviewCount: 36,
    isFeatured: true,
    isBestseller: true,
    isNew: true,
    leadTimeDays: 3,
    description:
      'The ultimate handmade crochet bundle by Reet Bhadani! Get our top 3 bestsellers in one complete value gift set for just ₹999 (regular ₹1,697):\n\n1. Everlasting Sunflower Bouquet — Bright golden bloom in luxury florist wrap with black ribbon bow.\n2. Twin Tulip Hanging Charm (Soft Pink) — Double tulip bell charm with leafy stems for car mirror or handbag.\n3. Blooming Sunflower Keychain — Cheerful pocket-sized flower with green leaf pendant and sturdy silver ring.\n\nAll three items are individually gift-ready and handcrafted with premium milk cotton yarn. Includes Free Express Shipping across India!',
    details: {
      materials: [
        '100% Premium Milk Cotton yarn',
        'Includes all 3 full products: Sunflower Bouquet, Tulip Charm, Sunflower Keychain',
        'Silver-tone alloy keyrings & flexible internal floral wire',
        'Luxury florist wrapping & satin ribbon bow',
      ],
      dimensions: 'Bouquet: ~12.5" tall | Tulip Charm: ~7" drop | Keychain: 3.2" diameter',
      careInstructions: [
        'Keep away from heavy direct moisture',
        'Gently dust with soft brush or dry cloth',
        'Cherish forever without watering',
      ],
      difficultyOrHours: '8.5 hours of dedicated artisan hand-stitching across all 3 items',
      yarnOrigin: 'Premium eco-dyed combed milk cotton',
    },
    images: [
      {
        url: '/images/sunflower-bouquet.jpg',
        alt: 'Sunshine Trio Gift Bundle: Sunflower Bouquet, Tulip Charm, and Sunflower Keychain for ₹999',
        isPrimary: true,
      },
      {
        url: '/images/pink-tulip-charm.jpg',
        alt: 'Handmade twin tulip hanging charm included in 3-piece bundle',
      },
      {
        url: '/images/sunflower-keychain.jpg',
        alt: 'Blooming sunflower keychain included in 3-piece bundle',
      },
    ],
    colors: [
      { id: 'sunshine-trio', name: 'Sunshine Trio (All 3 Items Included)', colorHex: '#FDB813', inStock: true },
    ],
    stockQuantity: 12,
    isActive: true,
  },
  {
    id: 'prod-01',
    slug: 'everlasting-sunflower-crochet-bouquet',
    name: 'Everlasting Sunflower Crochet Bouquet',
    tagline: 'Hand-crocheted bright sunflower blossom in luxury florist gift wrap with black bow',
    price: 89900, // ₹899 in paise
    originalPrice: 119900, // ₹1,199 in paise
    category: 'bouquets',
    categoryLabel: 'Flowers & Bouquets',
    rating: 5.0,
    reviewCount: 18,
    isFeatured: true,
    isBestseller: true,
    isNew: true,
    leadTimeDays: 3,
    description:
      'A radiant bloom that never withers. Hand-crocheted petal by petal by Reet Bhadani using golden yellow and rich earthy brown yarn, accented with a vibrant green leaf. Lovingly wrapped in luxury florist paper with a crisp black satin ribbon bow—ready to gift for birthdays, anniversaries, graduations, or desktop decor.',
    details: {
      materials: [
        '100% Premium Milk Cotton yarn',
        'Flexible interior floral stem wire',
        'Artisan kraft & frosted florist wrap with black satin ribbon',
      ],
      dimensions: 'Bloom diameter: 4.2" | Total bouquet height: ~12.5"',
      careInstructions: [
        'Keep away from open flame and direct moisture',
        'Gently dust with a soft, dry brush or cool blow dryer setting',
        'Never wilts and requires zero watering',
      ],
      difficultyOrHours: '4 hours of single-needle petal shaping',
      yarnOrigin: 'High-grade combed milk cotton',
    },
    images: [
      {
        url: '/images/sunflower-bouquet.jpg',
        alt: 'Handmade Everlasting Sunflower Crochet Bouquet wrapped with ribbon',
        isPrimary: true,
      },
    ],
    colors: [
      { id: 'sunshine-gold', name: 'Golden Yellow & Espresso Brown', colorHex: '#FDB813', inStock: true },
    ],
    stockQuantity: 5,
    isActive: true,
  },
  {
    id: 'prod-02',
    slug: 'twin-tulip-hanging-charm-pink',
    name: 'Twin Tulip Hanging Charm (Soft Pink)',
    tagline: 'Whimsical handmade twin tulip bells for car rear-view mirror or handbag',
    price: 44900, // ₹449 in paise
    originalPrice: 59900, // ₹599 in paise
    category: 'charms',
    categoryLabel: 'Charms & Hangings',
    rating: 4.9,
    reviewCount: 24,
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    leadTimeDays: 2,
    description:
      'Delicate double tulip bell charm handcrafted by Reet Bhadani. Features two soft blush-pink tulip blossoms suspended from braided stems with twin crochet leaves. Effortlessly loops around your car rear-view mirror, handbag strap, or bedroom wardrobe handle.',
    details: {
      materials: [
        'Soft pastel milk cotton yarn',
        'Hypoallergenic lightweight polyfill interior',
        'Reinforced braided hanging loop',
      ],
      dimensions: 'Tulip bells: 1.8" height each | Total hanging drop: ~7"',
      careInstructions: [
        'Spot clean with a damp cloth and mild soap',
        'Allow to air dry flat in shade',
      ],
      difficultyOrHours: '2.5 hours of precision hand-stitching',
      yarnOrigin: 'Eco-dyed soft cotton blend',
    },
    images: [
      {
        url: '/images/pink-tulip-charm.jpg',
        alt: 'Handmade crochet pink twin tulip hanging charm held in hand',
        isPrimary: true,
      },
    ],
    colors: [
      { id: 'blush-pink', name: 'Blush Pink & Leaf Green', colorHex: '#F4B6C2', inStock: true },
    ],
    stockQuantity: 8,
    isActive: true,
  },
  {
    id: 'prod-03',
    slug: 'twin-cherry-hanging-charm-crimson',
    name: 'Twin Cherry Hanging Charm (Crimson)',
    tagline: 'Rich burgundy twin bell charm with crochet leaves & hanging loop',
    price: 44900, // ₹449 in paise
    originalPrice: 59900, // ₹599 in paise
    category: 'charms',
    categoryLabel: 'Charms & Hangings',
    rating: 4.9,
    reviewCount: 16,
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    leadTimeDays: 2,
    description:
      'Rich and vibrant twin cherry charm crocheted in deep crimson red with moss green textured leaves. Designed to hang gracefully from your car mirror, tote bag, or backpack to bring handmade warmth everywhere you travel.',
    details: {
      materials: [
        '100% Combed cotton yarn',
        'Soft resilient inner batting',
        'Interlocking tension stitch for lasting form',
      ],
      dimensions: 'Cherries: 1.9" each | Full hanging length: ~7.2"',
      careInstructions: [
        'Spot clean with mild damp cloth',
        'Do not machine wash or bleach',
      ],
      difficultyOrHours: '2.5 hours of dedicated handwork',
      yarnOrigin: 'Premium cotton yarn',
    },
    images: [
      {
        url: '/images/crimson-cherry-charm.jpg',
        alt: 'Handmade crochet crimson cherry hanging charm held in hand',
        isPrimary: true,
      },
    ],
    colors: [
      { id: 'crimson-wine', name: 'Deep Crimson Wine & Moss Green', colorHex: '#800020', inStock: true },
    ],
    stockQuantity: 6,
    isActive: true,
  },
  {
    id: 'prod-04',
    slug: 'baby-blue-octopus-amigurumi-keychain',
    name: 'Baby Blue Octopus Amigurumi Keychain',
    tagline: 'Cute palm-sized pastel blue octopus with wavy tentacles & safety eyes',
    price: 39900, // ₹399 in paise
    originalPrice: 49900, // ₹499 in paise
    category: 'keychains',
    categoryLabel: 'Keychains & Mini Plushies',
    rating: 5.0,
    reviewCount: 22,
    isFeatured: true,
    isBestseller: true,
    isNew: true,
    leadTimeDays: 2,
    description:
      'An irresistibly adorable mini amigurumi octopus handcrafted in soothing baby blue yarn. Features 8 curled tentacles, secure glossy safety eyes, and a sturdy silver keyring and chain. Keeps your keys organized or clips onto your favorite backpack or bag.',
    details: {
      materials: [
        '100% Baby-soft acrylic & cotton yarn',
        'Glossy safety-locked round black eyes',
        'Rust-resistant polished silver alloy keyring',
      ],
      dimensions: 'Height: 2.1" | Width: 2.3" (Palm-sized)',
      careInstructions: [
        'Surface wipe with dry or lightly damp cloth',
        'Keep keyring dry to maintain polished shine',
      ],
      difficultyOrHours: '2 hours of micro-amigurumi tension crochet',
      yarnOrigin: 'Soft hypoallergenic cotton blend',
    },
    images: [
      {
        url: '/images/octopus-keychain.jpg',
        alt: 'Handmade crochet baby blue octopus amigurumi keychain held in hand',
        isPrimary: true,
      },
    ],
    colors: [
      { id: 'baby-blue', name: 'Baby Sky Blue', colorHex: '#A2C4D9', inStock: true },
    ],
    stockQuantity: 10,
    isActive: true,
  },
  {
    id: 'prod-05',
    slug: 'blooming-sunflower-crochet-keychain',
    name: 'Blooming Sunflower Crochet Keychain',
    tagline: 'Vibrant pocket-sized crochet sunflower with leaf charm & silver ring',
    price: 34900, // ₹349 in paise
    originalPrice: 44900, // ₹449 in paise
    category: 'keychains',
    categoryLabel: 'Keychains & Mini Plushies',
    rating: 4.8,
    reviewCount: 19,
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    leadTimeDays: 2,
    description:
      'Carry a little ray of sunshine wherever you go! Hand-stitched with vibrant golden yellow petals, a spiraled coffee brown center, and a lively green leaf pendant attached to a sturdy silver keychain ring.',
    details: {
      materials: [
        '100% Combed cotton yarn',
        'Double-sided reinforced center disc',
        'Silver-tone alloy swivel keychain ring',
      ],
      dimensions: 'Flower diameter: 3.2" | Leaf: 1.4"',
      careInstructions: [
        'Spot clean gently with damp cloth',
        'Air dry naturally',
      ],
      difficultyOrHours: '2 hours of hand crochet',
      yarnOrigin: '100% Natural combed cotton',
    },
    images: [
      {
        url: '/images/sunflower-keychain.jpg',
        alt: 'Handmade crochet blooming sunflower keychain held in hand',
        isPrimary: true,
      },
    ],
    colors: [
      { id: 'sun-yellow', name: 'Golden Sunflower & Coffee Brown', colorHex: '#FDB813', inStock: true },
    ],
    stockQuantity: 9,
    isActive: true,
  },
  {
    id: 'prod-06',
    slug: 'handmade-velvet-crimson-rose',
    name: 'Handmade Velvet Crimson Rose',
    tagline: 'Rich multi-petal crochet rose in romantic deep crimson red',
    price: 49900, // ₹499 in paise
    originalPrice: 64900, // ₹649 in paise
    category: 'bouquets',
    categoryLabel: 'Flowers & Bouquets',
    rating: 4.9,
    reviewCount: 14,
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    leadTimeDays: 3,
    description:
      'A romantic, layered crochet blooming rose in deep wine red. Soft to the touch, exquisitely shaped petal by petal by Reet Bhadani, and forever in bloom. Perfect as a desk keepsake, hair accessory, photo prop, or sweet gift.',
    details: {
      materials: [
        'Soft wool & cotton blend yarn',
        'Reinforced spiral bud core',
        'Sculpted curved outer petals',
      ],
      dimensions: 'Bloom diameter: ~3.5" | Depth: ~2"',
      careInstructions: [
        'Gently dust with a soft brush',
        'Store in a clean, dry spot away from heavy pressure',
      ],
      difficultyOrHours: '3 hours of hand-folded petal stitching',
      yarnOrigin: 'Soft texture-spun wool-cotton',
    },
    images: [
      {
        url: '/images/crimson-rose.jpg',
        alt: 'Handmade crochet velvet crimson rose held in hand',
        isPrimary: true,
      },
    ],
    colors: [
      { id: 'crimson-rose', name: 'Velvet Crimson Red', colorHex: '#990000', inStock: true },
    ],
    stockQuantity: 4,
    isActive: true,
  },
  {
    id: 'prod-07',
    slug: 'handmade-spiral-crochet-armlet',
    name: 'Handmade Spiral Crochet Armlet (Bajuband)',
    tagline: 'Tri-color spiral arm cuff hand-crocheted in rose pink, sunflower yellow & crimson',
    price: 39900, // ₹399 in paise
    originalPrice: 54900, // ₹549 in paise
    category: 'wearables',
    categoryLabel: 'Wearables & Hair Accents',
    rating: 5.0,
    reviewCount: 11,
    isFeatured: true,
    isBestseller: true,
    isNew: true,
    leadTimeDays: 2,
    description:
      'Make a vibrant bohemian statement with this hand-crocheted spiral armlet (bajuband) by Reet Bhadani. Crafted in cheerful alternating bands of rose pink, sunny yellow, and crimson red, it wraps comfortably around your upper arm or forearm. Made from soft, skin-friendly milk cotton yarn that holds its coil gently without slipping or pinching. Perfect for festive celebrations, boho casual outfits, college looks, or music festivals.',
    details: {
      materials: [
        '100% Skin-friendly Milk Cotton yarn',
        'Gentle elastic core stitch for natural hold',
        'Triple-color block artisan spiral weave',
      ],
      dimensions: 'Flexible coil: Fits upper arm circumference 8" to 12" comfortably',
      careInstructions: [
        'Hand wash gently in cold water with mild liquid soap',
        'Lay flat on a dry towel in shade',
        'Do not wring or twist',
      ],
      difficultyOrHours: '3 hours of circular tension crochet work',
      yarnOrigin: 'Soft combed milk cotton yarn',
    },
    images: [
      {
        url: '/images/spiral-armlet-worn.jpg',
        alt: 'Handmade spiral crochet armlet bajuband worn on arm',
        isPrimary: true,
      },
      {
        url: '/images/spiral-armlet-hand.jpg',
        alt: 'Handmade spiral crochet armlet held in hand showing tri-color details',
      },
    ],
    colors: [
      { id: 'tri-color-fiesta', name: 'Rose Pink, Sunflower Yellow & Crimson', colorHex: '#E85D75', inStock: true },
    ],
    stockQuantity: 8,
    isActive: true,
  },
  {
    id: 'prod-08',
    slug: 'artisan-braided-crochet-headband',
    name: 'Artisan Braided Crochet Headband',
    tagline: 'Comfort-stretch braided hairband hand-stitched in deep midnight indigo and warm ivory',
    price: 34900, // ₹349 in paise
    originalPrice: 49900, // ₹499 in paise
    category: 'wearables',
    categoryLabel: 'Wearables & Hair Accents',
    rating: 4.9,
    reviewCount: 16,
    isFeatured: true,
    isBestseller: true,
    isNew: true,
    leadTimeDays: 2,
    description:
      'Elevate your everyday hairstyle with this elegant braided crochet headband handcrafted by Reet Bhadani. Featuring an intricate intertwining of deep midnight indigo blue and warm ivory white yarn, this headband offers a comfortable, non-pinching grip that stays securely in place all day long. Soft against your hair with zero tension or headaches. Perfect for casual daywear, beach strolls, study sessions, or gifting.',
    details: {
      materials: [
        'Soft combed cotton & wool blend yarn',
        'Flexible inner comfort-stretch core',
        'Two-tone artisan braided weave',
      ],
      dimensions: 'Length: ~15" flexible arc | Width: ~1.2" braided band',
      careInstructions: [
        'Spot clean with damp cloth or hand wash cold',
        'Lay flat to dry naturally',
        'Do not machine tumble dry',
      ],
      difficultyOrHours: '3.5 hours of precision braid-and-loop handwork',
      yarnOrigin: 'Deep-dyed breathable cotton yarn',
    },
    images: [
      {
        url: '/images/braided-headband-worn.jpg',
        alt: 'Artisan braided crochet headband worn on hair',
        isPrimary: true,
      },
      {
        url: '/images/braided-headband-flat.jpg',
        alt: 'Artisan braided crochet headband laid flat showing indigo and cream weave',
      },
    ],
    colors: [
      { id: 'indigo-cream', name: 'Midnight Indigo & Cream White', colorHex: '#1F2937', inStock: true },
    ],
    stockQuantity: 10,
    isActive: true,
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Ananya P.',
    rating: 5,
    date: 'October 28, 2026',
    title: 'The sunflower bouquet is pure perfection!',
    content:
      'I ordered the everlasting sunflower bouquet for my study desk. The wrapping with the black ribbon makes it feel like an ultra-luxury gift. You can see how much care Reet put into every single petal. It never wilts and brings a smile to my face every morning!',
    verifiedBuyer: true,
    productName: 'Everlasting Sunflower Crochet Bouquet',
  },
  {
    id: 'rev-02',
    author: 'Shreya M.',
    rating: 5,
    date: 'October 22, 2026',
    title: 'Cutest car charm ever!',
    content:
      'Bought the pink twin tulip charm for my car rear-view mirror. Everyone who gets into my car compliments it immediately! The stitch quality is so neat and durable. Beautiful packaging too.',
    verifiedBuyer: true,
    productName: 'Twin Tulip Hanging Charm (Soft Pink)',
  },
  {
    id: 'rev-03',
    author: 'Ishaan R.',
    rating: 5,
    date: 'October 15, 2026',
    title: 'My sister loved the baby blue octopus!',
    content:
      'Gifted the octopus keychain to my sister and she immediately hooked it onto her tote bag. The safety eyes are super secure and the little tentacles are adorable. 10/10 craftsmanship.',
    verifiedBuyer: true,
    productName: 'Baby Blue Octopus Amigurumi Keychain',
  },
  {
    id: 'rev-04',
    author: 'Tanvi K.',
    rating: 5,
    date: 'October 08, 2026',
    title: 'Real handmade warmth from Reet',
    content:
      'Knowing Reet made this with her own hands makes it so special compared to store-bought items. The sunflower keychain is bright, cheerful, and really sturdy. Highly recommend Crafted by Reet!',
    verifiedBuyer: true,
    productName: 'Blooming Sunflower Crochet Keychain',
  },
];

export const BRAND_VALUES = [
  {
    title: '100% Handcrafted by Reet',
    description: 'Every stitch, loop, and leaf is shaped individually by Reet Bhadani using traditional crochet hooks.',
    icon: 'Sparkles',
  },
  {
    title: 'Everlasting & Durable',
    description: 'Unlike real flowers or cheap plastic, these handmade pieces are built to last for years.',
    icon: 'Leaf',
  },
  {
    title: 'Custom Commissions',
    description: 'Need a specific color, custom hanging length, or personalized bouquet? Reet crafts custom orders with love.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Gift-Ready Packaging',
    description: 'Every order arrives lovingly wrapped in aesthetic paper and ribbon, ready to delight upon arrival.',
    icon: 'Package',
  },
];
