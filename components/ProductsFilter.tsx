"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function ProductsFilter() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filteredProducts = useMemo(() => {
    if (active === "All") return products;
    return products.filter((product) => product.category === active);
  }, [active]);

  return (
    <>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-muted-foreground">
          No products found in this category.
        </p>
      )}
    </>
  );
}
