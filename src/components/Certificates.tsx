import { useRef, useState } from "react";
import { Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  // The tile that opened the dialog, so focus can go back to it on close.
  const opener = useRef<HTMLElement | null>(null);

  return (
    <>
      <p className="eyebrow">Certifications</p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {certificates.map((c) => (
          <li key={c.title}>
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(c);
              }}
              aria-label={`View certificate: ${c.title}`}
              className="card-lift group flex h-full w-full appearance-none flex-col bg-surface-2 p-5 text-left hover:bg-background"
            >
              <span className="flex w-full items-start justify-between">
                <span className="icon-tile h-10 w-10 shrink-0 bg-background">
                  <img
                    src={c.icon}
                    alt=""
                    width={18}
                    height={18}
                    loading="lazy"
                    decoding="async"
                    className="h-[18px] w-[18px] object-contain brightness-0 transition duration-200 ease-out group-hover:invert"
                  />
                </span>
                <span
                  className="text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
                  aria-hidden
                >
                  <Award size={16} strokeWidth={1.75} />
                </span>
              </span>

              <span className="mt-5 block text-[15px] font-semibold leading-snug text-foreground">
                {c.title}
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">
                {c.issuer} · {c.date}
              </span>
              <span className="mt-4 block font-mono text-[10.5px] font-medium uppercase leading-none tracking-[0.14em] text-foreground">
                ✓ Verified Certification
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent
          className="max-h-[90vh] max-w-2xl overflow-y-auto"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            opener.current?.focus();
          }}
        >
          {open && (
            <>
              <DialogHeader className="pr-8 text-left">
                <DialogTitle className="text-xl font-semibold leading-tight tracking-[-0.02em]">
                  {open.title}
                </DialogTitle>
                <p className="pt-1 text-[13px] leading-snug text-muted-foreground">
                  {open.issuer} · {open.date}
                </p>
              </DialogHeader>
              <img
                src={open.certImage}
                alt={`${open.title} certificate issued by ${open.issuer}`}
                loading="lazy"
                decoding="async"
                className="mt-2 w-full rounded-xl border border-border"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Certificates;
