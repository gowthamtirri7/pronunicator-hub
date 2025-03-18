
import React from 'react';
import { Toaster } from 'sonner';
import PronunciationQuiz from '@/components/sections/PronunciationQuiz';

const Quiz = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Toaster />
      <PronunciationQuiz />
    </div>
  );
};

export default Quiz;
