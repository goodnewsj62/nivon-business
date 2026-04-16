-- Optional: add `slug` if you upgraded the app before this column existed.
-- If `slug` already exists, this is a no-op for the ADD.
-- Backfill and NOT NULL / PK changes depend on your live data — finish in the SQL editor if needed.

alter table public.product add column if not exists slug text;

-- After every row has a unique slug:
-- alter table public.product alter column slug set not null;
-- create unique index if not exists product_slug_unique on public.product (slug);
