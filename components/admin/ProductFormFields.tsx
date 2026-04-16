"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { isValidProductSlug } from "@/lib/product-slug";
import type { Product } from "@/lib/products";
import { productCategoryOptions } from "@/lib/products";

const NO_CATEGORY_VALUE = "__none__";

type ProductFormFieldsProps = {
  value: Product;
  onChange: (next: Product) => void;
  slugDisabled?: boolean;
  /** Create flow: slug is set on save from the name. */
  hideSlugField?: boolean;
  /** When true, omit the image URL field (e.g. edit modal uses ProductImageEditor). */
  hideImageField?: boolean;
};

export function ProductFormFields({
  value,
  onChange,
  slugDisabled,
  hideSlugField,
  hideImageField,
}: ProductFormFieldsProps) {
  function patch<K extends keyof Product>(key: K, v: Product[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="flex flex-col gap-4">
      {!hideSlugField ? (
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-slug">Slug</Label>
          <Input
            id="product-slug"
            value={value.slug}
            onChange={(e) => patch("slug", e.target.value)}
            disabled={slugDisabled}
            placeholder="e.g. patient-monitor-pro"
            className="font-mono text-sm"
            aria-invalid={
              value.slug.length > 0 && !isValidProductSlug(value.slug)
            }
          />
          <p className="text-xs text-muted-foreground">
            Used in <span className="font-mono">/products/[slug]</span>. Lowercase
            letters, numbers, and hyphens only.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label htmlFor="product-name">Name</Label>
        <Input
          id="product-name"
          value={value.name}
          onChange={(e) => patch("name", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="product-short">Short description</Label>
        <Textarea
          id="product-short"
          value={value.shortDescription}
          onChange={(e) => patch("shortDescription", e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="product-desc">Description</Label>
        <Textarea
          id="product-desc"
          value={value.description}
          onChange={(e) => patch("description", e.target.value)}
          rows={5}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Category</Label>
        <Select
          value={
            value.category.trim() ? value.category : NO_CATEGORY_VALUE
          }
          onValueChange={(v) =>
            patch("category", v === NO_CATEGORY_VALUE ? "" : v)
          }
        >
          <SelectTrigger className="w-full min-w-0">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={NO_CATEGORY_VALUE}>No category</SelectItem>
              {productCategoryOptions.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {!hideImageField ? (
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-image">Image URL</Label>
          <Input
            id="product-image"
            value={value.image}
            onChange={(e) => patch("image", e.target.value)}
            placeholder="/product.jpg or full Supabase public URL"
            className="text-sm"
          />
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <Checkbox
          id="product-in-stock"
          checked={value.inStock}
          onCheckedChange={(c) => patch("inStock", c === true)}
        />
        <Label htmlFor="product-in-stock" className="mb-0 font-normal">
          In stock
        </Label>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Checkbox
            id="product-featured"
            checked={value.featured}
            onCheckedChange={(c) => patch("featured", c === true)}
          />
          <Label htmlFor="product-featured" className="mb-0 font-normal">
            Featured on homepage
          </Label>
        </div>
        <p className="text-xs text-muted-foreground pl-6">
          Up to three featured items are shown on the home page (alphabetical
          order if more than three are marked). Featured items stay in the main
          product list.
        </p>
      </div>
    </div>
  );
}
