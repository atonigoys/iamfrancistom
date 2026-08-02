import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/** Replaces the four animated scanning NeonDividers. A section boundary
 *  shouldn't be competing for attention with the section. */
const Rule = () => (
  <div className="section-shell px-5 sm:px-6">
    <div aria-hidden className="rule-fade" />
  </div>
);

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <Hero />
      <Rule />
      <Services />
      <Portfolio />
      <Rule />
      <Process />
      <Rule />
      <About />
      <Experience />
      <Rule />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
