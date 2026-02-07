import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock } from "lucide-react";

const HeroSection = () => {
  // Function to scroll to section by ID
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-primary text-white">
      {/* Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary opacity-90 absolute inset-0"></div>
        <img
          src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=800&q=80"
          alt="Dental office"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-2xl">
          {/* Heading - responsive sizing */}
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 md:mb-6 leading-tight">
            Ekdant Multi Speciality & Implant Center
          </h1>
          
          {/* Mobile description - short */}
          <p className="md:hidden text-base mb-5 text-white/90 leading-relaxed">
            Your trusted destination for <span className="font-semibold">complete medical & dental care</span> — personalized, compassionate, and comprehensive.
          </p>
          
          {/* Desktop description - full */}
          <p className="hidden md:block text-lg mb-8 text-white/90 leading-relaxed">
            At <span className="font-semibold text-white">Ekdant Multi Speciality and Implant Center</span>, we provide personalized, compassionate care for all your medical and dental needs. Our mission is to help you achieve and maintain optimal health and wellbeing.
          </p>
          
          {/* Buttons - stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              className="bg-[#06B6D4] hover:bg-white hover:text-primary text-white font-semibold py-3 px-6 sm:px-8 rounded-md transition duration-300 text-base"
              onClick={() => scrollToSection('book-appointment')}
            >
              Book Appointment
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-3 px-6 sm:px-8 rounded-md transition duration-300 text-base"
              onClick={() => scrollToSection('services')}
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Highlights - horizontal scroll on mobile */}
      <div className="bg-white py-4 md:py-6 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: horizontal scroll */}
          <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-6 overflow-x-auto pb-2 md:pb-0 snap-x snap-mandatory scrollbar-hide">
            <div className="flex items-center p-3 md:p-4 bg-gray-50 rounded-lg shadow-sm min-w-[260px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink">
              <div className="bg-primary/10 rounded-full p-2 md:p-3 mr-3 md:mr-4 flex-shrink-0">
                <Calendar className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm md:text-base text-gray-900">
                  Easy Scheduling
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Book appointments online
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 md:p-4 bg-gray-50 rounded-lg shadow-sm min-w-[260px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink">
              <div className="bg-primary/10 rounded-full p-2 md:p-3 mr-3 md:mr-4 flex-shrink-0">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm md:text-base text-gray-900">
                  Expert Specialists
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Medical & dental experts
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 md:p-4 bg-gray-50 rounded-lg shadow-sm min-w-[260px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink">
              <div className="bg-primary/10 rounded-full p-2 md:p-3 mr-3 md:mr-4 flex-shrink-0">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm md:text-base text-gray-900">
                  Extended Hours
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Evening & weekend options
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
