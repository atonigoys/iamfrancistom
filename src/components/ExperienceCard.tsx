import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { usePrefersReducedMotion, useRipple, useTiltGlow } from "@/hooks/use-motion";
import type { Role } from "@/data/experience";

const MAX_TILT = 4;
const STAGGER = 100; // ms between items
const BULLET_STAGGER = 60;

interface Props {
  role: Role;
  index: number;
  inView: boolean;
}

const ExperienceCard = ({ role, index, inView }: Props) => {
  const reduced = usePrefersReducedMotion();
  const { ref, onPointerEnter, onPointerMove, onPointerLeave } = useTiltGlow<HTMLDivElement>(
    MAX_TILT,
    reduced
  );
  const onTagPointerDown = useRipple(reduced);
  const spinDelay = useMemo(() => `${(Math.random() * -9).toFixed(2)}s`, []);

  const base = index * STAGGER;

  return (
    <li
      className={`xp-item relative pb-11 pl-9 last:pb-0 ${inView ? "is-in" : ""}`}
      style={{ "--d": `${base}ms` } as React.CSSProperties}
    >
      <span className="xp-node" data-active={index === 0} aria-hidden>
        <span className="xp-node-halo" style={{ "--halo-delay": `${index * 900}ms` } as React.CSSProperties} />
        <span className="xp-node-dot" />
      </span>

      <div className="gc-wrap">
        <span className="gc-aura" aria-hidden />
        <div className="gc-scene">
          <div
            ref={ref}
            className="gc-tilt"
            onPointerEnter={onPointerEnter}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
          >
            <article className="gc-card">
              <span className="gc-hover-shadow" aria-hidden />
              <span
                className="gc-border"
                style={{ "--spin-delay": spinDelay } as React.CSSProperties}
                aria-hidden
              />
              <span className="gc-sheen" aria-hidden />
              <span className="gc-topline" aria-hidden />
              <span className="gc-cursor" aria-hidden />

              <div className="xp-body">
                <p className="metric text-[11px] uppercase tracking-[0.14em] text-brand-text">
                  {role.period}
                </p>

                <h3
                  className="xp-title mt-2 font-display text-lg font-semibold text-foreground"
                  style={{ "--td": `${base + 90}ms` } as React.CSSProperties}
                >
                  {role.title}
                </h3>

                {role.company && (
                  <p className="xp-company mt-1.5 font-mono text-[12px] text-muted-foreground">
                    <ArrowRight className="xp-arrow" size={12} aria-hidden />
                    {role.company}
                  </p>
                )}

                {role.desc && (
                  <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
                    {role.desc}
                  </p>
                )}

                {role.bullets && (
                  <ul className="xp-bullets mt-4 max-w-2xl space-y-2">
                    {role.bullets.map((b, bi) => (
                      <li
                        key={b}
                        className="xp-bullet pl-4 text-[14px] leading-relaxed text-muted-foreground"
                        style={
                          { "--bd": `${base + 200 + bi * BULLET_STAGGER}ms` } as React.CSSProperties
                        }
                      >
                        <span className="xp-bullet-dot" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {role.focus.map((f) => (
                    <span key={f} className="chip xp-tag" onPointerDown={onTagPointerDown}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ExperienceCard;
