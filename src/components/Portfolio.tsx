import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  { title: "AI Customer Support Chatbot", desc: "An intelligent chatbot handling customer inquiries with natural language understanding." },
  { title: "Lead Generation Automation System", desc: "Automated pipeline that captures, qualifies, and nurtures leads across channels." },
  { title: "AI Agent for Customer Inquiries", desc: "Custom AI agent providing instant, accurate responses to customer questions." },
  { title: "Automated CRM Workflow System", desc: "End-to-end CRM automation reducing manual data entry and follow-up tasks." },
  { title: "Social Media Automation Pipeline", desc: "Multi-platform content scheduling and engagement automation system." },
];

const Portfolio = () => {
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3">Portfolio</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card hover-lift group overflow-hidden cursor-pointer"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,hsl(168,80%,50%,0.05)_50%,transparent_70%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <ExternalLink className="text-primary/40" size={24} />
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-primary font-medium text-sm flex items-center gap-2">
                    View Project <ExternalLink size={16} />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-base font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
