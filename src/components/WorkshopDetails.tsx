import { useEffect, useRef, useState } from "react";
import { Target, Users, TrendingUp, Heart, Briefcase, Sparkles } from "lucide-react";

const WorkshopDetails = () => {
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

  const benefits = [
    {
      icon: Target,
      title: "Personal Growth",
      description: "Unlock your potential and discover strategies for continuous self-improvement",
      color: "from-primary to-primary/80",
    },
    {
      icon: Heart,
      title: "Relationship Excellence",
      description: "Master the art of building and maintaining meaningful relationships",
      color: "from-accent to-accent/80",
    },
    {
      icon: Briefcase,
      title: "Professional Success",
      description: "Develop skills and mindset for outstanding career advancement",
      color: "from-primary to-accent",
    },
    {
      icon: Users,
      title: "Leadership Skills",
      description: "Learn to influence, inspire, and lead with authenticity",
      color: "from-accent to-primary",
    },
    {
      icon: TrendingUp,
      title: "Goal Achievement",
      description: "Create actionable plans to achieve your most ambitious goals",
      color: "from-primary to-primary/80",
    },
    {
      icon: Sparkles,
      title: "Life Transformation",
      description: "Experience a complete shift in perspective and approach to life",
      color: "from-accent to-accent/80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-b from-secondary/30 via-background to-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-4">
              <span className="text-sm font-semibold text-primary">What You'll Gain</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Workshop Highlights
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A transformative 7-hour intensive workshop designed to elevate every aspect of your life
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] hover:scale-105">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Hover effect overlay */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                </div>
              </div>
            ))}
          </div>

          {/* Workshop Format */}
          <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 backdrop-blur-xl border border-primary/20 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,138,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_linear_infinite]" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Workshop Format
                  </span>
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white text-2xl font-bold mb-4 shadow-lg">
                      7
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Hours</h4>
                    <p className="text-muted-foreground">Intensive Training</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white text-2xl font-bold mb-4 shadow-lg">
                      ∞
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Interactive</h4>
                    <p className="text-muted-foreground">Hands-on Activities</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent text-white text-2xl font-bold mb-4 shadow-lg">
                      ★
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Practical</h4>
                    <p className="text-muted-foreground">Real-world Applications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -250% 0, 0 0;
          }
          100% {
            background-position: 250% 0, 0 0;
          }
        }
      `}</style>
    </section>
  );
};

export default WorkshopDetails;
