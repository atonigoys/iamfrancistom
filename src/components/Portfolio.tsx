import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, DollarSign, Clock, X } from "lucide-react";
import { createPortal } from "react-dom";

const categories = ["All", "Zapier", "Make", "n8n", "GoHighLevel"] as const;
type Category = (typeof categories)[number];

interface Project {
  title: string;
  desc: string;
  category: Category;
  tag?: string;
  image?: string;
  results?: string[];
  savings?: { money: string; time: string };
  techStack?: string[];
}

const projects: Project[] = [
  {
    title: "Asana CRM Lead Workflow",
    desc: "Automated CRM workflow that manages the entire lead lifecycle inside Asana—from lead intake to deal closure. The system tracks pipeline stages, triggers automated email follow-ups, and uses AI to personalize client communication based on the lead status.",
    category: "Zapier",
    tag: "CRM AUTOMATION • Asana / Zapier",
    image: "/images/portfolio/asana-crm-workflow.png",
    results: [
      "Automated lead pipeline tracking in Asana",
      "Smart follow-up sequences for unresponsive leads",
      "AI-generated personalized client emails",
      "Fully automated status-based workflow routing",
    ],
    savings: { money: "$2,000+/mo saved", time: "35 hrs/mo saved" },
    techStack: ["Asana", "Zapier", "Gmail", "Google Drive", "AI (Zapier AI)"],
  },
  { title: "AI Customer Support Chatbot", desc: "An intelligent chatbot handling customer inquiries with natural language understanding.", category: "Make" },
  { title: "Lead Generation Automation System", desc: "Automated pipeline that captures, qualifies, and nurtures leads across channels.", category: "Zapier" },
  { title: "AI Agent for Customer Inquiries", desc: "Custom AI agent providing instant, accurate responses to customer questions.", category: "n8n" },
  { title: "Automated CRM Workflow System", desc: "End-to-end CRM automation reducing manual data entry and follow-up tasks.", category: "GoHighLevel" },
  { title: "Social Media Automation Pipeline", desc: "Multi-platform content scheduling and engagement automation system.", category: "Make" },
];

const ProjectCard = ({ p, i }: { p: Project; i: number }) => {
  const [imageOpen, setImageOpen] = useState(false);
  const isDetailed = !!p.image;

  return (
    <>
      <motion.div
        key={p.title}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.08 }}
        className={`glass-card hover-lift group overflow-hidden cursor-pointer ${
          isDetailed ? "col-span-1 sm:col-span-2 lg:col-span-3" : ""
        }`}
      >
        {isDetailed ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-[420px]">
            <div
              className="relative h-64 lg:h-full bg-secondary overflow-hidden cursor-zoom-in"
              onClick={() => setImageOpen(true)}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
              <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase mb-2">{p.tag}</span>
              <h3 className="font-heading text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.desc}</p>
              {p.results && (
                <div className="mb-5">
                  <h4 className="text-sm font-semibold mb-2">Key Results</h4>
                  <ul className="space-y-1.5">
                    {p.results.map((r) => (
                      <li key={r} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-primary mt-0.5">✔</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {p.savings && (
                <div className="flex gap-4 mb-5">
                  <span className="flex items-center gap-1.5 text-sm font-medium bg-secondary/80 px-3 py-1.5 rounded-full border border-border/30">
                    <DollarSign size={14} className="text-primary" /> {p.savings.money}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-medium bg-secondary/80 px-3 py-1.5 rounded-full border border-border/30">
                    <Clock size={14} className="text-primary" /> {p.savings.time}
                  </span>
                </div>
              )}
              {p.techStack && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {p.techStack.map((t) => (
                      <span key={t} className="text-xs bg-secondary/80 text-muted-foreground px-3 py-1 rounded-full border border-border/30">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-[320px] flex flex-col">
            <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <ExternalLink className="text-primary/40" size={24} />
                </div>
              </div>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-primary font-medium text-sm flex items-center gap-2">
                  View Project <ExternalLink size={16} />
                </span>
              </div>
            </div>
            <div className="p-6 flex-1">
              <span className="text-xs text-primary font-medium mb-2 inline-block">{p.category}</span>
              <h3 className="font-heading text-base font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          </div>
        )}
      </motion.div>

      {isDetailed && imageOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setImageOpen(false)}>
          <div className="absolute inset-0 bg-black/80" />
          <div
            className="relative z-10 max-w-5xl w-[95vw] p-2 bg-background border border-border rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setImageOpen(false)}
              className="absolute right-4 top-4 z-20 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="overflow-auto max-h-[85vh] rounded-lg">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Portfolio</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3">Previous Works</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Selected automation projects demonstrating how intelligent workflows can transform complex processes into seamless systems.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                active === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/60 text-muted-foreground border-border/30 hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
