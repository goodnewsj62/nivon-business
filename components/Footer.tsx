import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">
                M
              </span>
            </div>
            <span className="font-heading text-lg font-bold text-foreground">
              MedEquip
            </span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Your trusted partner for high-quality medical equipment. Serving
            healthcare professionals since 2005.
          </p>
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
              "Diagnostic Equipment",
              "Surgical Equipment",
              "Lab Equipment",
              "Patient Monitoring",
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
              <a href="tel:+1234567890" className="hover:text-foreground">
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href="mailto:info@medequip.com"
                className="hover:text-foreground"
              >
                info@medequip.com
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                123 Medical Drive, Suite 100, Healthcare City, HC 12345
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MedEquip. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
