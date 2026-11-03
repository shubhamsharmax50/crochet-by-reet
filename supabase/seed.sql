-- ==============================================================================
-- Hazel & Loop Atelier: Supabase Seed Data (INR in integer paise)
-- ==============================================================================

-- 1. Insert Products
insert into public.products (
  slug,
  name,
  tagline,
  description,
  price,
  original_price,
  category,
  category_label,
  rating,
  review_count,
  is_featured,
  is_bestseller,
  is_new,
  lead_time_days,
  stock_quantity,
  is_active,
  details,
  images,
  colors,
  sizes
) values
(
  'meadow-stripe-oversized-cardigan',
  'Meadow Stripe Oversized Cardigan',
  'Hand-crocheted chunky silhouette in sage, cream & terracotta wool',
  'Individually stitched over 24 hours using premium soft wool and organic cotton. This oversized cardigan combines heirloom granny-square motifs with modern drop-shoulder tailoring. Designed to be your coziest companion on cool mornings and breezy evenings.',
  449900,
  529900,
  'wearables',
  'Wearables',
  4.9,
  38,
  true,
  true,
  false,
  7,
  6,
  true,
  '{
    "materials": ["70% Sustainably sourced Highland Wool", "30% Organic combed cotton for softness", "Natural olive wood buttons"],
    "dimensions": "Bust 48\" | Length 26\" | Sleeve 22\" (Oversized relaxed fit)",
    "careInstructions": ["Hand wash gently in lukewarm water with mild wool detergent", "Do not wring or twist", "Lay flat on a clean dry towel to dry", "Store folded, never hung, to retain shape"],
    "difficultyOrHours": "24 hours of artisan hand-crochet work",
    "yarnOrigin": "Fair-Trade certified Indian & Peruvian spinning mills"
  }'::jsonb,
  '[
    {"url": "/images/cardigan.jpg", "alt": "Meadow Stripe Oversized Cardigan on wooden hanger", "isPrimary": true},
    {"url": "/images/artisan-hands.jpg", "alt": "Artisan stitching the intricate sleeve hem"},
    {"url": "/images/hero.jpg", "alt": "Crochet workshop yarn selection"}
  ]'::jsonb,
  '[
    {"id": "sage-cream", "name": "Sage & Cream Terracotta", "colorHex": "#4A6B5D", "inStock": true},
    {"id": "oatmeal-clay", "name": "Oatmeal & Soft Clay", "colorHex": "#C86D51", "inStock": true},
    {"id": "forest-moss", "name": "Deep Forest & Natural Linen", "colorHex": "#2D4438", "inStock": true}
  ]'::jsonb,
  '["XS/S (Petite)", "M/L (Classic Relaxed)", "XL/2XL (Cozy Oversized)"]'::jsonb
),
(
  'botanical-daisy-market-tote',
  'Botanical Daisy Market Tote',
  'Sturdy double-walled cotton bag featuring 3D floral squares',
  'A joyful everyday tote hand-assembled from 13 individual daisy granny squares. Features reinforced double-crochet shoulder straps that won’t stretch over time, and an organic cotton interior lining with a slip pocket for your phone and keys.',
  189900,
  null,
  'bags',
  'Bags & Totes',
  4.8,
  52,
  true,
  true,
  false,
  4,
  12,
  true,
  '{
    "materials": ["100% Mercerized organic cotton yarn", "Unbleached organic cotton canvas interior pocket", "Reinforced stress-point stitching"],
    "dimensions": "14\" wide × 15\" tall | 11\" handle drop length",
    "careInstructions": ["Spot clean with cool soapy water", "Machine wash cold on delicate cycle in a mesh laundry bag", "Reshape and air dry flat"],
    "difficultyOrHours": "11 hours of careful stitching and assembly",
    "yarnOrigin": "Oeko-Tex Standard 100 certified Indian organic cotton"
  }'::jsonb,
  '[
    {"url": "/images/tote-bag.jpg", "alt": "Botanical Daisy Market Tote with dried lavender", "isPrimary": true},
    {"url": "/images/hero.jpg", "alt": "Flat lay of tote bag beside crafting tools"}
  ]'::jsonb,
  '[
    {"id": "spring-meadow", "name": "Sage Green & Terracotta Border", "colorHex": "#4A6B5D", "inStock": true},
    {"id": "warm-sand", "name": "Sand Dune & Terracotta Daisy", "colorHex": "#C86D51", "inStock": true},
    {"id": "linen-cream", "name": "Monochrome Linen Cream", "colorHex": "#EDE6DB", "inStock": true}
  ]'::jsonb,
  null
),
(
  'hazelwood-amigurumi-woodland-fox',
  'Hazelwood Woodland Fox Plushie',
  'Hand-stitched heirloom keepsake with dapper sage bow tie',
  'Meet Hazel, a charming woodland fox crocheted with hypoallergenic brushed cotton yarn. Finished with safety-locked embroidered eyes and a detachable sage-green bow tie. Perfect as a nursery heirloom gift or cozy desk companion.',
  129900,
  null,
  'amigurumi',
  'Amigurumi & Toys',
  5.0,
  44,
  true,
  false,
  true,
  3,
  8,
  true,
  '{
    "materials": ["100% Organic brushed cotton yarn (baby-safe, zero fuzz)", "Recycled hypoallergenic polyfill stuffing", "Secure safety-lock embroidered facial features"],
    "dimensions": "9.5\" tall seated | 4.5\" wide at chest",
    "careInstructions": ["Surface wash with a damp cloth and mild baby soap", "If necessary, hand wash in cool water and squeeze gently in a towel", "Allow to air dry naturally in a well-ventilated spot"],
    "difficultyOrHours": "8 hours of micro-amigurumi tension crochet",
    "yarnOrigin": "Eco-certified organic combed cotton"
  }'::jsonb,
  '[
    {"url": "/images/fox-plushie.jpg", "alt": "Hazelwood Woodland Fox Plushie sitting with succulent", "isPrimary": true},
    {"url": "/images/artisan-hands.jpg", "alt": "Crafting the little ears and bow tie"}
  ]'::jsonb,
  '[
    {"id": "terracotta-fox", "name": "Cinnamon Terracotta & Cream", "colorHex": "#C86D51", "inStock": true},
    {"id": "golden-fawn", "name": "Warm Honey Mustard", "colorHex": "#DDA15E", "inStock": true}
  ]'::jsonb,
  null
),
(
  'coastal-ribbed-bucket-hat',
  'Coastal Ribbed Bucket Hat',
  'Architectural ribbed crown with flexible packable brim',
  'Crocheted with a resilient ribbed post-stitch technique that gives it incredible texture and gentle elasticity. Folds effortlessly into your bag without losing shape, keeping you effortlessly stylish whether on a coastal hike or city wander.',
  99900,
  124900,
  'accessories',
  'Hats & Accessories',
  4.7,
  29,
  true,
  false,
  true,
  3,
  15,
  true,
  '{
    "materials": ["65% Recycled Cotton yarn", "35% Fine Linen blend"],
    "dimensions": "Crown circumference 22.5\" (fits heads 21.5\" to 23.5\")",
    "careInstructions": ["Hand wash cold", "Shape over a small bowl or hat stand while damp", "Dry in shade"],
    "difficultyOrHours": "6 hours of textured ribbing",
    "yarnOrigin": "Sustainable Indian linen-cotton spinning"
  }'::jsonb,
  '[
    {"url": "/images/bucket-hat.jpg", "alt": "Coastal Ribbed Bucket Hat on wooden mannequin stand", "isPrimary": true}
  ]'::jsonb,
  '[
    {"id": "sage-stripe", "name": "Sage Green & Cream Stripe", "colorHex": "#4A6B5D", "inStock": true},
    {"id": "terracotta-stripe", "name": "Earthy Terracotta Stripe", "colorHex": "#C86D51", "inStock": true},
    {"id": "natural-oat", "name": "Natural Oatmeal Monotone", "colorHex": "#D7CEBE", "inStock": true}
  ]'::jsonb,
  '["S/M (Standard 22\")", "M/L (Relaxed 23.5\")"]'::jsonb
),
(
  'heirloom-terracotta-sage-throw-blanket',
  'Heirloom Waffle Stripe Throw Blanket',
  'Sumptuous tactile waffle-stitch blanket with generous fringe',
  'Our crowning studio piece. Handcrafted with dense waffle stitch rows that trap warmth while remaining wonderfully breathable. Finished with hand-tied tassels in alternating cream, moss sage, and sunset terracotta tones.',
  549900,
  null,
  'home-decor',
  'Home & Living',
  5.0,
  61,
  true,
  true,
  false,
  10,
  4,
  true,
  '{
    "materials": ["80% Extra-fine Merino Wool", "20% Mulberry Silk blend for lustrous drape"],
    "dimensions": "52\" wide × 64\" long (plus 4\" hand-knotted fringe)",
    "careInstructions": ["Dry clean recommended or gentle hand wash cold with wool wash", "Never tumble dry or bleach", "Store folded in breathable cotton bag during summer"],
    "difficultyOrHours": "36 hours of continuous artisan hook work",
    "yarnOrigin": "Certified non-mulesed ethically gathered wool"
  }'::jsonb,
  '[
    {"url": "/images/hero.jpg", "alt": "Heirloom throw blanket folded on wooden workshop table with tea mug", "isPrimary": true},
    {"url": "/images/artisan-hands.jpg", "alt": "Close-up of artisan crocheting waffle ridges"}
  ]'::jsonb,
  '[
    {"id": "trio-palette", "name": "Sage, Terracotta & Cream Trio", "colorHex": "#4A6B5D", "inStock": true},
    {"id": "soft-eucalyptus", "name": "Eucalyptus & Cloud Cream", "colorHex": "#7A9A8B", "inStock": true}
  ]'::jsonb,
  null
),
(
  'botanical-leaf-mug-coaster-set',
  'Botanical Leaf Mug Coaster Set (4-Pack)',
  'Absorbent organic cotton leaf-shaped mug mats with stem loops',
  'Protect your tables with an organic touch. Stitched with dense cotton cord to absorb mug condensation instantly. Tied together with recycled hemp cord and a wooden craft bead, ready for gifting.',
  69900,
  84900,
  'home-decor',
  'Home & Living',
  4.8,
  42,
  false,
  false,
  true,
  2,
  20,
  true,
  '{
    "materials": ["100% Chunky Organic Cotton", "Natural jute cord ties"],
    "dimensions": "5\" across × 6.5\" tip to stem (Set of 4)",
    "careInstructions": ["Machine wash warm in mesh bag", "Tumble dry low or press with warm iron"],
    "difficultyOrHours": "3 hours per 4-pack set",
    "yarnOrigin": "Certified organic South Indian cotton"
  }'::jsonb,
  '[
    {"url": "/images/hero.jpg", "alt": "Botanical leaf coaster set on wooden table", "isPrimary": true}
  ]'::jsonb,
  '[
    {"id": "forest-sage", "name": "Forest Sage", "colorHex": "#4A6B5D", "inStock": true},
    {"id": "warm-clay", "name": "Sunbaked Terracotta", "colorHex": "#C86D51", "inStock": true},
    {"id": "mixed-palette", "name": "Mixed Botanical (2 Sage + 2 Clay)", "colorHex": "#DDA15E", "inStock": true}
  ]'::jsonb,
  null
),
(
  'cottagecore-granny-square-vest',
  'Cottagecore Granny Square Vest',
  'Vintage inspired cropped crochet slipover vest with scalloped hem',
  'Layer with a crisp linen shirt or simple tee. Hand-joined floral tiles framed by subtle sage ribbing. Cropped slightly at the natural waist for flattering silhouette and effortless styling.',
  269900,
  null,
  'wearables',
  'Wearables',
  4.9,
  23,
  false,
  false,
  true,
  6,
  7,
  true,
  '{
    "materials": ["60% Combed Cotton", "40% Bamboo viscose"],
    "dimensions": "Length 18\" | Bust 38\" (Size S/M)",
    "careInstructions": ["Hand wash gentle cold", "Dry flat", "Cool iron over damp cloth"],
    "difficultyOrHours": "14 hours of motif joining",
    "yarnOrigin": "Hand-spun natural fibers"
  }'::jsonb,
  '[
    {"url": "/images/cardigan.jpg", "alt": "Granny square vest design preview", "isPrimary": true}
  ]'::jsonb,
  '[
    {"id": "sage-terracotta", "name": "Sage & Terracotta Blossom", "colorHex": "#4A6B5D", "inStock": true},
    {"id": "cream-dusty-rose", "name": "Ivory & Dusty Terracotta", "colorHex": "#E29578", "inStock": true}
  ]'::jsonb,
  '["XS/S", "M/L", "XL"]'::jsonb
),
(
  'macrame-crochet-slouch-crossbody',
  'Woven Slouch Crossbody Bag',
  'Supple crescent sling pouch with braided adjustable strap',
  'The perfect hands-free carryall. Crafted from tight half-double crochet stitches that resist sagging, topped with a genuine antique-brass zip closure and an interior key clip.',
  169900,
  null,
  'bags',
  'Bags & Totes',
  4.6,
  19,
  false,
  false,
  false,
  4,
  11,
  true,
  '{
    "materials": ["Recycled braided cotton cord", "Solid brass hardware & zipper", "Organic cotton pocket"],
    "dimensions": "11\" wide × 7.5\" high × 3.5\" base depth | 44\" adjustable strap",
    "careInstructions": ["Spot clean with mild damp cloth", "Do not submerge brass hardware in water"],
    "difficultyOrHours": "9 hours",
    "yarnOrigin": "Recycled cotton textile fibers"
  }'::jsonb,
  '[
    {"url": "/images/tote-bag.jpg", "alt": "Woven Slouch Crossbody Bag", "isPrimary": true}
  ]'::jsonb,
  '[
    {"id": "earth-clay", "name": "Terracotta Earth", "colorHex": "#C86D51", "inStock": true},
    {"id": "soft-sage", "name": "Soft Sage Green", "colorHex": "#4A6B5D", "inStock": true},
    {"id": "natural-flax", "name": "Natural Flax", "colorHex": "#E3DDD3", "inStock": true}
  ]'::jsonb,
  null
)
on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  description = excluded.description,
  price = excluded.price,
  original_price = excluded.original_price,
  category = excluded.category,
  category_label = excluded.category_label,
  details = excluded.details,
  images = excluded.images,
  colors = excluded.colors,
  sizes = excluded.sizes,
  stock_quantity = excluded.stock_quantity,
  is_active = excluded.is_active;

