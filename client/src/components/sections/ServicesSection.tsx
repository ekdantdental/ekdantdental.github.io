import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/shared/ServiceCard";
import { services } from "@/lib/data";

const ServicesSection = () => {
  // Function to scroll to appointment section
  const scrollToAppointment = () => {
    const appointmentSection = document.getElementById('book-appointment');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - more concise */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-12">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-2 md:mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-sm md:text-base px-2 md:px-0">
            Comprehensive medical & dental care using the latest technology.
          </p>
        </div>

        {/* Mobile: Horizontal scroll with snap */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4 snap-x snap-mandatory">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="min-w-[280px] w-[280px] flex-shrink-0 snap-center"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
          {/* Scroll indicator */}
          <div className="flex justify-center mt-4 gap-1">
            {services.map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-8 md:mt-12">
          <Button 
            className="bg-primary hover:bg-secondary text-white font-semibold text-sm md:text-base py-3 px-6 md:px-8 rounded-md transition duration-300"
            onClick={scrollToAppointment}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
