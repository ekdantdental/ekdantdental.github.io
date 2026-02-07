import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "918379009320";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'd like to book an appointment at Ekdant Multi Speciality and Implant Center.");

const FloatingCTA = () => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom">
      <div className="px-4 py-3">
        <Button 
          onClick={handleWhatsAppClick}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-base rounded-lg shadow-lg flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="text-xl" />
          Book via WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default FloatingCTA;
