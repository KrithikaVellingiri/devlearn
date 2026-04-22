import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { CategoryRow } from "@/components/sections/category-row";
import { CourseGrid } from "@/components/sections/course-grid";
import { StatsBanner } from "@/components/sections/stats-banner";
import { EnterpriseBanner } from "@/components/sections/enterprise-banner";
import { Footer } from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";


// Removed hardcoded fallbackFeatured and trendingCourses 

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch top 6 courses from Supabase sorted by rating
  const { data: dbCourses, error } = await supabase
    .from("courses")
    .select("*")
    .order("rating", { ascending: false })
    .limit(6);

  // Map DB rows to the shape CourseGrid expects
  const topRatedCourses = (dbCourses && !error)
    ? dbCourses.map(c => ({
        id: c.id,
        category: c.category || "General",
        title: c.title || "Untitled Course",
        instructor: c.instructor?.name || "Unknown",
        rating: c.rating ?? 0,
        reviews: c.reviewsCount ?? 0,
        price: c.price || "$0.00",
        imageUrl: c.image || "/placeholder.jpg"
      }))
    : [];

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CategoryRow />
        <CourseGrid title="Top Rated Courses" courses={topRatedCourses} />
        <StatsBanner />
        <EnterpriseBanner />
      </main>
      <Footer />
    </div>
  );
}

