import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import NeuralNetworkBackground from "./NeuralNetworkBackground";

const tools = [
  { name: "ChatGPT", logo: "/images/tools/chatgpt.svg" },
  { name: "OpenAI", logo: "/images/tools/openai.svg" },
  { name: "Zapier", logo: "/images/tools/zapier.svg" },
  { name: "n8n", logo: "/images/tools/n8n.svg" },
  { name: "Make", logo: "/images/tools/make.svg" },
  { name: "Google AI Studio", logo: "/images/tools/google-ai-studio.svg" },
  { name: "Google Gemini", logo: "/images/tools/google-gemini.svg" },
  { name: "Airtable", logo: "/images/tools/airtable.svg" },
  { name: "Lovable", logo: "/images/tools/lovable.png" },
  { name: "Google Docs", logo: "/images/tools/google-docs.svg" },
  { name: "Google Sheets", logo: "/images/tools/google-sheets.svg" },
  { name: "Slack", logo: "/images/tools/slack.svg" },
  { name: "Asana", logo: "/images/tools/asana.svg" },
  { name: "Xero", logo: "/images/tools/xero.svg" },
  { name: "Vercel", logo: "/images/tools/vercel.svg" },
  { name: "GitHub", logo: "/images/tools/github.svg" },
  { name: "GoHighLevel", logo: "/images/tools/gohighlevel.png" },
  { name: "OpenRouter", logo: "/images/tools/openrouter.png" },
  { name: "HubSpot", logo: "/images/tools/hubspot.svg" },
  { name: "Vapi", logo: "/images/tools/vapi.png" },
  { name: "Docker", logo: "/images/tools/docker.svg" },
  { name: "Supabase", logo: "/images/tools/supabase.svg" },
  { name: "Grok", logo: "/images/tools/grok.png" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center section-padding pt-28 overflow-hidden">
      {/* Neural network background */}
      <NeuralNetworkBackground />
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />

      <div className="relative max-w-4xl mx-auto text-center flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/50 text-primary text-sm font-medium tracking-wide bg-primary/10 shadow-[0_0_15px_rgba(0,255,138,0.3),0_0_30px_rgba(0,255,138,0.15)]">
            AI Automation Specialist
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading font-bold leading-none mb-6 text-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] flex flex-col items-center gap-1"
        >
          <span className="text-3xl sm:text-4xl md:text-5xl tracking-wide font-bold">AI-Powered</span>
          <span className="gradient-text text-7xl sm:text-8xl md:text-9xl lg:text-[10rem]">Automation</span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground/80 font-semibold">for Smarter Workflows</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
        >
          I design intelligent workflows that connect apps, automate tasks, and
          streamline business operations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="btn-glow flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base"
          >
            View My Work
            <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-7 py-3.5 rounded-lg border border-border text-foreground font-semibold text-base hover:border-primary/50 hover:text-primary transition-all duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Tools marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative w-full mt-16 mb-16"
      >
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">
          Tools I Work With
        </p>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          {/* Scrolling strip */}
          <div className="flex animate-marquee w-max">
            {[...tools, ...tools].map((tool, i) => (
              <div
                key={`${tool.name}-${i}`}
                className="flex items-center gap-2.5 mx-4 px-4 py-2.5 rounded-lg bg-secondary/60 border border-border/30 hover:border-primary/30 transition-colors shrink-0"
              >
                {tool.logo ? (
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-5 h-5 brightness-0 invert opacity-70"
                  />
                ) : (
                  <span className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    {tool.name.charAt(0)}
                  </span>
                )}
                <span className="text-sm text-muted-foreground whitespace-nowrap">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
};

export default Hero;
