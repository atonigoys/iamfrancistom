import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Francis built an automation system that saved us hours of manual work every week.",
    name: "Sarah Johnson",
    role: "Operations Manager",
  },
  {
    quote: "Highly skilled in AI workflows and integrations. Transformed how our team operates.",
    name: "Mark Chen",
    role: "CTO, TechStartup",
  },
  {
    quote: "The AI chatbot Francis developed handles 80% of our customer inquiries automatically.",
    name: "Lisa Alvarez",
    role: "Head of Support",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">What Clients Say</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3">Testimonials</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card hover-lift p-8"
            >
              <Quote className="text-primary/30 mb-4" size={32} />
              <p className="text-foreground/90 leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <p className="font-heading font-semibold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
