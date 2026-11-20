import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/use-motion";

const navLinks = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Process", href: "#process", id: "process" },
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
] as const;

/** Module scope so the reference stays stable across renders. */
const sectionIds = navLinks.map((l) => l.id);

const Brand = () => (
  <a
    href="#"
    className="brand"
    aria-label="Francis Tom Say — AI Automation Specialist, back to top"
  >
    <span className="status-dot" aria-hidden>
      <span className="status-ping" />
      <span className="status-core" />
    </span>
    <span>
      <span className="brand-name">FRANCIS TOM SAY</span>
      <span className="brand-role">AI Automation Specialist</span>
    </span>
  </a>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't let the page scroll behind an open mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape closes the menu, and it can't stay open once the layout has
  // switched to the horizontal desktop navigation.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [mobileOpen]);

  /** Closing the menu re-renders the header in the same tick as the browser's
   *  own jump to the anchor, and that cancels the smooth scroll before it
   *  starts — the menu closed but the page stayed where it was. So the jump
   *  is made explicitly, once the close has been committed. The link's href
   *  still does its normal job of updating the URL. */
  const closeAndGo = (id: string) => () => {
    setMobileOpen(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    );
  };

  const solid = scrolled || mobileOpen;

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-foreground focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
          solid
            ? "border-border bg-background/90 backdrop-blur-xl"
            : "border-transparent bg-background/0"
        }`}
      >
        {/* Gutter on the nav, max-width on the row inside it — the same
            nesting every section uses, so the brand lines up with the
            left edge of the content below. */}
        <nav className="gutter">
          <div className="section-shell flex h-16 items-center justify-between gap-4 lg:h-[72px]">
            <Brand />

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-active={active === link.id}
                  aria-current={active === link.id ? "true" : undefined}
                  className="nav-link rounded-md px-3 py-2.5 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="btn-primary btn-sm ml-5">
                Book an audit
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] text-foreground transition-colors duration-200 hover:bg-surface-1 lg:hidden"
            >
              {mobileOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-border bg-background lg:hidden"
            >
              <div className="gutter flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto pb-6 pt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-active={active === link.id}
                    aria-current={active === link.id ? "true" : undefined}
                    onClick={closeAndGo(link.id)}
                    className="flex min-h-[52px] items-center justify-between border-b border-border text-base font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground data-[active=true]:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={closeAndGo("contact")}
                  className="btn-primary btn-lg mt-6 w-full"
                >
                  Book an audit
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
