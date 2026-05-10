import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeCoursesSection } from "@/components/sections/home-courses-section";
import { StatsBanner } from "@/components/sections/stats-banner";
import { WhyDevLearnSection } from "@/components/sections/enterprise-banner";
import { Footer } from "@/components/sections/footer";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


// Removed hardcoded fallbackFeatured and trendingCourses 

export const dynamic = "force-dynamic";

export default async function Home() {
  let topRatedCourses: any[] = [];
  let fetchError = false;

  try {
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

    const { data: dbCourses, error } = await supabase
      .from("courses")
      .select("*")
      .order("rating", { ascending: false })
      .limit(6);

    if (error) {
      fetchError = true;
    } else if (dbCourses) {
      topRatedCourses = dbCourses.map(c => ({
        id: c.id,
        category: c.category || "General",
        title: c.title || "Untitled Course",
        instructor: c.instructor?.name || "Unknown",
        rating: c.rating ?? 0,
        reviews: c.reviewsCount ?? 0,
        price: c.price || "$0.00",
        imageUrl: c.image || "/placeholder.jpg",
        enrolled: enrolledIds.includes(c.id)
      }));
    }
  } catch (err) {
    fetchError = true;
  }

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <HomeCoursesSection courses={topRatedCourses} fetchError={fetchError} />
        <StatsBanner />
        <WhyDevLearnSection />
      </main>
      <Footer />
    </div>
  );
}

