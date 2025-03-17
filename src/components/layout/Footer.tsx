
import React from 'react';
import Logo from '@/components/ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 md:px-10 bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <Logo />
            <p className="text-muted-foreground text-sm max-w-xs">
              Helping language learners master English pronunciation with effective, science-based methods.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" aria-label="Instagram" className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="YouTube" className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Exercises</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Audio Samples</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Downloads</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Weekly pronunciation tips straight to your inbox</p>
            <form className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 py-2 px-3 text-sm border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground py-2 px-4 text-sm rounded-r-md hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Pronuncio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
