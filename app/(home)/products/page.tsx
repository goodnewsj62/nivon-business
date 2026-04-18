import CTASection from "@/components/CTASection";
import ProductsFilter from "@/components/ProductsFilter";
import { listProducts } from "@/lib/products-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Nivon's catalog of diagnostic, surgical, emergency, monitoring, ophthalmology, and physiotherapy equipment.",
};

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <>
      <section className="bg-card">
        <div className="container py-10 md:py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Browse
          </p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-foreground md:text-3xl">
            Our Products
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Explore our full range of medical equipment—including ophthalmology
            and physiotherapy lines. Contact us for availability, pricing, and
            bulk orders.
          </p>
          <ProductsFilter products={products} />
        </div>
      </section>
      <CTASection />
    </>
  );
}
