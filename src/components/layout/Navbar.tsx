
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav 
        className={cn(
          "transition-all duration-300 ease-in-out py-5 px-6 md:px-10",
          isScrolled ? "bg-white/80 bg-blur shadow-sm" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo className="z-50" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <a 
              href="#about" 
              className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
            >
              About
            </a>
            <a 
              href="#book" 
              className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
            >
              Book
            </a>
            <a 
              href="#quiz" 
              className="text-sm font-medium tracking-wide hover:text-primary transition-colors"
            >
              Quiz
            </a>
            <a 
              href="#signup" 
              className="flex items-center justify-center h-10 px-6 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md transition-all hover:bg-primary/90"
            >
              Get Started
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 flex items-center text-gray-900"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Mobile Navigation */}
          <div 
            className={cn(
              "fixed inset-0 bg-white flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out md:hidden",
              isOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <a 
              href="#about" 
              className="text-xl font-medium"
              onClick={toggleMenu}
            >
              About
            </a>
            <a 
              href="#book" 
              className="text-xl font-medium"
              onClick={toggleMenu}
            >
              Book
            </a>
            <a 
              href="#quiz" 
              className="text-xl font-medium"
              onClick={toggleMenu}
            >
              Quiz
            </a>
            <a 
              href="#signup" 
              className="flex items-center justify-center h-12 px-8 text-base font-medium text-primary-foreground bg-primary rounded-md"
              onClick={toggleMenu}
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
