interface DoctorProps {
  doctor: {
    id: number;
    name: string;
    title: string;
    image: string;
    description: string;
  };
  isVisitingConsultant?: boolean;
}

const DoctorCard = ({ doctor, isVisitingConsultant = false }: DoctorProps) => {
  // Use the isVisitingConsultant prop to determine if this is a visiting doctor
  const isVisiting = isVisitingConsultant;
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-5 md:p-6 h-full flex flex-col ${isVisiting ? 'border-l-4 border-primary/50' : ''}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-base md:text-lg text-dark">
            {doctor.name}
          </h3>
          
          {isVisiting && (
            <span className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full font-medium">
              Consultant
            </span>
          )}
        </div>
        
        <div className="mb-3">
          <p className="text-primary text-xs md:text-sm font-medium">
            {doctor.title}
          </p>
        </div>
        
        <div>
          <p className="text-gray-600 text-xs md:text-sm">
            {doctor.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
