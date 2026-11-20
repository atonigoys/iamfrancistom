import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-motion";

const steps = [
  {
    n: 1,
    title: "Audit",
    dur: "Free · 30 min",
    desc: "We walk through your current process end to end and find where the hours actually go.",
    out: "A ranked list of what's worth automating, and what it's worth per month.",
  },
  {
    n: 2,
    title: "Design",
    dur: "2–3 days",
    desc: "I map the workflow, confirm the integrations, and agree the edge cases before anything gets built.",
    out: "A workflow diagram and a fixed scope you sign off on.",
  },
  {
    n: 3,
    title: "Build & test",
    dur: "1–2 weeks",
    desc: "The system gets built, run against your real data, and hardened against the failure cases.",
    out: "A working automation you can watch run on live inputs.",
  },
  {
    n: 4,
    title: "Handover",
    dur: "Ongoing",
    desc: "You get documentation and a walkthrough, so the system is yours — not something you rent from me.",
    out: "Docs, credentials, a loom walkthrough, and 30 days of support.",
  },
];

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/** Counts 0 → n once, on the caller telling it to start. Reduced-motion
 *  visitors get the final value immediately rather than a silent no-op. */
const StepNumber = ({ to, start }: { to: number; start: boolean }) => {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    // `reduced` resolves one tick after mount (see usePrefersReducedMotion),
    // so on a reduced-motion system the initial `useState` above still picks
    // the pre-resolution branch. Snap here instead of just skipping the
    // animation, or the number is stuck at its initial value forever.
    if (reduced) {
      setValue(to);
      return;
    }
    if (!start) return;
    let raf: number;
    const duration = 650;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setValue(Math.round(easeOutCubic(p) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, reduced]);

  return <span className="proc-num">{String(value).padStart(2, "0")}</span>;
};

const Process = () => {
  const [started, setStarted] = useState<boolean[]>(() => steps.map(() => false));

  const trigger = (i: number) =>
    setStarted((prev) => (prev[i] ? prev : prev.map((v, idx) => (idx === i ? true : v))));

  return (
    <section id="process" className="section-padding relative bg-surface-1">
      <div className="section-shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="section-title">From first call to handover</h2>
          </div>
          <p className="section-lede">
            No surprises and no lock-in. You know the scope before the build starts, and you
            own the system after it ships.
          </p>
        </div>

        {/* One panel, four steps. As in Services, the cell stays opaque and
            only its contents animate in. */}
        <ol className="panel-grid md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className="panel-cell">
              {/* Progress line: each cell draws its own left-to-right segment
                  along the panel's top edge, each delayed a little more than
                  the last, so the row reads as one continuous line drawing
                  across it. Only shown at lg, where the 4 steps share a row. */}
              <span
                className="proc-rail hidden lg:block"
                data-play={started[i]}
                style={{ transitionDelay: `${i * 180}ms` }}
                aria-hidden
              />

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onViewportEnter={() => trigger(i)}
                className="flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <StepNumber to={s.n} start={started[i]} />
                  <span className="metric rounded-full border border-border bg-surface-1 px-2.5 py-1 text-[10.5px] uppercase leading-[1.3] tracking-wider text-muted-foreground">
                    {s.dur}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-semibold leading-snug text-foreground">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{s.desc}</p>

                {/* mt-auto pins this block to the bottom of the cell, and the
                    outcome reserves three lines where the steps share a row —
                    together they keep the "You get" rule on one line across
                    all four steps, however long each description runs. */}
                <p className="mt-auto pt-7 text-sm leading-relaxed text-muted-foreground">
                  <span className="mb-2.5 block border-t border-border pt-5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.18em] text-foreground">
                    You get
                  </span>
                  <span className="block lg:min-h-[4.875em]">{s.out}</span>
                </p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
