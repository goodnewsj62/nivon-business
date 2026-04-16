-- Run in Supabase SQL editor or via CLI (schema: public).
-- Table name is **product** (singular), matching PostgREST `public.product`.
--
-- The app expects: `slug` (text, unique, used in `/products/[slug]`), and `id`
-- with a database default (e.g. `uuid` + `gen_random_uuid()`). Adjust the
-- `create table` below to match your project if you use UUID PKs.
--
-- If you still have a `public.products` table from an older setup:
--   alter table public.products rename to product;
--   (Drop old policies on `products` first if Postgres requires it.)

-- If you still have column `in_stock` instead of `status`:
-- alter table public.product rename column in_stock to status;

-- ---------------------------------------------------------------------------
-- New project: create `public.product`
-- ---------------------------------------------------------------------------
create table if not exists public.product (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  short_description text,
  description text,
  category text,
  image text,
  status boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Existing table (Dashboard): align nullability + unique name — uncomment as needed
-- ---------------------------------------------------------------------------
-- alter table public.product alter column short_description drop not null;
-- alter table public.product alter column description drop not null;
-- alter table public.product alter column category drop not null;
-- alter table public.product alter column image drop not null;
-- alter table public.product add constraint product_name_unique unique (name);
-- create unique index if not exists product_name_unique on public.product (name);

alter table public.product enable row level security;

-- Remove legacy policy names if you ran an older `products` migration on this table
drop policy if exists "products_select_public" on public.product;
drop policy if exists "products_insert_authenticated" on public.product;
drop policy if exists "products_update_authenticated" on public.product;
drop policy if exists "products_delete_authenticated" on public.product;

-- Policies (singular table + names)
drop policy if exists "product_select_public" on public.product;
create policy "product_select_public"
  on public.product for select
  using (true);

drop policy if exists "product_insert_authenticated" on public.product;
create policy "product_insert_authenticated"
  on public.product for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "product_update_authenticated" on public.product;
create policy "product_update_authenticated"
  on public.product for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "product_delete_authenticated" on public.product;
create policy "product_delete_authenticated"
  on public.product for delete
  using (auth.role() = 'authenticated');

-- Storage policies: see `002_storage_product_images_rls.sql`
