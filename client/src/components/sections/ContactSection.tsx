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
            Contact Ekdant Multi Speciality and Implant Center
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
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <a 
              href="https://g.page/ekdant-dental-clinic-sanpada" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-gray-800 hover:bg-gray-100 transition-colors font-medium py-2 px-4 rounded-md shadow-sm border flex items-center gap-2 w-full md:w-auto text-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" className="text-primary">
                <path fill="#4CAF50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
                <path fill="#1E88E5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
                <polygon fill="#FFB300" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
                <path fill="#D32F2F" d="M3,16.2v-4c0-1.657,1.343-3,3-3h36c1.657,0,3,1.343,3,3v4L24,27.95L3,16.2z" />
              </svg>
              Visit Our Google Business Page
            </a>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Ekdant+Multi+Speciality+and+Implant+Center+Sanpada+Navi+Mumbai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-white hover:bg-primary/90 transition-colors font-medium py-2 px-4 rounded-md shadow-sm border flex items-center gap-2 w-full md:w-auto text-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </svg>
              Get Directions on Google Maps
            </a>
            <a 
              href="#" 
              onClick={(e) => {e.preventDefault(); window.open('https://search.google.com/local/writereview?placeid=ChIJxxxxxxxxxxxxxxx', '_blank')}}
              className="bg-white text-gray-800 hover:bg-gray-100 transition-colors font-medium py-2 px-4 rounded-md shadow-sm border flex items-center gap-2 w-full md:w-auto text-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Leave a Google Review
            </a>
          </div>
        </div>
        
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
                  <strong>Ekdant Multi Speciality and Implant Center</strong><br />
                  Office No 8 and 9, 1st Floor, Gami Terra<br />
                  Sector-6, Sanpada, Navi Mumbai - 400 705<br />
                  <div className="flex gap-2 mt-2">
                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=Ekdant+Multi+Speciality+and+Implant+Center+Sanpada+Navi+Mumbai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Get Directions
                    </a>
                    <span className="text-gray-400">|</span>
                    <a 
                      href="https://g.page/ekdant-dental-clinic-sanpada" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Google Maps
                    </a>
                  </div>
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
