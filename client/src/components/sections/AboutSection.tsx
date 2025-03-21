import DoctorCard from "@/components/shared/DoctorCard";
import { doctors } from "@/lib/data";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
                About Our Dental Clinic
              </h2>
              <p className="text-gray-600 mb-6">
                Bright Smile Dental has been serving our community for over 15
                years, providing exceptional dental care in a comfortable,
                state-of-the-art facility. Our mission is to help you achieve
                and maintain optimal oral health throughout your lifetime.
              </p>
              <p className="text-gray-600 mb-6">
                We pride ourselves on staying current with the latest
                advancements in dental technology and techniques to ensure you
                receive the most effective and comfortable treatments available.
                Our compassionate team takes the time to listen to your concerns
                and develop personalized treatment plans to meet your unique
                needs.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#06B6D4] mt-1 mr-2"></i>
                  <span>State-of-the-art dental technology</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#06B6D4] mt-1 mr-2"></i>
                  <span>Comfortable, spa-like environment</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#06B6D4] mt-1 mr-2"></i>
                  <span>Highly trained, compassionate staff</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#06B6D4] mt-1 mr-2"></i>
                  <span>Comprehensive dental services for the whole family</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
                alt="Our modern dental clinic"
                className="w-full h-auto"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
