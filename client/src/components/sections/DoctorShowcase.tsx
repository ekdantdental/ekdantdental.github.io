import { doctors } from "@/lib/data";
import { Award, GraduationCap, Star, Check } from "lucide-react";

// Helper function to extract initials from a doctor's name
const getInitials = (name: string): string => {
  const words = name.replace(/^Dr\.?\s*/i, "").split(" ");
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return words[0].substring(0, 2).toUpperCase();
};

// Generate a deterministic color based on the doctor's name
const getAvatarColor = (name: string): string => {
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  
  // Create a simple hash from the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

// Check if the image is a real photo (non-empty local path)
const isRealPhoto = (imagePath: string): boolean => {
  if (!imagePath || imagePath.length === 0) return false;
  return imagePath.startsWith("/images/doctors/");
};

const DoctorShowcase = () => {
  const leadDoctor = doctors[0]; // Dr. Reshma Rathod
  const otherDoctors = doctors.slice(1); // Show all other doctors

  return (
    <section id="doctors" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
            Meet Our Expert Team
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Experienced specialists dedicated to your health and comfort
          </p>
        </div>

        {/* Lead Doctor Feature */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Doctor Image */}
              <div className="relative mx-auto md:mx-0">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={leadDoctor.image}
                    alt={leadDoctor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80";
                    }}
                  />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                  Lead Specialist
                </div>
              </div>

              {/* Doctor Info */}
              <div className="text-center md:text-left">
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-2">
                  {leadDoctor.name}
                </h3>
                <p className="text-primary font-semibold text-sm md:text-base mb-4">
                  {leadDoctor.title}
                </p>

                {/* Credentials */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 text-sm justify-center md:justify-start">
                    <GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>MDS in Prosthodontics & Implantology</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm justify-center md:justify-start">
                    <Award className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>7+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm justify-center md:justify-start">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                    <span>2000+ Successful Implants</span>
                  </div>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {["Dental Implants", "Implant Dentistry", "Crown & Bridge", "Smile Design", "Full Mouth Rehab"].map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
                    >
                      <Check className="h-3 w-3" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Doctors Grid */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-6">
            Our Specialist Team
          </h3>
          
          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 snap-x snap-mandatory">
              {otherDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="min-w-[200px] w-[200px] flex-shrink-0 snap-center"
                >
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface DoctorCardProps {
  doctor: {
    id: number;
    name: string;
    title: string;
    image: string;
  };
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const hasRealPhoto = isRealPhoto(doctor.image);
  const initials = getInitials(doctor.name);
  const avatarColor = getAvatarColor(doctor.name);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image or Initials Avatar */}
      <div className="h-40 md:h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        {hasRealPhoto ? (
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full ${avatarColor} flex items-center justify-center shadow-lg`}>
            <span className="text-white font-bold text-3xl md:text-4xl">
              {initials}
            </span>
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-4 text-center">
        <h4 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
          {doctor.name}
        </h4>
        <p className="text-primary text-xs md:text-sm line-clamp-2">
          {doctor.title}
        </p>
      </div>
    </div>
  );
};

export default DoctorShowcase;
