import type { SupabaseClient } from "@supabase/supabase-js";

import { getStorageBucket } from "@/lib/supabase/env";

export type StorageObjectMeta = {
  name: string;
  path: string;
  publicUrl: string;
};

export function getPublicUrl(
  supabase: SupabaseClient,
  path: string,
): string {
  const bucket = getStorageBucket();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/** Resolve object path inside the configured bucket from a public object URL (for deletes). */
export function parseStorageObjectPathFromPublicUrl(
  publicUrl: string,
): string | null {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = getStorageBucket();
  if (!baseUrl || !publicUrl) return null;

  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;

  try {
    return decodeURIComponent(publicUrl.slice(idx + marker.length));
  } catch {
    return null;
  }
}

export async function uploadStorageImage(
  supabase: SupabaseClient,
  file: File,
  prefix = "uploads",
): Promise<StorageObjectMeta> {
  const bucket = getStorageBucket();
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const path = `${prefix.replace(/\/$/, "")}/${crypto.randomUUID()}-${safeName}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  return {
    name: safeName,
    path,
    publicUrl: getPublicUrl(supabase, path),
  };
}

export async function deleteStorageImage(
  supabase: SupabaseClient,
  path: string,
): Promise<void> {
  const bucket = getStorageBucket();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

/** Short-lived signed URL so previews work for private buckets; safe for admin UI. */
export async function createSignedPreviewUrl(
  supabase: SupabaseClient,
  objectPath: string,
  expiresIn = 3600,
): Promise<string | null> {
  const bucket = getStorageBucket();
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(objectPath, expiresIn);
  if (error || !data?.signedUrl) return null;
  return data.signedUrl;
}
