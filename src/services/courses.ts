import { apiClient } from "@/lib/api";

/* ── Types ──────────────────────────────────────────────────── */
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnailUrl: string;
  enrolledCount: number;
  durationHours: number;
  tags: string[];
}

/* ── Query Keys ─────────────────────────────────────────────── */
/**
 * Centralised query key factory.
 * Keeps keys consistent so invalidation works correctly.
 *
 * Usage:
 *   queryClient.invalidateQueries({ queryKey: courseKeys.all })
 */
export const courseKeys = {
  all: ["courses"] as const,
  detail: (id: string) => ["courses", id] as const,
};

/* ── Fetch Functions ─────────────────────────────────────────── */
/** Fetch all published courses */
export async function fetchCourses(): Promise<Course[]> {
  const { data } = await apiClient.get<Course[]>("/courses");
  return data;
}

/** Fetch a single course by ID */
export async function fetchCourseById(id: string): Promise<Course> {
  const { data } = await apiClient.get<Course>(`/courses/${id}`);
  return data;
}
