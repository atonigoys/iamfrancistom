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
    <div className="flex h-full min-h-[360px] flex-col items-center justify-center px-6 py-12 text-center sm:px-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
        <CalendarCheck size={22} strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="mt-6 text-xl font-semibold leading-snug sm:text-2xl sm:tracking-[-0.025em]">
        Book a free 30-minute audit
      </h3>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
        We map one process end to end and I'll tell you what it costs you per month and
        whether automating it is worth doing. No pitch.
      </p>
      <button type="button" onClick={() => setLoaded(true)} className="btn-primary btn-lg mt-8 w-full sm:w-auto">
        Open calendar
      </button>
      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-[44px] items-center text-[13px] text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
      >
        or open in a new tab
      </a>
    </div>
  );
};

/** The one dark section on the page — the closing call to action. Everything
 *  inside inherits the inverted tokens from `.theme-dark`; the booking card
 *  switches back to the light set so it reads as a white sheet on black. */
const Contact = () => (
  <section
    id="contact"
    className="theme-dark section-padding relative isolate overflow-hidden bg-background text-foreground"
  >
    <div aria-hidden className="grid-field mask-fade absolute inset-0 -z-10 opacity-70" />

    <div className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-12 max-w-3xl text-center md:mb-14"
      >
        <p className="eyebrow">Get in touch</p>
        <h2 className="section-title">
          Let's find the process worth automating first
        </h2>
        <p className="section-lede mx-auto mt-5">
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
        <div className="theme-light card-surface overflow-hidden text-foreground">
          <BookingPanel />
        </div>
      </motion.div>

      <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <a href={`mailto:${EMAIL}`} className="btn-secondary font-normal">
          <Mail size={16} className="shrink-0" aria-hidden />
          {EMAIL}
        </a>
        <a
          href="https://wa.me/639541551360"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary font-normal"
        >
          <MessageCircle size={16} className="shrink-0" aria-hidden />
          <span className="metric">+63 954 155 1360</span>
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
