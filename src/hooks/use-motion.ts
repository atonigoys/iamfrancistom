import { useEffect, useRef, useState } from "react";

/** True when the visitor has asked the OS to reduce motion. Kept as a hook
 *  rather than a CSS-only concern because the JS-driven effects (the process
 *  step count-up) need to be skipped entirely, not just un-animated. */
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
      // threshold 0, not a fraction: this watches the whole experience
      // timeline, which on a small phone is several screens tall. A
      // fractional threshold there can demand more of the element than the
      // viewport can ever show, and the content would never be revealed.
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
};

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
