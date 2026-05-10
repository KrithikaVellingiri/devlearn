import React from "react";
import { Navbar } from "@/components/layout/navbar";

import { supabase } from "@/lib/supabase";
import { CourseDetailClient } from "./course-detail-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Get the current session
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || null;

  // Fetch main course
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !course) {
    throw new Error("Course not found");
  }

  // Fetch related courses (limit to 3, excluding the current course)
  const { data: relatedCourses } = await supabase
    .from("courses")
    .select("*")
    .neq("id", id)
    .limit(3);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <CourseDetailClient 
            course={course as any} 
            relatedCourses={(relatedCourses || []) as any}
            userEmail={userEmail}
        />
      </main>

    </div>
  );
}

