"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Course, CurriculumSection, Lesson } from "@/types/course";
import { getCompletedLessons, markLessonComplete } from "@/services/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  PlayCircle, FileText, CheckCircle2, ChevronLeft, ChevronRight, 
  ArrowLeft, MonitorPlay, Loader2, Menu, X 
} from "lucide-react";

interface FlattenedLesson {
  id: string; // stableLessonId
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

  // Fetch progress on load
  useEffect(() => {
    // Ensure we only fetch once on mount
    getCompletedLessons(userEmail, course.id).then(completed => {
      setCompletedLessons(completed);
      setLoadingProgress(false);
    });
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
          isCompleted: completedLessons.includes(id)
        });
      });
    });
    return flattened;
  }, [course, completedLessons]);

  // Determine active lesson
  const activeLessonIndex = useMemo(() => {
    if (flattenedCurriculum.length === 0) return -1;
    
    // If we have a query param, find it
    if (lessonIdParam) {
      const idx = flattenedCurriculum.findIndex(fl => fl.id === lessonIdParam);
      if (idx !== -1) return idx;
    }
    
    // Default: find first incomplete
    const firstIncompleteIdx = flattenedCurriculum.findIndex(fl => !fl.isCompleted);
    return firstIncompleteIdx !== -1 ? firstIncompleteIdx : 0;
  }, [flattenedCurriculum, lessonIdParam]);

  // Sync param if it's not present or invalid
  useEffect(() => {
    if (flattenedCurriculum.length === 0) return;
    
    const isValidParam = lessonIdParam && flattenedCurriculum.some(f => f.id === lessonIdParam);
    if (!isValidParam) {
      const firstIncompleteIdx = flattenedCurriculum.findIndex(fl => !fl.isCompleted);
      const targetIdx = firstIncompleteIdx !== -1 ? firstIncompleteIdx : 0;
      router.replace(`/courses/${course.id}/learn?lessonId=${flattenedCurriculum[targetIdx].id}`);
    }
  }, [lessonIdParam, course.id, router, flattenedCurriculum.length]);

  const activeLessonDetails = activeLessonIndex !== -1 ? flattenedCurriculum[activeLessonIndex] : null;

  const navigateToLesson = (index: number) => {
    if (index >= 0 && index < flattenedCurriculum.length) {
      router.push(`/courses/${course.id}/learn?lessonId=${flattenedCurriculum[index].id}`);
    }
  };

  const handleMarkComplete = async () => {
    if (!activeLessonDetails || markingComplete) return;
    
    setMarkingComplete(true);
    try {
      const result = await markLessonComplete(userEmail, course.id, activeLessonDetails.id);
      if (result.success) {
        setCompletedLessons(prev => [...new Set([...prev, activeLessonDetails.id])]);
        toast.success("Completed ✓");
        
        // Auto-navigate to next incomplete lesson if possible (optional UX enhancement, wait skipping for now to keep it simple, user just marks complete).
      } else {
        toast.error("Failed to update progress");
      }
    } catch (e) {
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
        <p className="text-text-primary/60 font-medium mb-4">No lessons found in this course.</p>
        <Button onClick={() => router.push(`/courses/${course.id}`)}>Back to Course</Button>
      </div>
    );
  }

  const prevLessonAvailable = activeLessonIndex > 0;
  const nextLessonAvailable = activeLessonIndex < flattenedCurriculum.length - 1;

  // Group back into sections for sidebar rendering
  const groupedCurriculum = course.curriculum?.map(section => ({
    ...section,
    flattenedLessons: section.lessons?.map((_, idx) => {
      const stableId = `${course.id}-${section.id}-${idx}`;
      return flattenedCurriculum.find(fl => fl.id === stableId)!;
    }) || []
  })) || [];

  const progressPercent = Math.round((completedLessons.length / flattenedCurriculum.length) * 100);

  return (
    <div className="flex h-screen bg-background text-text-primary overflow-hidden font-sans">
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-surface/80 backdrop-blur border border-border p-3 rounded-full shadow-xl md:hidden text-text-primary hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        w-80 bg-surface/30 border-r border-border/50 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:border-0'} 
        ${!isSidebarOpen ? 'md:overflow-hidden' : ''}
      `}>
        <div className="p-4 border-b border-border/50 flex items-center justify-between shrink-0 bg-surface/50">
          <button 
            onClick={() => router.push(`/courses/${course.id}`)}
            className="flex items-center text-sm font-bold text-text-primary/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Course
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-text-primary/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5 border-b border-border/50 shrink-0">
          <h2 className="font-extrabold text-white text-lg mb-4 truncate">{course.title}</h2>
          <div className="flex justify-between items-center text-xs font-bold text-text-primary/60 mb-2 tracking-wider uppercase">
             <span>Progress</span>
             <span className="text-cyan-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-surface/50 rounded-full h-1.5 overflow-hidden">
             <div className="bg-cyan-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {groupedCurriculum.map((section) => (
            <div key={section.id} className="border-b border-border/20">
              <div className="px-5 py-4 bg-surface/20">
                <p className="text-xs font-bold text-text-primary/50 font-mono tracking-widest mb-1">{section.id}</p>
                <h3 className="font-bold text-text-primary/90 text-sm leading-tight">{section.title}</h3>
              </div>
              <div className="flex flex-col">
                {section.flattenedLessons.map((fl) => {
                  const isActive = activeLessonDetails?.id === fl.id;
                  return (
                    <button
                      key={fl.id}
                      onClick={() => {
                        router.push(`/courses/${course.id}/learn?lessonId=${fl.id}`);
                        if (window.innerWidth < 768) setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-start gap-3 p-4 text-left transition-colors border-l-2 
                        ${isActive 
                           ? 'bg-primary/10 border-primary cursor-default' 
                           : 'border-transparent hover:bg-surface/50 cursor-pointer'}
                      `}
                    >
                      <div className="mt-0.5 shrink-0">
                        {fl.isCompleted ? (
                          <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-cyan-400'}`} />
                        ) : fl.lesson.type === 'video' ? (
                          <PlayCircle className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-text-primary/40'}`} />
                        ) : (
                          <FileText className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-text-primary/40'}`} />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <span className={`text-sm tracking-wide truncate ${isActive ? 'text-white font-bold' : fl.isCompleted ? 'text-text-primary/60 font-medium' : 'text-text-primary/80 font-medium'}`}>
                          {fl.lesson.title}
                        </span>
                        <span className={`text-[10px] font-mono mt-1 ${isActive ? 'text-primary/80' : 'text-text-primary/40'}`}>
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
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative">
        {/* Header */}
        <header className="h-16 border-b border-border/50 bg-surface/30 flex items-center px-4 md:px-8 justify-between shrink-0">
           <div className="flex items-center">
             {!isSidebarOpen && (
               <button 
                 onClick={() => setIsSidebarOpen(true)}
                 className="hidden md:flex text-text-primary/50 hover:text-white mr-4 transition-colors"
               >
                 <Menu className="w-5 h-5" />
               </button>
             )}
             {activeLessonDetails && (
                <div className="hidden sm:block">
                  <span className="text-xs font-bold text-text-primary/40 font-mono tracking-widest uppercase">
                    {activeLessonDetails.sectionId} • Section
                  </span>
                  <span className="mx-2 text-text-primary/30">/</span>
                  <span className="text-xs font-bold text-white tracking-widest uppercase">
                    Lesson {activeLessonDetails.lessonIndex + 1}
                  </span>
                </div>
             )}
           </div>
           
           <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToLesson(activeLessonIndex - 1)}
                disabled={!prevLessonAvailable}
                className="text-xs font-bold uppercase tracking-wider h-8 px-3"
              >
                <ChevronLeft className="w-4 h-4 md:mr-1" />
                <span className="hidden md:inline">Previous</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToLesson(activeLessonIndex + 1)}
                disabled={!nextLessonAvailable}
                className="text-xs font-bold uppercase tracking-wider h-8 px-3"
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-4 h-4 md:ml-1" />
              </Button>
           </div>
        </header>

        {/* Lesson View */}
        {activeLessonDetails && (
          <div className="flex-1 overflow-y-auto">
             <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 w-full">
               
               {/* "Player" Mock */}
               <div className="w-full aspect-video bg-surface/50 border border-border/50 rounded-2xl mb-8 flex items-center justify-center shadow-xl shadow-background/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-cyan-500/5 mix-blend-overlay"></div>
                  {activeLessonDetails.lesson.type === 'video' ? (
                     <MonitorPlay className="w-16 h-16 text-text-primary/20 group-hover:text-primary transition-colors duration-500" />
                  ) : (
                     <FileText className="w-16 h-16 text-text-primary/20 group-hover:text-primary transition-colors duration-500" />
                  )}
               </div>

               {/* Lesson Info & Actions */}
               <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
                 <div className="flex-1">
                   <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                     {activeLessonDetails.lesson.title}
                   </h1>
                   <div className="flex items-center gap-4 text-sm font-bold tracking-wider text-text-primary/50 uppercase">
                     <span className="flex items-center gap-1.5">
                       {activeLessonDetails.lesson.type === 'video' ? (
                         <><PlayCircle className="w-4 h-4 text-cyan-400" /> Video</>
                       ) : (
                         <><FileText className="w-4 h-4 text-cyan-400" /> Reading</>
                       )}
                     </span>
                     <span>•</span>
                     <span className="font-mono">{activeLessonDetails.lesson.duration}</span>
                   </div>
                 </div>

                 <div className="shrink-0 flex items-center">
                   <Button
                     onClick={handleMarkComplete}
                     disabled={activeLessonDetails.isCompleted || markingComplete}
                     className={`w-full md:w-auto py-6 px-8 text-sm font-bold tracking-widest uppercase transition-all ${
                       activeLessonDetails.isCompleted 
                         ? 'bg-success/20 text-success border-transparent opacity-100' 
                         : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                     }`}
                   >
                     {activeLessonDetails.isCompleted ? (
                       <>
                         <CheckCircle2 className="w-5 h-5 mr-2" />
                         Completed ✓
                       </>
                     ) : markingComplete ? (
                       <>
                         <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                         Updating...
                       </>
                     ) : (
                       'Mark Complete'
                     )}
                   </Button>
                 </div>
               </div>
               
               {/* Description / Content Stub */}
               <div className="prose prose-invert max-w-none prose-p:text-text-primary/80 prose-p:leading-relaxed prose-headings:text-white prose-a:text-primary">
                 <p>
                   In this {activeLessonDetails.lesson.type}, we explore the fundamental concepts behind <strong>{activeLessonDetails.lesson.title}</strong>. 
                   Make sure to follow along and complete any exercises referenced in the material.
                 </p>
                 <p>
                   If you run into any issues or have questions, consult the course forum or refer to the supplementary materials included in the course dashboard.
                   Once you are finished absorbing the contents of this lesson, click the <em>Mark Complete</em> button above to lock in your progress and naturally proceed to the next module. 
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
  // Suspend to handle useSearchParams safely
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    }>
      <LearnClientContent {...props} />
    </Suspense>
  );
}
