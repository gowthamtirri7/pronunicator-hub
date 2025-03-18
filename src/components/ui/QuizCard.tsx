import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, X, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@/data/quizData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const placeholderImages = [
  'photo-1649972904349-6e44c42644a7',
  'photo-1488590528505-98d2b5aba04b',
  'photo-1518770660439-4636190af475',
  'photo-1461749280684-dccba630e2f6',
  'photo-1486312338219-ce68d2c6f44d',
];

interface QuizCardProps {
  question: QuizQuestion;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isActive: boolean;
  zIndex?: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  question, 
  onSwipeLeft, 
  onSwipeRight,
  isActive,
  zIndex = 10
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [animateOut, setAnimateOut] = useState<'left' | 'right' | null>(null);
  const [interactionDisabled, setInteractionDisabled] = useState(false);

  const { toast } = useToast();

  const [randomImage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    return `https://images.unsplash.com/${placeholderImages[randomIndex]}?auto=format&fit=crop&w=800&q=80`;
  });

  const handlePlayAudio = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question.word);
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Error",
        description: "Text-to-speech is not supported in your browser",
        variant: "destructive"
      });
    }
  }, [question.word, toast]);

  // Handle swipe events
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isActive || interactionDisabled) return;
    
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !isActive || interactionDisabled) return;
    
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
    if (!isDragging || !isActive || interactionDisabled) return;
    
    setIsDragging(false);
    
    if (swipeDirection === 'left') {
      completeSwipeLeft();
    } else if (swipeDirection === 'right') {
      completeSwipeRight();
    } else {
      // Return to center if not a complete swipe
      setCurrentX(0);
    }
  };

  const completeSwipeLeft = useCallback(() => {
    if (interactionDisabled) return;
    
    setInteractionDisabled(true);
    setAnimateOut('left');
    const correctAnswer = question.hasL;
    setIsCorrect(correctAnswer);
    setShowFeedback(true);
    
    setTimeout(() => {
      onSwipeLeft();
      setShowFeedback(false);
      setAnimateOut(null);
      setCurrentX(0);
      setSwipeDirection(null);
      setInteractionDisabled(false);
    }, 1500);
  }, [interactionDisabled, question.hasL, onSwipeLeft]);

  const completeSwipeRight = useCallback(() => {
    if (interactionDisabled) return;
    
    setInteractionDisabled(true);
    setAnimateOut('right');
    const correctAnswer = question.hasR;
    setIsCorrect(correctAnswer);
    setShowFeedback(true);
    
    setTimeout(() => {
      onSwipeRight();
      setShowFeedback(false);
      setAnimateOut(null);
      setCurrentX(0);
      setSwipeDirection(null);
      setInteractionDisabled(false);
    }, 1500);
  }, [interactionDisabled, question.hasR, onSwipeRight]);

  // Handle keyboard events - only for active card
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive || interactionDisabled) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault(); // Prevent scrolling
      completeSwipeLeft();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault(); // Prevent scrolling
      completeSwipeRight();
    }
  }, [isActive, interactionDisabled, completeSwipeLeft, completeSwipeRight]);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, handleKeyDown]);

  // Style for the card based on swipe state
  const getCardStyle = () => {
    const baseStyle = {
      zIndex: isActive ? zIndex : zIndex - 1,
      transform: 'translateX(0) rotate(0)',
      opacity: 1,
      transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
    };

    if (animateOut === 'left') {
      return {
        ...baseStyle,
        transform: 'translateX(-150%) rotate(-10deg)',
        opacity: 0,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
      };
    } else if (animateOut === 'right') {
      return {
        ...baseStyle,
        transform: 'translateX(150%) rotate(10deg)',
        opacity: 0,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
      };
    } else if (isDragging) {
      return {
        ...baseStyle,
        transform: `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`,
        opacity: 1 - Math.abs(currentX) / 500,
        transition: 'none'
      };
    } 
    
    return baseStyle;
  };

  const renderSwipeIndicator = () => {
    if (!swipeDirection && !animateOut) return null;
    
    const direction = animateOut || swipeDirection;
    
    return (
      <div 
        className={cn(
          "absolute top-6 p-3 rounded-full z-30",
          direction === 'left' ? "left-6 bg-blue-500/90" : "right-6 bg-destructive/90",
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
                <Check className="h-8 w-8 text-green-600" />
              </div>
            ) : (
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <X className="h-8 w-8 text-red-600" />
              </div>
            )}
          </div>
          <h3 className="text-xl font-medium mb-2">
            {isCorrect ? "Correct!" : "Not quite!"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {question.word} {question.explanation}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "quiz-card absolute top-0 left-0 w-full bg-white rounded-xl quiz-card-shadow select-none",
        !isActive && "pointer-events-none"
      )}
      style={getCardStyle()}
      onTouchStart={isActive ? handleTouchStart : undefined}
      onTouchMove={isActive ? handleTouchMove : undefined}
      onTouchEnd={isActive ? handleTouchEnd : undefined}
      onMouseDown={isActive ? handleTouchStart : undefined}
      onMouseMove={isActive ? handleTouchMove : undefined}
      onMouseUp={isActive ? handleTouchEnd : undefined}
      onMouseLeave={isActive ? handleTouchEnd : undefined}
    >
      {renderSwipeIndicator()}
      {renderFeedback()}
      
      <div className="relative z-10 p-8">
        <div className="mb-8 text-center">
          <span className="inline-block text-xs font-medium text-muted-foreground px-3 py-1 bg-secondary rounded-full mb-4">
            Swipe or use arrow keys: Left for "R" — Right for "L"
          </span>
          
          <div className="relative w-full aspect-video mb-6 rounded-lg bg-muted overflow-hidden">
            <img 
              src={randomImage}
              alt={question.word}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <h3 className="text-4xl font-bold tracking-tight">
              {question.word}
            </h3>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handlePlayAudio}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-10 text-xs">
          <div className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span className="font-medium text-blue-500">Has "L" sound</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-destructive">Has "R" sound</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* Swipe buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full h-12 w-12 bg-white/90 shadow-md hover:bg-blue-500/20 z-20"
        onClick={completeSwipeLeft}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full h-12 w-12 bg-white/90 shadow-md hover:bg-destructive/20 z-20"
        onClick={completeSwipeRight}
      >
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default QuizCard;
