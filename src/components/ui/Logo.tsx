
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
        <div className="absolute inset-0 flex items-center justify-center text-primary-foreground font-semibold text-lg">P</div>
      </div>
      <span className="font-medium tracking-tight text-lg">Pronuncio</span>
    </div>
  );
};

export default Logo;
