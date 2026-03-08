import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Get in Touch</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3">
            Let's Build Smart Automation for Your Business
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 space-y-5"
        >
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1.5">Message</label>
            <textarea
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <button
            type="submit"
            className="btn-glow w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            {submitted ? "Message Sent ✓" : (
              <>Send Message <Send size={18} /></>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
