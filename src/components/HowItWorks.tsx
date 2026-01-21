import { UserPlus, Calendar, Video, FileText } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Register Easily",
    description: "Create your account with just your phone number. No complex forms or lengthy processes.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Book Appointment",
    description: "Choose your specialist and pick a time that works for you. Available slots shown clearly.",
  },
  {
    icon: Video,
    step: "03",
    title: "Video Consultation",
    description: "Connect with your doctor through secure, low-bandwidth video call. Works on any device.",
  },
  {
    icon: FileText,
    step: "04",
    title: "Get Prescription",
    description: "Receive your prescription digitally. Pick up medicines from your local pharmacy.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get medical care in four simple steps. Designed to be easy for everyone, 
            regardless of technical experience.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-shadow duration-300 border border-border">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
