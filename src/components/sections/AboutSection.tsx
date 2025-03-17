
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 space-y-6">
            <div>
              <span className="inline-block text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Why Pronunciation Matters
              </h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              English pronunciation is one of the biggest challenges for language learners. The subtle differences between sounds like "L" and "R" can lead to miscommunication and affect your confidence when speaking.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              At Pronuncio, we focus on these challenging sound pairs that many learners struggle with. Our specialized methods help you train your ear to hear the differences and your mouth to produce the correct sounds.
            </p>
            
            <div className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex-1 bg-secondary p-6 rounded-lg">
                  <div className="font-medium text-lg mb-2">Personalized</div>
                  <p className="text-sm text-muted-foreground">Tailored practice based on your specific language background and needs</p>
                </div>
                
                <div className="flex-1 bg-secondary p-6 rounded-lg">
                  <div className="font-medium text-lg mb-2">Practical</div>
                  <p className="text-sm text-muted-foreground">Real-world examples and practical exercises you can use immediately</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="aspect-square max-w-md mx-auto relative rounded-2xl overflow-hidden card-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f" 
                alt="People practicing pronunciation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
