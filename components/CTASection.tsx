import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Link from "next/link";

const CTASection = () => (
  <section className="bg-primary">
    <div className="container mx-auto py-16 text-center md:py-20">
      <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
        Ready to Equip Your Facility?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80 md:text-base">
        Get in touch with our team to discuss your medical equipment needs. We
        offer personalized consultations and competitive quotes.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/contact">
          <Button
            size="lg"
            variant="secondary"
            className="w-full gap-2 sm:w-auto"
          >
            Request a Quote
          </Button>
        </Link>
        <a href="tel:+1234567890">
          <Button
            size="lg"
            variant="outline"
            className="w-full gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </Button>
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
