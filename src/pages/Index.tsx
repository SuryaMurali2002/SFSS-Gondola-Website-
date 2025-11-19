import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProgressTracker } from "@/components/ProgressTracker";
import { Petition } from "@/components/Petition";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <ProgressTracker />
      <Petition />
      <Footer />
    </div>
  );
};

export default Index;