-- Nullable list price in Naira (kobo precision). Omit from UI when null.
alter table public.product
  add column if not exists price numeric(12, 2);

comment on column public.product.price is 'Optional NGN list price; null hides price on the storefront.';
