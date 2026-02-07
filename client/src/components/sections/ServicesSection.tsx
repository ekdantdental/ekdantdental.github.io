import { featuredServices } from "@/lib/data";
import { 
  Stethoscope, 
  Sparkles, 
  Smile, 
  Baby, 
  CircleDot,
  ArrowRight
} from "lucide-react";
import { FaTooth } from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  tooth: <FaTooth className="h-6 w-6" />,
  sparkles: <Sparkles className="h-6 w-6" />,
  smile: <Smile className="h-6 w-6" />,
  baby: <Baby className="h-6 w-6" />,
  stethoscope: <Stethoscope className="h-6 w-6" />,
  default: <CircleDot className="h-6 w-6" />,
};

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    icon: string;
    image: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const scrollToAppointment = () => {
    const appointmentSection = document.getElementById("book-appointment");
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={scrollToAppointment}
    >
      {/* Image */}
      <div className="relative h-40 md:h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80";
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Icon Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 text-primary shadow-md">
          {iconMap[service.icon] || iconMap.default}
        </div>
      </div>

      {/* Title */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-gray-900 text-base md:text-lg group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <div className="flex items-center text-primary text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Learn more</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
            Our Services
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Comprehensive dental & medical care with state-of-the-art technology
          </p>
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4 snap-x snap-mandatory">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="min-w-[240px] w-[240px] flex-shrink-0 snap-center"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
          {/* Scroll indicator */}
          <div className="flex justify-center mt-4">
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <span>←</span> Swipe to explore <span>→</span>
            </p>
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
