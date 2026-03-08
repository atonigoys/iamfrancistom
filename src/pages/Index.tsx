import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const NeonDivider = () => (
  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
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
