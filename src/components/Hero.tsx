import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import kaisanLogo from "@/assets/kaisan-logo.png";

const Hero = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-glow" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Logo */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <img src={kaisanLogo} alt="Kaisan Associates" className="h-16 md:h-20" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          {/* Edition Badge */}
          <div className={`inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <span className="text-accent font-bold text-lg">EDITION 2</span>
          </div>

          {/* Main Title */}
          <h1 className={`text-6xl md:text-8xl font-black mb-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              INFLUENCIA
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className={`text-2xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Transform Your Life Through Personal Excellence
          </h2>

          {/* Description */}
          <p className={`text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            Dr. Rashid Gazzali's 7 Hours Programming Workshop to Elevate Personal Life, Maintain Relationships and Professional Excellence
          </p>

          {/* Event Details Glass Card */}
          <div className={`inline-block mb-10 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <div className="relative p-8 rounded-3xl bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground mb-1">Workshop Date</p>
                  <p className="text-3xl font-bold text-accent">Saturday, 13th December 2025</p>
                </div>
                <div className="hidden md:block w-px h-12 bg-border" />
                <div className="text-center md:text-right">
                  <p className="text-sm text-muted-foreground mb-1">Reserve Your Seat</p>
                  <a href="tel:+918589990060" className="text-2xl font-bold text-primary hover:text-accent transition-colors flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    +91 858 999 00 60
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <Button
              size="lg"
              onClick={onRegisterClick}
              className="text-lg px-8 py-6 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold rounded-2xl"
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 py-6 bg-white/80 dark:bg-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/20 border-2 border-primary/30 hover:border-primary transition-all duration-300 rounded-2xl"
            >
              Learn More
            </Button>
          </div>

          {/* Programmed 2026 Badge */}
          <div className={`mt-12 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <p className="text-4xl md:text-5xl font-bold">
              <span className="text-foreground">Programmed </span>
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">2026</span>
              <span className="text-foreground"> is here</span>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-800 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
