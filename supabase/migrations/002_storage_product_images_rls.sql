-- Storage RLS: anyone can read; only authenticated users can write.
-- Create bucket `nivon` in Dashboard first (or rename `nivon` below + env NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET).
-- For storefront <img> without auth, bucket should be "Public" in Dashboard.

drop policy if exists "storage_nivon_select_public" on storage.objects;
drop policy if exists "storage_nivon_insert_authenticated" on storage.objects;
drop policy if exists "storage_nivon_update_authenticated" on storage.objects;
drop policy if exists "storage_nivon_delete_authenticated" on storage.objects;
drop policy if exists "product_images_public_read" on storage.objects;
drop policy if exists "product_images_authenticated_insert" on storage.objects;
drop policy if exists "product_images_authenticated_update" on storage.objects;
drop policy if exists "product_images_authenticated_delete" on storage.objects;

create policy "product_images_public_read"
  on storage.objects
  for select
  using (bucket_id = 'nivon');

create policy "product_images_authenticated_insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'nivon');

create policy "product_images_authenticated_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'nivon')
  with check (bucket_id = 'nivon');

create policy "product_images_authenticated_delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'nivon');
