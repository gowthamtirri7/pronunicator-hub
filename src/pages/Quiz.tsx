
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import PronunciationQuiz from '@/components/sections/PronunciationQuiz';

const Quiz = () => {
  // Add effect to prevent horizontal scrolling on mobile
  useEffect(() => {
    // Function to prevent horizontal scrolling
    const preventHorizontalScroll = (e: TouchEvent) => {
      // Only prevent default if we're in portrait mode (height > width)
      if (window.innerHeight > window.innerWidth) {
        // Check if scroll is happening on the quiz card
        const target = e.target as HTMLElement;
        if (target.closest('.quiz-card')) {
          e.preventDefault();
        }
      }
    };

    // Add event listener with passive: false to allow preventDefault
    document.addEventListener('touchmove', preventHorizontalScroll, { passive: false });
    
    // Add overflow-x-hidden to the body in portrait mode
    const handleResize = () => {
      if (window.innerHeight > window.innerWidth) {
        document.body.classList.add('overflow-x-hidden');
      } else {
        document.body.classList.remove('overflow-x-hidden');
      }
    };
    
    // Call once on mount and add listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      document.removeEventListener('touchmove', preventHorizontalScroll);
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('overflow-x-hidden');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Navbar />
      <div className="pt-20">
        <PronunciationQuiz />
      </div>
      <Toaster />
    </div>
  );
};

export default Quiz;
