const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-heading text-lg font-bold tracking-tight text-foreground">
          FRANCIS<span className="text-primary">.TECH</span>
        </a>

        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} FRANCIS TOM SAY. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
