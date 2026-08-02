import { useCallback, useEffect, useRef, useState } from "react";
import { MapPin, Clock3 } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-motion";

/** Save the headshot to public/images/francis.jpg. If it's missing, onError
 *  swaps in the initials block so the card never shows a broken image. */
const PHOTO = "/images/francis.jpg";

const MAX_TILT = 5; // degrees, per spec
const PARALLAX = 10; // px the image drifts against the cursor

const facts = [
  { icon: MapPin, label: "Philippines · works with clients worldwide" },
  { icon: Clock3, label: "Available across US, EU and APAC hours" },
];

const ProfileCard = () => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pointRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const [photoOk, setPhotoOk] = useState(true);
  const reduced = usePrefersReducedMotion();

  const paint = useCallback(() => {
    frameRef.current = null;
    const el = tiltRef.current;
    const rect = rectRef.current;
    if (!el || !rect) return;

    // Normalised 0..1 position within the card.
    const nx = (pointRef.current.x - rect.left) / rect.width;
    const ny = (pointRef.current.y - rect.top) / rect.height;

    // Signed -1..1 from centre.
    const dx = nx * 2 - 1;
    const dy = ny * 2 - 1;

    const set = el.style.setProperty.bind(el.style);
    set("--rx", `${(-dy * MAX_TILT).toFixed(2)}deg`);
    set("--ry", `${(dx * MAX_TILT).toFixed(2)}deg`);
    set("--mx", `${(nx * 100).toFixed(1)}%`);
    set("--my", `${(ny * 100).toFixed(1)}%`);
    // Opposite the cursor, for parallax against the card's own tilt.
    set("--px", `${(-dx * PARALLAX).toFixed(2)}px`);
    set("--py", `${(-dy * PARALLAX).toFixed(2)}px`);
    // 1 at centre → 0 at the corners; drives glow intensity.
    set("--lit", (1 - Math.min(1, Math.hypot(dx, dy) / 1.414)).toFixed(3));
  }, []);

  const handleEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Touch and pen would leave the card stuck mid-tilt after a tap.
      if (reduced || e.pointerType !== "mouse") return;
      // Cached once per hover: reading it per-move would measure the card's own
      // live transform and feed it back into the tilt, which is what makes
      // these effects jitter.
      rectRef.current = tiltRef.current?.getBoundingClientRect() ?? null;
    },
    [reduced]
  );

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || e.pointerType !== "mouse" || !rectRef.current) return;
      pointRef.current = { x: e.clientX, y: e.clientY };
      // One write per frame, never per event.
      frameRef.current ??= requestAnimationFrame(paint);
    },
    [paint, reduced]
  );

  const handleLeave = useCallback(() => {
    const el = tiltRef.current;
    if (!el) return;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    rectRef.current = null;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
    el.style.setProperty("--lit", "0");
  }, []);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  return (
    <div className="pc-scene mx-auto w-full max-w-[320px]">
      <div
        ref={tiltRef}
        className="pc-tilt"
        onPointerEnter={handleEnter}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <div className="pc">
          <div className="pc-glow" aria-hidden />
          <div className="pc-shadow" aria-hidden />

          <div className="pc-surface">
            <div className="pc-photo">
              {photoOk ? (
                <>
                  <img
                    src={PHOTO}
                    alt="Francis Tom Say"
                    width={320}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    onError={() => setPhotoOk(false)}
                  />
                  <div className="pc-scrim" aria-hidden />
                  <div className="pc-shine" aria-hidden />
                </>
              ) : (
                <div className="grid-field flex h-full w-full items-center justify-center">
                  <span
                    aria-hidden
                    className="font-display text-6xl font-semibold tracking-tight text-brand-text/30"
                  >
                    FT
                  </span>
                  <span className="sr-only">Photo coming soon</span>
                </div>
              )}
            </div>

            <div className="pc-meta">
              <p className="pc-name font-display text-sm font-semibold text-foreground">
                Francis Tom Say
              </p>
              <p className="pc-role mt-0.5 font-mono text-[11px] text-muted-foreground">
                AI Automation Specialist
              </p>

              <ul className="mt-3.5 space-y-1.5 border-t border-border pt-3.5">
                {facts.map((f) => (
                  <li
                    key={f.label}
                    className="pc-fact flex items-start gap-2 text-[11px] leading-snug text-muted-foreground"
                  >
                    <f.icon size={12} className="mt-[2px] shrink-0 text-brand-text" aria-hidden />
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pc-ring" aria-hidden />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
