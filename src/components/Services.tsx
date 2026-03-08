import { motion } from "framer-motion";
import { Workflow, Database, Users, ShoppingBag, Zap, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Design and implement automated workflows that connect your apps and eliminate repetitive tasks.",
    tags: ["Zapier", "Make", "n8n", "OpenRouter"],
  },
  {
    icon: Database,
    title: "Data Synchronization",
    desc: "Keep your data consistent across all platforms with real-time sync and intelligent data mapping.",
    tags: ["API Integration", "Webhooks", "ETL"],
  },
  {
    icon: Users,
    title: "CRM Automation",
    desc: "Automate lead nurturing, follow-ups, and client communications for maximum efficiency.",
    tags: ["GoHighLevel", "HubSpot", "Salesforce"],
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Integration",
    desc: "Streamline order processing, inventory management, and customer support automation.",
    tags: ["Shopify", "WooCommerce", "Stripe"],
  },
  {
    icon: Zap,
    title: "Custom Integrations",
    desc: "Build bespoke solutions for unique business challenges with conditional logic and API connections.",
    tags: ["REST APIs", "GraphQL", "Webhooks"],
  },
  {
    icon: ArrowUpRight,
    title: "Onboarding Funnels",
    desc: "Create seamless client onboarding experiences with automated sequences and milestone tracking.",
    tags: ["GHL Funnels", "Email Sequences", "SMS"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Services = () => {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">What I Do</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3">Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="glass-card hover-lift p-8 group cursor-default flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <s.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-border/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
