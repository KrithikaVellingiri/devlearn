import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { supabase } from "@/lib/supabase";
import { Sidebar } from "@/components/layout/sidebar";
import { BookOpen, CheckCircle, TrendingUp, Activity, Play, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");
  const userEmail = session.user?.email || "";

  const [{ data: enrollData }, { data: progData }] = await Promise.all([
    supabase.from("enrollments").select("course_id, created_at, courses(id, title, image, category, curriculum)").eq("user_email", userEmail).order("created_at", { ascending: false }),
    supabase.from("course_progress").select("course_id, lesson_id, created_at").eq("user_email", userEmail).order("created_at", { ascending: false }),
  ]);

  const enrollments = enrollData || [];
  const progressData = progData || [];
  const totalEnrolled = enrollments.length;

  const progressByCourse: Record<string, string[]> = {};
  for (const row of progressData) {
    if (!progressByCourse[row.course_id]) progressByCourse[row.course_id] = [];
    if (!progressByCourse[row.course_id].includes(row.lesson_id)) progressByCourse[row.course_id].push(row.lesson_id);
  }

  let totalCompleted = 0, totalLessonsAll = 0, completedLessonsAll = 0;
  let continueCourse: any = null;

  for (const enrollment of enrollments) {
    const course = (enrollment as any).courses || {};
    const tl = course.curriculum?.reduce((s: number, sec: any) => s + (sec.lessons?.length || 0), 0) || 0;
    const cc = progressByCourse[enrollment.course_id]?.length || 0;
    totalLessonsAll += tl;
    completedLessonsAll += Math.min(cc, tl);
    if (tl > 0 && cc >= tl) totalCompleted++;
    else if (!continueCourse && tl > 0) {
      continueCourse = { id: enrollment.course_id, title: course.title || "Untitled", image: course.image || "", category: course.category || "General", cc, tl, pct: Math.round((cc / tl) * 100) };
    }
  }

  const overallProgress = totalLessonsAll > 0 ? Math.round((completedLessonsAll / totalLessonsAll) * 100) : 0;
  const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weeklyLessons = progressData.filter(p => new Date(p.created_at) >= oneWeekAgo).length;

  const recentActivity = progressData.slice(0, 5).map(p => {
    const e = enrollments.find(e => e.course_id === p.course_id);
    return { lessonId: p.lesson_id, courseId: p.course_id, courseTitle: (e as any)?.courses?.title || "Unknown", completedAt: new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) };
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-2">Overview</h1>
          <p className="text-text-primary/60 text-sm">Your learning activity at a glance.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          <Card className="bg-surface/50 border-border/50"><CardContent className="p-6 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><BookOpen className="w-6 h-6 text-primary" /></div><div><p className="text-[10px] font-bold text-text-primary/50 tracking-wider uppercase mb-1">Enrolled</p><p className="text-3xl font-bold text-text-primary">{totalEnrolled}</p></div></CardContent></Card>
          <Card className="bg-surface/50 border-border/50"><CardContent className="p-6 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0"><CheckCircle className="w-6 h-6 text-cyan-400" /></div><div><p className="text-[10px] font-bold text-text-primary/50 tracking-wider uppercase mb-1">Completed</p><p className="text-3xl font-bold text-text-primary">{totalCompleted}</p></div></CardContent></Card>
          <Card className="bg-surface/50 border-border/50"><CardContent className="p-6 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0"><TrendingUp className="w-6 h-6 text-success" /></div><div><p className="text-[10px] font-bold text-text-primary/50 tracking-wider uppercase mb-1">Progress</p><p className="text-3xl font-bold text-text-primary">{overallProgress}%</p></div></CardContent></Card>
          <Card className="bg-surface/50 border-border/50"><CardContent className="p-6 flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center shrink-0"><Activity className="w-6 h-6 text-warning" /></div><div><p className="text-[10px] font-bold text-text-primary/50 tracking-wider uppercase mb-1">This Week</p><p className="text-3xl font-bold text-text-primary">{weeklyLessons} <span className="text-sm font-bold text-text-primary/40">lessons</span></p></div></CardContent></Card>
        </div>

        {continueCourse && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6"><div className="w-1.5 h-6 bg-primary rounded-full"></div><h2 className="text-2xl font-bold text-text-primary">Continue Learning</h2></div>
            <Card className="bg-surface/50 border-border/50 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {continueCourse.image && <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden bg-background shrink-0"><img src={continueCourse.image} alt={continueCourse.title} className="absolute inset-0 w-full h-full object-cover opacity-70" /><div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80"></div></div>}
                <CardContent className="p-6 flex flex-col justify-center flex-1">
                  <Badge className="bg-primary/10 text-primary border-none px-2 py-0.5 text-[10px] font-bold tracking-wider w-fit mb-3">{continueCourse.category}</Badge>
                  <h3 className="text-xl font-bold text-white mb-2">{continueCourse.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-text-primary/60 mb-4"><span>{continueCourse.cc} / {continueCourse.tl} lessons</span><span className="text-cyan-400 font-bold">{continueCourse.pct}%</span></div>
                  <div className="w-full bg-surface/50 rounded-full h-1.5 overflow-hidden border border-border/50 mb-5"><div className="bg-cyan-400 h-1.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${continueCourse.pct}%` }}></div></div>
                  <Link href={`/courses/${continueCourse.id}/learn`}><Button variant="primary" className="shadow-md border-transparent">Continue Learning <Play className="w-3 h-3 ml-2 fill-current" /></Button></Link>
                </CardContent>
              </div>
            </Card>
          </section>
        )}

        <section>
          <div className="flex items-center gap-3 mb-6"><div className="w-1.5 h-6 bg-cyan-400 rounded-full"></div><h2 className="text-2xl font-bold text-text-primary">Recent Activity</h2></div>
          {recentActivity.length === 0 ? (
            <Card className="bg-surface/30 border-border/50 border-dashed"><CardContent className="flex flex-col items-center justify-center py-16 gap-3"><Clock className="w-8 h-8 text-text-primary/40 mb-2" /><h3 className="text-lg font-bold text-text-primary">No activity yet</h3><p className="text-text-primary/60 text-sm text-center max-w-md">Start learning to see your recent completions here.</p></CardContent></Card>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item, idx) => (
                <Card key={`${item.courseId}-${item.lessonId}-${idx}`} className="bg-surface/50 border-border/50 hover:bg-surface transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0"><CheckCircle className="w-5 h-5 text-success" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">Completed a lesson in <Link href={`/courses/${item.courseId}`} className="text-primary hover:underline">{item.courseTitle}</Link></p>
                      <p className="text-xs text-text-primary/50 mt-0.5">{item.completedAt}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
