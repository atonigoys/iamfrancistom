import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const NeonDivider = () => (
  <div className="relative w-full h-[1px] overflow-hidden">
    {/* Base line */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff88]/60 to-transparent" />
    {/* Soft glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent blur-[6px] opacity-50 animate-pulse-glow" />
    {/* Wide ambient glow */}
    <div className="absolute -top-[6px] -bottom-[6px] inset-x-0 bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent blur-[16px] animate-pulse-glow" />
    {/* Scanning beam */}
    <div
      className="absolute top-0 bottom-0 w-[120px] animate-scan"
      style={{
        background: "linear-gradient(90deg, transparent, #00ff88, transparent)",
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
      <Experience />
      <NeonDivider />
      <Portfolio />
      <NeonDivider />
      <Testimonials />
      <NeonDivider />
      <Contact />
      <NeonDivider />
      <Footer />
    </div>
  );
};

export default Index;
