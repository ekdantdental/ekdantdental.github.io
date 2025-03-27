import { Button } from "@/components/ui/button";

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
        <div className="max-w-2xl">
          <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            Ekdant Multispeciality and Implant Center
          </h1>
          <p className="text-base md:text-lg mb-6 md:mb-8 text-light/90">
            Exceptional dental care in Navi Mumbai. Our multi-speciality clinic
            combines latest technology with compassionate care for all your dental and ENT needs.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              className="bg-[#06B6D4] hover:bg-white hover:text-primary text-white font-semibold py-3 px-8 rounded-md transition duration-300"
              onClick={() => scrollToSection('book-appointment')}
            >
              Book Appointment
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-3 px-8 rounded-md transition duration-300"
              onClick={() => scrollToSection('services')}
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-white py-4 md:py-6 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            <div className="flex items-center p-3 md:p-4 bg-light rounded-lg shadow-sm">
              <div className="bg-primary/10 rounded-full p-2 md:p-3 mr-3 md:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <path d="M8 14h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 18h.01"></path>
                  <path d="M12 18h.01"></path>
                  <path d="M16 18h.01"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm md:text-base text-dark">
                  Easy Scheduling
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Book appointments online
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 md:p-4 bg-light rounded-lg shadow-sm">
              <div className="bg-primary/10 rounded-full p-2 md:p-3 mr-3 md:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm md:text-base text-dark">
                  Expert Specialists
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Experienced professionals
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 md:p-4 bg-light rounded-lg shadow-sm">
              <div className="bg-primary/10 rounded-full p-2 md:p-3 mr-3 md:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm md:text-base text-dark">
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
