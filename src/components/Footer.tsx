import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-primary/50 py-12 px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-heading text-lg font-bold tracking-tight text-foreground">
          FRANCIS <span className="text-primary">TOM SAY</span>
        </a>

        <div className="flex items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} FRANCIS TOM SAY. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_16px_rgba(0,255,138,0.4)] hover:shadow-[0_0_24px_rgba(0,255,138,0.6)] hover:scale-110 transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
