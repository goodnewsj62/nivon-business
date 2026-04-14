import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold text-foreground">404</h1>
      <p className="mt-3 text-muted-foreground">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 text-primary underline hover:text-primary/90">
        Return to Home
      </Link>
    </div>
  );
}
