
import React from 'react';
import { Link } from 'react-router-dom';
import VideoBackground from '@/components/ui/VideoBackground';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <VideoBackground
        videoSrc="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        overlayClassName="bg-gradient-to-b from-black/60 via-black/40 to-black/80"
      >
        <div className="flex flex-col items-center justify-between h-full w-full px-6 md:px-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
              Perfect Your <span className="text-primary">Pronunciation</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
              Master the subtle differences between English sounds and speak with confidence.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pb-16">
            <Link 
              to="/quiz" 
              className="inline-flex items-center justify-center h-12 px-8 font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
            >
              Try the Quiz
            </Link>
            <a 
              href="#book" 
              className="inline-flex items-center justify-center h-12 px-8 font-medium text-gray-900 bg-white rounded-md hover:bg-white/90 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </VideoBackground>
    </section>
  );
};

export default HeroSection;
