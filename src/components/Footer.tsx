import { Linkedin, Github, Twitter, type LucideIcon } from "lucide-react";

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

const Brand = () => (
  <div className="tip-host relative">
    <div className="flex items-start gap-3">
      <span className="status-dot mt-[7px] h-2 w-2">
        <span className="status-ping" aria-hidden />
        <span className="status-core" aria-hidden />
        <span className="tip">Available for new automation projects.</span>
      </span>

      <span>
        <span className="block text-[22px] font-bold leading-[1.1] tracking-[0.01em] text-foreground">
          FRANCIS TOM SAY
        </span>
        <span className="mt-1.5 block font-mono text-xs font-medium uppercase leading-[1.1] tracking-[0.16em] text-muted-foreground">
          AI Automation Specialist
        </span>
      </span>
    </div>

    {/* Left margin clears the status-dot column (8px dot + 12px gap) so the
        paragraph hangs flush with the name above it. */}
    <p className="ml-5 mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
      I build AI automation systems that eliminate repetitive work, streamline
      operations, and help businesses scale using n8n, Make, Zapier, and AI.
    </p>
  </div>
);

/** Dark, and directly below the dark contact section: together they close
 *  the page as one black block, split only by a hairline. */
const Footer = () => (
  <footer className="theme-dark gutter relative border-t border-border bg-background pb-10 pt-16 text-foreground">
    <div className="section-shell">
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div>
          <Brand />

          <ul className="ml-5 mt-8 flex flex-wrap gap-2.5">
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
                      className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-border text-muted-foreground transition-colors duration-200 ease-out hover:border-foreground hover:bg-foreground hover:text-background"
                    >
                      {s.icon ? (
                        <s.icon size={19} strokeWidth={1.75} aria-hidden />
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

        <nav aria-label="Footer" className="ml-5 md:ml-0">
          <ul className="grid grid-cols-2 gap-x-14">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-14 flex flex-col gap-2 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Francis Tom Say
        </p>
        <p className="font-mono text-[11px] text-muted-foreground">
          Built with React, Tailwind &amp; Vite
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
