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
    <div className="bg-light rounded-lg shadow-md p-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-heading font-semibold text-lg text-dark">
          {doctor.name}
        </h3>
        <p className="text-primary text-sm mb-2">{doctor.title}</p>
        <p className="text-gray-600 text-sm">{doctor.description}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
