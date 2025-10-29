import { useEffect, useRef, useState } from "react";
import drRashidFormal from "@/assets/dr-rashid-formal.jpeg";
import drRashidSpeaking from "@/assets/dr-rashid-speaking.jpg";

const AboutSpeaker = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Meet Your Mentor
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Images Side */}
            <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="relative">
                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/10">
                  <img
                    src={drRashidFormal}
                    alt="Dr. Rashid Gazzali"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>

                {/* Floating secondary image */}
                <div className="absolute -bottom-8 -right-8 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-background animate-float">
                  <img
                    src={drRashidSpeaking}
                    alt="Dr. Rashid Gazzali Speaking"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
            </div>

            {/* Text Content */}
            <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <span className="text-sm font-semibold text-primary">Workshop Facilitator</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-foreground">
                Dr. Rashid Gazzali
              </h3>

              <div className="space-y-4 text-lg text-muted-foreground">
                <p className="leading-relaxed">
                  A renowned expert in personal development and professional excellence, Dr. Rashid Gazzali has transformed thousands of lives through his powerful workshops and training programs.
                </p>

                <p className="leading-relaxed">
                  With years of experience in coaching leaders and professionals, Dr. Gazzali brings a unique blend of practical wisdom and transformative strategies that create lasting impact.
                </p>

                <div className="pt-4">
                  <div className="relative p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/30">
                    <p className="text-xl font-semibold text-foreground mb-2">
                      "Excellence is not a destination, it's a continuous journey of growth and transformation."
                    </p>
                    <p className="text-sm text-primary font-medium">— Dr. Rashid Gazzali</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                  <p className="text-3xl font-bold text-primary">7+</p>
                  <p className="text-sm text-muted-foreground">Hours of Training</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
                  <p className="text-3xl font-bold text-accent">1000+</p>
                  <p className="text-sm text-muted-foreground">Lives Transformed</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                  <p className="text-3xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSpeaker;
