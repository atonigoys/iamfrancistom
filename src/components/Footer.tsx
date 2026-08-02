import { useCallback, useEffect, useRef } from "react";
import { Linkedin, Github, Twitter, type LucideIcon } from "lucide-react";
import { usePrefersReducedMotion, useRipple } from "@/hooks/use-motion";

interface Social {
  label: string;
  /** null keeps the entry unrendered — the original footer shipped four dead
   *  href="#" links, which is worse than showing none. */
  href: string | null;
  icon?: LucideIcon;
  /** Fallback mark for brands with no usable icon. */
  glyph?: string;
}

/* TODO(assets): GitHub and X are still placeholders — supply the URLs and
   they appear automatically. */
const socials: Social[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/francis-lee-say/",
    icon: Linkedin,
  },
  {
    label: "OnlineJobs.ph",
    href: "https://v2.onlinejobs.ph/jobseekers/info/3779403",
    // OnlineJobs.ph publishes no usable mark — their only public asset is a
    // 16px favicon that's illegible at any size — so this is a typographic
    // tile in our own system rather than a bad approximation of their logo.
    glyph: "OJ",
  },
  { label: "GitHub", href: null, icon: Github },
  { label: "X", href: null, icon: Twitter },
];

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Brand = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pointRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const paint = useCallback(() => {
    frameRef.current = null;
    const el = hostRef.current;
    const rect = rectRef.current;
    if (!el || !rect) return;
    const nx = ((pointRef.current.x - rect.left) / rect.width) * 100;
    const ny = ((pointRef.current.y - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${nx.toFixed(1)}%`);
    el.style.setProperty("--my", `${ny.toFixed(1)}%`);
  }, []);

  const onEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || e.pointerType !== "mouse") return;
      rectRef.current = hostRef.current?.getBoundingClientRect() ?? null;
    },
    [reduced]
  );

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
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
    <div
      ref={hostRef}
      className="fb-brand"
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="fb-highlight" aria-hidden />

      <div className="flex items-start gap-3">
        <span className="fb-status">
          <span className="fb-ping" aria-hidden />
          <span className="fb-core" aria-hidden />
          <span className="fb-tip">Available for new automation projects.</span>
        </span>

        <span>
          <span className="fb-name">FRANCIS TOM SAY</span>
          <span className="fb-role">AI Automation Specialist</span>
        </span>
      </div>

      <p className="fb-desc">
        I build AI automation systems that eliminate repetitive work, streamline
        operations, and help businesses scale using n8n, Make, Zapier, and AI.
      </p>
    </div>
  );
};

const Footer = () => {
  const reduced = usePrefersReducedMotion();
  const ripple = useRipple(reduced);

  return (
    <footer className="relative overflow-hidden px-5 pb-12 pt-14 sm:px-6">
      <div className="fb-divider absolute inset-x-0 top-0" aria-hidden />
      <div className="fb-aura" aria-hidden />

      <div className="section-shell relative">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Brand />

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {socials
                .filter((s): s is Social & { href: string } => s.href !== null)
                .map((s) => {
                  const external = s.href.startsWith("http");
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        aria-label={s.label}
                        title={s.label}
                        className="fs-btn"
                        onPointerDown={ripple}
                      >
                        {s.icon ? (
                          <s.icon size={20} aria-hidden />
                        ) : (
                          <span
                            aria-hidden
                            className="font-mono text-[13px] font-semibold leading-none"
                          >
                            {s.glyph}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13px] text-[#a1a1aa] transition-colors duration-200 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-muted-foreground/70">
            © {new Date().getFullYear()} Francis Tom Say
          </p>
          <p className="font-mono text-[11px] text-muted-foreground/70">
            Built with React, Tailwind &amp; Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
