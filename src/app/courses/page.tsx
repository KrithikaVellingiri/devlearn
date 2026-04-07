import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";
import { CoursesClient } from "./courses-client";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow pt-4">
        <CoursesClient />
      </main>
      <Footer />
    </div>
  );
}
