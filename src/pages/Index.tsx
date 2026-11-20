import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/** Section boundaries are carried by the background alternating between
 *  white and light grey, closing on black — no divider rules needed.
 *
 *  `reducedMotion="user"` makes every framer-motion entry animation honour
 *  the visitor's OS setting; the CSS-driven motion is handled in index.css. */
const Index = () => (
  <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  </MotionConfig>
);

export default Index;
