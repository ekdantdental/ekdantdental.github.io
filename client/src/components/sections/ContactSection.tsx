import { useEffect } from "react";
import ContactCard from "@/components/shared/ContactCard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { contactInfo } from "@/lib/data";
import L from "leaflet";

// Fix marker icons in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// We will set the default icon in useEffect to avoid server-side rendering issues
const ContactSection = () => {
  // Set default icon for Leaflet markers
  useEffect(() => {
    // @ts-ignore - This is needed as TypeScript doesn't have the correct type definitions
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  const position: [number, number] = [19.0631, 73.0095]; // Ekdant Clinic Coordinates in Sanpada, Navi Mumbai

  return (
    <section id="contact" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-dark mb-2 md:mb-4">
            Contact Ekdant Dental Clinic
          </h2>
          <p className="text-gray-600 text-sm md:text-base px-1 md:px-0">
            Have questions or need assistance? Reach out to our team through any
            of these channels, and we'll be happy to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-12">
          {contactInfo.map((info) => (
            <ContactCard key={info.id} info={info} />
          ))}
        </div>

        {/* Map */}
        <div className="h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <MapContainer 
            style={{ height: "100%", width: "100%" }}
            // @ts-ignore - These props are valid but TypeScript definitions are incorrect
            center={position} 
            zoom={16} 
            scrollWheelZoom={false}
          >
            <TileLayer
              // @ts-ignore - These props are valid but TypeScript definitions are incorrect
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="text-xs sm:text-sm md:text-base font-sans">
                  <strong>Ekdant Dental Clinic</strong><br />
                  18, Shiv Triveni Complex, Sector 7<br />
                  Sanpada, Navi Mumbai<br />
                  Landmark: Near Chaudhri medical<br />
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Ekdant+Dental+clinic+Sanpada+Navi+Mumbai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline mt-2 inline-block text-sm font-medium"
                  >
                    Get Directions
                  </a>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
