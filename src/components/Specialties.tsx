import { 
  Heart, 
  Brain, 
  Baby, 
  Bone, 
  Eye, 
  Stethoscope,
  Activity,
  Pill
} from "lucide-react";
import { Button } from "@/components/ui/button";

const specialties = [
  {
    icon: Stethoscope,
    name: "General Medicine",
    description: "Primary care for common illnesses and health concerns",
    doctors: 45,
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Heart,
    name: "Cardiology",
    description: "Heart and cardiovascular system specialists",
    doctors: 28,
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: Brain,
    name: "Neurology",
    description: "Brain, spine, and nervous system care",
    doctors: 22,
    color: "bg-info/10 text-info",
  },
  {
    icon: Baby,
    name: "Pediatrics",
    description: "Healthcare for infants, children, and adolescents",
    doctors: 35,
    color: "bg-warning/10 text-warning",
  },
  {
    icon: Bone,
    name: "Orthopedics",
    description: "Bone, joint, and muscle treatment",
    doctors: 30,
    color: "bg-success/10 text-success",
  },
  {
    icon: Eye,
    name: "Ophthalmology",
    description: "Eye care and vision specialists",
    doctors: 18,
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Activity,
    name: "Diabetes Care",
    description: "Blood sugar management and lifestyle guidance",
    doctors: 25,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Pill,
    name: "Dermatology",
    description: "Skin, hair, and nail conditions",
    doctors: 20,
    color: "bg-primary/10 text-primary",
  },
];

const Specialties = () => {
  return (
    <section id="specialties" className="py-20 md:py-32 gradient-soft">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Expert Doctors
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Medical Specialties
          </h2>
          <p className="text-lg text-muted-foreground">
            Access specialists from top city hospitals. All verified and experienced 
            in providing remote consultations.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty, index) => (
            <div
              key={specialty.name}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border cursor-pointer group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${specialty.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <specialty.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {specialty.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {specialty.description}
              </p>

              {/* Doctor Count */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{specialty.doctors}</span> doctors
                </span>
                <span className="text-primary text-sm font-medium group-hover:underline">
                  View All →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg">
            View All Specialties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Specialties;
