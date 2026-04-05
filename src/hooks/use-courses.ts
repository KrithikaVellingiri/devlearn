import { useQuery } from "@tanstack/react-query";
import { fetchCourses, courseKeys, type Course } from "@/services/courses";

interface UseCourses {
  courses: Course[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Hook: useCourses
 *
 * Fetches the published course list and caches it via React Query.
 * Uses the shared apiClient (with auth interceptors) under the hood.
 *
 * Example:
 *   const { courses, isLoading } = useCourses();
 */
export function useCourses(): UseCourses {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: courseKeys.all,
    queryFn: fetchCourses,
  });

  return {
    courses: data,
    isLoading,
    isError,
    error: error as Error | null,
  };
}
