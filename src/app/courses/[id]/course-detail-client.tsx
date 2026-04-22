"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/layout/course-card";
import { useCartStore } from "@/store/cartStore";
import { checkEnrollment } from "@/services/enrollments";
import { getCompletedLessons } from "@/services/progress";
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
  ShoppingCart,
  Play,
  Check,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Course } from "@/types/course";

function TerminalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  );
}

export const CourseDetailClient = ({ course, relatedCourses, userEmail }: { course: Course, relatedCourses: Course[], userEmail: string | null }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.items);
  const router = useRouter();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ "01": true });

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [firstIncompleteLessonId, setFirstIncompleteLessonId] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  React.useEffect(() => {
    if (!userEmail) return;
    checkEnrollment(userEmail, course.id).then(enrolled => {
      setIsEnrolled(enrolled);
      if (enrolled) {
        getCompletedLessons(userEmail, course.id).then(setCompletedLessons);
      }
    });
  }, [userEmail, course.id]);

  // Compute the first incomplete lesson
  React.useEffect(() => {
    if (!isEnrolled || !course.curriculum) return;
    for (let c = 0; c < course.curriculum.length; c++) {
      const section = course.curriculum[c];
      for (let l = 0; l < (section.lessons?.length || 0); l++) {
        const stableId = `${course.id}-${section.id}-${l}`;
        if (!completedLessons.includes(stableId)) {
          setFirstIncompleteLessonId(stableId);
          return;
        }
      }
    }
    // If all completed, start at the beginning
    if (course.curriculum[0]?.lessons?.[0]) {
      setFirstIncompleteLessonId(`${course.id}-${course.curriculum[0].id}-0`);
    }
  }, [isEnrolled, course.curriculum, completedLessons, course.id]);

  const isInCart = cartItems.some(i => i.id === course.id);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddToCart = async () => {
    if (isInCart) {
      toast("Already in cart", {
        description: "This course is already in your cart.",
      });
      return;
    }

    setIsAddingToCart(true);
    // Simulate short network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    addToCart({
      id: course.id,
      title: course.title || "Untitled Course",
      price: course.numericPrice ?? 0,
      image: course.image || "/placeholder.jpg",
      instructor: course.instructor?.name || "Unknown"
    });

    setIsAddingToCart(false);
    toast.success("Added to cart", {
      description: `${course.title} has been added to your cart.`
    });
  };

  const handleAddToCartAndGo = async () => {
    if (!isInCart) {
      setIsAddingToCart(true);
      await new Promise((resolve) => setTimeout(resolve, 400));
      addToCart({
        id: course.id,
        title: course.title || "Untitled Course",
        price: course.numericPrice ?? 0,
        image: course.image || "/placeholder.jpg",
        instructor: course.instructor?.name || "Unknown"
      });
      setIsAddingToCart(false);
    }
    router.push("/cart");
  };



  const totalLessons = course.curriculum?.reduce((acc, sec) => acc + (sec.lessons?.length || 0), 0) || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

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
                <span className="text-text-primary/60">({course.reviewsCountLabel || `${course.reviewsCount} ratings`})</span>
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
                {course.description}
              </p>
            </div>

            {/* Curriculum Configuration */}
            {(course.curriculum?.length ?? 0) > 0 && (
            <div className="mb-12">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Curriculum</h2>
                <div className="text-xs font-bold text-cyan-400 tracking-wider">
                  {course.curriculum.length} Chapters • {totalLessons} Lessons
                </div>
              </div>

              {isEnrolled && totalLessons > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center text-sm font-bold text-white mb-2">
                    <span>Your Progress</span>
                    <span className="text-cyan-400">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-surface/50 rounded-full h-2.5 overflow-hidden border border-border/50">
                    <div className="bg-cyan-400 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                  <p className="text-xs text-text-primary/60 mt-2 font-medium">
                    {completedLessons.length} of {totalLessons} lessons completed
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {course.curriculum?.map((section) => (
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

                    {openSections[section.id] && (section.lessons?.length ?? 0) > 0 && (
                      <div className="p-2 border-t border-border/50">
                        {section.lessons.map((lesson, idx) => {
                          const stableLessonId = `${course.id}-${section.id}-${idx}`;
                          const isCompleted = completedLessons.includes(stableLessonId);
                          return (
                            <div key={idx} className="flex items-center justify-between p-3 px-4 hover:bg-background/50 rounded-lg transition-colors group">
                              <div className="flex items-center gap-4">
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                ) : lesson.type === 'video' ? (
                                  <PlayCircle className="w-4 h-4 text-text-primary/60 group-hover:text-primary transition-colors" />
                                ) : (
                                  <FileText className="w-4 h-4 text-text-primary/60 group-hover:text-primary transition-colors" />
                                )}
                                <span className={`text-sm ${isCompleted ? 'text-text-primary/50 line-through' : 'text-text-primary/90'}`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-xs font-mono text-text-primary/50">{lesson.duration}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            )}

            {/* Instructor */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-white mb-6">Your Instructor</h2>

              <Card className="bg-surface/30 border-border/50 p-6 flex flex-col md:flex-row gap-6">
                {course.instructor?.avatar ? (
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor?.name || "Instructor"}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{course.instructor?.name || "Unknown Instructor"}</h3>
                  {course.instructor?.title && (
                  <p className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase mb-4">
                    {course.instructor.title}
                  </p>
                  )}
                  {course.instructor?.bio && (
                  <p className="text-sm text-text-primary/80 leading-relaxed mb-4">
                    {course.instructor.bio}
                  </p>
                  )}
                  <div className="flex items-center gap-6 text-xs text-text-primary/50 font-bold tracking-wider">
                    {course.instructor?.students && (
                    <span className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      {course.instructor.students}
                    </span>
                    )}
                    {course.instructor?.courses && (
                    <span className="flex items-center gap-2">
                      <PlayCircle className="w-3.5 h-3.5" />
                      {course.instructor.courses}
                    </span>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Student Feedback */}
            {(course.reviews?.length ?? 0) > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Student Feedback</h2>
                <button className="text-xs text-primary font-bold tracking-wider hover:underline">
                  VIEW ALL REVIEWS
                </button>
              </div>

              <div className="space-y-4">
                {course.reviews?.map((review) => (
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
            )}

          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="w-full lg:w-[450px] shrink-0">
            <div className="sticky top-24">
              <Card className="bg-surface/20 border-border overflow-hidden max-h-[calc(100vh-6rem)] overflow-y-auto">
                {/* Video Preview */}
                <div className="relative aspect-video bg-background group cursor-pointer border-b border-border/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10 opacity-70"></div>
                  <img
                    src={course.image || "/placeholder.jpg"}
                    alt={course.title || "Course"}
                    className="w-full h-full object-cover opacity-60"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.jpg'; }}
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-primary/80 transition-colors">
                      <Play className="w-6 h-6 text-white ml-1 fill-current" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Price Section */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-extrabold text-white">{course.price || "$0.00"}</span>
                    {course.originalPrice != null && (
                    <span className="text-text-primary/40 line-through text-sm font-medium pr-2">
                      ${course.originalPrice}
                    </span>
                    )}
                    {course.discount && (
                    <Badge className="bg-primary/20 text-primary border-transparent text-[10px] font-extrabold tracking-widest px-2 py-0.5">
                      {course.discount}
                    </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mb-6">
                    {isEnrolled ? (
                      <Button
                        onClick={() => {
                          const url = firstIncompleteLessonId 
                            ? `/courses/${course.id}/learn?lessonId=${firstIncompleteLessonId}`
                            : `/courses/${course.id}/learn`;
                          router.push(url);
                        }}
                        disabled={totalLessons === 0}
                        className="w-full py-6 text-base font-bold bg-success/20 text-success border border-success/30 hover:bg-success/30 transition-all flex items-center justify-center gap-2 shadow-lg shadow-success/10 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        {totalLessons === 0 ? "No Lessons Found" : "Continue Learning"}
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          onClick={handleAddToCartAndGo}
                          disabled={isAddingToCart}
                          className="w-full py-6 text-base font-bold shadow-lg shadow-primary/20 border-transparent transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          {isAddingToCart ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-5 h-5 mr-2" />
                              {isInCart ? "Go to Cart" : "Add to Cart & Checkout"}
                            </>
                          )}
                        </Button>
                        {!isInCart && (
                          <Button
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                            className="w-full py-6 text-base font-bold bg-surface border border-border/80 hover:bg-surface/80 hover:border-text-primary/30 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isAddingToCart ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Adding to Cart...
                              </>
                            ) : (
                              "Add to Cart"
                            )}
                          </Button>
                        )}
                        {isInCart && (
                          <div className="w-full py-3 text-sm font-semibold text-center rounded-md bg-primary/10 text-primary border border-primary/20 flex items-center justify-center gap-2">
                            <Check className="w-4 h-4" />
                            Added to Cart
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <p className="text-[10px] text-center text-text-primary/50 tracking-widest uppercase font-bold mb-8">
                    30-Day Money-Back Guarantee
                  </p>

                  {/* Course Includes */}
                  {(course.includes?.length ?? 0) > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-white tracking-widest uppercase mb-4">
                      THIS COURSE INCLUDES:
                    </h4>
                    <ul className="space-y-3">
                      {course.includes?.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-text-primary/80">
                          {item.iconName === 'video' && <MonitorPlay className="w-4 h-4 text-text-primary/70" />}
                          {item.iconName === 'paper' && <File className="w-4 h-4 text-text-primary/70" />}
                          {item.iconName === 'infinity' && <InfinityIcon className="w-4 h-4 text-text-primary/70" />}
                          {item.iconName === 'terminal' && <TerminalIcon className="w-4 h-4 text-text-primary/70" />}
                          {item.iconName === 'award' && <Award className="w-4 h-4 text-text-primary/70" />}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  )}
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
            {relatedCourses?.map(relCourse => (
              <CourseCard 
                key={relCourse.id} 
                id={relCourse.id}
                category={relCourse.category || "General"}
                title={relCourse.title || "Untitled Course"}
                instructor={relCourse.instructor?.name || "Unknown"}
                rating={relCourse.rating ?? 0}
                reviews={relCourse.reviewsCount ?? 0}
                price={relCourse.price || "$0.00"}
                imageUrl={relCourse.image || "/placeholder.jpg"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
