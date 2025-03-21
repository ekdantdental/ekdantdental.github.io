interface ServiceProps {
  service: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
}

const ServiceCard = ({ service }: ServiceProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-36 md:h-48 object-cover"
      />
      <div className="p-4 md:p-6">
        <h3 className="font-heading font-semibold text-lg md:text-xl text-dark mb-2 md:mb-3">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-3 md:line-clamp-none">{service.description}</p>
        <a
          href="#"
          className="text-primary hover:text-secondary font-medium text-sm md:text-base inline-flex items-center"
        >
          Learn More <i className="fas fa-chevron-right ml-1 md:ml-2 text-xs md:text-sm"></i>
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
