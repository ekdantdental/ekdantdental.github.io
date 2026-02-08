import DoctorCard from "@/components/shared/DoctorCard";
import { doctors } from "@/lib/data";
import { 
  Stethoscope, 
  Heart, 
  Clock, 
  Shield, 
  Users, 
  Award,
  ChevronDown
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Feature card component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="bg-primary/10 rounded-full p-3 mb-3">
      {icon}
    </div>
    <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-1">{title}</h3>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

// Stats component
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{value}</div>
    <div className="text-xs sm:text-sm text-gray-600 mt-1">{label}</div>
  </div>
);

const AboutSection = () => {
  return (
    <section id="about" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - concise */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
            Why Choose Ekdant?
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Complete medical & dental care under one roof, designed around you.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-10 md:mb-16 max-w-md mx-auto md:max-w-2xl">
          <StatItem value="7+" label="Years Experience" />
          <StatItem value="5000+" label="Happy Patients" />
          <StatItem value="15+" label="Specialists" />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-10 md:mb-16">
          <FeatureCard 
            icon={<Stethoscope className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
            title="Expert Care"
            description="Qualified specialists"
          />
          <FeatureCard 
            icon={<Heart className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
            title="Patient First"
            description="Compassionate approach"
          />
          <FeatureCard 
            icon={<Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
            title="Minimal Wait"
            description="Respect your time"
          />
          <FeatureCard 
            icon={<Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
            title="Modern Tech"
            description="Latest equipment"
          />
          <FeatureCard 
            icon={<Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
            title="Family Care"
            description="All ages welcome"
          />
          <FeatureCard 
            icon={<Award className="h-5 w-5 md:h-6 md:w-6 text-primary" />}
            title="Trusted"
            description="Proven results"
          />
        </div>

        {/* Detailed Info - Accordion (collapsed by default) */}
        <div className="max-w-3xl mx-auto mb-12 md:mb-16">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 text-center">
            Learn More About Our Services
          </h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="about-us" className="border rounded-lg mb-2 px-4">
              <AccordionTrigger className="text-left text-sm md:text-base font-medium py-4">
                About Ekdant Multi Speciality Center
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 pb-4">
                At Ekdant Multi Speciality and Implant Center, we are committed to revolutionizing healthcare through our patient-centric approach. We combine cutting-edge medical and dental technologies with genuine compassion to transform routine procedures into comfortable experiences. Our dedicated team takes time to listen to your concerns and develop personalized treatment plans.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="diabetes" className="border rounded-lg mb-2 px-4">
              <AccordionTrigger className="text-left text-sm md:text-base font-medium py-4">
                Diabetes Care Program
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 pb-4">
                Our diabetes care program offers personalized management plans including blood sugar monitoring, medication management, nutrition counseling, and education on lifestyle modifications. Our certified diabetes specialists work closely with each patient to develop tailored treatment strategies to effectively control diabetes and prevent complications.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="geriatric" className="border rounded-lg mb-2 px-4">
              <AccordionTrigger className="text-left text-sm md:text-base font-medium py-4">
                Geriatric Health Services
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 pb-4">
                We understand the unique healthcare needs of older adults. Our geriatric care focuses on comprehensive assessments, management of age-related conditions, preventative care, and maintaining quality of life. We take a holistic approach considering physical, mental, and social aspects of aging.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dental" className="border rounded-lg mb-2 px-4">
              <AccordionTrigger className="text-left text-sm md:text-base font-medium py-4">
                Advanced Dental Care
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 pb-4">
                From routine check-ups to advanced implant procedures, our dental specialists provide comprehensive care using the latest techniques and technology. We specialize in cosmetic dentistry, orthodontics, root canal treatments, and dental implants, all in a comfortable, anxiety-free environment.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Doctors Section */}
        <div className="space-y-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-6">
            Meet Our Expert Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {doctors.slice(0, 4).map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          
          {doctors.length > 4 && (
            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-6">
                Visiting Consultants
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {doctors.slice(4).map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} isVisitingConsultant={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
