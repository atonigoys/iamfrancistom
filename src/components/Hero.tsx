import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";

interface Tool {
  name: string;
  logo: string;
  /** Presentation only. The five PNG logos ship as a small mark centred in a
   *  512px transparent canvas with the wordmark baked in underneath, so at
   *  icon size they render as a speck. `zoom` scales the image up inside its
   *  clipped box and `y` nudges it (in % of the box) so the box frames the
   *  mark alone — the same visual size as the SVG logos beside it. */
  crop?: { zoom: number; y: number };
}

const tools: Tool[] = [
  { name: "n8n", logo: "/images/tools/n8n.svg" },
  { name: "Make", logo: "/images/tools/make.svg" },
  { name: "Zapier", logo: "/images/tools/zapier.svg" },
  { name: "OpenAI", logo: "/images/tools/openai.svg" },
  { name: "ChatGPT", logo: "/images/tools/chatgpt.svg" },
  { name: "Google Gemini", logo: "/images/tools/google-gemini.svg" },
  { name: "OpenRouter", logo: "/images/tools/openrouter.png", crop: { zoom: 2.3, y: 1.2 } },
  { name: "Grok", logo: "/images/tools/grok.png", crop: { zoom: 1.85, y: 0 } },
  { name: "Supabase", logo: "/images/tools/supabase.svg" },
  { name: "Airtable", logo: "/images/tools/airtable.svg" },
  { name: "HubSpot", logo: "/images/tools/hubspot.svg" },
  { name: "GoHighLevel", logo: "/images/tools/gohighlevel.png", crop: { zoom: 2.5, y: 7.2 } },
  { name: "Slack", logo: "/images/tools/slack.svg" },
  { name: "Asana", logo: "/images/tools/asana.svg" },
  { name: "Xero", logo: "/images/tools/xero.svg" },
  { name: "Vapi", logo: "/images/tools/vapi.png", crop: { zoom: 3.1, y: 1.8 } },
  { name: "Google Sheets", logo: "/images/tools/google-sheets.svg" },
  { name: "Google Docs", logo: "/images/tools/google-docs.svg" },
  { name: "Google AI Studio", logo: "/images/tools/google-ai-studio.svg" },
  { name: "Docker", logo: "/images/tools/docker.svg" },
  { name: "GitHub", logo: "/images/tools/github.svg" },
  { name: "Vercel", logo: "/images/tools/vercel.svg" },
  { name: "Lovable", logo: "/images/tools/lovable.png", crop: { zoom: 2.5, y: 6 } },
];

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-background pt-32 sm:pt-36 md:pt-44 lg:pt-48">
      {/* Static structural background: a faint hairline grid that dissolves
          toward the edges. No canvas, no animation — it costs nothing. */}
      <div aria-hidden className="grid-field mask-fade absolute inset-0 -z-10 opacity-70" />

      <div className="gutter">
        <div className="section-shell flex flex-col items-center text-center">
          <motion.div variants={rise} initial="hidden" animate="show" custom={0}>
            {/* Stepped down a notch below 360px so the line never wraps
                inside the pill on the narrowest phones. */}
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background px-3 py-2 font-mono text-[10px] leading-none text-muted-foreground shadow-card min-[360px]:gap-2.5 min-[360px]:px-4 min-[360px]:text-[11px] min-[360px]:tracking-wide">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full scale-[2.4] rounded-full bg-foreground opacity-15" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
              </span>
              Available for new automation projects
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
            className="hero-title mt-8 max-w-5xl"
          >
            Your team is doing work
            <br className="hidden sm:block" />{" "}
            <span className="hero-mark">a system</span> should be doing.
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-7 max-w-xl text-[17px] leading-[1.65] text-muted-foreground sm:text-lg sm:leading-[1.65]"
          >
            I build that system. AI automation for lead qualification, onboarding, support
            and reporting — shipped in n8n, Make and Zapier, documented and handed over.
          </motion.p>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="btn-primary btn-lg w-full whitespace-nowrap max-[359px]:px-4 max-[359px]:text-[15px] sm:w-auto"
            >
              <CalendarCheck size={18} aria-hidden />
              Book a free automation audit
            </a>
            <a href="#work" className="btn-secondary btn-lg group w-full sm:w-auto">
              See the work
              <ArrowRight
                size={17}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Tool strip. Every logo is rendered as a single-colour silhouette so
          23 competing brand palettes read as one calm monochrome row.
          Deliberately not motion-wrapped: it's decorative, and gating it behind
          a JS entry animation only means it can fail to appear at all. */}
      <div className="marquee-host relative mt-20 w-full border-t border-border py-10 md:mt-28 md:py-12">
        <p className="mb-8 text-center font-mono text-[11px] uppercase leading-none tracking-[0.2em] text-muted-foreground">
          Platforms I build on
        </p>
        <div className="marquee-mask overflow-hidden">
          {/* Spacing is padding on each item rather than a flex gap, so the
              two copies are exactly equal in width and the -50% loop is
              seamless. */}
          <ul className="marquee-track flex w-max items-center">
            {[...tools, ...tools].map((tool, i) => (
              <li
                key={`${tool.name}-${i}`}
                aria-hidden={i >= tools.length}
                className="group/tool flex shrink-0 items-center gap-2.5 pr-11"
              >
                <span className="flex h-5 w-5 shrink-0 overflow-hidden">
                  <img
                    src={tool.logo}
                    alt=""
                    width={20}
                    height={20}
                    loading="lazy"
                    decoding="async"
                    style={
                      tool.crop && {
                        transform: `scale(${tool.crop.zoom}) translateY(${tool.crop.y}%)`,
                      }
                    }
                    className="h-5 w-5 object-contain opacity-45 brightness-0
                               transition-opacity duration-200 ease-out
                               group-hover/tool:opacity-100"
                  />
                </span>
                <span className="whitespace-nowrap text-sm font-medium text-muted-foreground
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
