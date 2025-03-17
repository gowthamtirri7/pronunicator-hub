
import React, { useState } from 'react';

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically handle the API call
      console.log('Email submitted:', email);
      setSubmitted(true);
      setEmail('');
      
      // Reset the submitted state after showing success message
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section id="signup" className="py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div>
          <span className="inline-block text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full mb-4">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Join Our Newsletter
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Get weekly pronunciation tips, exclusive exercises, and be the first to know about new resources.
          </p>
        </div>
        
        <div className="relative bg-secondary/30 rounded-2xl p-8 md:p-10 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full p-4 pr-32 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-md py-2.5 px-5 text-sm font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Subscribe
              </button>
            </div>
            
            {submitted && (
              <div className="absolute -bottom-10 left-0 right-0 text-center text-green-600 font-medium animate-fade-in">
                Thanks for subscribing!
              </div>
            )}
          </form>
          
          <div className="hidden md:block absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/10"></div>
          <div className="hidden md:block absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary/5"></div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default EmailSignup;
