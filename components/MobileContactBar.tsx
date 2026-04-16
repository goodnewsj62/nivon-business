import { MessageCircle, Phone } from "lucide-react";

const MobileContactBar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-card md:hidden">
    <a
      href="tel:+2348068755208"
      className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-medium text-primary transition-colors active:bg-secondary"
    >
      <Phone className="h-4 w-4" />
      Call Now
    </a>
    <div className="w-px bg-border" />
    <a
      href="https://wa.me/2348068755208"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-medium text-accent transition-colors active:bg-secondary"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp
    </a>
  </div>
);

export default MobileContactBar;
