import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 md:py-28 max-w-3xl">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Get in Touch</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 mt-3 tracking-tight">Contact Us</h1>
        <p className="text-text-primary/60 text-base mb-12 max-w-xl leading-relaxed">
          Have a question, found a bug, or just want to say hello? We&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-surface/40 border border-border/50 rounded-2xl p-8 flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Email</h3>
              <p className="text-sm text-text-primary/60">hello@devlearn.dev</p>
            </div>
          </div>
          <div className="bg-surface/40 border border-border/50 rounded-2xl p-8 flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Location</h3>
              <p className="text-sm text-text-primary/60">Remote-first, worldwide</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-surface/20 border border-border/30 rounded-2xl p-8">
          <p className="text-sm text-text-primary/60 leading-relaxed">
            We typically respond within 24 hours. For bug reports and feature requests, we appreciate detailed descriptions — screenshots and reproduction steps help us a lot.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
