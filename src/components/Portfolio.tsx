import { useState } from "react";
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

/** Savings pair, set in mono so the numbers read as instrumentation. */
const SavingsRow = ({ p, size = "sm" }: { p: Project; size?: "sm" | "md" }) => {
  const text = size === "sm" ? "text-[11px]" : "text-xs";
  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={`metric inline-flex items-center gap-1.5 rounded-md border border-brand/25 bg-brand/10 px-2.5 py-1 font-medium text-brand-text ${text}`}
      >
        <TrendingDown size={12} aria-hidden />
        {p.savings.money}
      </span>
      <span
        className={`metric inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 text-muted-foreground ${text}`}
      >
        <Clock size={12} aria-hidden />
        {p.savings.time}
      </span>
    </div>
  );
};

const ProjectCard = ({ p, onOpen }: { p: Project; onOpen: () => void }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    className="card-lift group flex flex-col overflow-hidden"
  >
    <button
      type="button"
      onClick={onOpen}
      className="relative block aspect-[16/10] w-full overflow-hidden bg-surface-2 text-left"
      aria-label={`Open case study: ${p.title}`}
    >
      <img
        src={p.image}
        alt={`Workflow screenshot for ${p.title}`}
        width={800}
        height={500}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />

      <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md border border-border-strong bg-background/85 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-brand-text backdrop-blur-sm">
        {p.platform}
      </span>

      <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md border border-border-strong bg-background/85 px-2 py-1 font-mono text-[10px] text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
        <Maximize2 size={11} aria-hidden /> View case study
      </span>
    </button>

    <div className="flex flex-1 flex-col p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
        {p.discipline}
      </p>
      <h3 className="mt-2 font-display text-[15px] font-semibold leading-snug text-foreground">
        {p.title}
      </h3>
      <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
        {p.desc}
      </p>
      <div className="mt-4 pt-4 border-t border-border">
        <SavingsRow p={p} />
      </div>
    </div>
  </motion.article>
);

const CaseStudy = ({ p }: { p: Project }) => (
  <>
    <div className="overflow-hidden rounded-lg border border-border bg-surface-2">
      <img
        src={p.image}
        alt={`Workflow screenshot for ${p.title}`}
        loading="lazy"
        decoding="async"
        className="w-full"
      />
    </div>

    <div className="mt-6 grid gap-6 sm:grid-cols-2">
      <div>
        <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-text">
          What it does
        </h4>
        <ul className="mt-3 space-y-2">
          {p.results.map((r) => (
            <li key={r} className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
              <Check size={14} className="mt-[3px] shrink-0 text-brand-text" aria-hidden />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-text">
            Impact
          </h4>
          <div className="mt-3">
            <SavingsRow p={p} size="md" />
          </div>
        </div>
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-text">
            Stack
          </h4>
          <div className="mt-3 flex flex-wrap gap-1.5">
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

  // No pagination. All 16 builds are the strongest asset on the site —
  // hiding 12 of them behind a pager was costing more than it saved.
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="section-padding relative">
      <div className="section-shell">
        <div className="mb-10 text-center">
          <p className="eyebrow">Selected work</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            AI Automation Systems That Deliver Results
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Each project showcases a real automation solution, the workflow architecture,
            measurable outcomes, and the tools used to build it.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter projects by platform"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "border-brand/50 bg-brand/12 text-brand-text"
                    : "border-border bg-surface-1 text-muted-foreground hover:border-border-strong hover:text-foreground"
                }`}
              >
                {cat}
                <span className="metric text-[10px] opacity-60">{countFor(cat)}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} p={p} onOpen={() => setOpen(p)} />
          ))}
        </motion.div>
      </div>

      {/* Radix dialog: focus trap, Escape, restore-focus and role="dialog"
          all handled — the previous hand-rolled portal had none of it. */}
      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-surface-1">
          {open && (
            <>
              <DialogHeader className="text-left">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-text">
                  {open.discipline} · {open.platform}
                </p>
                <DialogTitle className="mt-2 font-display text-xl font-semibold">
                  {open.title}
                </DialogTitle>
                <DialogDescription className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {open.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-5">
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
