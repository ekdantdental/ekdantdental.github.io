import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AppointmentSection from "@/components/sections/AppointmentSection";
import ContactSection from "@/components/sections/ContactSection";
import PatientJourneySection from "@/components/sections/PatientJourneySection";
import PhotoGallerySection from "@/components/sections/PhotoGallerySection";
import BlogPreviewSection from "@/components/sections/BlogPreviewSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PatientJourneySection />
      <PhotoGallerySection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <AppointmentSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
