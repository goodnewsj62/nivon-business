import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata = {
  title: "Admin sign in",
};

export default function AdminLoginPage() {
  const configured = isSupabaseConfigured();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className="font-heading text-xl font-bold text-foreground">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with your Supabase project user (email and password).
        </p>
        {!configured ? (
          <p className="mt-4 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-950 dark:text-amber-100">
            Set{" "}
            <code className="rounded bg-background/60 px-1 font-mono text-xs">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{" "}
            and either{" "}
            <code className="rounded bg-background/60 px-1 font-mono text-xs">
              NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
            </code>{" "}
            (recommended) or{" "}
            <code className="rounded bg-background/60 px-1 font-mono text-xs">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>{" "}
            (legacy), then restart the dev server.
          </p>
        ) : null}
        <div className="mt-6">
          <AdminLoginForm disabled={!configured} />
        </div>
      </div>
    </div>
  );
}
