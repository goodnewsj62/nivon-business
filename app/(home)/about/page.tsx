import CTASection from "@/components/CTASection";
import { Award, Shield, Target, Users } from "lucide-react";
import type { Metadata } from "next";

const values = [
  {
    icon: Shield,
    title: "Quality Assurance",
    desc: "Every product meets rigorous international quality standards before reaching our clients.",
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "We build lasting partnerships with healthcare providers through dedicated support and service.",
  },
  {
    icon: Award,
    title: "Industry Expertise",
    desc: "Our team brings decades of combined experience in medical equipment distribution.",
  },
  {
    icon: Target,
    title: "Reliable Supply",
    desc: "We maintain robust supply chains to ensure timely delivery of critical medical equipment.",
  },
];

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Nivon helps healthcare providers with dependable diagnostic, surgical, laboratory, ophthalmology, physiotherapy, and monitoring equipment—and long-term support.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-card">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              About Us
            </p>
            <h1 className="mt-1 font-heading text-2xl font-bold text-foreground md:text-3xl">
              Empowering Healthcare Through Quality Equipment
            </h1>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              Since 2021, Nivon has been a trusted supplier of medical devices
              and equipment—including ophthalmology and physiotherapy—to
              hospitals, clinics, and laboratories across the globe. Our mission
              is to make high-quality healthcare technology accessible and
              affordable.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container py-14 md:py-20">
          <h2 className="text-center font-heading text-xl font-bold text-foreground md:text-2xl">
            Our Core Values
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-lg border border-border bg-card p-6 text-center shadow-card"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
