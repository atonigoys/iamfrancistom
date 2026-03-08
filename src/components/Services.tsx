import { motion } from "framer-motion";
import { Bot, Plug, MessageSquare, Settings, Brain, Rocket } from "lucide-react";

const services = [
  { icon: Bot, emoji: "🤖", title: "AI Workflow Automation", desc: "Design and implement end-to-end AI workflows that automate repetitive tasks, connect business systems, and streamline operations to increase productivity and efficiency." },
  { icon: Plug, emoji: "🔌", title: "API & System Integrations", desc: "Connect your tools, platforms, and data sources through custom API integrations to create seamless automated processes across your business ecosystem." },
  { icon: MessageSquare, emoji: "💬", title: "AI Chatbot Development", desc: "Build intelligent AI chatbots and assistants that handle customer inquiries, support requests, lead qualification, and automated conversations 24/7." },
  { icon: Settings, emoji: "⚙️", title: "CRM & Lead Automation", desc: "Automate CRM pipelines, lead capture, follow-ups, and sales processes to ensure no opportunity is missed and your sales workflow runs efficiently." },
  { icon: Brain, emoji: "🧠", title: "Custom AI Agents", desc: "Develop tailored AI agents that perform complex tasks such as data processing, content generation, decision support, and workflow management." },
  { icon: Rocket, emoji: "🚀", title: "Automation Strategy & Consulting", desc: "Identify high-impact automation opportunities and design AI solutions that reduce manual work, increase efficiency, and scale business operations." },
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
    <section id="services" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Dotted grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #00ff00 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
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
              className="glass-card p-8 group cursor-default transition-all duration-300 hover-blink"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors text-2xl">
                {s.emoji}
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
