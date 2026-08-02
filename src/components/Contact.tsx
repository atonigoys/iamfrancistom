import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, CalendarCheck } from "lucide-react";

const EMAIL = "sayfrancistom@gmail.com";
const CALENDLY = "https://calendly.com/sayfrancistom/30min";

/** Calendly facade. The iframe used to load on every page view, pulling
 *  third-party JS into the critical path for a booking most visitors
 *  never start. It now mounts on click. */
const BookingPanel = () => {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={CALENDLY}
        title="Book a 30-minute automation audit with Francis Tom Say"
        loading="lazy"
        className="h-[640px] w-full border-0"
      />
    );
  }

  return (
    <div className="flex h-full min-h-[340px] flex-col items-center justify-center p-8 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand/20 bg-brand/10">
        <CalendarCheck size={20} className="text-brand-text" aria-hidden />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold">Book a free 30-minute audit</h3>
      <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
        We map one process end to end and I'll tell you what it costs you per month and
        whether automating it is worth doing. No pitch.
      </p>
      <button type="button" onClick={() => setLoaded(true)} className="btn-primary mt-6">
        Open calendar
      </button>
      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 font-mono text-[11px] text-muted-foreground underline-offset-4 hover:text-brand-text hover:underline"
      >
        or open in a new tab
      </a>
    </div>
  );
};

const Contact = () => (
  <section id="contact" className="section-padding relative overflow-hidden">
    <div
      aria-hidden
      className="absolute left-1/2 top-1/3 -z-10 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full opacity-[0.12] blur-[130px]"
      style={{ background: "radial-gradient(circle, hsl(var(--brand)) 0%, transparent 65%)" }}
    />

    <div className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 text-center"
      >
        <p className="eyebrow">Get in touch</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
          Let's find the process worth automating first
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          30 minutes, no pitch — just a clear read on what's worth automating.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-xl"
      >
        <div className="card-surface overflow-hidden">
          <BookingPanel />
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-2.5 rounded-lg border border-border bg-surface-1 px-4 py-2.5 text-[13px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          <Mail size={15} className="text-brand-text" aria-hidden />
          {EMAIL}
        </a>
        <a
          href="https://wa.me/639541551360"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-lg border border-border bg-surface-1 px-4 py-2.5 text-[13px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          <MessageCircle size={15} className="text-brand-text" aria-hidden />
          <span className="metric">+63 954 155 1360</span>
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
