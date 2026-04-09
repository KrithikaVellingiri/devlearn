"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/layout/course-card";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import {
  Star,
  Clock,
  PlayCircle,
  FileText,
  MonitorPlay,
  File,
  Infinity as InfinityIcon,
  Award,
  ChevronDown,
  ChevronUp,
  User,
  CheckCircle2,
  Play
} from "lucide-react";

// MOCK DATA
const COURSE_MOCK = {
  id: "systems-design-for-digital-architects",
  track: "PROFESSIONAL TRACK",
  level: "LEVEL: ADVANCED",
  title: "Systems Design for Digital Architects",
  rating: 4.9,
  reviewsCount: "2,040 ratings",
  enrolled: "12,450 enrolled",
  lastUpdated: "Last updated: Oct 2024",
  overview: "Master the architectural patterns that power the world's most scalable applications. This intensive program moves beyond simple CRUD applications into the realm of distributed systems, high-availability clusters, and global-scale data consistency models. You will learn to think like a Principal Engineer, balancing trade-offs in CAP theorem, latency, and throughput.",
  price: 149.99,
  originalPrice: 499.99,
  discount: "70% OFF",
  videoPreview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  curriculum: [
    {
      id: "01",
      title: "Foundations of Scalability",
      lessons: [
        { title: "Vertical vs Horizontal Scaling", duration: "12:45", type: "video" },
        { title: "Load Balancing Algorithms", duration: "18:20", type: "video" },
        { title: "Reading: The Fallacies of Distributed Computing", duration: "10 MIN", type: "reading" }
      ]
    },
    {
      id: "02",
      title: "Advanced Data Partitioning",
      lessons: [
        { title: "Sharding Strategies", duration: "22:15", type: "video" }
      ]
    },
    {
      id: "03",
      title: "Distributed Consensus and Raft",
      lessons: []
    }
  ],
  instructor: {
    name: "Dr. Aris Thorne",
    title: "EX-PRINCIPAL ENGINEER | AWS & META",
    bio: "Aris has spent two decades building the backbone of the modern web. He specializes in distributed database consistency and high-availability cloud infrastructure.",
    students: "450K Students",
    courses: "12 Courses",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80"
  },
  reviews: [
    {
      id: "r1",
      initials: "JG",
      name: "Julianne G.",
      role: "Senior Engineer",
      rating: 5,
      text: `"The most comprehensive systems design course I've ever taken. It helped me pass my L6 interview at Google. The section on Consistency models is pure gold."`
    },
    {
      id: "r2",
      initials: "MK",
      name: "Marcus K.",
      role: "Technical Lead",
      rating: 5,
      text: `"Practical, deep, and incredibly clear. Aris explains complex topics like Vector Clocks with remarkable simplicity. A must for anyone serious about architecture."`
    }
  ],
  includes: [
    { text: "42 hours on-demand video", icon: <MonitorPlay className="w-4 h-4 text-text-primary/70" /> },
    { text: "15 technical whitepapers", icon: <File className="w-4 h-4 text-text-primary/70" /> },
    { text: "Full lifetime access", icon: <InfinityIcon className="w-4 h-4 text-text-primary/70" /> },
    { text: "4 Hands-on architectural labs", icon: <TerminalIcon className="w-4 h-4 text-text-primary/70" /> },
    { text: "Certificate of completion", icon: <Award className="w-4 h-4 text-text-primary/70" /> }
  ]
};

const RELATED_COURSES = [
  {
    id: "microservices-mastery",
    category: "CLOUD NATIVE ARCHITECTURE",
    title: "Microservices Mastery at Scale",
    instructor: "Sarah Chen",
    rating: 4.8,
    reviews: 1240,
    price: "$89.99",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
  },
  {
    id: "stream-processing",
    category: "DATA ENGINEERING",
    title: "Real-time Stream Processing",
    instructor: "Michael Ross",
    rating: 4.9,
    reviews: 850,
    price: "$94.99",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80"
  },
  {
    id: "sre-blueprint",
    category: "SITE RELIABILITY",
    title: "The SRE Blueprint",
    instructor: "Dr. Aris Thorne",
    rating: 4.7,
    reviews: 630,
    price: "$129.99",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  }
];

function TerminalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  );
}

