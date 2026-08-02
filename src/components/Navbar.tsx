import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection, usePrefersReducedMotion } from "@/hooks/use-motion";

const navLinks = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Process", href: "#process", id: "process" },
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
] as const;

/** Module scope so the reference stays stable across renders. */
const sectionIds = navLinks.map((l) => l.id);

const Brand = () => {
  const chipRef = useRef<HTMLAnchorElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pointRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const paint = useCallback(() => {
    frameRef.current = null;
    const el = chipRef.current;
    const rect = rectRef.current;
    if (!el || !rect) return;
    const nx = ((pointRef.current.x - rect.left) / rect.width) * 100;
    const ny = ((pointRef.current.y - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${nx.toFixed(1)}%`);
    el.style.setProperty("--my", `${ny.toFixed(1)}%`);
  }, []);

  const onEnter = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (reduced || e.pointerType !== "mouse") return;
      rectRef.current = chipRef.current?.getBoundingClientRect() ?? null;
    },
    [reduced]
  );

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (reduced || e.pointerType !== "mouse" || !rectRef.current) return;
      pointRef.current = { x: e.clientX, y: e.clientY };
      frameRef.current ??= requestAnimationFrame(paint);
    },
    [paint, reduced]
  );

  const onLeave = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    rectRef.current = null;
  }, []);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  return (
    <a
      ref={chipRef}
      href="#"
      className="brand-chip"
      aria-label="Francis Tom Say — AI Automation Specialist, back to top"
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="brand-glow" aria-hidden />
      <span className="brand-dot" aria-hidden>
        <span className="brand-dot-ping" />
        <span className="brand-dot-core" />
      </span>
      <span>
        <span className="brand-name">FRANCIS TOM SAY</span>
        <span className="brand-role">AI Automation Specialist</span>
      </span>
    </a>
  );
};

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

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface-2 focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="section-shell flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
          <Brand />

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-active={active === link.id}
                aria-current={active === link.id ? "true" : undefined}
                className="nav-link rounded-md px-3 py-2 text-[13px] font-medium"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary ml-3 px-4 py-2 text-[13px]">
              Book an audit
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="shrink-0 rounded-md p-1.5 text-foreground md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-lg md:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-active={active === link.id}
                    aria-current={active === link.id ? "true" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="nav-link rounded-md px-2 py-2.5 text-sm font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary mt-2 w-full"
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
