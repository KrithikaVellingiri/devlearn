import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";
import { CoursesClient } from "./courses-client";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const { data: courses, error } = await supabase.from("courses").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow pt-4">
        <CoursesClient courses={courses || []} />
      </main>
      <Footer />
    </div>
  );
}
