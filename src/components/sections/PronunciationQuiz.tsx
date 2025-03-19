import React, { useState, useEffect } from 'react';
import { getRandomQuestions } from '@/data/quizData';
import QuizCard from '@/components/ui/QuizCard';
import { ArrowDown, RotateCcw, Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AnswerHistory {
  word: string;
  userAnswer: 'L' | 'R';
  isCorrect: boolean;
  correctAnswer: 'L' | 'R' | 'both';
}

const PronunciationQuiz: React.FC = () => {
  const [questions, setQuestions] = useState(getRandomQuestions(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([]);

  useEffect(() => {
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

  useEffect(() => {
    const preventHorizontalScroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.quiz-card')) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventHorizontalScroll, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventHorizontalScroll);
    };
  }, []);

  const handleSwipeLeft = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = currentQuestion.hasL;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswerHistory(prev => [...prev, {
      word: currentQuestion.word,
      userAnswer: 'L',
      isCorrect,
      correctAnswer: currentQuestion.hasL && currentQuestion.hasR ? 'both' : 
                    currentQuestion.hasL ? 'L' : 'R'
    }]);

    setCurrentIndex(prev => prev + 1);
  };

  const handleSwipeRight = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = currentQuestion.hasR;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswerHistory(prev => [...prev, {
      word: currentQuestion.word,
      userAnswer: 'R',
      isCorrect,
      correctAnswer: currentQuestion.hasL && currentQuestion.hasR ? 'both' : 
                    currentQuestion.hasL ? 'L' : 'R'
    }]);

    setCurrentIndex(prev => prev + 1);
  };

  const resetQuiz = () => {
    setQuestions(getRandomQuestions(10));
    setCurrentIndex(0);
    setCompleted(false);
    setScore(0);
    setIsLoaded(false);
    setAnswerHistory([]);
    
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  };

  const progressPercentage = questions.length > 0 
    ? (currentIndex / questions.length) * 100 
    : 0;

  return (
    <div className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Pronunciation Quiz
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Swipe left if the word has the "L" sound, and right if it has the "R" sound. Some words might have both!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[600px] relative flex flex-col items-center justify-center">
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
                
                <div className="relative w-full max-w-sm h-[400px]">
                  {questions.map((question, index) => {
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

          <div className="lg:h-[600px] p-6 bg-white/50 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Answer History</h3>
            <ScrollArea className="h-[530px] pr-4">
              <div className="space-y-3">
                {answerHistory.map((answer, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border",
                      answer.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Word: "{answer.word}"</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your answer: {answer.userAnswer}
                          {answer.isCorrect ? (
                            <Check className="inline-block ml-1 w-4 h-4 text-green-600" />
                          ) : (
                            <X className="inline-block ml-1 w-4 h-4 text-red-600" />
                          )}
                        </p>
                        {!answer.isCorrect && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Correct answer: {answer.correctAnswer}
                          </p>
                        )}
                      </div>
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center",
                        answer.isCorrect ? "bg-green-100" : "bg-red-100"
                      )}>
                        {answer.isCorrect ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PronunciationQuiz;
