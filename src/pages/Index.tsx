import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Specialties from "@/components/Specialties";
import Stats from "@/components/Stats";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Specialties />
        <Stats />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