-- 2. Insert Sample Orders & Payments for Testing Admin Orders Page
do $$
declare
  v_order_id_1 uuid := '11111111-1111-1111-1111-111111111111'::uuid;
  v_order_id_2 uuid := '22222222-2222-2222-2222-222222222222'::uuid;
  v_order_id_3 uuid := '33333333-3333-3333-3333-333333333333'::uuid;
  v_prod_cardigan_id uuid;
  v_prod_tote_id uuid;
  v_prod_fox_id uuid;
begin
  select id into v_prod_cardigan_id from public.products where slug = 'meadow-stripe-oversized-cardigan';
  select id into v_prod_tote_id from public.products where slug = 'botanical-daisy-market-tote';
  select id into v_prod_fox_id from public.products where slug = 'hazelwood-amigurumi-woodland-fox';

  -- Order 1: Paid order
  insert into public.orders (
    id,
    order_number,
    customer_name,
    customer_email,
    customer_phone,
    shipping_address,
    currency,
    subtotal,
    shipping_fee,
    discount_amount,
    tax_amount,
    total_amount,
    status,
    gift_note,
    created_at
  ) values (
    v_order_id_1,
    'HZL-202611-1001',
    'Aarav Sharma',
    'aarav.sharma@example.com',
    '+91 98765 43210',
    '{"name": "Aarav Sharma", "address": "B-402, Green Glen Layout, Bellandur", "city": "Bengaluru", "state": "Karnataka", "postal_code": "560103", "country": "IN"}'::jsonb,
    'INR',
    449900,
    0,
    0,
    0,
    449900,
    'paid',
    'Please wrap with extra lavender sprigs if available!',
    now() - interval '2 days'
  ) on conflict (order_number) do nothing;

  -- Items for Order 1
  insert into public.order_items (
    order_id,
    product_id,
    product_slug,
    product_name,
    unit_price,
    selected_color,
    selected_size,
    quantity,
    line_total,
    lead_time_days,
    image_url
  ) values (
    v_order_id_1,
    v_prod_cardigan_id,
    'meadow-stripe-oversized-cardigan',
    'Meadow Stripe Oversized Cardigan',
    449900,
    'Sage & Cream Terracotta',
    'M/L (Classic Relaxed)',
    1,
    449900,
    7,
    '/images/cardigan.jpg'
  ) on conflict do nothing;

  -- Payment for Order 1
  insert into public.payments (
    order_id,
    provider,
    provider_order_id,
    provider_payment_id,
    provider_signature,
    status,
    amount,
    currency,
    verified_at,
    created_at
  ) values (
    v_order_id_1,
    'razorpay',
    'order_test_1001_seed',
    'pay_test_1001_seed',
    'verified_sig_seed_1001',
    'captured',
    449900,
    'INR',
    now() - interval '2 days',
    now() - interval '2 days'
  ) on conflict do nothing;

  -- Order 2: Another Paid order
  insert into public.orders (
    id,
    order_number,
    customer_name,
    customer_email,
    customer_phone,
    shipping_address,
    currency,
    subtotal,
    shipping_fee,
    discount_amount,
    tax_amount,
    total_amount,
    status,
    gift_note,
    created_at
  ) values (
    v_order_id_2,
    'HZL-202611-1002',
    'Pooja Verma',
    'pooja.verma@example.com',
    '+91 91234 56789',
    '{"name": "Pooja Verma", "address": "12A, Sterling Heights, Bandra West", "city": "Mumbai", "state": "Maharashtra", "postal_code": "400050", "country": "IN"}'::jsonb,
    'INR',
    319800,
    0,
    0,
    0,
    319800,
    'paid',
    'Gift for my sister’s baby shower!',
    now() - interval '1 day'
  ) on conflict (order_number) do nothing;

  insert into public.order_items (
    order_id,
    product_id,
    product_slug,
    product_name,
    unit_price,
    selected_color,
    selected_size,
    quantity,
    line_total,
    lead_time_days,
    image_url
  ) values
  (
    v_order_id_2,
    v_prod_tote_id,
    'botanical-daisy-market-tote',
    'Botanical Daisy Market Tote',
    189900,
    'Sage Green & Terracotta Border',
    null,
    1,
    189900,
    4,
    '/images/tote-bag.jpg'
  ),
  (
    v_order_id_2,
    v_prod_fox_id,
    'hazelwood-amigurumi-woodland-fox',
    'Hazelwood Woodland Fox Plushie',
    129900,
    'Cinnamon Terracotta & Cream',
    null,
    1,
    129900,
    3,
    '/images/fox-plushie.jpg'
  ) on conflict do nothing;

  insert into public.payments (
    order_id,
    provider,
    provider_order_id,
    provider_payment_id,
    provider_signature,
    status,
    amount,
    currency,
    verified_at,
    created_at
  ) values (
    v_order_id_2,
    'razorpay',
    'order_test_1002_seed',
    'pay_test_1002_seed',
    'verified_sig_seed_1002',
    'captured',
    319800,
    'INR',
    now() - interval '1 day',
    now() - interval '1 day'
  ) on conflict do nothing;

  -- Order 3: Pending Order
  insert into public.orders (
    id,
    order_number,
    customer_name,
    customer_email,
    customer_phone,
    shipping_address,
    currency,
    subtotal,
    shipping_fee,
    discount_amount,
    tax_amount,
    total_amount,
    status,
    created_at
  ) values (
    v_order_id_3,
    'HZL-202611-1003',
    'Meera Nambiar',
    'meera.nambiar@example.com',
    '+91 99887 76655',
    '{"name": "Meera Nambiar", "address": "78, Palm Meadows, Whitefield", "city": "Bengaluru", "state": "Karnataka", "postal_code": "560066", "country": "IN"}'::jsonb,
    'INR',
    99900,
    14900,
    0,
    0,
    114800,
    'pending',
    now() - interval '3 hours'
  ) on conflict (order_number) do nothing;

  insert into public.payments (
    order_id,
    provider,
    provider_order_id,
    status,
    amount,
    currency,
    created_at
  ) values (
    v_order_id_3,
    'razorpay',
    'order_test_1003_seed',
    'created',
    114800,
    'INR',
    now() - interval '3 hours'
  ) on conflict do nothing;

end $$;
