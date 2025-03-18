import React, { useState, useEffect } from 'react';
import { getRandomQuestions } from '@/data/quizData';
import QuizCard from '@/components/ui/QuizCard';
import { ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

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

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 1500);
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
          <span className="inline-block text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full mb-4">
            Test Your Skills
          </span>
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
                  <div className="mt-4 text-center text-sm font-medium text-muted-foreground">
                    Score: {score}/{currentIndex} ({questions.length} questions total)
                  </div>
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
                
                <div className="mt-8 w-full max-w-sm text-center text-sm">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <ArrowLeft size={16} className="text-blue-500" />
                      <span>Has "L" sound</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Has "R" sound</span>
                      <ArrowRight size={16} className="text-destructive" />
                    </div>
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

          <div className="lg:h-[600px] overflow-y-auto p-6 bg-white/50 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Answer History</h3>
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
          </div>
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
    </div>
  );
};

export default PronunciationQuiz;
