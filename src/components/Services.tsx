import { motion } from "framer-motion";
import { Workflow, Plug, MessageSquare, GitBranch, Bot, Compass } from "lucide-react";
import GlassCard from "./GlassCard";

const services = [
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    desc: "End-to-end workflows that take a recurring manual process off your team entirely — intake, routing, follow-up, logging.",
  },
  {
    icon: Plug,
    title: "API & System Integrations",
    desc: "Custom integrations between the tools you already pay for, so data stops being re-keyed by hand between systems.",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots & Support Agents",
    desc: "Assistants that answer from your own documentation, qualify enquiries, and escalate the ones that need a human.",
  },
  {
    icon: GitBranch,
    title: "CRM & Lead Automation",
    desc: "Pipelines that capture, score and route leads automatically, with follow-up sequences that fire without anyone remembering to.",
  },
  {
    icon: Bot,
    title: "Custom AI Agents",
    desc: "Agents that handle judgement-shaped work — enrichment, screening, classification, drafting — inside a controlled workflow.",
  },
  {
    icon: Compass,
    title: "Automation Audit & Strategy",
    desc: "Identify high-impact automation opportunities and design AI solutions that reduce manual work, increase efficiency, and scale business operations.",
  },
];

const Services = () => (
  <section id="services" className="section-padding relative bg-surface-1/40">
    <div className="section-shell">
      <div className="mb-12 text-center">
        <p className="eyebrow">What I do</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
          Six ways I remove manual work
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Most engagements start with one process and expand once the first one pays for itself.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard tilt={4} className="p-6">
              <span className="gc-icon-float">
                <span className="gc-icon-bg-glow" aria-hidden />
                <span className="gc-icon">
                  <s.icon size={18} className="text-brand-text" aria-hidden />
                </span>
              </span>

              <h3 className="gc-title mt-5 font-display text-[15px]">{s.title}</h3>
              <p className="gc-desc mt-2.5 max-w-[34ch] text-[13px]">{s.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
