import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { CategoryRow } from "@/components/sections/category-row";
import { CourseGrid } from "@/components/sections/course-grid";
import { StatsBanner } from "@/components/sections/stats-banner";
import { EnterpriseBanner } from "@/components/sections/enterprise-banner";
import { Footer } from "@/components/sections/footer";

const featuredCourses = [
  {
    category: "SYSTEM DESIGN",
    title: "Scalable Microservices Architecture",
    instructor: "David Chen",
    rating: 4.9,
    reviews: 1240,
    price: "$89.00",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1470"
  },
  {
    category: "MICRO SERVICES",
    title: "Applied Neural Networks for Devs",
    instructor: "Sarah Jenkins",
    rating: 4.8,
    reviews: 890,
    price: "$120.00",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1470"
  },
  {
    category: "SECURITY",
    title: "Advanced Kubernetes Security",
    instructor: "Marcus Thorne",
    rating: 4.9,
    reviews: 1100,
    price: "$95.00",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1470"
  },
  {
    category: "DEVOPS",
    title: "Zero-Downtime Deployment Mastery",
    instructor: "Elena Rodriguez",
    rating: 4.7,
    reviews: 350,
    price: "$64.00",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1488"
  }
];

const trendingCourses = [
  {
    category: "TRENDING 1",
    title: "Rust for High Performance Systems",
    instructor: "Dr. Silas Vance",
    rating: 4.9,
    reviews: 2140,
    price: "$145.00",
    imageUrl: "https://images.unsplash.com/photo-1627398246334-df9b42df529b?auto=format&fit=crop&q=80&w=1480"
  },
  {
    category: "TRENDING 2",
    title: "Advanced React Design Patterns",
    instructor: "Lucas Grey",
    rating: 4.8,
    reviews: 1890,
    price: "$79.00",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1470"
  },
  {
    category: "TRENDING 3",
    title: "Competitive Programming Blueprint",
    instructor: "Amiya Sharma",
    rating: 4.9,
    reviews: 3120,
    price: "$45.00",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1470"
  },
  {
    category: "TRENDING 4",
    title: "Distributed Databases at Scale",
    instructor: "Oliver Wu",
    rating: 4.8,
    reviews: 930,
    price: "$118.00",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1634"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CategoryRow />
        <CourseGrid title="Featured Paths" courses={featuredCourses} />
        <StatsBanner />
        <CourseGrid title="Trending This Week" courses={trendingCourses} showIcon={true} />
        <EnterpriseBanner />
      </main>
      <Footer />
    </div>
  );
}
