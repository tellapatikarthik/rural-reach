import { Video, Shield, Clock, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-fade-in">
            <Wifi className="w-4 h-4 text-primary-foreground" />
            <span className="text-primary-foreground text-sm font-medium">
              Low-bandwidth optimized for rural areas
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Quality Healthcare,
            <br />
            <span className="text-primary-foreground/90">Wherever You Are</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-primary-foreground/85 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Connect with specialist doctors from cities through secure video consultations. 
            No travel needed, works even on slow internet.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
              <Video className="w-6 h-6" />
              Start Free Consultation
            </Button>
            <Button variant="hero-outline" size="lg" className="w-full sm:w-auto">
              Learn How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-center gap-3 text-primary-foreground/90">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/15 flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold">100% Secure</div>
                <div className="text-sm text-primary-foreground/70">Private & Encrypted</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-primary-foreground/90">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/15 flex items-center justify-center backdrop-blur-sm">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold">24/7 Available</div>
                <div className="text-sm text-primary-foreground/70">Always Here for You</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-primary-foreground/90">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/15 flex items-center justify-center backdrop-blur-sm">
                <Wifi className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Low Bandwidth</div>
                <div className="text-sm text-primary-foreground/70">Works on 2G/3G</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
