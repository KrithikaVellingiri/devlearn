import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 md:py-28 max-w-3xl">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Legal</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 mt-3 tracking-tight">Terms of Service</h1>
        
        <div className="space-y-8 text-text-primary/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">Acceptance of Terms</h2>
            <p>
              By accessing or using DevLearn, you agree to be bound by these terms. If you do not agree, please do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Use of Service</h2>
            <p>
              DevLearn grants you a personal, non-transferable license to access and use our courses and learning tools. Content is for your individual educational use and may not be redistributed or resold.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Account Responsibility</h2>
            <p>
              You are responsible for maintaining the security of your account credentials. Please notify us immediately if you suspect unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Modifications</h2>
            <p>
              We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <p className="text-text-primary/40 text-xs pt-4 border-t border-border/30">
            Last updated: May 2026
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
