import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/layout/navbar";
import {
  CheckCircle,
  Award,
  Play,
  GraduationCap
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const userName = session.user?.name || session.user?.email?.split('@')[0] || "User";
  const userEmail = session.user?.email || "";

  let enrollments: any[] = [];
  let progressData: any[] = [];
  let fetchError = false;

  try {
    // Fetch enrolled courses with full course data via join
    const [{ data: enrollData, error: enrollError }, { data: progData, error: progError }] = await Promise.all([
      supabase.from("enrollments").select("*, courses(*)").eq("user_email", userEmail).order("created_at", { ascending: false }),
      supabase.from("course_progress").select("course_id, lesson_id").eq("user_email", userEmail)
    ]);

    if (enrollError || progError) {
      fetchError = true;
    } else {
      enrollments = enrollData || [];
      progressData = progData || [];
    }
  } catch (err) {
    fetchError = true;
  }

  const progressByCourse = (progressData || []).reduce((acc: any, row: any) => {
    if (!acc[row.course_id]) acc[row.course_id] = [];
    acc[row.course_id].push(row.lesson_id);
    return acc;
  }, {});

  const inProgressCourses: any[] = [];
  const completedCourses: any[] = [];

  (enrollments || []).forEach((enrollment: any) => {
    const course = enrollment.courses || {};
    const totalLessons = course.curriculum?.reduce((sum: number, section: any) => sum + (section.lessons?.length || 0), 0) || 0;
    const completedLessonsCount = progressByCourse[enrollment.course_id]?.length || 0;
    const progressPercent = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    const formattedCourse = {
      id: enrollment.course_id,
      category: course.category || "COURSE",
      title: course.title || "Untitled Course",
      description: course.description || "No description available.",
      imageUrl: course.image || "/placeholder.jpg",
      instructor: course.instructor?.name || "Unknown",
      // Fake issued date for the sake of presentation
      issued: new Date(enrollment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      enrolledAt: new Date(enrollment.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      progressPercent,
      completedLessonsCount,
      totalLessons,
      grade: "A+" // Simulated aesthetic grading logic
    };

    if (totalLessons > 0 && completedLessonsCount >= totalLessons) {
      completedCourses.push(formattedCourse);
    } else {
      inProgressCourses.push(formattedCourse);
    }
  });

  const enrolledCourses = [
    ...inProgressCourses,
    ...completedCourses
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary font-sans">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
          {/* Header */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
                Welcome back, <span className="capitalize">{userName}</span>.
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <Badge className="bg-primary/20 text-primary border-none px-3 py-1 font-semibold">
                  {enrolledCourses.length} ENROLLED COURSE{enrolledCourses.length !== 1 ? "S" : ""}
                </Badge>
                {enrolledCourses.length > 0 && (
                  <span className="text-text-secondary text-sm italic">
                    Keep up the great work — your learning journey is underway.
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 bg-surface/30 rounded-2xl border border-border/50 divide-y sm:divide-y-0 sm:divide-x divide-border/50 p-6 shadow-none w-full xl:w-auto">
              <div className="py-4 sm:py-0 px-6 flex flex-col justify-center text-center">
                <span className="text-[10px] font-bold text-text-secondary tracking-wider mb-1">ENROLLED</span>
                <span className="text-3xl font-bold text-text-primary">{inProgressCourses.length}</span>
              </div>
              <div className="py-4 sm:py-0 px-6 flex flex-col justify-center text-center">
                <span className="text-[10px] font-bold text-text-secondary tracking-wider mb-1">COMPLETED</span>
                <span className="text-3xl font-bold text-text-primary">{completedCourses.length}</span>
              </div>
              <div className="py-4 sm:py-0 px-6 flex flex-col justify-center text-center">
                <span className="text-[10px] font-bold text-text-secondary tracking-wider mb-1">STREAK</span>
                <span className="text-3xl font-bold text-cyan-400">18 <span className="text-sm font-bold text-cyan-400/50">DAYS</span></span>
              </div>
            </div>
          </div>

          {/* Enrolled Courses Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                <h2 className="text-2xl font-bold text-text-primary">In Progress</h2>
              </div>
              {inProgressCourses.length > 0 && (
                <Link href="/courses" className="text-xs font-bold tracking-widest text-text-secondary hover:text-text-primary transition-colors">
                  BROWSE MORE
                </Link>
              )}
            </div>

            {fetchError ? (
              <Card className="bg-surface/30 border-red-500/20 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">Something went wrong. Please try again.</h3>
                  <p className="text-text-secondary text-sm text-center max-w-md">
                    We couldn't connect to our servers to load your enrolled courses.
                  </p>
                  <a href="/dashboard">
                    <Button variant="primary" className="mt-2 shadow-none border-transparent px-8">
                      Retry
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ) : inProgressCourses.length === 0 ? (
              /* Empty state */
              <Card className="bg-surface/30 border-border/50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                    <GraduationCap className="w-8 h-8 text-primary/60" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">No courses in progress</h3>
                  <p className="text-text-secondary text-sm text-center max-w-md">
                    You haven&apos;t started or enrolled in any new courses. Browse our catalog to find the perfect course to start your learning journey.
                  </p>
                  <Link href="/courses">
                    <Button variant="primary" className="mt-2 shadow-none border-transparent px-8">
                      Browse courses
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map((course: any) => (
                  <Card key={course.id} className="group overflow-hidden bg-surface hover:bg-surface-light border-border/50 flex flex-col transition-all hover:border-primary/50 shadow-none">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-slate-900/75 border border-primary/30 text-primary text-[10px] font-bold tracking-wider rounded-sm rounded-tr-xl">
                          {course.category}
                        </Badge>
                      </div>
                      <img src={course.imageUrl} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition-all duration-700" />
                    </div>
                    <CardContent className="flex flex-col flex-grow p-6 pt-5">
                      <h3 className="font-bold text-lg leading-tight text-text-primary mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-text-secondary line-clamp-2 mb-2">{course.description}</p>
                      <p className="text-xs text-text-secondary mb-4">
                        By {course.instructor} • Enrolled {course.enrolledAt}
                      </p>

                      {course.totalLessons > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center text-xs font-bold text-text-primary mb-2">
                            <span className="text-text-secondary">{course.completedLessonsCount} / {course.totalLessons} lessons</span>
                            <span className="text-cyan-400">{course.progressPercent}%</span>
                          </div>
                          <div className="w-full bg-surface/50 rounded-full h-1.5 overflow-hidden border border-border/50">
                            <div className="bg-cyan-400 h-1.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${course.progressPercent}%` }}></div>
                          </div>
                        </div>
                      )}
                      <div className="mt-auto pt-2 border-t border-border/50">
                        <Link href={course.totalLessons > 0 ? `/courses/${course.id}/learn` : `/courses/${course.id}`}>
                          <Button variant="primary" className="w-full shadow-none border-transparent mt-4">
                            {course.progressPercent === 100 ? "Review Course" : "Continue Learning"} <Play className="w-3 h-3 ml-2 fill-current" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Completed Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 bg-cyan-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-text-primary">Completed</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map((course: any) => (
                <Link href={`/courses/${course.id}/learn`} key={course.id} className="block group">
                  <Card className="bg-surface border-border/50 group-hover:bg-surface-light group-hover:border-primary/50 transition-colors flex flex-col items-center sm:items-start p-6 gap-5 h-full shadow-none">
                    <div className="w-14 h-14 bg-background/50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-border/60 shadow-none self-start">
                      <CheckCircle className="w-6 h-6 text-cyan-400" />
                    </div>

                    <div className="flex-1 text-left w-full">
                      <div className="flex items-center justify-start gap-2 mb-2">
                        <span className="text-[10px] font-bold text-text-secondary tracking-widest uppercase">
                          {course.category}
                        </span>
                        <Badge className="bg-cyan-400/10 text-cyan-400 text-[9px] font-bold px-1.5 py-0 border-transparent h-4 rounded-sm">
                          COMPLETED
                        </Badge>
                      </div>
                      <h3 className="font-bold text-text-primary text-lg group-hover:text-primary transition-colors leading-tight mb-2">{course.title}</h3>
                      <p className="text-xs font-mono text-text-secondary mt-auto">
                        Issued {course.issued}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 w-full">
                      <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/10 gap-2 font-medium border-transparent">
                        <Award className="w-4 h-4" /> View Certificate
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
