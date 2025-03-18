import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-black/40 backdrop-blur-sm"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Logo className={cn("z-50", isScrolled ? "text-foreground" : "text-white")} />
          </Link>
          
          <div className="hidden md:flex items-center space-x-12">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
              )}
            >
              About
            </Link>
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
              )}
            >
              Book
            </Link>
            <Link 
              to="/quiz" 
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
              )}
            >
              Quiz
            </Link>
            <Link 
              to="/" 
              className="flex items-center justify-center h-10 px-6 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md transition-all hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>
          
          <button 
            className={cn(
              "md:hidden z-50 flex items-center",
              isScrolled ? "text-gray-900" : "text-white"
            )}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div 
            className={cn(
              "fixed inset-0 bg-white flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out md:hidden",
              isOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <Link 
              to="/" 
              className="text-xl font-medium"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              to="/" 
              className="text-xl font-medium"
              onClick={toggleMenu}
            >
              Book
            </Link>
            <Link 
              to="/quiz" 
              className="text-xl font-medium"
              onClick={toggleMenu}
            >
              Quiz
            </Link>
            <Link 
              to="/" 
              className="flex items-center justify-center h-12 px-8 text-base font-medium text-primary-foreground bg-primary rounded-md"
              onClick={toggleMenu}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
