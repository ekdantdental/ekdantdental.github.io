import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AppointmentSection from "@/components/sections/AppointmentSection";
import ContactSection from "@/components/sections/ContactSection";
import DentalCareRecommendationSection from "@/components/sections/DentalCareRecommendationSection";
import PatientJourneySection from "@/components/sections/PatientJourneySection";
import PhotoGallerySection from "@/components/sections/PhotoGallerySection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PatientJourneySection />
      <PhotoGallerySection />
      <TestimonialsSection />
      <DentalCareRecommendationSection />
      <AppointmentSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
