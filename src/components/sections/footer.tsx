import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6 pr-8">
            <a href="/" className="font-bold text-lg tracking-tight text-text-primary flex items-center gap-1">
              <span className="text-primary font-black">Dev</span>Learn
            </a>
            <p className="text-xs text-text-primary/60 leading-relaxed uppercase font-semibold tracking-widest max-w-xs">
              Engineering the future of technical education. Our platform provides high-fidelity architectural knowledge for the next generation of builders.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white mb-6 uppercase">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Courses</a></li>
              <li><a href="#" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Pricing</a></li>
              <li><a href="#" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white mb-6 uppercase">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">About Us</a></li>
              <li><a href="#" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Careers</a></li>
              <li><a href="#" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Status</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white mb-6 uppercase">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">API Docs</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-text-primary/50 uppercase tracking-widest font-semibold">
            © 2026 DevLearn. Precision in code.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" aria-label="Github" className="text-text-primary/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </a>
            <a href="#" aria-label="Twitter" className="text-text-primary/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-text-primary/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
