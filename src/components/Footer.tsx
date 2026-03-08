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

        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} FRANCIS TOM SAY. All rights reserved.
        </p>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_20px_rgba(0,255,138,0.4)] hover:shadow-[0_0_30px_rgba(0,255,138,0.6)] hover:scale-110 transition-all duration-300"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
