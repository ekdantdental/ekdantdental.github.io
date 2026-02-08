import AppointmentForm from "@/components/forms/AppointmentForm";
import { Phone, Clock, MapPin, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { clinicInfo } from "@/lib/data";

const AppointmentSection = () => {
  return (
    <section id="book-appointment" className="py-12 md:py-20 bg-gradient-to-br from-primary via-primary to-cyan-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              Ready to Transform{" "}
              <span className="text-cyan-300">Your Smile?</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Book your free consultation today. We'll get back to you within hours to confirm your appointment.
            </p>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${clinicInfo.whatsappNumber.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white rounded-xl p-4 transition-all group"
              >
                <div className="bg-white/20 rounded-full p-2">
                  <FaWhatsapp className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm text-white/80">Instant Response</div>
                </div>
              </a>

              {/* Call */}
              <a
                href={`tel:${clinicInfo.phoneNumber}`}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 transition-all backdrop-blur-sm border border-white/20"
              >
                <div className="bg-white/20 rounded-full p-2">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Call Us</div>
                  <div className="text-sm text-white/80">{clinicInfo.phoneNumber}</div>
                </div>
              </a>
            </div>

            {/* Clinic Info Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/90">
                <Clock className="h-5 w-5 text-cyan-300 flex-shrink-0" />
                <div>
                  <span className="font-medium">Mon-Sat:</span> 9:00 AM - 9:00 PM |{" "}
                  <span className="font-medium">Sun:</span> 10:00 AM - 2:00 PM
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Gami+Terra+Sector+6+Sanpada+Navi+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/90 hover:text-white transition-colors group"
              >
                <MapPin className="h-5 w-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                <div>
                  <span>Office No 8 & 9, 1st Floor, Gami Terra, Sector-6, Sanpada, Navi Mumbai</span>
                  <span className="block text-cyan-300 text-sm mt-1 group-hover:underline">Get Directions →</span>
                </div>
              </a>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <MessageCircle className="h-4 w-4 text-cyan-300" />
              <span className="text-white/90 text-sm">
                Average response time: <span className="font-semibold text-white">under 30 minutes</span>
              </span>
            </div>
          </div>

          {/* Right Content - Form */}
          <div id="appointment-form" className="lg:pl-8">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
