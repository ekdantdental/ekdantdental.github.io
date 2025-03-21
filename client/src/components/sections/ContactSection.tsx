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

L.Marker.prototype.options.icon = DefaultIcon;

const ContactSection = () => {
  const position: [number, number] = [19.0631, 73.0095]; // Ekdant Clinic Coordinates in Sanpada, Navi Mumbai

  return (
    <section id="contact" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-dark mb-3 md:mb-4">
            Contact Ekdant Dental and ENT Clinic
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Have questions or need assistance? Reach out to our team through any
            of these channels, and we'll be happy to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {contactInfo.map((info) => (
            <ContactCard key={info.id} info={info} />
          ))}
        </div>

        {/* Map */}
        <div className="h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <MapContainer 
            center={position} 
            zoom={15} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="text-sm md:text-base">
                  <strong>Ekdant Dental and ENT Clinic</strong><br />
                  18, Shiv Triveni Complex, Sector 7<br />
                  Sanpada, Navi Mumbai<br />
                  Landmark: Near Chaudhri medical<br />
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Ekdant+Dental+and+ENT+clinic+Sanpada+Navi+Mumbai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-2 inline-block"
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
