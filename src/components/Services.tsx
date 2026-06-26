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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

const Services = () => {
  return (
    <section id="services" className="section-padding bg-secondary/30 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #00FF8A 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">What I Do</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 text-foreground">Services</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">Intelligent automation solutions built to save time, reduce costs, and scale your operations.</p>
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
              className="relative bg-card/60 backdrop-blur-sm border border-border/60 rounded-xl p-7 group cursor-default transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:shadow-[0_0_30px_-8px_rgba(0,255,138,0.25)]"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-5 group-hover:from-primary/30 group-hover:border-primary/40 transition-all duration-300 text-2xl">
                {s.emoji}
              </div>
              <h3 className="font-heading text-base font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
