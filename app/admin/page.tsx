import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { listAdminProducts } from "@/app/admin/actions";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  let initialProducts: Product[] = [];
  let loadError: string | null = null;

  try {
    initialProducts = await listAdminProducts();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Products
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All data is read and written in Supabase (Auth,{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">product</code>{" "}
          table, and Storage for images). Changes apply to the storefront after
          the next request.
        </p>
      </div>
      <AdminDashboard
        initialProducts={initialProducts}
        loadError={loadError}
      />
    </div>
  );
}
