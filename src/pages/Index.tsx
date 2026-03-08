import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CircuitDivider from "@/components/CircuitDivider";
import GlowingLine from "@/components/GlowingLine";

const SectionSeparator = () => (
  <div>
    <GlowingLine />
    <CircuitDivider />
    <GlowingLine />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SectionSeparator />
      <Services />
      <SectionSeparator />
      <Experience />
      <SectionSeparator />
      <Portfolio />
      <SectionSeparator />
      <Testimonials />
      <SectionSeparator />
      <Contact />
      <SectionSeparator />
      <Footer />
    </div>
  );
};

export default Index;
