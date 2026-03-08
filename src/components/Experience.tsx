import { motion } from "framer-motion";

const experiences = [
  {
    role: "AI Automation Specialist",
    desc: "Building AI-powered workflows, integrations, and automation systems using tools like n8n, APIs, and AI models.",
    period: "2023 — Present",
  },
  {
    role: "Automation Developer",
    desc: "Designed automation pipelines that reduce manual tasks and improve business efficiency.",
    period: "2021 — 2023",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">My Journey</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3">Work Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
              className={`relative mb-12 pl-12 md:pl-0 md:w-1/2 ${
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-2.5 md:left-auto md:right-auto top-1 w-3 h-3 rounded-full bg-primary border-2 border-background"
                style={i % 2 === 0 ? { right: "-6.5px", left: "auto" } : { left: "-6.5px" }}
              />
              {/* On mobile always left dot */}
              <div className="md:hidden absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />

              <span className="text-xs text-primary font-medium tracking-wider">{exp.period}</span>
              <h3 className="font-heading text-xl font-semibold mt-1 mb-2">{exp.role}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
