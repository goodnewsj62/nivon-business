import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicKey, isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Anonymous Supabase client for public catalog reads (no `cookies()`).
 * Use for storefront data so routes stay compatible with static generation
 * (`generateStaticParams`, `generateMetadata`, sitemap) without static→dynamic errors.
 */
export function createSupabaseCatalogClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabasePublicKey(),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
