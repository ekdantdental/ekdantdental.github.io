import DoctorCard from "@/components/shared/DoctorCard";
import { doctors } from "@/lib/data";
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6 md:mb-8">
              <h2 className="font-heading font-bold text-2xl md:text-4xl text-dark mb-3 md:mb-4">
                About <span className="text-primary">Ekdant</span> <span className="text-blue-500">Multi Speciality Clinic and Implant Center</span>
              </h2>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                At <span className="font-semibold"><span className="text-primary">Ekdant</span> <span className="text-blue-500">Multi Speciality Clinic and Implant Center</span></span>, we are committed to revolutionizing the dental experience through our patient centric approach. 
                Our mission is to provide personalised, compassionate care that educates, motivates and inspires individuals 
                to achieve and maintain optimal oral health, resulting in vibrant, healthy smiles that illuminates their lives.
              </p>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                We combine cutting-edge dental technologies with genuine compassion to transform routine 
                procedures into comfortable experiences. Our dedicated team takes the time to listen to your 
                concerns, understand your unique needs, and develop personalized treatment plans that respect 
                your preferences and goals.
              </p>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                From preventive care to advanced implant procedures, we're committed to providing exceptional 
                dentistry in an environment of trust and respect. Experience the difference that patient-centered 
                care makes at <span className="font-semibold"><span className="text-primary">Ekdant</span> <span className="text-blue-500">Multi Speciality Clinic and Implant Center</span></span> - where advanced techniques meet compassionate service.
              </p>
              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-primary h-4 w-4 md:h-5 md:w-5 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm md:text-base">State-of-the-art technology</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary h-4 w-4 md:h-5 md:w-5 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm md:text-base">Comfortable environment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary h-4 w-4 md:h-5 md:w-5 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm md:text-base">Compassionate specialists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary h-4 w-4 md:h-5 md:w-5 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm md:text-base">Family dental care</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Our Expert Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {doctors.slice(0, 4).map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
            
            {doctors.length > 4 && (
              <div className="mt-8">
                <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Our Visiting Consultants</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {doctors.slice(4).map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} isVisitingConsultant={true} />
                  ))}
                </div>
              </div>
            )}
            
            <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-50 p-4 md:p-6 mt-8">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Visit Our Clinic</h3>
              <p className="text-sm md:text-base mb-3 md:mb-4">
                Our state-of-the-art facility provides comfortable, high-quality care for all your dental and medical needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
