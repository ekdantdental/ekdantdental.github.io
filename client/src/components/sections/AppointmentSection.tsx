import { Link } from "wouter";
import AppointmentForm from "@/components/forms/AppointmentForm";

const AppointmentSection = () => {
  return (
    <section id="book-appointment" className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
              Book Your Appointment
            </h2>
            <p className="text-white/90 mb-8">
              Schedule your next dental or ENT consultation with ease. Fill out the form, and
              our team will contact you promptly to confirm your appointment. We
              look forward to taking care of your health and wellbeing!
            </p>

            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm mb-8">
              <h3 className="font-heading font-semibold text-xl text-white mb-4">
                Clinic Hours
              </h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday</span>
                  <span>8:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+11234567890"
                className="flex items-center justify-center bg-white text-primary hover:bg-[#06B6D4] hover:text-white py-3 px-6 rounded-md transition duration-300 font-medium"
              >
                <i className="fas fa-phone-alt mr-2"></i> (123) 456-7890
              </a>
              <a
                href="mailto:info@ekdantclinic.com"
                className="flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary py-3 px-6 rounded-md transition duration-300 font-medium"
              >
                <i className="fas fa-envelope mr-2"></i> Email Us
              </a>
            </div>
          </div>

          <AppointmentForm />
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
