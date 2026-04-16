import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Product, productDisplayImage } from "@/lib/products";

const ProductCard = ({ product }: { product: Product }) => (
  <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow hover:shadow-elevated">
    <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-muted">
      <ProductImage
        src={productDisplayImage(product)}
        alt={product.name}
        width={400}
        height={400}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <Badge
        className={`absolute right-3 top-3 ${
          product.inStock
            ? "bg-accent text-accent-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </Badge>
    </Link>
    <div className="flex flex-1 flex-col p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {product.category.trim() || "Uncategorized"}
      </p>
      <Link href={`/products/${product.slug}`}>
        <h3 className="mt-1 font-heading text-base font-semibold text-foreground transition-colors hover:text-primary">
          {product.name}
        </h3>
      </Link>
      <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
        {product.shortDescription.trim() || "—"}
      </p>
      <Link href={`/products/${product.slug}`} className="mt-4">
        <Button variant="outline" className="w-full">
          Inquire Now
        </Button>
      </Link>
    </div>
  </div>
);

export default ProductCard;
