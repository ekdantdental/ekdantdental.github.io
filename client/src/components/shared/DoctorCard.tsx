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
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-full flex flex-col">
      <div className="flex flex-col items-center text-center h-full">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/10">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h3 className="font-heading font-semibold text-base md:text-lg text-dark mb-1">
            {doctor.name}
          </h3>
          <p className="text-primary text-xs md:text-sm mb-2 md:mb-3 font-medium">{doctor.title}</p>
          <p className="text-gray-600 text-xs md:text-sm">{doctor.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
