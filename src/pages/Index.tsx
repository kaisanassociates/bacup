import { useState } from "react";
import Hero from "@/components/Hero";
import AboutSpeaker from "@/components/AboutSpeaker";
import WorkshopDetails from "@/components/WorkshopDetails";
import RegistrationForm from "@/components/RegistrationForm";
import { Phone, Mail, MapPin } from "lucide-react";
import kaisanLogo from "@/assets/kaisan-logo.png";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Hero onRegisterClick={() => setIsFormOpen(true)} />
      <AboutSpeaker />
      <WorkshopDetails />
      
      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ready to Transform?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Take the first step towards personal excellence and professional growth
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30">
                <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">Call Us</p>
                <a href="tel:+918589990060" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                  +91 858 999 00 60
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30">
                <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">Email Us</p>
                <a href="mailto:info@kaisanassociates.com" className="text-lg font-semibold text-foreground hover:text-accent transition-colors">
                  info@kaisanassociates.com
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">Date</p>
                <p className="text-lg font-semibold text-foreground">
                  Saturday, 13 Dec 2025
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="px-12 py-6 text-lg font-semibold text-white bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Register Your Seat Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-b from-background to-primary/10 border-t border-border/50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center gap-6">
            <img src={kaisanLogo} alt="Kaisan Associates" className="h-12" />
            <p className="text-center text-muted-foreground">
              © 2025 Kaisan Associates. All rights reserved.
            </p>
            <p className="text-center text-sm text-muted-foreground max-w-2xl">
              Empowering individuals and organizations to achieve excellence through transformative workshops and training programs.
            </p>
          </div>
        </div>
      </footer>

      {/* Registration Form Modal */}
      <RegistrationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Index;
