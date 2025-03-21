import DoctorCard from "@/components/shared/DoctorCard";
import { doctors } from "@/lib/data";
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
                About Ekdant Dental and ENT Clinic
              </h2>
              <p className="text-gray-600 mb-6">
                Ekdant Dental and ENT Clinic is a multi-speciality clinic serving the 
                Navi Mumbai community with exceptional dental and ENT care in a comfortable,
                state-of-the-art facility. Our mission is to help you achieve
                and maintain optimal oral and ENT health throughout your lifetime.
              </p>
              <p className="text-gray-600 mb-6">
                We pride ourselves on staying current with the latest
                advancements in dental technology and techniques to ensure you
                receive the most effective and comfortable treatments available.
                Our compassionate team takes the time to listen to your concerns
                and develop personalized treatment plans to meet your unique
                needs.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                  <span>State-of-the-art dental and ENT technology</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Comfortable, patient-friendly environment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Highly trained, compassionate specialists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Comprehensive dental and ENT services for the whole family</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-50 p-6">
              <h3 className="text-xl font-semibold mb-4">Visit Our Modern Clinic</h3>
              <p className="mb-4">
                Our state-of-the-art facility is designed for your comfort and equipped 
                with the latest dental and ENT technology to provide comprehensive care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
                    alt="Modern dental clinic waiting area"
                    className="w-full h-auto rounded-lg shadow"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">Comfortable waiting area</p>
                </div>
                <div className="flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
                    alt="Dental treatment room"
                    className="w-full h-auto rounded-lg shadow"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">Advanced treatment area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
