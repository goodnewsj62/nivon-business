import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Confirms the access token is valid (JWT verified via JWKS when possible).
 * Use this for **authorization / route protection** instead of `getSession()`,
 * which reads the cookie payload without verification.
 *
 * @see https://supabase.com/docs/guides/auth/server-side/creating-a-client
 */
export async function hasVerifiedAuthSession(
  supabase: SupabaseClient,
): Promise<boolean> {
  const { data, error } = await supabase.auth.getClaims();
  if (error) return false;
  const sub = data?.claims?.sub;
  return typeof sub === "string" && sub.length > 0;
}
