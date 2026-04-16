"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Product } from "@/lib/products";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  deleteProductFromTable,
  insertProductInTable,
  listProductsFromTable,
  updateProductInTable,
} from "@/lib/supabase/products-repo";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasVerifiedAuthSession } from "@/lib/supabase/verified-auth";

/** Ensures a verified JWT session before any admin data mutation or load. */
async function requireAuth() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createSupabaseServerClient();
  const authed = await hasVerifiedAuthSession(supabase);

  if (!authed) {
    redirect("/admin/login");
  }

  return supabase;
}

function revalidateCatalog() {
  revalidatePath("/");
  revalidatePath("/products");
}

export async function signOutAction() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export type ProductActionResult =
  | { ok: true }
  | { ok: false; message: string };

export async function createProductAction(
  product: Product,
): Promise<ProductActionResult> {
  try {
    const supabase = await requireAuth();
    const result = await insertProductInTable(supabase, product);
    if (!result.ok) return { ok: false, message: result.message };
    revalidateCatalog();
    revalidatePath(`/products/${product.slug}`);
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Something went wrong",
    };
  }
}

export async function updateProductAction(
  product: Product,
): Promise<ProductActionResult> {
  try {
    const supabase = await requireAuth();
    const result = await updateProductInTable(supabase, product);
    if (!result.ok) return { ok: false, message: result.message };
    revalidateCatalog();
    revalidatePath(`/products/${product.slug}`);
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Something went wrong",
    };
  }
}

export async function deleteProductAction(
  id: string,
  slug: string,
): Promise<ProductActionResult> {
  try {
    const supabase = await requireAuth();
    const result = await deleteProductFromTable(supabase, id);
    if (!result.ok) return { ok: false, message: result.message };
    revalidateCatalog();
    revalidatePath(`/products/${slug}`);
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Something went wrong",
    };
  }
}

/** Admin: catalog list — always from Supabase `public.product` for an authenticated session. */
export async function listAdminProducts(): Promise<Product[]> {
  const supabase = await requireAuth();
  return listProductsFromTable(supabase);
}
