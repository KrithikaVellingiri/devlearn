import { supabaseBrowser } from "@/lib/supabase-browser";

export interface CourseProgress {
  id: string;
  user_email: string;
  course_id: string;
  lesson_id: string;
  created_at: string;
}

/**
 * Mark a lesson as complete for a user.
 * Handles duplicate constraint (23505) gracefully.
 */
export async function markLessonComplete(
  userEmail: string,
  courseId: string,
  lessonId: string
): Promise<{ success: boolean; alreadyCompleted: boolean; error?: string }> {
  const { error } = await supabaseBrowser.from("course_progress").insert({
    user_email: userEmail,
    course_id: courseId,
    lesson_id: lessonId,
  });

  if (error) {
    if (error.code === "23505") {
      // Unique violation
      return { success: true, alreadyCompleted: true };
    }
    console.error("[markLessonComplete]", error);
    return { success: false, alreadyCompleted: false, error: error.message };
  }

  return { success: true, alreadyCompleted: false };
}

/**
 * Get all completed lessons for a specific course and user.
 * Returns an array of lesson_ids.
 */
export async function getCompletedLessons(
  userEmail: string,
  courseId: string
): Promise<string[]> {
  const { data, error } = await supabaseBrowser
    .from("course_progress")
    .select("lesson_id")
    .eq("user_email", userEmail)
    .eq("course_id", courseId);

  if (error) {
    console.error("[getCompletedLessons]", error);
    return [];
  }

  return (data || []).map((row) => row.lesson_id);
}

/**
 * Get all progress records for a user across all courses.
 * Useful for the dashboard.
 */
export async function getAllUserProgress(
  userEmail: string
): Promise<CourseProgress[]> {
  const { data, error } = await supabaseBrowser
    .from("course_progress")
    .select("*")
    .eq("user_email", userEmail);

  if (error) {
    console.error("[getAllUserProgress]", error);
    return [];
  }

  return (data as CourseProgress[]) || [];
}
