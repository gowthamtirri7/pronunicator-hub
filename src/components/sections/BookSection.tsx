
import React from 'react';

const BookSection: React.FC = () => {
  return (
    <section id="book" className="py-20 md:py-28 px-6 md:px-10 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="md:w-1/2 space-y-6">
            <div>
              <span className="inline-block text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full mb-4">
                Our Book
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Master English Pronunciation
              </h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              Our comprehensive guide takes you through every challenging sound in English with practical exercises and audio examples.
            </p>
            
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Step-by-step exercises for every sound pair</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Audio examples from native speakers</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Practice dialogues and real-world phrases</span>
              </li>
            </ul>
            
            <div className="pt-4">
              <a 
                href="#" 
                className="inline-flex items-center justify-center h-12 px-8 font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                Pre-order Now
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="w-full max-w-md mx-auto relative">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden card-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f" 
                  alt="English Pronunciation Book"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Book details card */}
              <div className="absolute -bottom-8 -right-8 lg:-right-16 bg-white p-6 rounded-lg card-shadow max-w-xs">
                <div className="text-lg font-medium mb-2">Comprehensive Guide</div>
                <p className="text-sm text-muted-foreground">250+ pages of exercises, examples, and techniques for perfect pronunciation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
