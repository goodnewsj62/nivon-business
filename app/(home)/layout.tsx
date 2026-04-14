import Footer from "@/components/Footer";
import MobileContactBar from "@/components/MobileContactBar";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col pb-14 md:pb-0">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}
