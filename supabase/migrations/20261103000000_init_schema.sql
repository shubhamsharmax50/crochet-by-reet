-- ==============================================================================
-- Hazel & Loop Atelier: Supabase Schema Migration
-- Currency: INR (Prices stored as integer paise: ₹100 = 10000 paise)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Helper function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ------------------------------------------------------------------------------
-- 1. Admin Users Table (For Role-Based Access Control)
-- ------------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Function to check if current authenticated user is an admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  );
$$;

-- Admin users policy
create policy "Admins can view admin_users list"
  on public.admin_users
  for select
  using (auth.uid() = user_id or public.is_admin());

-- ------------------------------------------------------------------------------
-- 2. Products Table
-- ------------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text not null,
  price bigint not null check (price >= 0),                 -- Price in paise (e.g. ₹1,499 = 149900 paise)
  original_price bigint check (original_price is null or original_price >= 0), -- Original price in paise
  category text not null check (category in ('wearables', 'home-decor', 'bags', 'amigurumi', 'accessories')),
  category_label text not null,
  rating numeric(3, 2) not null default 5.0,
  review_count integer not null default 0,
  is_featured boolean not null default false,
  is_bestseller boolean not null default false,
  is_new boolean not null default false,
  lead_time_days integer not null default 3,
  details jsonb not null default '{}'::jsonb,               -- Materials, dimensions, care, origin
  images jsonb not null default '[]'::jsonb,                -- Array of { url, alt, isPrimary }
  colors jsonb not null default '[]'::jsonb,                -- Array of { id, name, colorHex, inStock }
  sizes jsonb default null,                                 -- Array of strings e.g. ["S", "M", "L"]
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_is_active on public.products(is_active);

create trigger tr_products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

alter table public.products enable row level security;

-- Policies for Products:
-- 1) Anyone can read active products
create policy "Public can read active products"
  on public.products
  for select
  using (is_active = true or public.is_admin());

-- 2) Admins have full access to manage products
create policy "Admins can insert products"
  on public.products
  for insert
  with check (public.is_admin());

create policy "Admins can update products"
  on public.products
  for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete products"
  on public.products
  for delete
  using (public.is_admin());

-- ------------------------------------------------------------------------------
-- 3. Orders Table
-- ------------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,                        -- Human readable e.g. "HZL-202611-8931"
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address jsonb not null,                          -- { name, address, city, state, postal_code, country }
  currency text not null default 'INR',
  subtotal bigint not null check (subtotal >= 0),           -- in paise
  shipping_fee bigint not null default 0 check (shipping_fee >= 0), -- in paise
  discount_amount bigint not null default 0 check (discount_amount >= 0), -- in paise
  tax_amount bigint not null default 0 check (tax_amount >= 0), -- in paise
  total_amount bigint not null check (total_amount >= 0),   -- in paise
  status text not null default 'pending' check (status in ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'payment_failed')),
  gift_note text,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_order_number on public.orders(order_number);
create index if not exists idx_orders_customer_email on public.orders(customer_email);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);

create trigger tr_orders_updated_at
  before update on public.orders
  for each row execute function public.handle_updated_at();

alter table public.orders enable row level security;

-- Policies for Orders:
-- 1) Authenticated customer can read own orders
create policy "Users can view their own orders"
  on public.orders
  for select
  using (auth.uid() = user_id or public.is_admin());

-- 2) Admins have full access to view, update, delete orders
create policy "Admins can manage all orders"
  on public.orders
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 4. Order Items Table (Immutable Snapshot of Products & Prices)
-- ------------------------------------------------------------------------------
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_slug text not null,
  product_name text not null,                               -- Snapshot at time of order
  unit_price bigint not null check (unit_price >= 0),       -- Snapshot in paise
  selected_color text,
  selected_size text,
  quantity integer not null check (quantity > 0),
  line_total bigint not null check (line_total >= 0),       -- Snapshot in paise
  lead_time_days integer default 3,
  image_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_order_items_order_id on public.order_items(order_id);

alter table public.order_items enable row level security;

-- Policies for Order Items:
-- 1) Users can view items belonging to their own orders
create policy "Users can view their order items"
  on public.order_items
  for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and (orders.user_id = auth.uid() or public.is_admin())
    )
  );

-- 2) Admins can manage all order items
create policy "Admins can manage all order items"
  on public.order_items
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 5. Payments Table (Razorpay Transaction Ledger)
-- ------------------------------------------------------------------------------
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'razorpay',
  provider_order_id text not null,                          -- Razorpay order ID e.g. "order_P123456789"
  provider_payment_id text,                                 -- Razorpay payment ID e.g. "pay_P123456789"
  provider_signature text,                                  -- Razorpay verified signature
  status text not null default 'created' check (status in ('created', 'authorized', 'captured', 'refunded', 'failed')),
  amount bigint not null check (amount >= 0),               -- in paise
  currency text not null default 'INR',
  error_code text,
  error_description text,
  verified_at timestamptz,
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_payments_order_id on public.payments(order_id);
create index if not exists idx_payments_provider_order_id on public.payments(provider_order_id);
create index if not exists idx_payments_provider_payment_id on public.payments(provider_payment_id);

create trigger tr_payments_updated_at
  before update on public.payments
  for each row execute function public.handle_updated_at();

alter table public.payments enable row level security;

-- Policies for Payments:
-- 1) Users can view payments for their own orders
create policy "Users can view payments for their own orders"
  on public.payments
  for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
        and (orders.user_id = auth.uid() or public.is_admin())
    )
  );

-- 2) Admins can manage all payments
create policy "Admins can manage all payments"
  on public.payments
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 6. Webhook Events Table (Strict Idempotency)
-- ------------------------------------------------------------------------------
create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  event_id text unique not null,                            -- Razorpay event ID from webhook payload or header
  event_type text not null,                                 -- e.g. "payment.captured", "order.paid"
  payload jsonb not null,
  status text not null default 'processed' check (status in ('processed', 'ignored', 'failed')),
  processed_at timestamptz not null default now()
);

create index if not exists idx_webhook_events_event_id on public.webhook_events(event_id);

alter table public.webhook_events enable row level security;

-- Policies for Webhook Events:
-- Only admins/service role can access webhook events
create policy "Only admins can view webhook events"
  on public.webhook_events
  for select
  using (public.is_admin());

-- ------------------------------------------------------------------------------
-- 7. High-Performance Admin Stats RPC (Avoids Loading All Records)
-- ------------------------------------------------------------------------------
create or replace function public.get_admin_order_stats()
returns json
language plpgsql
security definer
as $$
declare
  result json;
begin
  -- Ensure caller is admin
  if not (public.is_admin()) then
    raise exception 'Unauthorized: Admin access required.';
  end if;

  select json_build_object(
    'total_orders', count(*),
    'paid_orders', count(*) filter (where status = 'paid'),
    'pending_orders', count(*) filter (where status = 'pending'),
    'refunded_orders', count(*) filter (where status = 'refunded'),
    'cancelled_orders', count(*) filter (where status = 'cancelled'),
    'failed_orders', count(*) filter (where status = 'payment_failed'),
    'total_revenue_paise', coalesce(sum(total_amount) filter (where status = 'paid'), 0)
  ) into result
  from public.orders;

  return result;
end;
$$;
