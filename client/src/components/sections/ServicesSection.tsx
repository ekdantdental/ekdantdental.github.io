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
    <section id="services" className="py-16 md:py-24 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-dark mb-2 md:mb-4">
            Our Medical & Dental Services
          </h2>
          <p className="text-gray-600 text-sm md:text-base px-2 md:px-0">
            Comprehensive care for all your medical and dental needs in one location, 
            using the latest techniques and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Button 
            className="bg-primary hover:bg-secondary text-white font-semibold text-sm md:text-base py-2 md:py-3 px-6 md:px-8 rounded-md transition duration-300"
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
