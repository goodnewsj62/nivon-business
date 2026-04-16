-- Featured flag for homepage "Featured Equipment" (site shows at most 3).
alter table public.product
  add column if not exists featured boolean not null default false;
