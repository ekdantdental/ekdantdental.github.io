import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";

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
        {/* Main header row */}
        <div className="flex justify-between items-center py-2 md:py-4">
          {/* Logo - smaller on mobile */}
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 lg:h-28 lg:w-28 flex items-center justify-center bg-white rounded-md">
              <img 
                src="/images/brand/logo-ekdant-new.jpg" 
                alt="Ekdant Logo" 
                className="h-10 w-10 sm:h-14 sm:w-14 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain" 
              />
            </div>
            {/* Text logo - hidden on mobile, visible from sm+ */}
            <div className="hidden sm:block h-12 sm:h-16 md:h-24 lg:h-28 ml-2 md:ml-4">
              <img 
                src="/images/brand/ekdant-text-styling.png" 
                alt="Ekdant Multi Speciality and Implant Center" 
                className="h-full object-contain" 
              />
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="md:hidden p-3 min-h-[48px] min-w-[48px] flex items-center justify-center text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Menu className="h-7 w-7" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a 
              onClick={() => scrollToSection('home')} 
              className="font-medium text-sm lg:text-base text-primary hover:text-secondary transition duration-300 cursor-pointer"
            >
              Home
            </a>
            <a 
              onClick={() => scrollToSection('services')} 
              className="font-medium text-sm lg:text-base text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
            >
              Services
            </a>
            <a 
              onClick={() => scrollToSection('about')} 
              className="font-medium text-sm lg:text-base text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
            >
              About
            </a>
            <a 
              onClick={() => scrollToSection('testimonials')} 
              className="font-medium text-sm lg:text-base text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
            >
              Testimonials
            </a>
            <Link 
              href="/dental-anxiety-resources" 
              className="font-medium text-sm lg:text-base text-gray-600 hover:text-primary transition duration-300"
            >
              Anxiety Support
            </Link>
            <Link 
              href="/blog" 
              className="font-medium text-sm lg:text-base text-gray-600 hover:text-primary transition duration-300"
            >
              Health Tips
            </Link>
            <a 
              onClick={() => scrollToSection('contact')} 
              className="font-medium text-sm lg:text-base text-gray-600 hover:text-primary transition duration-300 cursor-pointer"
            >
              Contact
            </a>
            <Button 
              className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 lg:py-3 lg:px-6 text-sm lg:text-base rounded-md transition duration-300 shadow-md"
              onClick={() => scrollToSection('book-appointment')}
            >
              Book Appointment
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex justify-between items-center p-4 border-b">
            <Link href="/" onClick={closeMobileMenu} className="flex items-center">
              <img 
                src="/images/brand/logo-ekdant-new.jpg" 
                alt="Ekdant Logo" 
                className="h-12 w-12 object-contain" 
              />
              <span className="ml-3 font-heading font-semibold text-lg text-primary">Ekdant</span>
            </Link>
            <button
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="p-3 min-h-[48px] min-w-[48px] flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          {/* Menu items with large touch targets */}
          <nav className="flex-1 overflow-y-auto py-4">
            <a 
              onClick={() => scrollToSection('home')} 
              className="flex items-center px-6 py-4 min-h-[56px] text-lg font-medium text-primary border-b border-gray-100 cursor-pointer active:bg-gray-50"
            >
              Home
            </a>
            <a 
              onClick={() => scrollToSection('services')} 
              className="flex items-center px-6 py-4 min-h-[56px] text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100 cursor-pointer active:bg-gray-50"
            >
              Our Services
            </a>
            <a 
              onClick={() => scrollToSection('about')} 
              className="flex items-center px-6 py-4 min-h-[56px] text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100 cursor-pointer active:bg-gray-50"
            >
              About Us
            </a>
            <a 
              onClick={() => scrollToSection('testimonials')} 
              className="flex items-center px-6 py-4 min-h-[56px] text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100 cursor-pointer active:bg-gray-50"
            >
              Testimonials
            </a>
            <Link 
              href="/dental-anxiety-resources"
              onClick={closeMobileMenu}
              className="flex items-center px-6 py-4 min-h-[56px] text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100 active:bg-gray-50"
            >
              Anxiety Support
            </Link>
            <Link 
              href="/blog"
              onClick={closeMobileMenu}
              className="flex items-center px-6 py-4 min-h-[56px] text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100 active:bg-gray-50"
            >
              Health Tips
            </Link>
            <a 
              onClick={() => scrollToSection('contact')} 
              className="flex items-center px-6 py-4 min-h-[56px] text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100 cursor-pointer active:bg-gray-50"
            >
              Contact Us
            </a>
          </nav>

          {/* Bottom CTA */}
          <div className="p-4 border-t bg-gray-50 safe-area-bottom">
            <Button 
              className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-4 text-lg rounded-lg shadow-lg"
              onClick={() => scrollToSection('book-appointment')}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
