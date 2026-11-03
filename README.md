# Crafted by Reet — Handmade Crochet Studio by Reet Bhadani

A warm, modern, and trustworthy frontend for a handmade crochet boutique built with **Next.js (App Router)** and **TypeScript**.

Featuring a slow-craft aesthetic with soft cream (`#FCFAF7`), sage green (`#4F7562`), and muted terracotta (`#C06449`), high-resolution product photography, full responsive design, live search, cart drawer, and interactive mock checkout.

---

## 📁 Project Structure

```
crochet/
├── public/
│   └── images/
│       ├── hero.jpg                 # Sunlit studio hero banner with waffle blanket
│       ├── cardigan.jpg             # Meadow Stripe Cardigan product photo
│       ├── tote-bag.jpg             # Botanical Daisy Market Tote product photo
│       ├── fox-plushie.jpg          # Woodland Amigurumi Fox Keepsake
│       ├── bucket-hat.jpg           # Coastal Ribbed Bucket Hat photo
│       └── artisan-hands.jpg        # Close-up of artisan crocheting with wooden needle
├── src/
│   ├── app/
│   │   ├── globals.css              # Warm earthy design tokens, typography & animations
│   │   ├── layout.tsx               # Root layout, SEO metadata, global Cart & Toast providers
│   │   ├── page.tsx                 # Home page (Hero, Categories, Featured, Story, Reviews)
│   │   ├── shop/
│   │   │   └── page.tsx             # Shop page (Grid, multi-criteria filtering, price range, sort)
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Product detail (Gallery, color/size options, accordions, related)
│   │   ├── cart/
│   │   │   └── page.tsx             # Full cart page with free shipping progress, notes, checkout trigger
│   │   ├── about/
│   │   │   └── page.tsx             # Brand story, maker values, zero-waste and fiber standards
│   │   ├── contact/
│   │   │   └── page.tsx             # Interactive contact form, studio address & hours
│   │   └── shipping-returns/
│   │       └── page.tsx             # Handmaking lead times table, returns policy & FAQ accordion
│   ├── components/
│   │   ├── Header.tsx               # Announcement bar, logo, responsive navigation, search & cart
│   │   ├── Footer.tsx               # Brand ethos, trust badges, newsletter signup, care links
│   │   ├── ProductCard.tsx          # Card with image hover zoom, swatches, badges & quick-add
│   │   ├── CartDrawer.tsx           # Slide-over cart drawer with quantity counter & free shipping bar
│   │   ├── CheckoutModal.tsx        # Prototype checkout modal with mock order confirmation
│   │   ├── SearchModal.tsx          # Real-time search modal with category suggestions
│   │   ├── Accordion.tsx            # Expandable accordion for care instructions & FAQs
│   │   └── Icons.tsx                # Zero-dependency SVG icons (ShoppingBag, Star, Leaf, etc.)
│   ├── context/
│   │   ├── CartContext.tsx          # Persistent React state for items, quantities, subtotal & drawer
│   │   └── ToastContext.tsx         # Toast notification system for user actions
│   ├── data/
│   │   └── products.ts              # 🌟 Central mock data file (products, categories, reviews, values)
│   └── types/
│       └── index.ts                 # TypeScript types (Product, CartItem, Review, CategoryMeta)
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript compiler options
└── package.json                     # Project scripts and dependencies
```

---

## 🌟 Where the Mock Product Data is Stored

The mock data is isolated inside:
**[`src/data/products.ts`](file:///Users/shubhamsharma/Desktop/crochet/src/data/products.ts)**

This file exports:
1. `PRODUCTS`: Complete catalog of 8 handmade crochet products with:
   - `id`, `slug`, `name`, `tagline`, `price`, `originalPrice`
   - `category` (`wearables`, `bags`, `amigurumi`, `accessories`, `home-decor`)
   - `details` (materials, dimensions, care instructions, yarn origin, craft hours)
   - `images` (array of primary and secondary photos)
   - `colors` (color name and hex code swatches)
   - `sizes` (for wearables and hats)
   - `leadTimeDays` (estimated handmaking time)
2. `CATEGORIES`: Category metadata with image representations and item counts.
3. `REVIEWS`: Real customer reviews with star ratings and verified buyer tags.
4. `BRAND_VALUES`: Studio craft promises.

### Supabase integration

The schema migration is in `supabase/migrations/20261103000000_init_schema.sql`, and the starter catalog is in `supabase/seed.sql`. Apply the migration and seed to your Supabase project before using live product and order data. Keep mock catalog data for local preview only.

## 🔐 Admin Access with Email OTP

The admin area is available at `/admin/orders`. It requires a Supabase-authenticated user whose ID is present in `public.admin_users`. Storefront visitors do not see an Admin navigation link, and admin order APIs reject unauthenticated or non-admin requests, including in development.

### Configure the first admin

1. Add your Supabase project URL and anon/publishable key to `.env.local` using the names in `.env.example`, then restart the dev server.
2. In Supabase Dashboard, create the administrator account under **Authentication → Users** using the email address you will sign in with. Public self-signup is disabled by the sign-in flow.
3. In the SQL Editor, grant that existing account admin access. Replace the example email with the exact account email:

   ```sql
   insert into public.admin_users (user_id, email, role)
   select id, email, 'super_admin'
   from auth.users
   where lower(email) = lower('admin@example.com')
   on conflict (user_id) do update
   set email = excluded.email, role = 'super_admin';
   ```

4. In **Authentication → Email → Templates**, edit the Magic Link template to include the one-time code variable `{{ .Token }}`. The admin login screen asks for that code.
5. Add your local and deployed app URLs to Supabase **Authentication → URL Configuration**.
6. Open `/admin/login`, enter the admin email, and verify the emailed code. Signing out clears the session; a new OTP is required for the next sign-in.

### Email delivery

Supabase's built-in email sender is for development: it only sends to project team member addresses and is limited to 2 emails per hour. For real admin addresses, configure custom SMTP in Supabase Auth. Resend is one SMTP-compatible option with a free tier advertised at 3,000 emails/month and a 100/day cap; verify a sending domain and check its current terms before using it. Do not use SMS OTP for this single-admin login unless you specifically need phone-based sign-in, since SMS providers usually charge per message.

### Access controls

- Admin page access is checked on the server and the admin API checks the role again for every request.
- `public.admin_users` is the allowlist; adding a Supabase Auth user alone does not grant admin privileges.
- Signing out does not need an OTP. It revokes the active app session and sends the user back to `/admin/login`.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the store.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🎨 Color Palette & Aesthetic

- **Cream 50 / Background**: `#FCFAF7` (warm, soft, unbleached paper tone)
- **Cream 100 / Subtle Surface**: `#F7F3EC`
- **Sage Green 500 / Primary Accent**: `#4F7562` (eucalyptus, moss, botanical)
- **Sage Green 600 / Hover**: `#3E5E4E`
- **Terracotta 500 / Secondary Accent**: `#C06449` (sunbaked clay, autumn leaves)
- **Terracotta 600**: `#A35038`
- **Espresso Dark / Text**: `#231E1B`
