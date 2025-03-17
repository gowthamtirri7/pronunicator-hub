
import React, { useState, useEffect } from 'react';
import { getRandomQuestions } from '@/data/quizData';
import QuizCard from '@/components/ui/QuizCard';
import { ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const PronunciationQuiz: React.FC = () => {
  const [questions, setQuestions] = useState(getRandomQuestions(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a slight delay to ensure smooth transitions
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentIndex >= questions.length && questions.length > 0) {
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
    setIsLoaded(false);
    
    // Add a slight delay to ensure smooth transitions
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  };

  const progressPercentage = questions.length > 0 
    ? (currentIndex / questions.length) * 100 
    : 0;

  return (
    <section id="quiz" className="py-20 md:py-28 px-6 md:px-10 bg-gradient-to-b from-white to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
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
        
        <div className="h-[500px] relative flex flex-col items-center justify-center">
          {!completed ? (
            <>
              <div 
                className={cn(
                  "w-full max-w-sm mb-10 transition-opacity duration-500",
                  isLoaded ? "opacity-100" : "opacity-0"
                )}
              >
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <div className="relative w-full max-w-sm h-[300px]">
                {questions.map((question, index) => {
                  // Only render current card and next card (for performance)
                  if (index < currentIndex || index > currentIndex + 1) return null;
                  
                  return (
                    <QuizCard
                      key={`${question.id}-${index}`}
                      question={question}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                      isActive={index === currentIndex}
                      zIndex={questions.length - index}
                    />
                  );
                })}
              </div>
              
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
            <div className="bg-white rounded-xl p-10 max-w-sm w-full quiz-card-shadow text-center animate-fade-in">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <ArrowDown size={24} className="text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
              <p className="text-muted-foreground mb-6">
                You scored {score} out of {questions.length}
                {score >= questions.length * 0.8 && (
                  <span className="block mt-2 text-green-500 font-medium">Great job!</span>
                )}
                {score >= questions.length * 0.5 && score < questions.length * 0.8 && (
                  <span className="block mt-2 text-amber-500 font-medium">Good effort!</span>
                )}
                {score < questions.length * 0.5 && (
                  <span className="block mt-2 text-blue-500 font-medium">Keep practicing!</span>
                )}
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
          <p className="flex items-center justify-center gap-2">
            Use keyboard arrows for desktop: 
            <span className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md">
              <ArrowLeft className="h-4 w-4" />
              <span>for "R"</span>
            </span> 
            <span className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md">
              <span>for "L"</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PronunciationQuiz;
