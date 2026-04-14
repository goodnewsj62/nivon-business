import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact MedEquip for product availability, custom quotes, and medical equipment consultations.",
};

export default function ContactPage() {
  return <ContactSection />;
}
