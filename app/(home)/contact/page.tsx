import ContactSection from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Nivon for product availability, custom quotes, and consultations on diagnostic, surgical, laboratory, monitoring, ophthalmology, and physiotherapy equipment.",
};

export default function ContactPage() {
  return <ContactSection />;
}
