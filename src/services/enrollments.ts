import { supabaseBrowser } from "@/lib/supabase-browser";

/* ── Types ──────────────────────────────────────────────────── */
export interface Enrollment {
  id: string;
  user_email: string;
  course_id: string;
  created_at: string;
}

export interface EnrollmentWithCourse extends Enrollment {
  courses: {
    id: string;
    title: string;
    description: string;
    instructor: { name: string; avatar?: string };
    price: string;
    numericPrice: number;
    category: string;
    level: string;
    rating: number;
    reviewsCount: number;
    image: string;
  } | null;
}

/* ── Enroll in a course ─────────────────────────────────────── */
/**
 * Insert an enrollment row. Handles duplicate gracefully
 * by catching the unique constraint violation (code 23505).
 *
 * Returns: { success, alreadyEnrolled, error? }
 */
export async function enrollInCourse(
  userEmail: string,
  courseId: string
): Promise<{ success: boolean; alreadyEnrolled: boolean; error?: string }> {
  const { error } = await supabaseBrowser.from("enrollments").insert({
    user_email: userEmail,
    course_id: courseId,
  });

  if (error) {
    // Postgres unique_violation → user already enrolled
    if (error.code === "23505") {
      return { success: true, alreadyEnrolled: true };
    }
    console.error("[enrollInCourse]", error);
    return { success: false, alreadyEnrolled: false, error: error.message };
  }

  return { success: true, alreadyEnrolled: false };
}

/* ── Check if user is enrolled ─────────────────────────────── */
export async function checkEnrollment(
  userEmail: string,
  courseId: string
): Promise<boolean> {
  const { data, error } = await supabaseBrowser
    .from("enrollments")
    .select("id")
    .eq("user_email", userEmail)
    .eq("course_id", courseId)
    .maybeSingle();

  if (error) {
    console.error("[checkEnrollment]", error);
    return false;
  }

  return !!data;
}

/* ── Fetch all enrolled courses for a user ─────────────────── */
/**
 * Uses a join: .select("*, courses(*)") to pull full course data.
 * Used by the dashboard page (server-side via the server Supabase client).
 */
export async function fetchUserEnrollments(
  userEmail: string
): Promise<EnrollmentWithCourse[]> {
  const { data, error } = await supabaseBrowser
    .from("enrollments")
    .select("*, courses(*)")
    .eq("user_email", userEmail)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[fetchUserEnrollments]", error);
    return [];
  }

  return (data as unknown as EnrollmentWithCourse[]) || [];
}
