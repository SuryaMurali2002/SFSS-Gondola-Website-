import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/gondola-hero.jpg";
import sfssLogo from "@/assets/sfss-logo.png";

export const Hero = () => {
  const scrollToPetition = () => {
    document.getElementById('petition')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* SFSS Logo - Top Left */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 animate-in fade-in slide-in-from-left duration-1000">
        <img 
          src={sfssLogo} 
          alt="Simon Fraser Student Society" 
          className="h-8 md:h-10 w-auto drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-primary">
              Elevate SFU
            </span>
            <br />
            <span className="text-foreground">Support the Gondola Project</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect our mountain campus to the city below. Sign the petition to show government officials that the community demands sustainable, accessible transit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={scrollToPetition}
              className="group text-lg px-8 py-6 bg-primary hover:bg-primary/90 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Sign the Petition
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-6 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
};