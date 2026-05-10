import { Navbar } from "@/components/layout/navbar";

import { CoursesClient } from "./courses-client";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const { data: courses, error } = await supabase.from("courses").select("*");

  if (error) {
    throw new Error(error.message);
  }

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  let enrolledIds: string[] = [];
  if (userEmail) {
    const { data: enrollments } = await supabase
      .from("enrollments")
      .select("course_id")
      .eq("user_email", userEmail);
    enrolledIds = enrollments?.map(e => e.course_id) || [];
  }

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow pt-4">
        <CoursesClient courses={courses || []} enrolledIds={enrolledIds} />
      </main>

    </div>
  );
}
