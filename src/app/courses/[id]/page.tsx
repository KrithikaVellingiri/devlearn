import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";
import { CourseDetailClient } from "./course-detail-client";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  // Fetch main course
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !course) {
    throw new Error("Course not found");
  }

  // Fetch related courses (limit to 3, excluding the current course)
  const { data: relatedCourses } = await supabase
    .from("courses")
    .select("*")
    .neq("id", params.id)
    .limit(3);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <CourseDetailClient 
            course={course as any} 
            relatedCourses={(relatedCourses || []) as any} 
        />
      </main>
      <Footer />
    </div>
  );
}