export default function CourseDetailPage() {
  const params = useParams();
  // Using the mock data for any ID to match the required design exact values
  const course = COURSE_MOCK;

  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.items);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ "01": true });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddToCart = () => {
    const isAlreadyInCart = cartItems.some(i => i.id === course.id);

    if (isAlreadyInCart) {
      toast("Already in cart", {
        description: "This course is already in your cart.",
      });
      return;
    }

    addToCart({
      id: course.id,
      title: course.title,
      price: course.price,
      image: course.videoPreview,
      instructor: course.instructor.name
    });

    toast.success("Added to cart", {
      description: `${course.title} has been added to your cart.`
    });
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Top Banner / Hero Section */}
      <div className="border-b border-border bg-surface/30">
        <div className="container mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row gap-12">

          {/* Left Column - Main Info */}
          <div className="flex-1 min-w-0 lg:pr-6">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-background/50 border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase rounded-sm">
                {course.track}
              </Badge>
              <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase">
                {course.level}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 text-sm text-text-primary/80">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                <span className="font-bold text-white">{course.rating}</span>
                <span className="text-text-primary/60">({course.reviewsCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-text-primary/60" />
                <span>{course.enrolled}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-text-primary/60" />
                <span>{course.lastUpdated}</span>
              </div>
            </div>

            {/* Course Overview */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-white mb-4">Course Overview</h2>
              <p className="text-text-primary/80 leading-relaxed">
                {course.overview}
              </p>
            </div>

            {/* Curriculum Configuration */}
            <div className="mb-12">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Curriculum</h2>
                <div className="text-xs font-bold text-cyan-400 tracking-wider">
                  12 Chapters • 94 Lessons • 42h Total
                </div>
              </div>

              <div className="space-y-3">
                {course.curriculum.map((section) => (
                  <div key={section.id} className="border border-border/50 rounded-xl overflow-hidden bg-surface/30">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-5 bg-surface/50 hover:bg-surface transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-text-primary/50 font-mono tracking-widest">{section.id}</span>
                        <span className="font-bold text-white">{section.title}</span>
                      </div>
                      {openSections[section.id] ? (
                        <ChevronUp className="w-5 h-5 text-text-primary/50" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-text-primary/50" />
                      )}
                    </button>

                    {openSections[section.id] && section.lessons.length > 0 && (
                      <div className="p-2 border-t border-border/50">
                        {section.lessons.map((lesson, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 px-4 hover:bg-background/50 rounded-lg transition-colors group">
                            <div className="flex items-center gap-4">
                              {lesson.type === 'video' ? (
                                <PlayCircle className="w-4 h-4 text-text-primary/60 group-hover:text-primary transition-colors" />
                              ) : (
                                <FileText className="w-4 h-4 text-text-primary/60 group-hover:text-primary transition-colors" />
                              )}
                              <span className="text-sm text-text-primary/90">{lesson.title}</span>
                            </div>
                            <span className="text-xs font-mono text-text-primary/50">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-white mb-6">Your Instructor</h2>

              <Card className="bg-surface/30 border-border/50 p-6 flex flex-col md:flex-row gap-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{course.instructor.name}</h3>
                  <p className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase mb-4">
                    {course.instructor.title}
                  </p>
                  <p className="text-sm text-text-primary/80 leading-relaxed mb-4">
                    {course.instructor.bio}
                  </p>
                  <div className="flex items-center gap-6 text-xs text-text-primary/50 font-bold tracking-wider">
                    <span className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      {course.instructor.students}
                    </span>
                    <span className="flex items-center gap-2">
                      <PlayCircle className="w-3.5 h-3.5" />
                      {course.instructor.courses}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Student Feedback */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Student Feedback</h2>
                <button className="text-xs text-primary font-bold tracking-wider hover:underline">
                  VIEW ALL REVIEWS
                </button>
              </div>

              <div className="space-y-4">
                {course.reviews.map((review) => (
                  <Card key={review.id} className="bg-surface/30 border-border/50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                          {review.initials}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{review.name}</h4>
                          <p className="text-[10px] text-text-primary/50">{review.role}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-text-primary/40 text-text-primary/40" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-text-primary/80 italic leading-relaxed">
                      {review.text}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="w-full lg:w-[450px] shrink-0">
            <div className="sticky top-24">
              <Card className="bg-surface/20 border-border overflow-hidden max-h-[calc(100vh-6rem)] overflow-y-auto">
                {/* Video Preview */}
                <div className="relative aspect-video bg-background group cursor-pointer border-b border-border/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10 opacity-70"></div>
                  <img src={course.videoPreview} alt={course.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-primary/80 transition-colors">
                      <Play className="w-6 h-6 text-white ml-1 fill-current" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Price Section */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-extrabold text-white">${course.price}</span>
                    <span className="text-text-primary/40 line-through text-sm font-medium pr-2">
                      ${course.originalPrice}
                    </span>
                    <Badge className="bg-primary/20 text-primary border-transparent text-[10px] font-extrabold tracking-widest px-2 py-0.5">
                      {course.discount}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mb-6">
                    <Button variant="primary" className="w-full py-6 text-base font-bold shadow-lg shadow-primary/20 border-transparent transition-all hover:scale-[1.02]">
                      Buy Now
                    </Button>
                    <Button
                      onClick={handleAddToCart}
                      className="w-full py-6 text-base font-bold bg-surface border border-border/80 hover:bg-surface/80 hover:border-text-primary/30 transition-all text-white"
                    >
                      Add to Cart
                    </Button>
                  </div>

                  <p className="text-[10px] text-center text-text-primary/50 tracking-widest uppercase font-bold mb-8">
                    30-Day Money-Back Guarantee
                  </p>

                  {/* Course Includes */}
                  <div>
                    <h4 className="text-[10px] font-bold text-white tracking-widest uppercase mb-4">
                      THIS COURSE INCLUDES:
                    </h4>
                    <ul className="space-y-3">
                      {course.includes.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-text-primary/80">
                          {item.icon}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>

      {/* Related Courses Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">Students also viewed</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_COURSES.map(relCourse => (
              <CourseCard key={relCourse.id} {...relCourse} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
