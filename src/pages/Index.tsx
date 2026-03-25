import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const NeonDivider = () => (
  <div className="relative w-full h-[4px] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-[6px] opacity-60 animate-pulse-glow" />
    <div className="absolute -top-[8px] -bottom-[8px] inset-x-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-[16px] animate-pulse-glow" />
    <div
      className="absolute top-0 bottom-0 w-[120px] animate-scan"
      style={{
        background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
        filter: "blur(2px)",
        opacity: 0.9,
      }}
    />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <NeonDivider />
      <Services />
      <NeonDivider />
      <Portfolio />
      <NeonDivider />
      <Contact />
      <NeonDivider />
      <Footer />
    </div>
  );
};

export default Index;
