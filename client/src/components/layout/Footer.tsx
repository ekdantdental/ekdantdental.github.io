import { Link } from "wouter";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-white pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-12">
          <div className="mb-2 md:mb-0">
            <div className="flex items-center mb-4 md:mb-6">
              <div className="relative h-14 w-14 mr-3 bg-white rounded-md p-1 flex items-center justify-center">
                <img 
                  src="/images/brand/logo-ekdant-new.jpg" 
                  alt="Ekdant Logo" 
                  className="h-12 w-12 object-contain" 
                />
              </div>
              <div className="h-14 bg-white p-1 rounded-md">
                <img 
                  src="/images/brand/ekdant-text-styling.png" 
                  alt="Ekdant Multi Speciality and Implant Center" 
                  className="h-full object-contain" 
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">
              Providing exceptional dental care for patients of all ages in a
              comfortable, state-of-the-art environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition duration-300 text-lg md:text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300 text-lg md:text-xl">
                <FaTwitter />
              </a>
              <a 
                href="https://www.instagram.com/ekdantmultispecialitysanpada"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-primary transition duration-300 text-lg md:text-xl cursor-pointer"
                onClick={(e) => {
                  // Try to handle mobile app deep linking
                  const userAgent = navigator.userAgent || navigator.vendor;
                  if (/android/i.test(userAgent)) {
                    e.preventDefault();
                    window.location.href = 'intent://instagram.com/_u/ekdantmultispecialitysanpada#Intent;package=com.instagram.android;scheme=https;end';
                  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
                    e.preventDefault();
                    window.location.href = 'instagram://user?username=ekdantmultispecialitysanpada';
                    // Fallback for iOS after a timeout
                    setTimeout(() => {
                      window.location.href = 'https://www.instagram.com/ekdantmultispecialitysanpada';
                    }, 2000);
                  }
                  // Desktop browsers will just follow the href
                }}
              >
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300 text-lg md:text-xl">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="mb-2 md:mb-0">
            <h3 className="font-heading font-semibold text-base md:text-lg text-white mb-3 md:mb-6">
              Quick Links
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link href="/#home" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/#book-appointment" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-2 md:mb-0">
            <h3 className="font-heading font-semibold text-base md:text-lg text-white mb-3 md:mb-6">
              Medical Services
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Diabetes Management
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Hypertension Management
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  General Medical Consultation
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Personalized Medical Care
                </a>
              </li>
            </ul>
          </div>
          
          <div className="mb-2 md:mb-0">
            <h3 className="font-heading font-semibold text-base md:text-lg text-white mb-3 md:mb-6">
              Dental Services
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  General Dentistry
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Aesthetic Dentistry
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Restorative and Root Canal Treatment
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Dental Implants
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Orthodontics
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition duration-300 text-sm md:text-base">
                  Pediatric Dentistry
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-base md:text-lg text-white mb-3 md:mb-6">
              Contact Information
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 md:mr-3 text-primary text-base md:text-lg flex-shrink-0" />
                <span className="text-gray-400 text-sm md:text-base">
                  Office No 8 and 9, 1st Floor, Gami Terra<br />Sector-6, Sanpada, Navi Mumbai - 400 705
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2 md:mr-3 text-primary text-base md:text-lg flex-shrink-0" />
                <div className="text-gray-400 text-sm md:text-base">
                  <p>+91 79001 39417</p>
                  <p>022-31439081</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 md:mr-3 text-primary text-base md:text-lg flex-shrink-0" />
                <span className="text-gray-400 text-sm md:text-base">info@ekdantclinic.com</span>
              </li>
              <li className="flex items-start">
                <FaClock className="mt-1 mr-2 md:mr-3 text-primary text-base md:text-lg flex-shrink-0" />
                <div className="text-gray-400 text-sm md:text-base">
                  <p>Mon-Sat: 9AM - 9PM</p>
                  <p>Sun: 10AM - 2PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-0 text-center md:text-left">
              &copy; {new Date().getFullYear()} Ekdant Multi Speciality and Implant Center. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary text-xs md:text-sm transition duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-primary text-xs md:text-sm transition duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-primary text-xs md:text-sm transition duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
