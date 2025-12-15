import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <h1 className="text-9xl md:text-[200px] font-black mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            404
          </h1>

          {/* Message */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.history.back()}
              variant="outline"
              className="text-lg px-8 py-6 bg-white/80 dark:bg-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/20 border-2 border-primary/30 hover:border-primary transition-all duration-300 rounded-2xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
            <Button
              size="lg"
              onClick={() => window.location.href = "/"}
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold rounded-2xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Button>
          </div>
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
    </div>
  );
};

export default NotFound;
