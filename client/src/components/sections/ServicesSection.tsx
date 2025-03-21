import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/shared/ServiceCard";
import { services } from "@/lib/data";
import { Link } from "wouter";

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
            Our Dental Services
          </h2>
          <p className="text-gray-600">
            We provide comprehensive dental care services to meet all your oral
            health needs in one convenient location. Our team uses the latest
            techniques and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-8 rounded-md transition duration-300" asChild>
            <Link href="#book-appointment">Schedule Your Visit</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
