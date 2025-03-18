
import React from 'react';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import PronunciationQuiz from '@/components/sections/PronunciationQuiz';

const Quiz = () => {
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
