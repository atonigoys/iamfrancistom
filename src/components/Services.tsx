import { motion } from "framer-motion";
import { Workflow, Plug, MessageSquare, GitBranch, Bot, Compass } from "lucide-react";

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
  <section id="services" className="section-padding relative bg-surface-1">
    <div className="section-shell">
      <div className="section-head">
        <div>
          <p className="eyebrow">What I do</p>
          <h2 className="section-title">Six ways I remove manual work</h2>
        </div>
        <p className="section-lede">
          Most engagements start with one process and expand once the first one pays for itself.
        </p>
      </div>

      {/* One panel, six cells. The cell stays opaque and only its contents
          fade in — animating the cell itself would flash the hairline colour
          underneath it for the length of the reveal. */}
      <div className="panel-grid sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <div key={s.title} className="panel-cell group">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="icon-tile">
                <s.icon size={20} strokeWidth={1.75} aria-hidden />
              </span>

              <h3 className="mt-7 text-lg font-semibold leading-snug text-foreground">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
