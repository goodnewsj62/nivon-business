import type { NextConfig } from "next";

/** Self-hosted or custom API host (not `*.supabase.co`) — add at build/dev startup from env. */
function supabaseCustomHostImagePattern():
  | { protocol: "https"; hostname: string; pathname: string }
  | undefined {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return undefined;
  try {
    const { hostname, protocol } = new URL(raw);
    if (hostname.endsWith(".supabase.co")) return undefined;
    if (protocol !== "https:") return undefined;
    return {
      protocol: "https",
      hostname,
      pathname: "/storage/v1/object/**",
    };
  } catch {
    return undefined;
  }
}

const customHostPattern = supabaseCustomHostImagePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // All Supabase hosted projects: <ref>.supabase.co (public + signed object URLs)
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/**",
      },
      ...(customHostPattern ? [customHostPattern] : []),
    ],
  },
};

export default nextConfig;
