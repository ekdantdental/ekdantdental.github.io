import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const PHONE_NUMBER = "+917900139417";
const WHATSAPP_NUMBER = "917900139417";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'd like to book an appointment at Ekdant Multi Speciality and Implant Center.");

const FloatingActions = () => {
  const handleCallClick = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank');
  };

  return (
    <div className="fixed right-4 z-40 flex flex-col gap-3" style={{ bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}>
      {/* Call Button */}
      <button
        onClick={handleCallClick}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors active:scale-95"
        aria-label="Call us"
      >
        <Phone className="h-6 w-6" />
      </button>

      {/* WhatsApp Button - visible on desktop only (mobile has bottom CTA) */}
      <button
        onClick={handleWhatsAppClick}
        className="hidden md:flex w-14 h-14 bg-green-500 text-white rounded-full shadow-lg items-center justify-center hover:bg-green-600 transition-colors active:scale-95"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp className="h-7 w-7" />
      </button>
    </div>
  );
};

export default FloatingActions;
