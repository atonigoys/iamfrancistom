import { useState } from "react";
import { Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GlassCard from "./GlassCard";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  icon: string;
  certImage: string;
}

const certificates: Certificate[] = [
  {
    title: "AI Automation with n8n",
    issuer: "Technical Virtual Assistants PH",
    date: "March 2026",
    icon: "/images/tools/n8n.svg",
    certImage: "/images/certificates/n8n-cert.png",
  },
  {
    title: "No Code Automation with Make.com",
    issuer: "Technical Virtual Assistants PH",
    date: "March 2026",
    icon: "/images/tools/make.svg",
    certImage: "/images/certificates/make-cert.png",
  },
  {
    title: "No Code Automation with Zapier",
    issuer: "Technical Virtual Assistants PH",
    date: "March 2026",
    icon: "/images/tools/zapier.svg",
    certImage: "/images/certificates/zapier-cert.png",
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
  const [open, setOpen] = useState<Certificate | null>(null);

  return (
    <>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-text">
        Certifications
      </p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {certificates.map((c) => (
          <li key={c.title}>
            <button
              type="button"
              onClick={() => setOpen(c)}
              aria-label={`View certificate: ${c.title}`}
              className="block w-full appearance-none border-0 bg-transparent p-0 text-left"
            >
              <GlassCard shine className="p-3.5">
                <span className="cert-badge" aria-hidden>
                  <Award size={11} />
                </span>

                <div className="flex items-center gap-3 pr-5">
                  <img
                    src={c.icon}
                    alt=""
                    width={18}
                    height={18}
                    loading="lazy"
                    decoding="async"
                    className="h-[18px] w-[18px] shrink-0 object-contain opacity-40 brightness-0 invert
                               transition duration-200 ease-out
                               [.gc-tilt:hover_&]:opacity-100 [.gc-tilt:hover_&]:brightness-100
                               [.gc-tilt:hover_&]:invert-0"
                  />
                  <span className="min-w-0">
                    <span className="gc-title block truncate text-[13px] font-semibold">
                      {c.title}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[10px] text-muted-foreground">
                      {c.issuer} · {c.date}
                    </span>
                    <span className="cert-verified mt-1 block font-mono text-[10px] uppercase tracking-wider text-brand-text">
                      ✓ Verified Certification
                    </span>
                  </span>
                </div>
              </GlassCard>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-surface-1">
          {open && (
            <>
              <DialogHeader className="text-left">
                <DialogTitle className="font-display text-base font-semibold">
                  {open.title}
                </DialogTitle>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {open.issuer} · {open.date}
                </p>
              </DialogHeader>
              <img
                src={open.certImage}
                alt={`${open.title} certificate issued by ${open.issuer}`}
                loading="lazy"
                decoding="async"
                className="mt-4 w-full rounded-lg border border-border"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Certificates;
