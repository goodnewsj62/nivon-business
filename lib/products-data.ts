import { products as productsSeed, type Product } from "@/lib/products";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  getProductBySlugFromTable,
  listFeaturedProductsFromTable,
  listProductsFromTable,
} from "@/lib/supabase/products-repo";
import { createSupabaseCatalogClient } from "@/lib/supabase/catalog-client";

/** Re-export DB row helpers for any code that needs the same Supabase shape. */
export type { ProductRow } from "@/lib/products-db";
export {
  productToInsertPayload,
  productToRow,
  rowToProduct,
} from "@/lib/products-db";

/**
 * Public catalog: reads only from Supabase when env is set; otherwise static seed.
 * When Supabase is configured, results always come from `public.product` (may be empty).
 */
export async function listProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return productsSeed;
  }

  try {
    const supabase = createSupabaseCatalogClient();
    return await listProductsFromTable(supabase);
  } catch {
    return [];
  }
}

/** Featured homepage picks: at most three, by name order, when multiple are flagged in admin. */
export async function listFeaturedProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return [...productsSeed]
      .filter((p) => p.featured)
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 3);
  }

  try {
    const supabase = createSupabaseCatalogClient();
    return await listFeaturedProductsFromTable(supabase);
  } catch {
    return [];
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  if (!isSupabaseConfigured()) {
    return productsSeed.find((p) => p.slug === slug);
  }

  try {
    const supabase = createSupabaseCatalogClient();
    const found = await getProductBySlugFromTable(supabase, slug);
    return found ?? undefined;
  } catch {
    return undefined;
  }
}
