import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 md:py-28 max-w-3xl">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Legal</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-8 mt-3 tracking-tight">Terms of Service</h1>
        
        <div className="space-y-8 text-text-primary/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">Usage</h2>
            <p>
              DevLearn is a learning platform project. By using it, you agree to use the platform respectfully and not misuse any features or content provided.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">Content</h2>
            <p>
              Course content on DevLearn is for personal educational use. Please do not redistribute or resell any materials found on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">Accounts</h2>
            <p>
              You are responsible for keeping your login credentials secure. If you believe your account has been compromised, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">Changes</h2>
            <p>
              These terms may be updated as the project evolves. Continued use of DevLearn after updates means you accept the revised terms.
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
