import type { SupabaseClient } from "@supabase/supabase-js";

import type { Product } from "@/lib/products";
import {
  productToInsertPayload,
  productToRow,
  rowToProduct,
  type ProductRow,
} from "@/lib/products-db";

/** Supabase `public.product` table — all admin catalog CRUD goes through here. */
export const PRODUCT_TABLE = "product" as const;

/** Homepage featured grid shows at most this many rows (query limit). */
export const FEATURED_PRODUCTS_LIMIT = 3 as const;

export async function listProductsFromTable(
  supabase: SupabaseClient,
): Promise<Product[]> {
  const { data, error } = await supabase
    .from(PRODUCT_TABLE)
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as ProductRow[]).map(rowToProduct);
}

export async function listFeaturedProductsFromTable(
  supabase: SupabaseClient,
): Promise<Product[]> {
  const { data, error } = await supabase
    .from(PRODUCT_TABLE)
    .select("*")
    .eq("featured", true)
    .order("name", { ascending: true })
    .limit(FEATURED_PRODUCTS_LIMIT);

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as ProductRow[]).map(rowToProduct);
}

export async function getProductBySlugFromTable(
  supabase: SupabaseClient,
  slug: string,
): Promise<Product | null> {
  const { data, error } = await supabase
    .from(PRODUCT_TABLE)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
  return rowToProduct(data as ProductRow);
}

export async function insertProductInTable(
  supabase: SupabaseClient,
  product: Product,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { error } = await supabase
    .from(PRODUCT_TABLE)
    .insert(productToInsertPayload(product));

  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

export async function updateProductInTable(
  supabase: SupabaseClient,
  product: Product,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const row = productToRow(product);
  const { error } = await supabase
    .from(PRODUCT_TABLE)
    .update(row)
    .eq("id", row.id);

  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

export async function deleteProductFromTable(
  supabase: SupabaseClient,
  id: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { error } = await supabase.from(PRODUCT_TABLE).delete().eq("id", id);

  if (error) return { ok: false, message: error.message };
  return { ok: true };
}
