import Image from "next/image";

import { productImagePlaceholder } from "@/lib/products";

function isAbsoluteHttpUrl(s: string): boolean {
  return /^https?:\/\//i.test(s.trim());
}

type ProductImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** When true, load immediately (e.g. hero). */
  priority?: boolean;
};

/**
 * Catalog images: use a plain {@link HTMLImageElement} for remote URLs so the
 * browser loads Supabase (or any CDN) directly. `next/image` would proxy via
 * `/_next/image`, where the server fetch often fails for the same URL that works
 * in the admin preview (private bucket, cookies, or optimizer quirks). Local
 * assets still use `next/image`.
 */
export function ProductImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
}: ProductImageProps) {
  const trimmed = src.trim() || productImagePlaceholder;

  if (isAbsoluteHttpUrl(trimmed)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- intentional: avoid /_next/image proxy for remote storage
      <img
        src={trimmed}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <Image
      src={trimmed}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
