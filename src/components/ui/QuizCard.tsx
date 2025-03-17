
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@/data/quizData';

interface QuizCardProps {
  question: QuizQuestion;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isActive: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  question, 
  onSwipeLeft, 
  onSwipeRight,
  isActive
}) => {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [animateOut, setAnimateOut] = useState<'left' | 'right' | null>(null);

  // Handle swipe events
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isActive) return;
    
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !isActive) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setCurrentX(diff);
    
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isActive) return;
    
    setIsDragging(false);
    
    if (swipeDirection === 'left') {
      handleSwipeLeft();
    } else if (swipeDirection === 'right') {
      handleSwipeRight();
    }
    
    if (!swipeDirection) {
      setCurrentX(0);
    }
  };

  const handleSwipeLeft = () => {
    setAnimateOut('left');
    const correctAnswer = question.hasR;
    setIsCorrect(correctAnswer);
    setShowFeedback(true);
    
    setTimeout(() => {
      onSwipeLeft();
      setShowFeedback(false);
      setAnimateOut(null);
      setCurrentX(0);
      setSwipeDirection(null);
    }, 1500);
  };

  const handleSwipeRight = () => {
    setAnimateOut('right');
    const correctAnswer = question.hasL;
    setIsCorrect(correctAnswer);
    setShowFeedback(true);
    
    setTimeout(() => {
      onSwipeRight();
      setShowFeedback(false);
      setAnimateOut(null);
      setCurrentX(0);
      setSwipeDirection(null);
    }, 1500);
  };

  // Handle keyboard events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive) return;
    
    if (e.key === 'ArrowLeft') {
      handleSwipeLeft();
    } else if (e.key === 'ArrowRight') {
      handleSwipeRight();
    }
  }, [isActive]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Handle custom swipe events
  useEffect(() => {
    if (!isActive) return;
    
    const card = document.querySelector('.quiz-card.swipe-action');
    if (!card) return;
    
    const handleCustomSwipeLeft = () => {
      handleSwipeLeft();
    };
    
    const handleCustomSwipeRight = () => {
      handleSwipeRight();
    };
    
    card.addEventListener('swipeleft', handleCustomSwipeLeft);
    card.addEventListener('swiperight', handleCustomSwipeRight);
    
    return () => {
      card.removeEventListener('swipeleft', handleCustomSwipeLeft);
      card.removeEventListener('swiperight', handleCustomSwipeRight);
    };
  }, [isActive]);

  // Style for the card based on swipe state
  const getCardStyle = () => {
    if (animateOut === 'left') {
      return {
        transform: 'translateX(-150%) rotate(-10deg)',
        opacity: 0,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
      };
    } else if (animateOut === 'right') {
      return {
        transform: 'translateX(150%) rotate(10deg)',
        opacity: 0,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
      };
    } else if (isDragging) {
      return {
        transform: `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`,
        opacity: 1 - Math.abs(currentX) / 500,
        transition: 'none'
      };
    } else {
      return {
        transform: 'translateX(0) rotate(0)',
        opacity: 1,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
      };
    }
  };

  const renderSwipeIndicator = () => {
    if (!swipeDirection && !animateOut) return null;
    
    const direction = animateOut || swipeDirection;
    
    return (
      <div 
        className={cn(
          "absolute top-6 p-3 rounded-full z-30",
          direction === 'left' ? "left-6 bg-destructive/90" : "right-6 bg-green-500/90",
          "transition-opacity duration-200",
          (isDragging || animateOut) ? "opacity-100" : "opacity-0"
        )}
      >
        {direction === 'left' ? <ArrowLeft className="text-white" /> : <ArrowRight className="text-white" />}
      </div>
    );
  };

  const renderFeedback = () => {
    if (!showFeedback) return null;
    
    return (
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-white/95 z-20 rounded-xl animate-fade-in",
        isCorrect ? "bg-green-50" : "bg-red-50"
      )}>
        <div className="text-center p-6">
          <div className="mb-4">
            {isCorrect ? (
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={30} className="text-green-600" />
              </div>
            ) : (
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <X size={30} className="text-red-600" />
              </div>
            )}
          </div>
          <h3 className="text-xl font-medium mb-2">
            {isCorrect ? "Correct!" : "Not quite!"}
          </h3>
          <p className="text-sm text-muted-foreground">{question.explanation}</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "quiz-card relative w-full max-w-sm bg-white rounded-xl quiz-card-shadow p-8 select-none swipe-action",
        !isActive && "pointer-events-none opacity-0 absolute"
      )}
      style={getCardStyle()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {renderSwipeIndicator()}
      {renderFeedback()}
      
      <div className="relative z-10">
        <div className="mb-8 text-center">
          <span className="inline-block text-xs font-medium text-muted-foreground px-3 py-1 bg-secondary rounded-full mb-4">
            Swipe left for "R" — Swipe right for "L"
          </span>
          <h3 className="text-4xl font-bold tracking-tight">
            {question.word}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mt-10 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span>Has "R" sound</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Has "L" sound</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
