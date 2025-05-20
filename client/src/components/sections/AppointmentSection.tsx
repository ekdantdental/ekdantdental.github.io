import { Link } from "wouter";
import AppointmentForm from "@/components/forms/AppointmentForm";

const AppointmentSection = () => {
  return (
    <section id="book-appointment" className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-white mb-4 md:mb-6">
              Book Your Appointment
            </h2>
            <p className="text-white/90 text-sm md:text-base mb-6 md:mb-8">
              Schedule your dental and medical consultation with ease. 
              We'll contact you promptly to confirm your appointment.
            </p>

            <div className="bg-white/10 rounded-lg p-4 md:p-6 backdrop-blur-sm mb-6 md:mb-8">
              <h3 className="font-heading font-semibold text-lg md:text-xl text-white mb-3 md:mb-4">
                Clinic Hours
              </h3>
              <ul className="space-y-2 md:space-y-3 text-white/90 text-sm md:text-base">
                <li className="flex justify-between">
                  <span>Mon-Sat</span>
                  <span>9:00 AM - 9:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>10:00 AM - 2:00 PM</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a
                href="tel:+917900139417"
                className="flex items-center justify-center bg-white text-primary hover:bg-[#06B6D4] hover:text-white py-2 md:py-3 px-4 md:px-6 rounded-md transition duration-300 font-medium text-sm md:text-base"
              >
                <i className="fas fa-phone-alt mr-2"></i> Call Clinic
              </a>
              <a
                href="https://wa.me/918379009320"
                className="flex items-center justify-center bg-green-500 text-white hover:bg-green-600 py-2 md:py-3 px-4 md:px-6 rounded-md transition duration-300 font-medium text-sm md:text-base"
              >
                <i className="fab fa-whatsapp mr-2"></i> WhatsApp
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
