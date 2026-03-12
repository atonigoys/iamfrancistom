import { useEffect, useRef } from "react";
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

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,156,${p.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />;
};

const Services = () => {
  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,150,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,150,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0,255,150,0.15), transparent 60%)",
        }}
      />

      {/* Particles */}
      <Particles />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)",
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
              className="glass-card p-8 group cursor-default transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,150,0.35)]"
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
