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
        <div className="flex justify-between items-center h-28 md:h-32">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-20 w-20 mr-3 flex items-center justify-center bg-white rounded-md">
                <img 
                  src="/images/brand/logo-ekdant-new.jpg" 
                  alt="Ekdant Logo" 
                  className="h-18 w-18 object-contain" 
                />
              </div>
              <div className="h-16">
                <img 
                  src="/images/brand/ekdant-text-styling.png" 
                  alt="Ekdant Multi Speciality and Implant Center" 
                  className="h-full object-contain" 
                />
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="text-primary hover:bg-primary/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
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
            <Link 
              href="/dental-anxiety-resources" 
              className="font-medium text-gray-600 hover:text-primary transition duration-300"
            >
              Anxiety Support
            </Link>
            <a 
              onClick={() => scrollToSection('dental-care-recommendation')} 
              className="font-medium text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
            >
              Dental Care Assessment
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
              className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded-md transition duration-300 shadow-sm"
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
          <Link 
            href="/dental-anxiety-resources"
            onClick={closeMobileMenu}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary"
          >
            Anxiety Support
          </Link>
          <a 
            onClick={() => scrollToSection('dental-care-recommendation')} 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            Dental Care Assessment
          </a>
          <a 
            onClick={() => scrollToSection('contact')} 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            Contact
          </a>
          <a 
            onClick={() => scrollToSection('book-appointment')} 
            className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-opacity-90 text-center mt-4 cursor-pointer shadow-sm"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
