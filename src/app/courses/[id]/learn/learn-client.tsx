"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Course, Lesson } from "@/types/course";
import { getCompletedLessons, markLessonComplete } from "@/services/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  PlayCircle,
  FileText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MonitorPlay,
  Loader2,
  Menu,
  X,
  Home,
} from "lucide-react";

interface FlattenedLesson {
  id: string;
  sectionId: string;
  sectionTitle: string;
  lessonIndex: number;
  lesson: Lesson;
  isCompleted: boolean;
}

function LearnClientContent({ course, userEmail }: { course: Course; userEmail: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonIdParam = searchParams.get("lessonId");

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    getCompletedLessons(userEmail, course.id).then((completed) => {
      setCompletedLessons(completed);
      setLoadingProgress(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Flatten curriculum
  const flattenedCurriculum: FlattenedLesson[] = useMemo(() => {
    const flattened: FlattenedLesson[] = [];
    course.curriculum?.forEach((section) => {
      section.lessons?.forEach((lesson, index) => {
        const id = `${course.id}-${section.id}-${index}`;
        flattened.push({
          id,
          sectionId: section.id,
          sectionTitle: section.title,
          lessonIndex: index,
          lesson,
          isCompleted: completedLessons.includes(id),
        });
      });
    });
    return flattened;
  }, [course, completedLessons]);

  // Active lesson
  const activeLessonIndex = useMemo(() => {
    if (flattenedCurriculum.length === 0) return -1;
    if (lessonIdParam) {
      const idx = flattenedCurriculum.findIndex((fl) => fl.id === lessonIdParam);
      if (idx !== -1) return idx;
    }
    const firstIncompleteIdx = flattenedCurriculum.findIndex((fl) => !fl.isCompleted);
    return firstIncompleteIdx !== -1 ? firstIncompleteIdx : 0;
  }, [flattenedCurriculum, lessonIdParam]);

  // Sync URL param
  useEffect(() => {
    if (flattenedCurriculum.length === 0) return;
    const isValidParam =
      lessonIdParam && flattenedCurriculum.some((f) => f.id === lessonIdParam);
    if (!isValidParam) {
      const firstIncompleteIdx = flattenedCurriculum.findIndex((fl) => !fl.isCompleted);
      const targetIdx = firstIncompleteIdx !== -1 ? firstIncompleteIdx : 0;
      router.replace(
        `/courses/${course.id}/learn?lessonId=${flattenedCurriculum[targetIdx].id}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonIdParam, course.id, flattenedCurriculum.length]);

  const activeLessonDetails =
    activeLessonIndex !== -1 ? flattenedCurriculum[activeLessonIndex] : null;

  const navigateToLesson = (index: number) => {
    if (index >= 0 && index < flattenedCurriculum.length) {
      router.push(
        `/courses/${course.id}/learn?lessonId=${flattenedCurriculum[index].id}`
      );
    }
  };

  const handleMarkComplete = async () => {
    if (!activeLessonDetails || markingComplete) return;
    setMarkingComplete(true);
    try {
      const result = await markLessonComplete(
        userEmail,
        course.id,
        activeLessonDetails.id
      );
      if (result.success) {
        setCompletedLessons((prev) => [
          ...new Set([...prev, activeLessonDetails.id]),
        ]);
        toast.success("Completed ✓");
      } else {
        toast.error("Failed to update progress");
      }
    } catch {
      toast.error("Error occurred");
    } finally {
      setMarkingComplete(false);
    }
  };

  if (loadingProgress) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-text-primary">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-4" />
        <p className="text-text-primary/60 font-medium">Loading course player...</p>
      </div>
    );
  }

  if (flattenedCurriculum.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-text-primary">
        <p className="text-text-primary/60 font-medium mb-4">
          No lessons found in this course.
        </p>
        <Button onClick={() => router.push(`/courses/${course.id}`)}>
          Back to Course
        </Button>
      </div>
    );
  }

  const prevLessonAvailable = activeLessonIndex > 0;
  const nextLessonAvailable = activeLessonIndex < flattenedCurriculum.length - 1;

  // Group into sections for sidebar
  const groupedCurriculum =
    course.curriculum?.map((section) => ({
      ...section,
      flattenedLessons:
        section.lessons?.map((_, idx) => {
          const stableId = `${course.id}-${section.id}-${idx}`;
          return flattenedCurriculum.find((fl) => fl.id === stableId)!;
        }) || [],
    })) || [];

  const progressPercent = Math.round(
    (completedLessons.length / flattenedCurriculum.length) * 100
  );

  return (
    <div className="flex h-screen bg-background text-text-primary overflow-hidden font-sans">
      {/* ── Sidebar ──────────────────────────────────────────────── */}
      {/* Mobile overlay backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-72 flex flex-col shrink-0
          border-r transition-transform duration-300 ease-in-out
          ${isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0 md:w-0 md:border-0 md:overflow-hidden"
          }
        `}
        style={{
          backgroundColor: "var(--color-surface, #0F172A)",
          borderColor: "var(--color-border, #1E293B)",
        }}
      >
        {/* Sidebar header — DevLearn brand + close */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b shrink-0"
          style={{ borderColor: "var(--color-border, #1E293B)" }}
        >
          <Link
            href="/"
            className="font-bold text-base tracking-tight text-text-primary flex items-center gap-1"
          >
            <span className="text-primary font-black">Dev</span>Learn
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1.5 text-text-primary/50 hover:text-text-primary rounded-md"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Course title + progress */}
        <div
          className="px-5 py-4 border-b shrink-0"
          style={{ borderColor: "var(--color-border, #1E293B)" }}
        >
          <h2 className="font-extrabold text-text-primary text-sm mb-3 leading-snug line-clamp-2">
            {course.title}
          </h2>
          <div className="flex justify-between items-center text-xs font-bold text-text-primary/60 mb-1.5 tracking-wider uppercase">
            <span>Progress</span>
            <span className="text-cyan-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-surface-light rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cyan-400 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Lesson list */}
        <div className="flex-1 overflow-y-auto">
          {groupedCurriculum.map((section) => (
            <div
              key={section.id}
              className="border-b"
              style={{ borderColor: "var(--color-border, #1E293B)" }}
            >
              <div
                className="px-4 py-3"
                style={{ backgroundColor: "var(--color-background, #020617)" }}
              >
                <p className="text-[10px] font-bold text-text-primary/40 font-mono tracking-widest uppercase mb-0.5">
                  {section.id}
                </p>
                <h3 className="font-bold text-text-primary/80 text-xs leading-snug">
                  {section.title}
                </h3>
              </div>
              <div className="flex flex-col">
                {section.flattenedLessons.map((fl) => {
                  if (!fl) return null;
                  const isActive = activeLessonDetails?.id === fl.id;
                  return (
                    <button
                      key={fl.id}
                      onClick={() => {
                        router.push(
                          `/courses/${course.id}/learn?lessonId=${fl.id}`
                        );
                        if (window.innerWidth < 768) setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-l-2
                        ${isActive
                          ? "border-primary"
                          : "border-transparent hover:border-primary/30"
                        }
                      `}
                      style={{
                        backgroundColor: isActive
                          ? "color-mix(in srgb, var(--color-primary, #6366F1) 10%, transparent)"
                          : undefined,
                      }}
                    >
                      <div className="mt-0.5 shrink-0">
                        {fl.isCompleted ? (
                          <CheckCircle2
                            className={`w-4 h-4 ${isActive ? "text-primary" : "text-cyan-400"}`}
                          />
                        ) : fl.lesson.type === "video" ? (
                          <PlayCircle
                            className={`w-4 h-4 ${isActive ? "text-primary" : "text-text-primary/40"}`}
                          />
                        ) : (
                          <FileText
                            className={`w-4 h-4 ${isActive ? "text-primary" : "text-text-primary/40"}`}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className={`text-xs leading-snug block ${
                            isActive
                              ? "text-text-primary font-bold"
                              : fl.isCompleted
                              ? "text-text-primary/50 font-medium"
                              : "text-text-primary/75 font-medium"
                          }`}
                        >
                          {fl.lesson.title}
                        </span>
                        <span
                          className={`text-[10px] font-mono mt-0.5 block ${
                            isActive ? "text-primary/70" : "text-text-primary/35"
                          }`}
                        >
                          {fl.lesson.duration}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header
          className="h-14 border-b flex items-center px-4 justify-between shrink-0 gap-2"
          style={{
            backgroundColor: "var(--color-surface, #0F172A)",
            borderColor: "var(--color-border, #1E293B)",
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Sidebar toggle — always visible */}
            <button
              onClick={() => setIsSidebarOpen((p) => !p)}
              className="p-1.5 text-text-primary/50 hover:text-text-primary rounded-md transition-colors shrink-0"
              aria-label="Toggle lesson sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {activeLessonDetails && (
              <span className="hidden sm:block text-xs font-bold text-text-primary/50 tracking-widest uppercase truncate">
                {activeLessonDetails.sectionTitle}&nbsp;/&nbsp;Lesson{" "}
                {activeLessonDetails.lessonIndex + 1}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Home / back navigation — always accessible */}
            <Link
              href="/"
              className="p-1.5 text-text-primary/50 hover:text-text-primary rounded-md transition-colors"
              title="Go to Home"
            >
              <Home className="w-4 h-4" />
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateToLesson(activeLessonIndex - 1)}
              disabled={!prevLessonAvailable}
              className="text-xs font-bold uppercase tracking-wider h-8 px-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline ml-0.5">Prev</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateToLesson(activeLessonIndex + 1)}
              disabled={!nextLessonAvailable}
              className="text-xs font-bold uppercase tracking-wider h-8 px-2"
            >
              <span className="hidden sm:inline mr-0.5">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Lesson view */}
        {activeLessonDetails && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 w-full">
              {/* Player mock */}
              <div className="w-full aspect-video bg-surface/50 border border-border/50 rounded-2xl mb-8 flex items-center justify-center shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-cyan-500/5 mix-blend-overlay" />
                {activeLessonDetails.lesson.type === "video" ? (
                  <MonitorPlay className="w-16 h-16 text-text-primary/20 group-hover:text-primary transition-colors duration-500" />
                ) : (
                  <FileText className="w-16 h-16 text-text-primary/20 group-hover:text-primary transition-colors duration-500" />
                )}
              </div>

              {/* Lesson info + actions */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-4 leading-tight">
                    {activeLessonDetails.lesson.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm font-bold tracking-wider text-text-primary/50 uppercase">
                    <span className="flex items-center gap-1.5">
                      {activeLessonDetails.lesson.type === "video" ? (
                        <>
                          <PlayCircle className="w-4 h-4 text-cyan-400" /> Video
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 text-cyan-400" /> Reading
                        </>
                      )}
                    </span>
                    <span>•</span>
                    <span className="font-mono">
                      {activeLessonDetails.lesson.duration}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <Button
                    onClick={handleMarkComplete}
                    disabled={activeLessonDetails.isCompleted || markingComplete}
                    className={`py-6 px-8 text-sm font-bold tracking-widest uppercase transition-all ${
                      activeLessonDetails.isCompleted
                        ? "bg-success/20 text-success border-transparent opacity-100"
                        : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                    }`}
                  >
                    {activeLessonDetails.isCompleted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" /> Completed ✓
                      </>
                    ) : markingComplete ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Updating...
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </Button>
                </div>
              </div>

              {/* Description stub */}
              <div className="prose prose-invert max-w-none prose-p:text-text-primary/80 prose-p:leading-relaxed prose-headings:text-text-primary prose-a:text-primary">
                <p>
                  In this {activeLessonDetails.lesson.type}, we explore the
                  fundamental concepts behind{" "}
                  <strong>{activeLessonDetails.lesson.title}</strong>. Make sure
                  to follow along and complete any exercises referenced in the
                  material.
                </p>
                <p>
                  If you run into any issues or have questions, consult the
                  course forum or refer to the supplementary materials included
                  in the course dashboard. Once you are finished, click{" "}
                  <em>Mark Complete</em> to lock in your progress.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function LearnClient(props: { course: Course; userEmail: string }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        </div>
      }
    >
      <LearnClientContent {...props} />
    </Suspense>
  );
}
