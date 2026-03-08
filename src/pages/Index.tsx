import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const NeonDivider = () => (
  <div className="relative w-full h-[1px]">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-80" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent blur-[8px] animate-pulse-glow" />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent blur-[20px] opacity-40 animate-pulse-glow" />
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
