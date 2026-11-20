import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, TrendingDown, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { projects, categories, countFor, type Category, type Project } from "@/data/projects";

/** Savings pair, set in mono so the numbers read as instrumentation. The
 *  money figure is the inverted chip — it's the one thing on each card a
 *  scanning visitor should land on. */
const SavingsRow = ({ p, size = "sm" }: { p: Project; size?: "sm" | "md" }) => {
  const text = size === "sm" ? "text-[11.5px]" : "text-xs";
  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={`metric inline-flex items-center gap-1.5 rounded-md border border-foreground bg-foreground px-2.5 py-1 font-medium text-background ${text}`}
      >
        <TrendingDown size={12} aria-hidden />
        {p.savings.money}
      </span>
      <span
        className={`metric inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-1 px-2.5 py-1 text-muted-foreground ${text}`}
      >
        <Clock size={12} aria-hidden />
        {p.savings.time}
      </span>
    </div>
  );
};

/** The reveal/layout animation lives on the <article>; the hover lift lives
 *  on the card inside it. Framer writes an inline `transform` on the element
 *  it animates, which would silently override a CSS hover transform there. */
const ProjectCard = ({ p, onOpen }: { p: Project; onOpen: (from: HTMLElement) => void }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    className="h-full"
  >
    <div className="card-lift group flex h-full flex-col overflow-hidden">
      <button
        type="button"
        onClick={(e) => onOpen(e.currentTarget)}
        className="relative block aspect-[16/10] w-full overflow-hidden border-b border-border bg-surface-1 text-left focus-visible:-outline-offset-2"
        aria-label={`Open case study: ${p.title}`}
      >
        <img
          src={p.image}
          alt={`Workflow screenshot for ${p.title}`}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase leading-[1.3] tracking-[0.12em] text-foreground">
          {p.platform}
        </span>

        {/* Shown on hover, and for keyboard users when the card is focused. */}
        <span className="absolute bottom-3 right-3 flex translate-y-1 items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-[11.5px] font-medium leading-[1.3] text-background opacity-0 transition duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100">
          <Maximize2 size={11} aria-hidden /> View case study
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] uppercase leading-none tracking-[0.14em] text-muted-foreground">
          {p.discipline}
        </p>
        <h3 className="mt-3 text-[17px] font-semibold leading-snug text-foreground">
          {p.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {p.desc}
        </p>
        {/* mt-auto pins the savings row to the bottom edge, so it lines up
            across a row of cards whatever the title and description lengths. */}
        <div className="mt-auto pt-6">
          <div className="border-t border-border pt-5">
            <SavingsRow p={p} />
          </div>
        </div>
      </div>
    </div>
  </motion.article>
);

const CaseStudy = ({ p }: { p: Project }) => (
  <>
    <div className="overflow-hidden rounded-xl border border-border bg-surface-1">
      <img
        src={p.image}
        alt={`Workflow screenshot for ${p.title}`}
        loading="lazy"
        decoding="async"
        className="w-full"
      />
    </div>

    <div className="mt-8 grid gap-8 sm:grid-cols-2">
      <div>
        <h4 className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.18em] text-foreground">
          What it does
        </h4>
        <ul className="mt-4 space-y-2.5">
          {p.results.map((r) => (
            <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <Check size={15} className="mt-[3px] shrink-0 text-foreground" aria-hidden />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.18em] text-foreground">
            Impact
          </h4>
          <div className="mt-4">
            <SavingsRow p={p} size="md" />
          </div>
        </div>
        <div>
          <h4 className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.18em] text-foreground">
            Stack
          </h4>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.techStack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");
  const [open, setOpen] = useState<Project | null>(null);
  // The card that opened the dialog, so focus can go back to it on close.
  const opener = useRef<HTMLElement | null>(null);

  // No pagination. All 16 builds are the strongest asset on the site —
  // hiding 12 of them behind a pager was costing more than it saved.
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="section-padding relative bg-background">
      <div className="section-shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title">AI Automation Systems That Deliver Results</h2>
          </div>
          <p className="section-lede">
            Each project showcases a real automation solution, the workflow architecture,
            measurable outcomes, and the tools used to build it.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter projects by platform"
          className="mb-10 flex flex-wrap gap-2"
        >
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
                <span className="metric text-[11px] opacity-60">{countFor(cat)}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard
              key={p.slug}
              p={p}
              onOpen={(from) => {
                opener.current = from;
                setOpen(p);
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Radix dialog: focus trap, Escape and role="dialog" all handled — the
          previous hand-rolled portal had none of it. Radix only returns focus
          to a <DialogTrigger>, and these dialogs are opened from state, so
          focus is handed back to the opening card explicitly; otherwise a
          keyboard user is dropped at the top of the page on close. */}
      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent
          className="max-h-[90vh] max-w-3xl overflow-y-auto"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            opener.current?.focus();
          }}
        >
          {open && (
            <>
              <DialogHeader className="pr-8 text-left">
                <p className="font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-muted-foreground">
                  {open.discipline} · {open.platform}
                </p>
                <DialogTitle className="pt-2 text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-[1.75rem]">
                  {open.title}
                </DialogTitle>
                <DialogDescription className="pt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {open.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <CaseStudy p={open} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
