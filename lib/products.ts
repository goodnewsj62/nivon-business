export type Product = {
  /** Database primary key (e.g. UUID when using a default on insert). */
  id: string;
  /** URL segment: `/products/[slug]` — unique, slugified from name on create. */
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
  /** Shown in homepage featured grid (max 3 site-wide; extras remain in catalog). */
  featured: boolean;
  /** Optional NGN list price; when null, price is hidden on the storefront. */
  price: number | null;
};

/** Used when `image` is empty (matches nullable `product.image` in Supabase). */
export const productImagePlaceholder = "/nivon.png";

export function productDisplayImage(product: Pick<Product, "image">): string {
  const src = product.image?.trim();
  return src ? src : productImagePlaceholder;
}

export const categories = [
  "All",
  "Diagnostic Equipment",
  "Surgical Equipment",
  "Lab Equipment",
  "Patient Monitoring",
  "Emergency Equipment",
  "Respiratory Equipment",
] as const;

/** Category values for forms (excludes the "All" filter sentinel). */
export const productCategoryOptions = categories.filter(
  (c): c is Exclude<(typeof categories)[number], "All"> => c !== "All",
);

export const products: Product[] = [
  {
    id: "patient-monitor-pro",
    slug: "patient-monitor-pro",
    name: "Patient Monitor Pro X200",
    shortDescription:
      "Advanced multi-parameter patient monitoring system with 12-inch touchscreen display.",
    description:
      "The Patient Monitor Pro X200 is a state-of-the-art multi-parameter monitoring system designed for ICU, OR, and general ward use.",
    category: "Patient Monitoring",
    image: "/product-monitor.jpg",
    inStock: true,
    price: null,
    featured: true,
  },
  {
    id: "surgical-instrument-set",
    slug: "surgical-instrument-set",
    name: "Premium Surgical Instrument Set",
    shortDescription:
      "Complete stainless steel surgical instrument kit for general surgery procedures.",
    description:
      "Our Premium Surgical Instrument Set includes 45 precision-crafted stainless steel instruments essential for general surgery procedures.",
    category: "Surgical Equipment",
    image: "/product-surgical.jpg",
    inStock: true,
    price: null,
    featured: true,
  },
  {
    id: "laboratory-microscope",
    slug: "laboratory-microscope",
    name: "Clinical Laboratory Microscope",
    shortDescription:
      "Professional-grade binocular microscope with LED illumination for clinical diagnostics.",
    description:
      "This Clinical Laboratory Microscope delivers exceptional optical performance for pathology, hematology, and microbiology applications.",
    category: "Lab Equipment",
    image: "/product-lab.jpg",
    inStock: true,
    price: null,
    featured: true,
  },
  {
    id: "digital-bp-monitor",
    slug: "digital-bp-monitor",
    name: "Digital Blood Pressure Monitor",
    shortDescription:
      "Clinically validated automatic blood pressure monitor for accurate readings.",
    description:
      "Our Digital Blood Pressure Monitor provides clinically validated measurements with advanced oscillometric technology.",
    category: "Diagnostic Equipment",
    image: "/product-bp.jpg",
    inStock: true,
    price: null,
    featured: false,
  },
  {
    id: "portable-ultrasound",
    slug: "portable-ultrasound",
    name: "Portable Ultrasound System",
    shortDescription:
      "Compact, lightweight ultrasound system for point-of-care diagnostics.",
    description:
      "The Portable Ultrasound System delivers high-resolution imaging in a compact, lightweight design perfect for point-of-care diagnostics.",
    category: "Diagnostic Equipment",
    image: "/product-ultrasound.jpg",
    inStock: false,
    price: null,
    featured: false,
  },
  {
    id: "aed-defibrillator",
    slug: "aed-defibrillator",
    name: "AED Automated Defibrillator",
    shortDescription:
      "Life-saving automated external defibrillator with voice-guided CPR coaching.",
    description:
      "This AED Automated Defibrillator is designed for use by both trained medical professionals and first responders.",
    category: "Emergency Equipment",
    image: "/product-defibrillator.jpg",
    inStock: true,
    price: null,
    featured: false,
  },
  {
    id: "oxygen-concentrator",
    slug: "oxygen-concentrator",
    name: "Medical Oxygen Concentrator",
    shortDescription:
      "Reliable continuous-flow oxygen concentrator for home and clinical use.",
    description:
      "The Medical Oxygen Concentrator provides a continuous supply of concentrated oxygen for patients requiring supplemental oxygen therapy.",
    category: "Respiratory Equipment",
    image: "/product-oxygen.jpg",
    inStock: true,
    price: null,
    featured: false,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
