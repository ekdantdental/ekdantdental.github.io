import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Function to scroll to section by ID
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/brand/logo.jpg" 
                alt="Ekdant Logo" 
                className="h-12 mr-2" 
              />
              <span className="font-heading font-bold text-xl md:text-2xl" style={{ color: '#3C2A98' }}>
                Ekdant
              </span>
              <span className="font-medium text-sm md:text-base text-gray-700 ml-1 hidden md:inline-block">
                Multi Speciality and Implant Center
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
            <a 
              onClick={() => scrollToSection('home')} 
              className="font-medium text-primary hover:text-secondary transition duration-300 cursor-pointer"
            >
              Home
            </a>
            <a 
              onClick={() => scrollToSection('services')} 
              className="font-medium text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
            >
              Services
            </a>
            <a 
              onClick={() => scrollToSection('about')} 
              className="font-medium text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
            >
              About
            </a>
            <a 
              onClick={() => scrollToSection('testimonials')} 
              className="font-medium text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
            >
              Testimonials
            </a>
            <a 
              onClick={() => scrollToSection('contact')} 
              className="font-medium text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:block">
            <Button 
              className="bg-[#06B6D4] hover:bg-primary text-white font-semibold py-2 px-6 rounded-md transition duration-300"
              onClick={() => scrollToSection('book-appointment')}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white border-t border-gray-200 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            onClick={() => scrollToSection('home')} 
            className="block px-3 py-2 rounded-md text-base font-medium text-primary cursor-pointer"
          >
            Home
          </a>
          <a 
            onClick={() => scrollToSection('services')} 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            Services
          </a>
          <a 
            onClick={() => scrollToSection('about')} 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            About
          </a>
          <a 
            onClick={() => scrollToSection('testimonials')} 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            Testimonials
          </a>
          <a 
            onClick={() => scrollToSection('contact')} 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            Contact
          </a>
          <a 
            onClick={() => scrollToSection('book-appointment')} 
            className="block px-3 py-2 rounded-md text-base font-medium bg-[#06B6D4] text-white hover:bg-primary text-center mt-4 cursor-pointer"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
