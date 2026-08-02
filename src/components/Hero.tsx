import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";

const tools = [
  { name: "n8n", logo: "/images/tools/n8n.svg" },
  { name: "Make", logo: "/images/tools/make.svg" },
  { name: "Zapier", logo: "/images/tools/zapier.svg" },
  { name: "OpenAI", logo: "/images/tools/openai.svg" },
  { name: "ChatGPT", logo: "/images/tools/chatgpt.svg" },
  { name: "Google Gemini", logo: "/images/tools/google-gemini.svg" },
  { name: "OpenRouter", logo: "/images/tools/openrouter.png" },
  { name: "Grok", logo: "/images/tools/grok.png" },
  { name: "Supabase", logo: "/images/tools/supabase.svg" },
  { name: "Airtable", logo: "/images/tools/airtable.svg" },
  { name: "HubSpot", logo: "/images/tools/hubspot.svg" },
  { name: "GoHighLevel", logo: "/images/tools/gohighlevel.png" },
  { name: "Slack", logo: "/images/tools/slack.svg" },
  { name: "Asana", logo: "/images/tools/asana.svg" },
  { name: "Xero", logo: "/images/tools/xero.svg" },
  { name: "Vapi", logo: "/images/tools/vapi.png" },
  { name: "Google Sheets", logo: "/images/tools/google-sheets.svg" },
  { name: "Google Docs", logo: "/images/tools/google-docs.svg" },
  { name: "Google AI Studio", logo: "/images/tools/google-ai-studio.svg" },
  { name: "Docker", logo: "/images/tools/docker.svg" },
  { name: "GitHub", logo: "/images/tools/github.svg" },
  { name: "Vercel", logo: "/images/tools/vercel.svg" },
  { name: "Lovable", logo: "/images/tools/lovable.png" },
];

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 px-5 sm:px-6 md:pt-40">
      {/* Static structural background. The old 80-node animated canvas ran a
          per-frame O(n²) distance check behind this fold — this costs nothing. */}
      <div aria-hidden className="absolute inset-0 -z-10 grid-field mask-fade opacity-70" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-14rem] -z-10 h-[38rem] w-[62rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(var(--brand)) 0%, transparent 65%)" }}
      />

      <div className="section-shell flex flex-col items-center text-center">
        <motion.div variants={rise} initial="hidden" animate="show" custom={0}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-text opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-text" />
            </span>
            Available for new automation projects
          </span>
        </motion.div>

        <motion.h1
          variants={rise}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-7 max-w-4xl text-[2.1rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.1rem]"
        >
          Your team is doing work
          <br className="hidden sm:block" />{" "}
          <span className="text-brand-text">a system</span> should be doing.
        </motion.h1>

        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          I build that system. AI automation for lead qualification, onboarding, support
          and reporting — shipped in n8n, Make and Zapier, documented and handed over.
        </motion.p>

        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <a href="#contact" className="btn-primary w-full sm:w-auto">
            <CalendarCheck size={17} aria-hidden />
            Book a free automation audit
          </a>
          <a href="#work" className="btn-secondary group w-full sm:w-auto">
            See the work
            <ArrowRight
              size={16}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>

      {/* Tool strip. Logos keep their own brand colours now — the previous
          `brightness-0 invert` flattened every one of them to identical grey.
          Deliberately not motion-wrapped: it's decorative, and gating it behind
          a JS entry animation only means it can fail to appear at all. */}
      <div className="marquee-host relative mt-16 w-full">
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
          Platforms I build on
        </p>
        <div className="marquee-mask overflow-hidden">
          <ul className="marquee-track flex w-max items-center gap-3">
            {[...tools, ...tools].map((tool, i) => (
              <li
                key={`${tool.name}-${i}`}
                aria-hidden={i >= tools.length}
                className="group/tool flex shrink-0 items-center gap-2.5 rounded-lg border border-border
                           bg-surface-1 px-4 py-2.5 transition-colors duration-200
                           hover:border-border-strong hover:bg-surface-2"
              >
                {/* White silhouette at rest so 23 competing brand palettes read as
                    one calm strip — and so dark marks (Vercel, GitHub, Xero) stay
                    legible on a dark background. Hover pays out the real colour. */}
                <img
                  src={tool.logo}
                  alt=""
                  width={18}
                  height={18}
                  loading="lazy"
                  decoding="async"
                  className="h-[18px] w-[18px] object-contain opacity-40 brightness-0 invert
                             transition duration-200 ease-out
                             group-hover/tool:opacity-100 group-hover/tool:brightness-100
                             group-hover/tool:invert-0"
                />
                <span className="whitespace-nowrap font-mono text-xs text-muted-foreground
                                 transition-colors duration-200 group-hover/tool:text-foreground">
                  {tool.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
