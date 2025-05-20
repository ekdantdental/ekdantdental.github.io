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
        {/* Logo left, name much larger */}
        <div className="flex justify-start items-center pt-4">
          <Link href="/" className="flex items-center">
            <div className="relative h-32 w-32 mr-5 flex items-center justify-center bg-white rounded-md">
              <img 
                src="/images/brand/logo-ekdant-new.jpg" 
                alt="Ekdant Logo" 
                className="h-28 w-28 object-contain" 
              />
            </div>
            <div className="h-32 mt-0">
              <img 
                src="/images/brand/ekdant-text-styling.png" 
                alt="Ekdant Multi Speciality and Implant Center" 
                className="h-full object-contain" 
              />
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden absolute top-12 right-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="text-primary hover:bg-primary/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </Button>
        </div>

        {/* Desktop Navigation - Below Logo */}
        <nav className="hidden md:flex justify-center items-center mt-4 pb-2 space-x-8">
          <a 
            onClick={() => scrollToSection('home')} 
            className="font-medium text-lg text-primary hover:text-secondary transition duration-300 cursor-pointer"
          >
            Home
          </a>
          <a 
            onClick={() => scrollToSection('services')} 
            className="font-medium text-lg text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
          >
            Services
          </a>
          <a 
            onClick={() => scrollToSection('about')} 
            className="font-medium text-lg text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
          >
            About
          </a>
          <a 
            onClick={() => scrollToSection('testimonials')} 
            className="font-medium text-lg text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
          >
            Testimonials
          </a>
          <Link 
            href="/dental-anxiety-resources" 
            className="font-medium text-lg text-gray-600 hover:text-primary transition duration-300"
          >
            Anxiety Support
          </Link>
          <a 
            onClick={() => scrollToSection('dental-care-recommendation')} 
            className="font-medium text-lg text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
          >
            Dental Care Assessment
          </a>
          <a 
            onClick={() => scrollToSection('contact')} 
            className="font-medium text-lg text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
          >
            Contact
          </a>
          <Button 
            className="bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-8 text-lg rounded-md transition duration-300 shadow-sm"
            onClick={() => scrollToSection('book-appointment')}
          >
            Book Appointment
          </Button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white border-t border-gray-200 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-4 pb-6 space-y-4 sm:px-4">
          <a 
            onClick={() => scrollToSection('home')} 
            className="block px-4 py-3 rounded-md text-xl font-medium text-primary cursor-pointer"
          >
            Home
          </a>
          <a 
            onClick={() => scrollToSection('services')} 
            className="block px-4 py-3 rounded-md text-xl font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            Services
          </a>
          <a 
            onClick={() => scrollToSection('about')} 
            className="block px-4 py-3 rounded-md text-xl font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            About
          </a>
          <a 
            onClick={() => scrollToSection('testimonials')} 
            className="block px-4 py-3 rounded-md text-xl font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            Testimonials
          </a>
          <Link 
            href="/dental-anxiety-resources"
            onClick={closeMobileMenu}
            className="block px-4 py-3 rounded-md text-xl font-medium text-gray-600 hover:text-primary"
          >
            Anxiety Support
          </Link>
          <a 
            onClick={() => scrollToSection('dental-care-recommendation')} 
            className="block px-4 py-3 rounded-md text-xl font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            Dental Care Assessment
          </a>
          <a 
            onClick={() => scrollToSection('contact')} 
            className="block px-4 py-3 rounded-md text-xl font-medium text-gray-600 hover:text-primary cursor-pointer"
          >
            Contact
          </a>
          <a 
            onClick={() => scrollToSection('book-appointment')} 
            className="block px-4 py-4 rounded-md text-xl font-bold bg-primary text-white hover:bg-opacity-90 text-center mt-6 cursor-pointer shadow-md"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
