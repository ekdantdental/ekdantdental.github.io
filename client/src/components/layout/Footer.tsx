import { Link } from "wouter";
import { FaTooth, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <FaTooth className="text-2xl text-[#06B6D4] mr-2" />
              <span className="font-heading font-bold text-xl text-white">
                Bright Smile Dental
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Providing exceptional dental care for patients of all ages in a
              comfortable, state-of-the-art environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#06B6D4] transition duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-[#06B6D4] transition duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-white hover:text-[#06B6D4] transition duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-[#06B6D4] transition duration-300">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#home" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/#book-appointment" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg text-white mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  General Dentistry
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  Cosmetic Dentistry
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  Orthodontics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  Dental Implants
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  Pediatric Dentistry
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#06B6D4] transition duration-300">
                  Emergency Care
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg text-white mb-6">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-[#06B6D4]" />
                <span className="text-gray-400">
                  123 Dental Way<br />Healthytown, HT 12345
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-[#06B6D4]" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-[#06B6D4]" />
                <span className="text-gray-400">info@brightsmile.com</span>
              </li>
              <li className="flex items-start">
                <FaClock className="mt-1 mr-3 text-[#06B6D4]" />
                <div className="text-gray-400">
                  <p>Mon-Thu: 8AM - 6PM</p>
                  <p>Fri: 8AM - 5PM</p>
                  <p>Sat: 9AM - 2PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Bright Smile Dental. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-[#06B6D4] text-sm transition duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-[#06B6D4] text-sm transition duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-[#06B6D4] text-sm transition duration-300">
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
