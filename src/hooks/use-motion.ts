import { useCallback, useEffect, useRef, useState } from "react";

/** True when the visitor has asked the OS to reduce motion. Kept as a hook
 *  rather than a CSS-only concern because the pointer-tracking effects are
 *  driven from JS and need to be skipped entirely, not just un-animated. */
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
};

/** Fires once when the element first enters the viewport, then stops
 *  observing. Scroll animations are driven by the returned flag toggling a
 *  class, so the animation itself stays in CSS on the compositor. */
export const useInView = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // SSR/older browsers: show the content rather than hiding it forever.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
};

/** Cursor-reactive tilt + glow position, shared by every glass card on the
 *  site (Services, Process, Certificates, Experience, ProfileCard). Writes
 *  `--rx/--ry` (tilt, skipped entirely when `maxTilt` is 0) and `--mx/--my`
 *  (cursor position in %) onto the returned ref as CSS custom properties —
 *  never through React state, so pointer movement causes zero re-renders.
 *
 *  The rect is measured once on pointer-enter, not on every move: reading
 *  layout while the element's own hover transform is applied would measure
 *  the transformed box and feed it back into the tilt, which is what makes
 *  this kind of effect oscillate. */
export const useTiltGlow = <T extends HTMLElement>(maxTilt: number, reduced: boolean) => {
  const ref = useRef<T | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pointRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  const paint = useCallback(() => {
    frameRef.current = null;
    const el = ref.current;
    const rect = rectRef.current;
    if (!el || !rect) return;

    const nx = (pointRef.current.x - rect.left) / rect.width;
    const ny = (pointRef.current.y - rect.top) / rect.height;
    const set = el.style.setProperty.bind(el.style);
    set("--mx", `${(nx * 100).toFixed(1)}%`);
    set("--my", `${(ny * 100).toFixed(1)}%`);

    if (maxTilt > 0) {
      const dx = nx * 2 - 1;
      const dy = ny * 2 - 1;
      set("--rx", `${(-dy * maxTilt).toFixed(2)}deg`);
      set("--ry", `${(dx * maxTilt).toFixed(2)}deg`);
    }
  }, [maxTilt]);

  const onPointerEnter = useCallback(
    (e: React.PointerEvent<T>) => {
      if (reduced || e.pointerType !== "mouse") return;
      rectRef.current = ref.current?.getBoundingClientRect() ?? null;
    },
    [reduced]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (reduced || e.pointerType !== "mouse" || !rectRef.current) return;
      pointRef.current = { x: e.clientX, y: e.clientY };
      frameRef.current ??= requestAnimationFrame(paint);
    },
    [paint, reduced]
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    rectRef.current = null;
    if (el && maxTilt > 0) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
  }, [maxTilt]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  return { ref, onPointerEnter, onPointerMove, onPointerLeave };
};

/** Click ripple that originates at the pointer and removes itself. The host
 *  element needs `position: relative` and `overflow: hidden`. */
export const useRipple = (disabled = false) =>
  useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (disabled) return;
      const host = e.currentTarget;
      const rect = host.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
      host.appendChild(ripple);
    },
    [disabled]
  );

/** Reports which section id is currently under the top of the viewport, for
 *  highlighting the matching nav link. `ids` must be a stable reference —
 *  define it at module scope, not inline in render. */
export const useActiveSection = (ids: readonly string[]) => {
  const [active, setActive] = useState<string | null>(null);
  const seen = useRef(new Map<string, boolean>());

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.current.set(e.target.id, e.isIntersecting));
        // First in document order wins, so overlapping sections resolve to
        // the higher one rather than flickering between them.
        setActive(ids.find((id) => seen.current.get(id)) ?? null);
      },
      // A band across the upper-middle of the viewport.
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
};
