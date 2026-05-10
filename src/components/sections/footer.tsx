import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 pr-8">
            <Link href="/" className="font-bold text-lg tracking-tight text-text-primary flex items-center gap-1">
              <span className="text-primary font-black">Dev</span>Learn
            </Link>
            <p className="text-xs text-text-primary/60 leading-relaxed uppercase font-semibold tracking-widest max-w-xs">
              Engineering the future of technical education. Precision-built curriculum for the modern developer.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white mb-6 uppercase">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/courses" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Courses</Link></li>
              <li><Link href="/learning-path" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Learning Paths</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white mb-6 uppercase">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest text-white mb-6 uppercase">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-xs font-semibold text-text-primary/60 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-center">
          <p className="text-[10px] text-text-primary/50 uppercase tracking-widest font-semibold">
            © 2026 DevLearn. Precision in code.
          </p>
        </div>
      </div>
    </footer>
  );
};
