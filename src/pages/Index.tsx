
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import BookSection from '@/components/sections/BookSection';
import EmailSignup from '@/components/sections/EmailSignup';
import PronunciationQuiz from '@/components/sections/PronunciationQuiz';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  // Smooth scroll functionality with improved offset calculation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          // Calculate header height dynamically
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 80;
          
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20,
            behavior: 'smooth'
          });
          
          // Update URL without scrolling
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // We're removing the keyboard control here as it's now handled properly
  // in the QuizCard component to prevent duplicate event handling

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BookSection />
      <PronunciationQuiz />
      <EmailSignup />
      <Footer />
    </div>
  );
};

export default Index;
