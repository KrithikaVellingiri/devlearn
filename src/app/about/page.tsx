import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20 md:py-28 max-w-3xl">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Our Story</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-8 mt-3 tracking-tight">About DevLearn</h1>
        
        <div className="space-y-8 text-text-primary/70 text-base leading-relaxed">
          <p>
            DevLearn was built by developers, for developers. We noticed that most online learning platforms focus on quantity over quality — offering thousands of courses with little structure or depth.
          </p>
          <p>
            We took a different approach. Every course on DevLearn is built around hands-on projects, structured learning paths, and real-world engineering patterns. Our goal is simple: help you become a better developer through deliberate practice and meaningful progress tracking.
          </p>
          <p>
            Whether you&apos;re learning your first framework or diving deep into system design, DevLearn gives you the tools to learn with intention — not just watch videos.
          </p>
          <p>
            DevLearn is a focused frontend engineering and learning platform project — built to demonstrate modern web development practices, clean architecture, and thoughtful product design.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
