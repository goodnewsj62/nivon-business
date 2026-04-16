/**
 * @see https://supabase.com/docs/guides/api/api-keys — publishable keys are the
 * recommended low-privilege key for browsers and SSR; legacy JWT `anon` is
 * still supported during migration and for self-hosted/CLI-only setups.
 */

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publicKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return Boolean(url && publicKey);
}

/**
 * Low-privilege API key for `createBrowserClient` / `createServerClient`.
 * Prefer `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (`sb_publishable_...`); fall
 * back to `NEXT_PUBLIC_SUPABASE_ANON_KEY` (legacy JWT anon) if unset.
 */
export function getSupabasePublicKey(): string {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!key) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (recommended) or NEXT_PUBLIC_SUPABASE_ANON_KEY (legacy). See https://supabase.com/docs/guides/api/api-keys",
    );
  }
  return key;
}

export function getStorageBucket(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "nivon";
}
