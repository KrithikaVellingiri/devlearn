import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 md:py-28 max-w-3xl">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Legal</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 mt-3 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-8 text-text-primary/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">What We Collect</h2>
            <p>
              We collect only the information necessary to provide our service: your email address for authentication, course progress data to track your learning, and basic usage analytics to improve the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">How We Use Your Data</h2>
            <p>
              Your data is used exclusively to personalize your learning experience — tracking progress, calculating streaks, and unlocking achievements. We do not sell, share, or monetize your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Data Security</h2>
            <p>
              All data is encrypted in transit and at rest. We use industry-standard security practices and regularly audit our infrastructure to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Your Rights</h2>
            <p>
              You can request a copy of your data or ask us to delete your account at any time by contacting us at hello@devlearn.dev. We will process your request within 30 days.
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
