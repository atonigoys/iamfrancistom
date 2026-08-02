import { useMemo } from "react";
import { usePrefersReducedMotion, useTiltGlow } from "@/hooks/use-motion";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max 3D tilt in degrees. 0 (default) disables tilt but keeps the
   *  cursor-follow highlight — used for cards the spec doesn't ask to tilt. */
  tilt?: number;
  /** One-shot diagonal light sweep, replayed on each hover entry. */
  shine?: boolean;
  /** Content wrapper classes (padding, layout) — kept separate from the
   *  card's own visual classes so callers never fight the glass styling. */
  className?: string;
}

/** Shared glass-panel treatment for every content card on the site:
 *  translucent surface, ambient ring light, cursor-tracked highlight, a
 *  slow rotating border sweep, and a pre-rendered hover shadow cross-faded
 *  by opacity. See index.css `.gc-*` for the implementation — this
 *  component only wires up the DOM structure and the pointer handlers. */
const GlassCard = ({
  tilt = 0,
  shine = false,
  className,
  children,
  ...rest
}: GlassCardProps) => {
  const reduced = usePrefersReducedMotion();
  const { ref, onPointerEnter, onPointerMove, onPointerLeave } = useTiltGlow<HTMLDivElement>(
    tilt,
    reduced
  );

  // Random-ish but stable per mount, so the rotating border rings on a grid
  // of cards don't all animate in perfect lockstep.
  const spinDelay = useMemo(() => `${(Math.random() * -9).toFixed(2)}s`, []);

  return (
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
          <div {...rest} className="gc-card">
            <span className="gc-hover-shadow" aria-hidden />
            <span className="gc-border" style={{ "--spin-delay": spinDelay } as React.CSSProperties} aria-hidden />
            <span className="gc-sheen" aria-hidden />
            <span className="gc-topline" aria-hidden />
            <span className="gc-cursor" aria-hidden />
            {shine && <span className="gc-shine" aria-hidden />}
            <div className={className}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
