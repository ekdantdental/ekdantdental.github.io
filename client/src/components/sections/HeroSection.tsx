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
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Ekdant Dental and ENT Clinic
          </h1>
          <p className="text-lg mb-8 text-light/90">
            At Ekdant Dental and ENT Clinic, we're committed to providing exceptional
            dental and ENT care in a comfortable environment. Our multi-speciality clinic
            uses the latest technology to ensure you receive the highest quality healthcare
            for your dental and ENT needs.
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
      <div className="bg-white py-6 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-light rounded-lg shadow-sm">
              <div className="bg-primary/10 rounded-full p-3 mr-4">
                <i className="fas fa-calendar-check text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-dark">
                  Easy Scheduling
                </h3>
                <p className="text-sm text-gray-600">
                  Book your appointments online anytime
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-light rounded-lg shadow-sm">
              <div className="bg-primary/10 rounded-full p-3 mr-4">
                <i className="fas fa-user-md text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-dark">
                  Expert Specialists
                </h3>
                <p className="text-sm text-gray-600">
                  Experienced team of dental and ENT professionals
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-light rounded-lg shadow-sm">
              <div className="bg-primary/10 rounded-full p-3 mr-4">
                <i className="fas fa-clock text-primary text-xl"></i>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-dark">
                  Extended Hours
                </h3>
                <p className="text-sm text-gray-600">
                  Evening & weekend appointments available
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
