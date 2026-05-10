import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import Link from 'next/link';
import {
  Flame,
  Library,
  Hourglass,
  LayoutGrid,
  BookOpen,
  CheckCircle,
  Zap,
  Star,
  Rocket,
  Trophy,
  Award,
  Target,
} from "lucide-react";

export const dynamic = "force-dynamic";

/* ── Achievement definitions (single source of truth) ─────── */
interface AchievementContext {
  totalEnrollments: number;
  totalLessonsCompleted: number;
  totalCoursesCompleted: number;
  longestStreak: number;
}

interface AchievementDef {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  check: (ctx: AchievementContext) => boolean;
}

function buildAchievements(): AchievementDef[] {
  return [
    { id: "first-enroll", title: "First Enrollment", icon: <BookOpen className="w-5 h-5" />, color: "text-primary", bgColor: "bg-primary/10", borderColor: "border-primary/20", check: (c) => c.totalEnrollments >= 1 },
    { id: "first-lesson", title: "First Lesson", icon: <CheckCircle className="w-5 h-5" />, color: "text-cyan-400", bgColor: "bg-cyan-400/10", borderColor: "border-cyan-400/20", check: (c) => c.totalLessonsCompleted >= 1 },
    { id: "5-lessons", title: "5 Lessons Done", icon: <Zap className="w-5 h-5" />, color: "text-yellow-400", bgColor: "bg-yellow-400/10", borderColor: "border-yellow-400/20", check: (c) => c.totalLessonsCompleted >= 5 },
    { id: "10-lessons", title: "10 Lessons Done", icon: <Star className="w-5 h-5" />, color: "text-amber-400", bgColor: "bg-amber-400/10", borderColor: "border-amber-400/20", check: (c) => c.totalLessonsCompleted >= 10 },
    { id: "25-lessons", title: "25 Lessons Done", icon: <Rocket className="w-5 h-5" />, color: "text-orange-400", bgColor: "bg-orange-400/10", borderColor: "border-orange-400/20", check: (c) => c.totalLessonsCompleted >= 25 },
    { id: "first-course", title: "Course Complete", icon: <Trophy className="w-5 h-5" />, color: "text-success", bgColor: "bg-success/10", borderColor: "border-success/20", check: (c) => c.totalCoursesCompleted >= 1 },
    { id: "3-courses", title: "Triple Threat", icon: <Award className="w-5 h-5" />, color: "text-purple-400", bgColor: "bg-purple-400/10", borderColor: "border-purple-400/20", check: (c) => c.totalCoursesCompleted >= 3 },
    { id: "5-streak", title: "5-Day Streak", icon: <Flame className="w-5 h-5" />, color: "text-red-400", bgColor: "bg-red-400/10", borderColor: "border-red-400/20", check: (c) => c.longestStreak >= 5 },
    { id: "10-streak", title: "10-Day Streak", icon: <Target className="w-5 h-5" />, color: "text-rose-400", bgColor: "bg-rose-400/10", borderColor: "border-rose-400/20", check: (c) => c.longestStreak >= 10 },
  ];
}

