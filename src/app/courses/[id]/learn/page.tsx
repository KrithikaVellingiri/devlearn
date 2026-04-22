import React from "react";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LearnClient } from "./learn-client";

export const dynamic = "force-dynamic";

export default async function CourseLearnPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || null;

  if (!userEmail) {
    redirect(`/courses`);
  }

  // Verify enrollment
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_email", userEmail)
    .eq("course_id", id)
    .maybeSingle();

  if (!enrollment) {
    redirect(`/courses`);
  }

  // Fetch course
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !course) {
    redirect("/courses");
  }

  return (
    <LearnClient 
      course={course as any} 
      userEmail={userEmail}
    />
  );
}
