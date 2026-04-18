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

/** Canonical site origin — use absolute asset URLs for OG/Twitter (WhatsApp, Facebook). */
const siteOrigin = "https://nivonuk.com";
const socialBannerUrl = `${siteOrigin}/niv-banner.jpg`;
/** Matches `public/niv-banner.jpg` (Facebook/WhatsApp validate against real dimensions). */
const socialBannerWidth = 640;
const socialBannerHeight = 640;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Nivon | Trusted Medical Equipment Supplier",
    template: "%s | Nivon",
  },
  description:
    "Nivon supplies reliable diagnostic, surgical, laboratory, monitoring, ophthalmology, and physiotherapy equipment for hospitals and clinics across Africa.",
  keywords: [
    "medical equipment",
    "hospital equipment supplier",
    "diagnostic equipment",
    "surgical equipment",
    "ophthalmology equipment",
    "physiotherapy equipment",
    "Africa healthcare",
  ],
  openGraph: {
    title: "Nivon | Trusted Medical Equipment Supplier",
    description:
      "High-quality diagnostic, surgical, laboratory, monitoring, ophthalmology, and physiotherapy equipment for hospitals and clinics across Africa.",
    url: siteOrigin,
    siteName: "Nivon",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: socialBannerUrl,
        width: socialBannerWidth,
        height: socialBannerHeight,
        alt: "Modern medical equipment in a clinical environment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nivon | Trusted Medical Equipment Supplier",
    description:
      "Reliable diagnostic, surgical, laboratory, monitoring, ophthalmology, and physiotherapy equipment for healthcare facilities across Africa.",
    images: [socialBannerUrl],
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
