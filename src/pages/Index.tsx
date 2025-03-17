
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import BookSection from '@/components/sections/BookSection';
import EmailSignup from '@/components/sections/EmailSignup';
import PronunciationQuiz from '@/components/sections/PronunciationQuiz';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  // Smooth scroll functionality
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Add keyboard control for the quiz
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeQuizCard = document.querySelector('.quiz-card.swipe-action:not(.pointer-events-none)');
      
      if (activeQuizCard) {
        if (e.key === 'ArrowLeft') {
          // Trigger swipe left
          const event = new CustomEvent('swipeleft');
          activeQuizCard.dispatchEvent(event);
        } else if (e.key === 'ArrowRight') {
          // Trigger swipe right
          const event = new CustomEvent('swiperight');
          activeQuizCard.dispatchEvent(event);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
