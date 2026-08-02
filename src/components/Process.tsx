import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-motion";
import GlassCard from "./GlassCard";

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
    <section id="process" className="section-padding relative">
      <div className="section-shell">
        <div className="mb-12 text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            From first call to handover
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            No surprises and no lock-in. You know the scope before the build starts, and you
            own the system after it ships.
          </p>
        </div>

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onViewportEnter={() => trigger(i)}
            >
              <GlassCard className="flex h-full flex-col p-6">
                {/* Connector: each card draws its own left-to-right segment,
                    in the same left-to-right stagger as the cards themselves,
                    so the row reads as one continuous line drawing across it.
                    Only shown at lg, where the 4 steps share a single row. */}
                <span
                  className="proc-rail hidden lg:block"
                  data-play={started[i]}
                  aria-hidden
                />

                <div className="flex items-baseline justify-between gap-3">
                  <StepNumber to={s.n} start={started[i]} />
                  <span className="metric text-[10px] uppercase tracking-wider text-muted-foreground/70">
                    {s.dur}
                  </span>
                </div>

                <h3 className="gc-title mt-4 font-display text-base">{s.title}</h3>
                <p className="gc-desc mt-2 max-w-[30ch] text-[13px]">{s.desc}</p>

                <p className="mt-4 border-t border-white/[0.08] pt-4 text-[12px] leading-relaxed text-white/60">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-brand-text">
                    You get
                  </span>
                  <br />
                  {s.out}
                </p>
              </GlassCard>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
