import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nivon.example"),
  title: {
    default: "Nivon | Trusted Medical Equipment Supplier",
    template: "%s | Nivon",
  },
  description:
    "Nivon supplies reliable diagnostic, surgical, laboratory, and monitoring equipment for hospitals and clinics across Africa.",
  keywords: [
    "medical equipment",
    "hospital equipment supplier",
    "diagnostic equipment",
    "surgical equipment",
    "Africa healthcare",
  ],
  openGraph: {
    title: "Nivon | Trusted Medical Equipment Supplier",
    description:
      "High-quality medical equipment supply for hospitals, clinics, and laboratories across Africa.",
    url: "https://www.nivon.example",
    siteName: "Nivon",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/hero-medical.jpg",
        width: 1200,
        height: 630,
        alt: "Modern medical equipment in a clinical environment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivon | Trusted Medical Equipment Supplier",
    description:
      "Reliable medical equipment for healthcare facilities across Africa.",
    images: ["/hero-medical.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full ">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
