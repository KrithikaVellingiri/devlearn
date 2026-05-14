import React from "react";
import { Code2, TrendingUp, Map, Sparkles } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Learn by Building",
    description:
      "Every course includes hands-on projects. Write real code, solve real problems, and build a portfolio that proves your skills.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20",
  },
  {
    icon: TrendingUp,
    title: "Track Your Growth",
    description:
      "Visualize your progress with streaks, achievements, and detailed analytics. See exactly how far you've come.",
    color: "text-[#5A4AF4]",
    bgColor: "bg-[#5A4AF4]/10",
    borderColor: "border-[#5A4AF4]/20",
  },
  {
    icon: Map,
    title: "Structured Learning Paths",
    description:
      "Follow curated curricula designed by engineers. No guesswork — just a clear path from fundamentals to mastery.",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20",
  },
  {
    icon: Sparkles,
    title: "Modern Learning Experience",
    description:
      "A platform built with the same attention to detail you'd expect from the tools you use every day. Fast, clean, and focused.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/20",
  },
];

export const WhyDevLearnSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
          Built for developers
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary tracking-tight mt-3 mb-4">
          Why DevLearn?
        </h2>
        <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          A learning platform designed around how developers actually learn — through practice, feedback, and structured progression.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className={`group bg-surface/40 border ${feature.borderColor} rounded-2xl p-8 hover:bg-surface/60 hover:scale-[1.02] transition-all duration-300 cursor-default`}
            >
              <div
                className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-base font-bold text-text-primary mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
