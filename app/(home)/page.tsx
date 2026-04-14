import CTASection from "@/components/CTASection";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import {
  ArrowRight,
  Award,
  Building2,
  Clock,
  Headphones,
  MapPin,
  Quote,
  Shield,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Equipment Supplier Across Africa",
  description:
    "Discover trusted medical equipment for diagnostics, surgery, laboratories, and patient monitoring.",
};

const trustSignals = [
  { icon: Clock, label: "18+ Years", desc: "Industry Experience" },
  { icon: Shield, label: "ISO Certified", desc: "Quality Assured" },
  { icon: Award, label: "500+", desc: "Products Delivered" },
  { icon: Headphones, label: "24/7", desc: "Customer Support" },
];

const testimonials = [
  {
    name: "Dr. Adebayo Ogundimu",
    role: "Chief Medical Director, Lagos General Hospital",
    quote:
      "MedEquip has been our trusted partner for over 5 years. Their equipment quality and after-sales support are unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Dr. Chioma Nwosu",
    role: "Head of Surgery, Abuja Teaching Hospital",
    quote:
      "We switched to MedEquip for our surgical instruments and the difference in quality is remarkable. Highly recommended for any healthcare facility.",
    rating: 5,
  },
  {
    name: "Pharm. Ibrahim Musa",
    role: "Administrator, Kano Specialist Centre",
    quote:
      "Prompt delivery, excellent customer service, and top-notch equipment. MedEquip truly understands the African healthcare landscape.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-card">
        <div className="container grid mx-auto items-center gap-10 py-14 md:grid-cols-2 md:py-20 lg:py-28">
          <div className="order-2 md:order-1">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Trusted Medical Equipment Supplier
            </span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Reliable Equipment for{" "}
              <span className="text-primary">Better Healthcare</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              We supply high-quality diagnostic, surgical, and laboratory
              equipment to hospitals, clinics, and healthcare facilities across
              Africa.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Request a Quote
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 sm:w-auto"
                >
                  Browse Products <ArrowRight data-icon="inline-end" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <Image
                src="/hero-medical.jpg"
                alt="Modern medical equipment in a clinical setting"
                width={1920}
                height={1080}
                priority
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-card p-4 shadow-lg md:block">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-accent/10">
                    <Shield className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Certified Quality
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ISO 13485 Compliant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container grid mx-auto grid-cols-2 gap-8 py-10 md:grid-cols-4 md:py-14">
          {trustSignals.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="mt-3 font-heading text-xl font-bold text-foreground">
                {item.label}
              </span>
              <span className="text-sm text-muted-foreground">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="container py-16 mx-auto md:py-20">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Featured Equipment
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Explore our top-selling medical equipment trusted by healthcare
              facilities across the region.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="container mx-auto py-16 md:py-20">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              All Products
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Browse our complete range of medical equipment for every
              department.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/products">
              <Button size="lg" variant="outline" className="gap-2">
                See More Products <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto py-16 md:py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Image
                src="/testimonial-doctor.jpg"
                alt="Satisfied healthcare professional using our equipment"
                loading="lazy"
                width={640}
                height={640}
                className="rounded-2xl shadow-elevated"
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                Testimonials
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
                What Our Customers Say
              </h2>
              <div className="mt-8 space-y-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.name}
                    className="rounded-xl border border-border bg-card p-5 shadow-card"
                  >
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            className="h-4 w-4 fill-accent text-accent"
                          />
                        ),
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">
                      <Quote className="mr-1 inline h-4 w-4 text-primary/40" />
                      {testimonial.quote}
                    </p>
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="container mx-auto py-16 md:py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                Africa-Wide Coverage
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
                We Supply Africa-Wide
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                From Lagos to Nairobi, Accra to Johannesburg — our distribution
                network spans across the African continent. We ensure timely
                delivery and installation support wherever you are.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  {
                    icon: MapPin,
                    label: "30+ Countries",
                    desc: "Across Africa",
                  },
                  {
                    icon: Clock,
                    label: "Fast Delivery",
                    desc: "Reliable logistics",
                  },
                  {
                    icon: Building2,
                    label: "500+ Facilities",
                    desc: "Served continent-wide",
                  },
                  {
                    icon: Shield,
                    label: "Installation",
                    desc: "On-site support",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-lg bg-background p-3"
                  >
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-8 inline-block">
                <Button size="lg" className="gap-2">
                  Get a Quote for Your Region{" "}
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="/nigeria-supply-map.jpg"
                alt="MedEquip supply network across Africa"
                loading="lazy"
                width={640}
                height={512}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto py-16 md:py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Image
                src="/portfolio-hospital.jpg"
                alt="Hospital equipped by MedEquip"
                loading="lazy"
                width={640}
                height={512}
                className="rounded-2xl shadow-elevated"
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                Our Portfolio
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
                Trusted by Leading Healthcare Facilities
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                We&apos;ve partnered with hospitals, clinics, diagnostic
                centres, and laboratories across Africa to provide world-class
                medical equipment and ongoing support.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Equipped 50+ operating theatres with surgical instruments",
                  "Supplied diagnostic labs in 30+ countries",
                  "Long-term maintenance contracts with 30+ facilities",
                  "Official distributor for multiple international brands",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="mt-8 inline-block">
                <Button size="lg" variant="outline" className="gap-2">
                  Learn More About Us <ArrowRight data-icon="inline-end" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
