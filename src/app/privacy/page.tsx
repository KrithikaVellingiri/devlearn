import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 md:py-28 max-w-3xl">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Legal</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-8 mt-3 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-8 text-text-primary/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">What We Collect</h2>
            <p>
              DevLearn collects your email address for authentication and stores course progress data to track your learning. We may also collect basic usage data to help improve the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">How We Use Your Data</h2>
            <p>
              Your data is used to personalize your learning experience — tracking progress, calculating streaks, and unlocking achievements. We do not sell or share your personal information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">Data Storage</h2>
            <p>
              Data is stored using Supabase and transmitted over HTTPS. We follow standard security practices, but as a portfolio project, DevLearn is not intended to handle sensitive personal data beyond basic authentication.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">Your Rights</h2>
            <p>
              You can request deletion of your account and associated data at any time by reaching out via the contact page.
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
