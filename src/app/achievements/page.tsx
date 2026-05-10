import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Trophy, BookOpen, CheckCircle, Flame, Target, Award, Zap, Star, Rocket } from "lucide-react";

export const dynamic = "force-dynamic";

/* ── Achievement definitions ─────────────────────────────────── */
interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;       // tailwind color token for unlocked state
  bgColor: string;     // bg class for icon container
  borderColor: string; // border class for unlocked glow
  check: (ctx: AchievementContext) => boolean;
}

interface AchievementContext {
  totalEnrollments: number;
  totalLessonsCompleted: number;
  totalCoursesCompleted: number;
  longestStreak: number;
}

function buildAchievements(): AchievementDef[] {
  return [
    { id: "first-enroll", title: "First Enrollment", description: "Enrolled in your first course", icon: <BookOpen className="w-6 h-6" />, color: "text-primary", bgColor: "bg-primary/10", borderColor: "border-primary/30", check: (c) => c.totalEnrollments >= 1 },
    { id: "first-lesson", title: "First Lesson", description: "Completed your first lesson", icon: <CheckCircle className="w-6 h-6" />, color: "text-cyan-400", bgColor: "bg-cyan-400/10", borderColor: "border-cyan-400/30", check: (c) => c.totalLessonsCompleted >= 1 },
    { id: "5-lessons", title: "5 Lessons Done", description: "Completed 5 lessons total", icon: <Zap className="w-6 h-6" />, color: "text-yellow-400", bgColor: "bg-yellow-400/10", borderColor: "border-yellow-400/30", check: (c) => c.totalLessonsCompleted >= 5 },
    { id: "10-lessons", title: "10 Lessons Done", description: "Completed 10 lessons total", icon: <Star className="w-6 h-6" />, color: "text-amber-400", bgColor: "bg-amber-400/10", borderColor: "border-amber-400/30", check: (c) => c.totalLessonsCompleted >= 10 },
    { id: "25-lessons", title: "25 Lessons Done", description: "Completed 25 lessons total", icon: <Rocket className="w-6 h-6" />, color: "text-orange-400", bgColor: "bg-orange-400/10", borderColor: "border-orange-400/30", check: (c) => c.totalLessonsCompleted >= 25 },
    { id: "first-course", title: "Course Complete", description: "Finished your first course", icon: <Trophy className="w-6 h-6" />, color: "text-success", bgColor: "bg-success/10", borderColor: "border-success/30", check: (c) => c.totalCoursesCompleted >= 1 },
    { id: "3-courses", title: "Triple Threat", description: "Completed 3 courses", icon: <Award className="w-6 h-6" />, color: "text-purple-400", bgColor: "bg-purple-400/10", borderColor: "border-purple-400/30", check: (c) => c.totalCoursesCompleted >= 3 },
    { id: "5-streak", title: "5-Day Streak", description: "Learned for 5 consecutive days", icon: <Flame className="w-6 h-6" />, color: "text-red-400", bgColor: "bg-red-400/10", borderColor: "border-red-400/30", check: (c) => c.longestStreak >= 5 },
    { id: "10-streak", title: "10-Day Streak", description: "Learned for 10 consecutive days", icon: <Target className="w-6 h-6" />, color: "text-rose-400", bgColor: "bg-rose-400/10", borderColor: "border-rose-400/30", check: (c) => c.longestStreak >= 10 },
  ];
}

/* ── Streak calculation (deduplicated, sorted dates) ─────────── */
function computeLongestStreak(dates: string[]): number {
  // Deduplicate to unique date strings and sort ascending
  const unique = Array.from(new Set(dates.map(d => new Date(d).toISOString().split('T')[0]))).sort();
  if (unique.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1]);
    const curr = new Date(unique[i]);
    const diffMs = curr.getTime() - prev.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

export default async function AchievementsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");
  const userEmail = session.user?.email || "";

  const [{ data: enrollData }, { data: progData }] = await Promise.all([
    supabase.from("enrollments").select("course_id, courses(curriculum)").eq("user_email", userEmail),
    supabase.from("course_progress").select("course_id, lesson_id, created_at").eq("user_email", userEmail),
  ]);

  const enrollments = enrollData || [];
  const progressData = progData || [];

  // Deduplicated lesson count
  const uniqueLessons = new Set(progressData.map(p => `${p.course_id}::${p.lesson_id}`));
  const totalLessonsCompleted = uniqueLessons.size;

  // Completed courses
  const progressByCourse: Record<string, Set<string>> = {};
  for (const p of progressData) {
    if (!progressByCourse[p.course_id]) progressByCourse[p.course_id] = new Set();
    progressByCourse[p.course_id].add(p.lesson_id);
  }

  let totalCoursesCompleted = 0;
  for (const e of enrollments) {
    const course = (e as any).courses || {};
    const tl = course.curriculum?.reduce((s: number, sec: any) => s + (sec.lessons?.length || 0), 0) || 0;
    const cc = progressByCourse[e.course_id]?.size || 0;
    if (tl > 0 && cc >= tl) totalCoursesCompleted++;
  }

  const longestStreak = computeLongestStreak(progressData.map(p => p.created_at));

  const ctx: AchievementContext = {
    totalEnrollments: enrollments.length,
    totalLessonsCompleted,
    totalCoursesCompleted,
    longestStreak,
  };

  const achievements = buildAchievements();
  const unlocked = achievements.filter(a => a.check(ctx));
  const locked = achievements.filter(a => !a.check(ctx));

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary font-sans">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-2">Achievements</h1>
          <p className="text-text-primary/60 text-sm">{unlocked.length} of {achievements.length} unlocked — keep going!</p>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="w-full bg-surface/50 rounded-full h-2.5 overflow-hidden border border-border/50">
            <div className="bg-primary h-2.5 rounded-full transition-all duration-700" style={{ width: `${Math.round((unlocked.length / achievements.length) * 100)}%` }}></div>
          </div>
        </div>

        {/* Unlocked */}
        {unlocked.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6"><div className="w-1.5 h-6 bg-primary rounded-full"></div><h2 className="text-2xl font-bold text-text-primary">Unlocked</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {unlocked.map(a => (
                <Card key={a.id} className={`bg-surface/60 border ${a.borderColor} hover:scale-[1.02] transition-all duration-300 cursor-default`}>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${a.bgColor} flex items-center justify-center shrink-0 ${a.color}`}>{a.icon}</div>
                    <div>
                      <h3 className="font-bold text-white text-base mb-1">{a.title}</h3>
                      <p className="text-xs text-text-primary/60">{a.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Locked */}
        {locked.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6"><div className="w-1.5 h-6 bg-border rounded-full"></div><h2 className="text-2xl font-bold text-text-primary/50">Locked</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {locked.map(a => (
                <Card key={a.id} className="bg-surface/20 border-border/30 opacity-60 cursor-default">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-surface/40 flex items-center justify-center shrink-0 text-text-primary/30">{a.icon}</div>
                    <div>
                      <h3 className="font-bold text-text-primary/50 text-base mb-1">{a.title}</h3>
                      <p className="text-xs text-text-primary/40">{a.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
      </div>
    </div>
  );
}
