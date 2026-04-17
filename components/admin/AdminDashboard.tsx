"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from "@/app/admin/actions";
import { ProductFormFields } from "@/components/admin/ProductFormFields";
import { ProductImageEditor } from "@/components/admin/ProductImageEditor";
import { ProductsDataTable } from "@/components/admin/ProductsDataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  isValidProductSlug,
  productSlugFormatMessage,
  slugifyProductSlug,
} from "@/lib/product-slug";
import type { Product } from "@/lib/products";
import { PlusIcon } from "lucide-react";

function emptyProduct(): Product {
  return {
    id: "",
    slug: "",
    name: "",
    shortDescription: "",
    description: "",
    category: "",
    image: "",
    inStock: true,
    featured: false,
    price: null,
  };
}

function validateProduct(p: Product): string | null {
  if (!isValidProductSlug(p.slug)) return productSlugFormatMessage;
  if (!p.name.trim()) return "Name is required.";
  if (p.price != null) {
    if (!Number.isFinite(p.price) || p.price < 0) {
      return "Price must be a non-negative number, or leave empty for no price.";
    }
  }
  return null;
}

type AdminDashboardProps = {
  initialProducts: Product[];
  loadError: string | null;
};

export function AdminDashboard({
  initialProducts,
  loadError,
}: AdminDashboardProps) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [draft, setDraft] = useState<Product>(emptyProduct);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.name.localeCompare(b.name)),
    [products],
  );

  async function handleCreate() {
    if (!draft.name.trim()) {
      toast.error("Name is required.");
      return;
    }
    const toSave: Product = {
      ...draft,
      id: "",
      slug: slugifyProductSlug(draft.name),
    };
    const err = validateProduct(toSave);
    if (err) {
      toast.error(err);
      return;
    }
    setSaving(true);
    const res = await createProductAction(toSave);
    setSaving(false);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Product created");
    setCreateOpen(false);
    setDraft(emptyProduct());
    router.refresh();
  }

  async function handleUpdate() {
    const err = validateProduct(draft);
    if (err) {
      toast.error(err);
      return;
    }
    setSaving(true);
    const res = await updateProductAction(draft);
    setSaving(false);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Product updated");
    setProducts((prev) => prev.map((p) => (p.id === draft.id ? draft : p)));
    setEditOpen(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setSaving(true);
    const res = await deleteProductAction(
      deleteTarget.id,
      deleteTarget.slug,
    );
    setSaving(false);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Product deleted");
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteOpen(false);
    setDeleteTarget(null);
    router.refresh();
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-sm">
        <p className="font-medium text-destructive">Could not load products</p>
        <p className="mt-2 text-muted-foreground">{loadError}</p>
        <p className="mt-4 text-muted-foreground">
          Confirm{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
            .env
          </code>{" "}
          has your Supabase URL and publishable or anon key, run the SQL in{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
            supabase/migrations/001_admin_products_and_storage.sql
          </code>
          , and create the{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
            nivon
          </code>{" "}
          Storage bucket. The admin UI only loads from the{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
            product
          </code>{" "}
          table.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ProductsDataTable
        products={sortedProducts}
        onEdit={(p) => {
          setDraft({ ...p });
          setEditOpen(true);
        }}
        onDelete={(p) => {
          setDeleteTarget(p);
          setDeleteOpen(true);
        }}
        toolbarRight={
          <Button
            type="button"
            onClick={() => {
              setDraft(emptyProduct());
              setCreateOpen(true);
            }}
          >
            <PlusIcon data-icon="inline-start" />
            Create product
          </Button>
        }
      />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="flex max-h-[min(90vh,720px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
          <div className="flex shrink-0 flex-col gap-4 px-6 pt-6">
            <DialogHeader>
              <DialogTitle>Create product</DialogTitle>
              <DialogDescription>
                Add a catalog row in Supabase. The URL slug is generated from the
                product name when you save. The database assigns the product id.
                Upload the image to Storage below.
              </DialogDescription>
            </DialogHeader>
            <ProductImageEditor
              variant="dialog"
              imageUrl={draft.image}
              onImageUrlChange={(url) => setDraft((d) => ({ ...d, image: url }))}
            />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            <ProductFormFields
              value={draft}
              onChange={setDraft}
              hideImageField
              hideSlugField
            />
          </div>
          <DialogFooter className="shrink-0 border-t border-border bg-card px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCreateOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={saving}
              onClick={() => void handleCreate()}
            >
              {saving ? "Saving…" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="flex max-h-[min(90vh,720px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
          <div className="flex shrink-0 flex-col gap-4 px-6 pt-6">
            <DialogHeader>
              <DialogTitle>Update product</DialogTitle>
              <DialogDescription>
                Upload or remove the product image here; edit other fields below.
              </DialogDescription>
            </DialogHeader>
            <ProductImageEditor
              variant="dialog"
              imageUrl={draft.image}
              onImageUrlChange={(url) => setDraft((d) => ({ ...d, image: url }))}
            />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            <ProductFormFields
              value={draft}
              onChange={setDraft}
              slugDisabled
              hideImageField
            />
          </div>
          <DialogFooter className="shrink-0 border-t border-border bg-card px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={saving}
              onClick={() => void handleUpdate()}
            >
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete product</DialogTitle>
            <DialogDescription>
              This removes{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.name}
              </span>{" "}
              from the database. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={saving}
              onClick={() => void handleDelete()}
            >
              {saving ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
