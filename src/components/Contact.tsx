import { motion } from "framer-motion";
import { Mail, MessageCircle, Twitter, Linkedin, Github } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-background">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Green gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Get in Touch</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Let's Work Together to Build Smarter AI Automation
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">
            Book a free 30-minute consultation to explore how AI-powered workflows can automate tasks, connect your tools, and streamline the way you work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="glass-card overflow-hidden rounded-xl shadow-[0_0_50px_-12px_hsl(var(--primary)/0.3)] border border-primary/10"
        >
          <iframe
            src="https://calendly.com/sayfrancistom/30min"
            width="100%"
            height="700"
            frameBorder="0"
            title="Schedule a meeting"
            className="w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10"
        >
          <a
            href="mailto:sayfrancistom@gmail.com"
            className="flex items-center gap-3 px-5 py-3 rounded-lg bg-secondary/60 border border-border/50 hover:border-primary/40 hover:bg-secondary/80 transition-all duration-200"
          >
            <Mail size={18} className="text-primary" />
            <span className="text-sm text-foreground/85">sayfrancistom@gmail.com</span>
          </a>
          <a
            href="https://wa.me/639541551360"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-lg bg-secondary/60 border border-border/50 hover:border-primary/40 hover:bg-secondary/80 transition-all duration-200"
          >
            <MessageCircle size={18} className="text-primary" />
            <span className="text-sm text-foreground/85">+639 541 551 360</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex items-center justify-center gap-5 mt-8"
        >
          {[
            { icon: Twitter, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Github, href: "#" },
            { icon: Mail, href: "mailto:sayfrancistom@gmail.com" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