function computeLongestStreak(dates: string[]): number {
  const unique = Array.from(new Set(dates.map(d => new Date(d).toISOString().split('T')[0]))).sort();
  if (unique.length === 0) return 0;
  let longest = 1, current = 1;
  for (let i = 1; i < unique.length; i++) {
    const diffDays = Math.round((new Date(unique[i]).getTime() - new Date(unique[i - 1]).getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) { current++; longest = Math.max(longest, current); }
    else { current = 1; }
  }
  return longest;
}

export default async function LearningPathPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  const userEmail = session.user?.email || "";

  const [{ data: enrollData }, { data: progData }] = await Promise.all([
    supabase.from("enrollments").select("*, courses(*)").eq("user_email", userEmail).order("created_at", { ascending: false }),
    supabase.from("course_progress").select("course_id, lesson_id, created_at").eq("user_email", userEmail)
  ]);

  const enrollments = enrollData || [];
  const progressData = progData || [];

  // Data Aggregation
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);
  
  const progressThisWeek = progressData.filter(p => new Date(p.created_at) >= oneWeekAgo);
  const lessonsCompletedThisWeek = progressThisWeek.length;
  
  // Calculate distinct study days
  const activeDates = Array.from(new Set(progressData.map(p => new Date(p.created_at).toISOString().split('T')[0]))).sort();
  let currentStreak = 0;
  if (activeDates.length > 0) {
    currentStreak = 1;
    let checkDate = new Date(activeDates[activeDates.length - 1]);
    for (let i = activeDates.length - 2; i >= 0; i--) {
      const prev = new Date(activeDates[i]);
      const diffTime = Math.abs(checkDate.getTime() - prev.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if (diffDays === 1) {
        currentStreak++;
        checkDate = prev;
      } else {
        break;
      }
    }
  }

  // Calculate approximate study hours (e.g., 0.5 hrs per lesson)
  const studyHoursTotal = (progressData.length * 0.5).toFixed(1);

  // Compute Enrolled Courses mapped structure
  const progressByCourse = progressData.reduce((acc: any, row: any) => {
    if (!acc[row.course_id]) acc[row.course_id] = [];
    if (!acc[row.course_id].includes(row.lesson_id)) acc[row.course_id].push(row.lesson_id);
    return acc;
  }, {});

  const inProgressCourses = enrollments.map((enrollment: any) => {
    const course = enrollment.courses || {};
    const totalLessons = course.curriculum?.reduce((sum: number, section: any) => sum + (section.lessons?.length || 0), 0) || 0;
    const completedLessonsCount = progressByCourse[enrollment.course_id]?.length || 0;
    const remainingMinutes = (totalLessons - completedLessonsCount) * 30;
    const remH = Math.floor(remainingMinutes / 60);
    const remM = remainingMinutes % 60;
    
    return {
      id: enrollment.course_id,
      title: course.title || "Untitled Course",
      description: course.description || "",
      category: course.category || "General",
      level: course.level || "Beginner",
      image: course.image || "",
      completedLessonsCount,
      totalLessons,
      remainingTime: `${remH}H ${remM}M`
    };
  }).filter(c => c.totalLessons > 0 && c.completedLessonsCount < c.totalLessons);

  // Calculate overall path progress
  const allTotalLessons = enrollments.reduce((sum: number, e: any) => {
    return sum + (e.courses?.curriculum?.reduce((s: number, sec: any) => s + (sec.lessons?.length || 0), 0) || 0);
  }, 0);
  const allCompletedLessons = progressData.length;
  const overallProgress = allTotalLessons > 0 ? Math.round((allCompletedLessons / allTotalLessons) * 100) : 0;

  // Weekly objective
  const weeklyGoal = 5;
  const weeklyCompleted = Math.min(lessonsCompletedThisWeek, weeklyGoal);
  const weeklyPercent = Math.round((weeklyCompleted / weeklyGoal) * 100);

  // Heatmap Generator — Rolling 12 months, REAL DATA ONLY
  // Compute the start date: 51 weeks + today's weekday offset ago (Sunday-aligned)
  const today = new Date();
  const todayDay = today.getDay(); // 0=Sun
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (51 * 7 + todayDay));

  const heatmapData = Array.from({length: 52}).map((_, weekIndex) => {
    return Array.from({length: 7}).map((_, dayIndex) => {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + (weekIndex * 7 + dayIndex));
      // Don't count future dates
      if (d > today) return -1;
      const dateStr = d.toISOString().split('T')[0];
      const hits = progressData.filter(p => p.created_at.startsWith(dateStr)).length;
      return hits;
    });
  });

  // Dynamic month labels based on rolling window
  const monthLabels: { label: string; weekIndex: number }[] = [];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let lastMonth = -1;
  for (let w = 0; w < 52; w++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + w * 7);
    const m = d.getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ label: monthNames[m], weekIndex: w });
      lastMonth = m;
    }
  }

  const hasAnyActivity = progressData.length > 0;

  // ── Achievements (synced with /achievements page) ──────────
  const uniqueLessons = new Set(progressData.map(p => `${p.course_id}::${p.lesson_id}`));
  const totalLessonsCompleted = uniqueLessons.size;

  const progressByCourseSet: Record<string, Set<string>> = {};
  for (const p of progressData) {
    if (!progressByCourseSet[p.course_id]) progressByCourseSet[p.course_id] = new Set();
    progressByCourseSet[p.course_id].add(p.lesson_id);
  }

  let totalCoursesCompleted = 0;
  for (const e of enrollments) {
    const course = (e as any).courses || {};
    const tl = course.curriculum?.reduce((s: number, sec: any) => s + (sec.lessons?.length || 0), 0) || 0;
    const cc = progressByCourseSet[e.course_id]?.size || 0;
    if (tl > 0 && cc >= tl) totalCoursesCompleted++;
  }

  const longestStreak = computeLongestStreak(progressData.map(p => p.created_at));

  const achievementCtx: AchievementContext = {
    totalEnrollments: enrollments.length,
    totalLessonsCompleted,
    totalCoursesCompleted,
    longestStreak,
  };

  const achievements = buildAchievements();
  const unlockedAchievements = achievements.filter(a => a.check(achievementCtx));
  const totalAchievements = achievements.length;

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary font-sans selection:bg-primary/30">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          {/* Content Area */}
        <div className="p-6 sm:p-8 lg:p-12 overflow-y-auto w-full h-full max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-10">
          
          {/* Left Column (Primary) */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            
            {/* Hero / Header Row */}
            <div className="flex flex-col gap-6 xl:gap-8">
              <div className="w-full">
                <span className="text-[#00F0FF] text-[10px] font-bold tracking-[0.2em] uppercase">Developer Journey</span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary mt-2 tracking-tight">Learning Path</h1>
                
                <div className="mt-8 max-w-xl">
                  <div className="w-full h-2 bg-text-primary/5 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#5A4AF4] to-[#00F0FF] rounded-full shadow-[0_0_10px_rgba(0,240,255,0.4)]" style={{width: `${overallProgress}%`}}></div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[9px] font-bold text-text-primary/40 tracking-widest uppercase">Path Progress</span>
                    <span className="text-[10px] font-bold text-[#00F0FF] tracking-widest">{overallProgress}% COMPLETED</span>
                  </div>
                </div>
              </div>

              {/* Stats Box Row */}
              <div className="flex items-stretch gap-4">
                <div className="flex-1 min-w-0 bg-surface border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center relative overflow-hidden group hover:border-border transition-colors">
                  <Flame className="w-6 h-6 text-[#FF6C37] mb-2 drop-shadow-[0_0_8px_rgba(255,108,55,0.6)]" />
                  <span className="text-2xl font-bold text-text-primary leading-none mb-1">{currentStreak}</span>
                  <span className="text-[8px] font-bold text-text-primary/30 tracking-[0.2em] uppercase text-center">Day Streak</span>
                </div>
                <div className="flex-1 min-w-0 bg-surface border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center hover:border-border transition-colors">
                  <Library className="w-6 h-6 text-[#00F0FF] mb-2 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                  <span className="text-2xl font-bold text-text-primary leading-none mb-1">{lessonsCompletedThisWeek}</span>
                  <span className="text-[8px] font-bold text-text-primary/30 tracking-[0.2em] uppercase text-center">Lessons/Week</span>
                </div>
                <div className="flex-1 min-w-0 bg-surface border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center hover:border-border transition-colors">
                  <Hourglass className="w-6 h-6 text-yellow-400 mb-2 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                  <span className="text-2xl font-bold text-text-primary leading-none mb-1">{studyHoursTotal}</span>
                  <span className="text-[8px] font-bold text-text-primary/30 tracking-[0.2em] uppercase text-center">Study Hours</span>
                </div>
              </div>
            </div>

            {/* Commitment History */}
            <div className="bg-surface border border-border/50 rounded-2xl p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <LayoutGrid className="w-5 h-5 text-[#5A4AF4]" />
                  <h3 className="text-lg font-bold text-text-primary">Commitment History</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-text-primary/30 font-bold uppercase tracking-wider">
                  Less
                  <div className="flex gap-1 flex-wrap">
                    <div className="w-3 h-3 rounded-[2px] bg-[#222738]"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-[#3B3299]"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-[#5A4AF4]"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-[#897CFF]"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-[#C1BAFF]"></div>
                  </div>
                  More
                </div>
              </div>

              <div className="overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar">
                <div className="min-w-[1050px] flex flex-col gap-1.5 pr-4">
                  {Array.from({length: 7}).map((_, dayIndex) => (
                    <div key={dayIndex} className="flex gap-1.5">
                      {heatmapData.map((week, weekIndex) => {
                        const val = week[dayIndex];
                        if (val === -1) {
                          return <div key={`${weekIndex}-${dayIndex}`} className="w-3.5 h-3.5 rounded-[3px] opacity-0 cursor-default"></div>;
                        }
                        
                        let bg = "bg-surface-light border border-border/50";
                        if (val === 1) bg = "bg-[#3B3299]";
                        if (val === 2) bg = "bg-[#5A4AF4] shadow-[0_0_8px_rgba(90,74,244,0.4)]";
                        if (val > 2) bg = "bg-[#C1BAFF] shadow-[0_0_10px_rgba(193,186,255,0.6)]";

                        return (
                          <div key={`${weekIndex}-${dayIndex}`} className={`w-3.5 h-3.5 rounded-[3px] ${bg} transition-colors hover:ring-1 hover:ring-white/50 cursor-pointer`} title={`${val} lesson${val !== 1 ? 's' : ''} completed`}></div>
                        )
                      })}
                    </div>
                  ))}
                </div>
                <div className="relative h-4 mt-4 text-[9px] font-bold text-text-primary/40 uppercase tracking-[0.2em] min-w-[1050px]">
                  {monthLabels.map((m, i) => (
                    <span key={i} className="absolute" style={{ left: `${m.weekIndex * 20}px` }}>{m.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Enrolled Courses List */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-text-primary">Enrolled Courses</h3>
                <Link href="/dashboard" className="text-[10px] font-bold text-text-primary/40 tracking-[0.2em] uppercase hover:text-text-primary cursor-pointer transition-colors">View All</Link>
              </div>

              <div className="space-y-6">
                {inProgressCourses.length > 0 ? inProgressCourses.map((course: any) => {
                  const p = (course.completedLessonsCount / course.totalLessons) * 100;
                  return (
                    <Link key={course.id} href={`/courses/${course.id}`} className="block">
                      <div className="bg-surface border border-border/50 rounded-2xl overflow-hidden hover:border-border transition-colors flex flex-col md:flex-row group h-auto md:h-48 cursor-pointer">
                        <div className="w-full md:w-64 h-48 md:h-full relative overflow-hidden flex-shrink-0 border-r border-border/50 bg-surface-light">
                          {course.image && <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/60"></div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col justify-center relative">
                           <div className="absolute top-6 right-8 rounded-full bg-text-primary/5 border border-border px-3 py-1 flex items-center justify-center">
                              <span className="text-[9px] font-bold text-text-primary/60 tracking-widest uppercase">{course.level}</span>
                           </div>
                           <h4 className="text-xl font-bold text-text-primary mb-2 pr-20">{course.title}</h4>
                           <p className="text-sm text-text-primary/40 mb-8 max-w-xl line-clamp-2">{course.description || "Mastering advanced patterns and implementations inside the modern ecosystem."}</p>
                           
                           <div className="mt-auto w-full">
                              <div className="flex justify-between items-end mb-3">
                                <span className="text-[10px] font-bold text-text-primary/30 tracking-widest uppercase">{course.completedLessonsCount} / {course.totalLessons} Lessons Completed</span>
                                <span className="text-[10px] font-bold text-[#5A4AF4] tracking-widest uppercase">EST. {course.remainingTime} LEFT</span>
                              </div>
                              <div className="w-full h-1.5 bg-text-primary/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#5A4AF4] rounded-full transition-all duration-1000 ease-out" style={{width: `${p}%`}}></div>
                              </div>
                           </div>
                        </div>
                      </div>
                    </Link>
                  )
                }) : (
                  <div className="text-center py-16 bg-surface border border-border/50 rounded-2xl">
                     <BookOpen className="w-8 h-8 text-text-primary/20 mx-auto mb-4" />
                     <p className="text-text-primary/50 text-sm font-semibold mb-1">No active courses</p>
                     <p className="text-text-primary/30 text-xs">Enroll in a course to see your progress here.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar Extras) */}
          <div className="w-full xl:w-80 shrink-0 flex flex-col gap-8">
            
            {/* Weekly Objective */}
            <div className="bg-surface border border-border/50 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5A4AF4]/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <h4 className="text-[11px] font-bold text-text-primary/40 tracking-[0.2em] uppercase mb-10 w-full text-left">Weekly Objective</h4>
              
              <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                {/* SVG Radial Progress */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="#222738" strokeWidth="12" />
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="#5A4AF4" strokeWidth="12" strokeDasharray="439.8" strokeDashoffset={439.8 - (439.8 * (weeklyPercent / 100))} strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(90,74,244,0.6)] transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-text-primary">{weeklyPercent}%</span>
                </div>
              </div>

              <h5 className="text-lg font-bold text-text-primary mb-2">{weeklyCompleted} of {weeklyGoal} lessons<br/>completed</h5>
              <p className="text-xs text-text-primary/40 leading-relaxed mb-6">Maintain your momentum to unlock the &apos;Consistency&apos; badge this week.</p>
              
              <Link href="/dashboard" className="w-full">
                <Button className="w-full bg-text-primary/5 hover:bg-text-primary/10 text-text-primary font-bold tracking-widest text-[10px] uppercase py-6 border border-border transition-colors">
                  VIEW DASHBOARD
                </Button>
              </Link>
            </div>

            {/* Achievements (synced with real data) */}
            <div>
              <h4 className="text-[11px] font-bold text-text-primary/40 tracking-[0.2em] uppercase mb-6 px-1">Achievements</h4>
              
              <div className="bg-surface border border-border/50 rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
                
                {unlockedAchievements.length > 0 ? (
                  <>
                    {unlockedAchievements.slice(0, 3).map((a) => (
                      <div key={a.id} className="flex items-center gap-5 group cursor-pointer">
                        <div className={`w-12 h-12 rounded-xl ${a.bgColor} border ${a.borderColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-all ${a.color}`}>
                          {a.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-bold text-sm text-text-primary group-hover:${a.color} transition-colors`}>{a.title}</span>
                          <span className="text-[9px] font-bold text-text-primary/30 uppercase tracking-widest mt-1">Unlocked</span>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Trophy className="w-6 h-6 text-text-primary/20 mx-auto mb-3" />
                    <p className="text-xs text-text-primary/40">No achievements unlocked yet.</p>
                    <p className="text-[10px] text-text-primary/25 mt-1">Start learning to earn badges.</p>
                  </div>
                )}

                <div className="w-full border-t border-border/50 pt-6 mt-2">
                  <Link href="/achievements" className="block text-center text-[10px] font-bold text-text-primary/30 tracking-[0.2em] uppercase hover:text-text-primary cursor-pointer transition-colors">
                    See All {totalAchievements} Badges ({unlockedAchievements.length} unlocked)
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
        </main>
      </div>
    </div>
  );
}
