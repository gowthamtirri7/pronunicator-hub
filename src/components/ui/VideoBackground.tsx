
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  videoSrc: string;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  className,
  overlayClassName,
  children
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div className={cn(
        "absolute inset-0 bg-black/40 z-10",
        overlayClassName
      )} />
      
      <video
        autoPlay
        muted
        loop
        playsInline
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onCanPlay={() => setIsLoaded(true)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Placeholder while video loads */}
      <div 
        className={cn(
          "absolute inset-0 bg-gray-900 transition-opacity duration-1000",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />
      
      {/* Content */}
      {children && (
        <div className="relative z-20 h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
