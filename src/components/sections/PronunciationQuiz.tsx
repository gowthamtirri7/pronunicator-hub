
import React, { useState, useEffect } from 'react';
import { getRandomQuestions } from '@/data/quizData';
import QuizCard from '@/components/ui/QuizCard';
import { ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

const PronunciationQuiz: React.FC = () => {
  const [questions, setQuestions] = useState(getRandomQuestions(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (currentIndex >= questions.length) {
      setCompleted(true);
    }
  }, [currentIndex, questions.length]);

  const handleSwipeLeft = () => {
    // User swiped left (claiming the word has R)
    if (questions[currentIndex].hasR) {
      setScore(prev => prev + 1);
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handleSwipeRight = () => {
    // User swiped right (claiming the word has L)
    if (questions[currentIndex].hasL) {
      setScore(prev => prev + 1);
    }
    setCurrentIndex(prev => prev + 1);
  };

  const resetQuiz = () => {
    setQuestions(getRandomQuestions(10));
    setCurrentIndex(0);
    setCompleted(false);
    setScore(0);
  };

  return (
    <section id="quiz" className="py-20 md:py-28 px-6 md:px-10 bg-gradient-to-b from-white to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full mb-4">
            Test Your Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Pronunciation Quiz
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Swipe left if the word has the "R" sound, and right if it has the "L" sound. Some words might have both!
          </p>
        </div>
        
        <div className="h-[450px] relative flex flex-col items-center justify-center">
          {!completed ? (
            <>
              {questions.map((question, index) => (
                <QuizCard
                  key={`${question.id}-${index}`}
                  question={question}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  isActive={index === currentIndex}
                />
              ))}
              
              <div className="absolute bottom-0 w-full max-w-sm flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Question {currentIndex + 1} of {questions.length}
                </div>
                <div className="text-sm font-medium">
                  Score: {score}/{currentIndex}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl p-10 max-w-sm w-full quiz-card-shadow text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <ArrowDown size={24} className="text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
              <p className="text-muted-foreground mb-6">
                You scored {score} out of {questions.length}
              </p>
              <button
                onClick={resetQuiz}
                className="flex items-center justify-center gap-2 w-full h-12 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <RotateCcw size={16} />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center text-muted-foreground text-sm max-w-md mx-auto">
          <p>Use keyboard arrows for desktop: <ArrowLeft className="inline-block h-4 w-4 mx-1" /> for "R" and <ArrowRight className="inline-block h-4 w-4 mx-1" /> for "L"</p>
        </div>
      </div>
    </section>
  );
};

export default PronunciationQuiz;
