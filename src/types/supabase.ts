/**
 * Auto-generated Supabase database types.
 *
 * To regenerate after schema changes, run:
 *   npx supabase gen types typescript --project-id <your-project-id> > src/types/supabase.ts
 *
 * Until then, this stub keeps the codebase type-safe and compiling.
 */
import { Instructor, CurriculumSection, Review, CourseInclude } from './course';

export interface CourseRow {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  price: string;
  numericPrice: number;
  originalPrice: number | null;
  discount: string | null;
  category: string;
  level: string;
  rating: number;
  reviewsCount: number;
  reviewsCountLabel: string | null;
  image: string;
  curriculum: CurriculumSection[];
  track: string | null;
  enrolled: string | null;
  lastUpdated: string | null;
  popularity: number;
  date: string;
  reviews: Review[];
  includes: CourseInclude[];
}

export interface EnrollmentRow {
  id: string;
  user_email: string;
  course_id: string;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      courses: {
        Row: CourseRow;
        Insert: Partial<CourseRow>;
        Update: Partial<CourseRow>;
      };
      enrollments: {
        Row: EnrollmentRow;
        Insert: {
          id?: string;
          user_email: string;
          course_id: string;
          created_at?: string;
        };
        Update: Partial<EnrollmentRow>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
