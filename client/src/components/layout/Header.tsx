import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FaTooth } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <FaTooth className="text-3xl text-primary mr-2" />
              <span className="font-heading font-bold text-xl md:text-2xl text-primary">
                Ekdant Dental and ENT
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars text-2xl text-gray-600 hover:text-primary"></i>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/#home" className="font-medium text-primary hover:text-secondary transition duration-300">
              Home
            </Link>
            <Link href="/#services" className="font-medium text-gray-600 hover:text-primary transition duration-300">
              Services
            </Link>
            <Link href="/#about" className="font-medium text-gray-600 hover:text-primary transition duration-300">
              About
            </Link>
            <Link href="/#testimonials" className="font-medium text-gray-600 hover:text-primary transition duration-300">
              Testimonials
            </Link>
            <Link href="/#contact" className="font-medium text-gray-600 hover:text-primary transition duration-300">
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button className="bg-[#06B6D4] hover:bg-primary text-white font-semibold py-2 px-6 rounded-md transition duration-300">
              <Link href="/#book-appointment">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white border-t border-gray-200 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/#home" 
            className="block px-3 py-2 rounded-md text-base font-medium text-primary"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            href="/#services" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary"
            onClick={closeMobileMenu}
          >
            Services
          </Link>
          <Link 
            href="/#about" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary"
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link 
            href="/#testimonials" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary"
            onClick={closeMobileMenu}
          >
            Testimonials
          </Link>
          <Link 
            href="/#contact" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
          <Link 
            href="/#book-appointment" 
            className="block px-3 py-2 rounded-md text-base font-medium bg-[#06B6D4] text-white hover:bg-primary text-center mt-4"
            onClick={closeMobileMenu}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
