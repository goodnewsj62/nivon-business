import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { getSupabasePublicKey, isSupabaseConfigured } from "@/lib/supabase/env";
import { hasVerifiedAuthSession } from "@/lib/supabase/verified-auth";

/**
 * Admin auth gate — follows Supabase SSR guidance:
 * https://supabase.com/docs/guides/auth/server-side/creating-a-client
 *
 * - Uses `getClaims()` (via {@link hasVerifiedAuthSession}) so the JWT is
 *   verified (JWKS / Auth) instead of trusting `getSession()` cookie payload alone.
 * - `setAll` applies cookies plus cache headers so auth responses are not CDN-cached.
 */
export async function updateSession(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    const isLogin = request.nextUrl.pathname === "/admin/login";
    if (!isLogin) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabasePublicKey(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
          if (headers) {
            Object.entries(headers).forEach(([key, value]) => {
              supabaseResponse.headers.set(key, value);
            });
          }
        },
      },
    },
  );

  const authed = await hasVerifiedAuthSession(supabase);

  const isLogin = request.nextUrl.pathname === "/admin/login";

  if (!authed && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (authed && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
