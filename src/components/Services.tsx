import { motion } from "framer-motion";
import { Bot, Plug, MessageSquare, BarChart3, Brain, Lightbulb } from "lucide-react";

const services = [
  { icon: Bot, title: "AI Workflow Automation", desc: "End-to-end AI-powered workflows that eliminate repetitive tasks and boost productivity." },
  { icon: Plug, title: "API & App Integrations", desc: "Seamless connections between your favourite tools, platforms, and data sources." },
  { icon: MessageSquare, title: "AI Chatbot Development", desc: "Intelligent conversational agents that handle customer support and inquiries 24/7." },
  { icon: BarChart3, title: "CRM & Business Process Automation", desc: "Streamlined CRM pipelines and business processes for maximum efficiency." },
  { icon: Brain, title: "Custom AI Agents", desc: "Bespoke AI agents tailored to your specific business needs and goals." },
  { icon: Lightbulb, title: "Automation Consulting", desc: "Strategic consulting to identify and implement the highest-impact automation opportunities." },
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
              className="glass-card hover-lift p-8 group cursor-default"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
