import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-heading text-lg font-bold tracking-tight text-foreground">
          FRANCIS<span className="text-primary">.TECH</span>
        </a>

        <div className="flex items-center gap-5">
          {[
            { icon: Twitter, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Github, href: "#" },
            { icon: Mail, href: "mailto:hello@francis.tech" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} FRANCIS TOM SAY. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
