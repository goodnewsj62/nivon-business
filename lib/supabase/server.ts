import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabasePublicKey, isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Server-only Supabase client (RSC, Server Actions, Route Handlers).
 * Uses the publishable key (preferred) or legacy anon JWT — never
 * `service_role` / secret keys in `NEXT_PUBLIC_*`. RLS must enforce data access.
 */
export async function createSupabaseServerClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabasePublicKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        // Second arg is cache headers (required by @supabase/ssr); middleware applies them to responses.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- not applicable in Server Components
        setAll(cookiesToSet, _headers) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            /* Server Components cannot always set cookies; middleware refreshes session */
          }
        },
      },
    },
  );
}
