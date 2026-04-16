"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicKey, isSupabaseConfigured } from "@/lib/supabase/env";

/** Browser client — publishable or legacy anon key only (`NEXT_PUBLIC_*`). */
export function createSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabasePublicKey(),
  );
}
