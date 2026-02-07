import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import ServicesSection from "@/components/sections/ServicesSection";
import DoctorShowcase from "@/components/sections/DoctorShowcase";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AppointmentSection from "@/components/sections/AppointmentSection";

const HomePage = () => {
  return (
    <>
      {/* 1. Hero - Trust elements, clear CTA, doctor highlight */}
      <HeroSection />
      
      {/* 2. Trust Bar - Google rating, years, patient count */}
      <TrustBar />
      
      {/* 3. Services - Visual cards, simplified */}
      <ServicesSection />
      
      {/* 4. Doctors - Lead doctor featured, team grid */}
      <DoctorShowcase />
      
      {/* 5. Testimonials - Google Reviews style */}
      <TestimonialsSection />
      
      {/* 6. Appointment - Simplified form, WhatsApp CTA (page ends here) */}
      <AppointmentSection />
    </>
  );
};

export default HomePage;
