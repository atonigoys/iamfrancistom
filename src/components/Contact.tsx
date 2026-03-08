import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-3xl mx-auto">
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
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Book a free 30-minute consultation to discuss how AI automation can streamline your operations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card overflow-hidden rounded-xl"
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
      </div>
    </section>
  );
};

export default Contact;
