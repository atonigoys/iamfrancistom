import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";

const certificates = [
  {
    title: "No Code Automation with Zapier",
    issuer: "Technical Virtual Assistants PH",
    date: "March 2026",
    icon: "/images/tools/zapier.svg",
    certImage: "/images/certificates/zapier-cert.png",
  },
  {
    title: "Make Automation Pro",
    issuer: "Make",
    date: "2024",
    icon: "/images/tools/make.svg",
  },
  {
    title: "n8n Advanced Automation",
    issuer: "n8n",
    date: "2025",
    icon: "/images/tools/n8n.svg",
  },
  {
    title: "Prompt Engineering Professional",
    issuer: "OpenAI",
    date: "2025",
    icon: "/images/tools/openai.svg",
  },
];

const Certificates = () => {
  const [viewImage, setViewImage] = useState<string | null>(null);

  return (
    <>
      <section id="certificates" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4">
              <Award size={16} />
              Professional Certifications
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Certificates & <span className="text-primary">Credentials</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Verified qualifications from leading platforms and technology providers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => cert.certImage && setViewImage(cert.certImage)}
                className={`group relative rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.15)] ${cert.certImage ? "cursor-pointer" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={cert.icon}
                      alt={cert.issuer}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                  <Award size={16} className="text-primary/40 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Image Modal */}
      <AnimatePresence>
        {viewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setViewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setViewImage(null)}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors"
              >
                <X size={16} />
              </button>
              <img
                src={viewImage}
                alt="Certificate"
                className="w-full rounded-xl border border-border shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certificates;
