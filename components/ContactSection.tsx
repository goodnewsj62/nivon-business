import {
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section className="bg-background">
      <div className="container py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Get in Touch
          </p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-foreground md:text-3xl">
            Contact Us
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Have questions about our products? Need a custom quote? Reach out
            and our team will respond promptly.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-10 md:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <article className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Phone</h2>
                <a
                  href="tel:+2348068755208"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  +234 8068755208
                </a>
              </div>
            </article>
            <article className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Email</h2>
                <a
                  href="mailto:samuelstephen812@gmail.com "
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  samuelstephen812@gmail.com
                </a>
              </div>
            </article>
            <article className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Address
                </h2>
                <p className="text-sm text-muted-foreground">
                  19 okiti lane idumota lagos island
                </p>
              </div>
            </article>
            <article className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <MessageCircle className="text-accent" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  WhatsApp
                </h2>
                <a
                  href="https://wa.me/+2348068755208"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent"
                >
                  Chat with us
                </a>
              </div>
            </article>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-border shadow-card md:col-span-3">
            <Image
              src="/hero-medical.jpg"
              alt="Medical equipment and care setting"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 60vw, 100vw"
              priority
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-background/98 via-background/90 to-black/40"
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 text-primary">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/15">
                  <Headphones className="size-5" aria-hidden />
                </span>
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/15">
                  <Clock className="size-5" aria-hidden />
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Always available
              </p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-foreground md:text-3xl">
                24-hour support
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Call, email, or message us any time, we respond quickly so you
                can keep patient care moving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
