import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CircuitDivider from "@/components/CircuitDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CircuitDivider />
      <Services />
      <CircuitDivider />
      <Experience />
      <CircuitDivider />
      <Portfolio />
      <CircuitDivider />
      <Testimonials />
      <CircuitDivider />
      <Contact />
      <CircuitDivider />
      <Footer />
    </div>
  );
};

export default Index;
