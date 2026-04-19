import { SocialLinks } from "@/components/SocialLinks";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/nivon.png"
              alt="Nivon logo"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
            <span className="text-center font-heading text-xl font-bold text-foreground relative -left-10">
              Nivon
            </span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Your trusted partner for high-quality medical equipment—including
            ophthalmology and physiotherapy. Serving healthcare professionals
            since 2021.
          </p>
          <h4 className="mt-8 font-heading text-sm font-semibold text-foreground">
            Follow us
          </h4>
          <SocialLinks className="mt-3" />
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground">
            Quick Links
          </h4>
          <ul className="mt-3 space-y-2">
            {[
              { label: "Home", path: "/" },
              { label: "Products", path: "/products" },
              { label: "About Us", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground">
            Product Categories
          </h4>
          <ul className="mt-3 space-y-2">
            {[
              "Ophthalmology",
              "Physiotherapy",
              "Surgical Equipment",
              "Lab Equipment",
            ].map((cat) => (
              <li key={cat}>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground">
            Contact Us
          </h4>
          <ul className="mt-3 space-y-3">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href="tel:+2348068755208" className="hover:text-foreground">
                +234 8068755208
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href="mailto:samuelstephen812@gmail.com "
                className="hover:text-foreground"
              >
                samuelstephen812@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>19 okiti lane idumota lagos island</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nivon. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
