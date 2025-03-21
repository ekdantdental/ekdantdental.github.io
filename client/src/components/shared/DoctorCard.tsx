interface DoctorProps {
  doctor: {
    id: number;
    name: string;
    title: string;
    image: string;
    description: string;
  };
}

const DoctorCard = ({ doctor }: DoctorProps) => {
  return (
    <div className="bg-light rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center md:flex-col md:items-center md:text-center">
        <div className="w-16 h-16 md:w-24 md:h-24 mr-4 md:mr-0 md:mb-4 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:text-center">
          <h3 className="font-heading font-semibold text-base md:text-lg text-dark">
            {doctor.name}
          </h3>
          <p className="text-primary text-xs md:text-sm mb-1 md:mb-2">{doctor.title}</p>
          <p className="text-gray-600 text-xs md:text-sm line-clamp-2 md:line-clamp-none">{doctor.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
