const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const productSlugFormatMessage =
  "Slug must be lowercase letters, numbers, and hyphens (e.g. my-product).";

export function isValidProductSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

/** URL-safe slug from a product name (unique names → stable slugs). */
export function slugifyProductSlug(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 80);
  return base || "product";
}
