import CTASection from "@/components/CTASection";
import ProductCard from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productDisplayImage } from "@/lib/products";
import { getProductBySlug, listProducts } from "@/lib/products-data";
import { ArrowLeft, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const desc =
    product.shortDescription.trim() || product.description.trim() || undefined;

  return {
    title: product.name,
    description: desc,
    openGraph: {
      title: product.name,
      description: desc,
      images: [{ url: productDisplayImage(product), alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const all = await listProducts();
  const related = all
    .filter(
      (item) =>
        item.category === product.category && item.slug !== product.slug,
    )
    .slice(0, 3);

  return (
    <>
      <section className="bg-card">
        <div className="container py-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft /> Back to Products
          </Link>
        </div>
      </section>

      <section className="bg-card">
        <div className="container grid mx-auto gap-8 pb-14 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-muted">
            <ProductImage
              src={productDisplayImage(product)}
              alt={product.name}
              width={800}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <article className="flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.category.trim() || "Uncategorized"}
            </p>
            <h1 className="mt-1 font-heading text-2xl font-bold text-foreground md:text-3xl">
              {product.name}
            </h1>
            <Badge
              className={`mt-3 w-fit ${product.inStock ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              {product.description.trim() || "No description yet."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Request Quote
                </Button>
              </Link>
              <a href="tel:+2348068755208">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 sm:w-auto"
                >
                  <Phone data-icon="inline-start" /> Call to Purchase
                </Button>
              </a>
            </div>
          </article>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-background">
          <div className="container py-14">
            <h2 className="font-heading text-xl font-bold text-foreground">
              Related Products
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection />
    </>
  );
}
