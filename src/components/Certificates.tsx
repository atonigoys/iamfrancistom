import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";

const certificates = [
  {
    title: "No Code Automation with Zapier",
    issuer: "Technical Virtual Assistants PH",
    date: "March 2026",
    icon: "/images/tools/zapier.svg",
    certImage: "/images/certificates/zapier-cert.png",
  },
  {
    title: "No Code Automation with Make.com",
    issuer: "Technical Virtual Assistants PH",
    date: "March 2026",
    icon: "/images/tools/make.svg",
    certImage: "/images/certificates/make-cert.png",
  },
  {
    title: "AI Automation with n8n",
    issuer: "Technical Virtual Assistants PH",
    date: "March 2026",
    icon: "/images/tools/n8n.svg",
    certImage: "/images/certificates/n8n-cert.png",
  },
  {
    title: "Prompt Engineering",
    issuer: "Technical Virtual Assistants PH",
    date: "March 2026",
    icon: "/images/tools/openai.svg",
    certImage: "/images/certificates/prompt-eng-cert.png",
  },
];

const Certificates = () => {
  const [viewImage, setViewImage] = useState<string | null>(null);

  return (
    <>
      <section
        id="certificates"
        className="py-20 md:py-28 px-6 relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,150,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,150,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      >
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => cert.certImage && setViewImage(cert.certImage)}
                className="group cursor-pointer rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.15)]"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={cert.icon}
                      alt={cert.issuer}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-base leading-tight mb-1.5 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                  <Award size={18} className="text-primary/40 group-hover:text-primary transition-colors shrink-0 mt-1" />
                </div>
                {cert.certImage && (
                  <p className="text-xs text-muted-foreground/60 mt-3 text-right">Click to view certificate</p>
                )}
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
              className="relative max-w-4xl w-full"
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
