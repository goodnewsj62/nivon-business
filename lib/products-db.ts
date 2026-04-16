import type { Product } from "@/lib/products";

/** Row shape for `public.product` in Supabase (snake_case columns). */
export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  category: string | null;
  image: string | null;
  status: boolean;
  featured: boolean;
};

function nullIfEmpty(s: string): string | null {
  const t = s.trim();
  return t === "" ? null : t;
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description ?? "",
    description: row.description ?? "",
    category: row.category ?? "",
    image: row.image ?? "",
    inStock: row.status,
    featured: row.featured,
  };
}

export function productToRow(product: Product): ProductRow {
  return {
    id: product.id.trim(),
    slug: product.slug.trim(),
    name: product.name.trim(),
    short_description: nullIfEmpty(product.shortDescription),
    description: nullIfEmpty(product.description),
    category: nullIfEmpty(product.category),
    image: nullIfEmpty(product.image),
    status: product.inStock,
    featured: product.featured,
  };
}

/** Insert payload: omit `id` when empty so the database default (e.g. UUID) applies. */
export function productToInsertPayload(
  product: Product,
): Omit<ProductRow, "id"> | ProductRow {
  const row = productToRow(product);
  if (row.id) return row;
  return {
    slug: row.slug,
    name: row.name,
    short_description: row.short_description,
    description: row.description,
    category: row.category,
    image: row.image,
    status: row.status,
    featured: row.featured,
  };
}
