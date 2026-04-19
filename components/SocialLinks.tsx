import { cn } from "@/lib/utils";
import Image from "next/image";

const SOCIAL_LINKS = [
  {
    href: "https://www.tiktok.com/@nivonnigerialtd",
    label: "Nivon on TikTok",
    iconSrc: "/social-icons/icons8-tiktok.svg",
  },
  {
    href: "https://t.me/nivon_nigerialimited",
    label: "Nivon on Telegram",
    iconSrc: "/social-icons/icons8-telegram-app.svg",
  },
  {
    href: "https://www.facebook.com/NivonNigeriaLimited",
    label: "Nivon on Facebook",
    iconSrc: "/social-icons/icons8-facebook.svg",
  },
  {
    href: "https://www.linkedin.com/in/stephen-igwe",
    label: "Stephen Igwe on LinkedIn",
    iconSrc: "/social-icons/icons8-linkedin.svg",
  },
] as const;

type SocialLinksProps = {
  className?: string;
  /** Slightly larger controls for the home hero */
  variant?: "default" | "hero";
};

export function SocialLinks({ className, variant = "default" }: SocialLinksProps) {
  const btn =
    variant === "hero" ? "h-11 w-11" : "h-9 w-9";
  const img = variant === "hero" ? "h-5 w-5" : "h-4 w-4";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {SOCIAL_LINKS.map(({ href, label, iconSrc }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary/40 hover:opacity-90",
            btn,
          )}
          aria-label={label}
        >
          <Image
            src={iconSrc}
            alt=""
            width={24}
            height={24}
            unoptimized
            className={cn("object-contain", img)}
          />
        </a>
      ))}
    </div>
  );
}
