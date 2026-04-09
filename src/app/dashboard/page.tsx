import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {
  LayoutGrid,
  BookOpen,
  Trophy,
  Terminal,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle,
  Award,
  Play
} from "lucide-react";

// Mock Data
const IN_PROGRESS_COURSES = [
  {
    id: "1",
    category: "ADVANCED REACT",
    title: "Mastering Concurrent Rendering and Server Components",
    description: "Architect high-performance applications using the latest React features.",
    progress: 65,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    id: "2",
    category: "DEVOPS",
    title: "Kubernetes Orchestration for Enterprise Scalability",
    description: "Deploy, scale, and manage containerized applications with K8s.",
    progress: 22,
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98a580d15ca?w=800&q=80",
  },
  {
    id: "3",
    category: "SYSTEM DESIGN",
    title: "Distributed Systems Architectures & Data Consistency",
    description: "Understanding CAP theorem, consensus algorithms, and fault-tolerance.",
    progress: 89,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  }
];

const COMPLETED_COURSES = [
  {
    id: "101",
    category: "FUNDAMENTALS",
    title: "The Modern Web Developer's Toolchain v2",
    issued: "March 12, 2024",
    grade: "A+",
  },
  {
    id: "102",
    category: "SECURITY",
    title: "Application Security & Pentesting for Architects",
    issued: "January 28, 2024",
    grade: "A",
  }
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const userName = session.user?.name || session.user?.email?.split('@')[0] || "User";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-surface/50 hidden md:flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <img src="https://i.pravatar.cc/100" alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-text-primary line-clamp-1">
              DevLearn Dashboard
            </span>
            <span className="text-xs text-text-primary/50">v2.4.0</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-primary/70 hover:text-text-primary hover:bg-surface transition-colors">
            <LayoutGrid className="w-5 h-5" />
            <span className="text-sm font-medium">Overview</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary bg-primary/10 transition-colors">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">My Courses</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-primary/70 hover:text-text-primary hover:bg-surface transition-colors">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-medium">Achievements</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-primary/70 hover:text-text-primary hover:bg-surface transition-colors">
            <Terminal className="w-5 h-5" />
            <span className="text-sm font-medium">Cloud Lab</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-primary/70 hover:text-text-primary hover:bg-surface transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <Card className="bg-surface/80 border-border mb-6">
            <CardContent className="p-4 pt-5">
              <p className="text-xs font-bold text-text-primary/60 mb-2 tracking-wider">DEVLEARN PRO</p>
              <Button variant="primary" className="w-full shadow-md border-transparent">
                UPGRADE TO PRO
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-1">
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary/60 hover:text-text-primary transition-colors">
              <HelpCircle className="w-4 h-4" /> Help Center
            </Link>
            <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary/60 hover:text-text-primary transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </Link>
          </div>
        </div>
      </aside>

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
                8 ACTIVE COURSES
              </Badge>
              <span className="text-text-primary/60 text-sm italic">
                You're in the top 5% of learners this week.
              </span>
            </div>
          </div>

          <div className="flex bg-surface/30 rounded-2xl border border-border/50 divide-x divide-border/50 p-6 shadow-sm">
            <div className="px-6 flex flex-col justify-center text-center">
              <span className="text-[10px] font-bold text-text-primary/50 tracking-wider mb-1">ENROLLED</span>
              <span className="text-3xl font-bold text-text-primary">12</span>
            </div>
            <div className="px-6 flex flex-col justify-center text-center">
              <span className="text-[10px] font-bold text-text-primary/50 tracking-wider mb-1">HOURS</span>
              <span className="text-3xl font-bold text-text-primary">142</span>
            </div>
            <div className="px-6 flex flex-col justify-center text-center">
              <span className="text-[10px] font-bold text-text-primary/50 tracking-wider mb-1">STREAK</span>
              <span className="text-3xl font-bold text-cyan-400">18 <span className="text-sm font-bold text-cyan-400/50">DAYS</span></span>
            </div>
          </div>
        </div>

        {/* In Progress Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              <h2 className="text-2xl font-bold text-text-primary">In Progress</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-text-primary/50">
              <button className="hover:text-text-primary transition-colors">VIEW ALL</button>
              <button className="hover:text-text-primary transition-colors">SCHEDULE</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IN_PROGRESS_COURSES.map((course) => (
              <Card key={course.id} className="group overflow-hidden bg-surface/80 hover:bg-surface border-border flex flex-col transition-all hover:border-primary/50">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-background/80 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold tracking-wider rounded-sm rounded-tr-xl">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-80 z-0 group-hover:opacity-90 transition-opacity duration-500"></div>
                  <img src={course.imageUrl} alt={course.title} className="object-cover w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <CardContent className="flex flex-col flex-grow p-6 pt-5">
                  <h3 className="font-bold text-lg leading-tight text-white mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-text-primary/60 line-clamp-2 mb-6">{course.description}</p>
                  
                  <div className="mt-auto pt-2 border-t border-border/50">
                    <div className="flex justify-between items-center text-xs mb-2 mt-2">
                      <span className="text-text-primary/50 font-bold tracking-wider">PROGRESS</span>
                      <span className="text-primary font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-background border border-border/50 rounded-full overflow-hidden mb-6">
                      <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <Button variant="primary" className="w-full shadow-md border-transparent">
                      Resume <Play className="w-3 h-3 ml-2 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Completed Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-cyan-400 rounded-full"></div>
            <h2 className="text-2xl font-bold text-text-primary">Completed</h2>
          </div>

          <div className="space-y-4">
            {COMPLETED_COURSES.map((course) => (
              <Card key={course.id} className="bg-surface/50 border-border/50 hover:bg-surface transition-colors flex flex-col sm:flex-row items-center p-5 gap-6">
                <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center flex-shrink-0 border border-border/60 shadow-sm">
                  <CheckCircle className="w-6 h-6 text-cyan-400" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="text-[10px] font-bold text-text-primary/50 tracking-widest uppercase">
                      {course.category}
                    </span>
                    <Badge className="bg-cyan-400/10 text-cyan-400 text-[9px] font-bold px-1.5 py-0 border-transparent h-4 rounded-sm">
                      COMPLETED
                    </Badge>
                  </div>
                  <h3 className="font-bold text-white text-lg">{course.title}</h3>
                  <p className="text-xs font-mono text-text-primary/50 mt-1">
                    Issued on {course.issued} • Grade: {course.grade}
                  </p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex-shrink-0 w-full sm:w-auto">
                  <Button variant="ghost" className="w-full sm:w-auto text-primary hover:text-primary hover:bg-primary/10 gap-2 font-medium border-transparent">
                    <Award className="w-4 h-4" /> View Certificate
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
