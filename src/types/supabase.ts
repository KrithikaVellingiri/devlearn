/**
 * Auto-generated Supabase database types.
 *
 * To regenerate after schema changes, run:
 *   npx supabase gen types typescript --project-id <your-project-id> > src/types/supabase.ts
 *
 * Until then, this stub keeps the codebase type-safe and compiling.
 */
import { Instructor, CurriculumSection, Review, CourseInclude } from './course';

export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
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
        };
        Insert: Partial<Database['public']['Tables']['courses']['Row']>;
        Update: Partial<Database['public']['Tables']['courses']['Row']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
