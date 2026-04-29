"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Terminal, CheckCircle, ChevronRight } from "lucide-react";

/* ── Static problem set ──────────────────────────────────────── */
const PROBLEMS = [
  {
    id: "p1",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    starterCode: `function twoSum(nums, target) {\n  // Your solution here\n  \n}`,
  },
  {
    id: "p2",
    title: "Reverse String",
    difficulty: "Easy",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    starterCode: `function reverseString(s) {\n  // Your solution here\n  \n}`,
  },
  {
    id: "p3",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    starterCode: `function isValid(s) {\n  // Your solution here\n  \n}`,
  },
  {
    id: "p4",
    title: "Merge Sorted Arrays",
    difficulty: "Medium",
    description: "You are given two integer arrays sorted in ascending order. Merge them into a single sorted array.",
    starterCode: `function mergeSorted(arr1, arr2) {\n  // Your solution here\n  \n}`,
  },
  {
    id: "p5",
    title: "Binary Search",
    difficulty: "Medium",
    description: "Given a sorted array of integers, implement binary search to find the index of a target value.",
    starterCode: `function binarySearch(nums, target) {\n  // Your solution here\n  \n}`,
  },
];

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: "bg-success/10 text-success border-success/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Hard: "bg-danger/10 text-danger border-danger/20",
};

export function CloudLabClient() {
  const [selectedProblem, setSelectedProblem] = useState(PROBLEMS[0]);
  const [code, setCode] = useState(PROBLEMS[0].starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleSelectProblem = (problem: typeof PROBLEMS[0]) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setOutput(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    // Mock execution delay
    await new Promise((r) => setTimeout(r, 1500));
    setOutput("✓ All test cases passed! (mock)");
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Problem List */}
      <div className="w-full xl:w-80 shrink-0 space-y-3">
        <h2 className="text-xs font-bold text-text-primary/50 tracking-[0.2em] uppercase mb-4">
          Practice Problems
        </h2>
        {PROBLEMS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectProblem(p)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedProblem.id === p.id
                ? "bg-primary/10 border-primary/30"
                : "bg-surface/40 border-border/40 hover:bg-surface/60 hover:border-border"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-bold ${selectedProblem.id === p.id ? "text-primary" : "text-white"}`}>
                {p.title}
              </span>
              <ChevronRight className={`w-4 h-4 ${selectedProblem.id === p.id ? "text-primary" : "text-text-primary/30"}`} />
            </div>
            <Badge className={`text-[9px] font-bold tracking-wider border ${DIFFICULTY_STYLES[p.difficulty]}`}>
              {p.difficulty}
            </Badge>
          </button>
        ))}
      </div>

      {/* Editor Area */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Problem Description */}
        <Card className="bg-surface/50 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Terminal className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-white">{selectedProblem.title}</h2>
              <Badge className={`text-[9px] font-bold tracking-wider border ${DIFFICULTY_STYLES[selectedProblem.difficulty]}`}>
                {selectedProblem.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-text-primary/60 leading-relaxed">
              {selectedProblem.description}
            </p>
          </CardContent>
        </Card>

        {/* Code Editor */}
        <Card className="bg-surface/50 border-border/50">
          <CardContent className="p-0">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                <span className="text-xs text-text-primary/40 ml-2 font-mono">solution.js</span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleRun}
                disabled={isRunning}
                className="gap-2 shadow-md border-transparent"
              >
                {isRunning ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" /> Run Code
                  </>
                )}
              </Button>
            </div>

            {/* Textarea Editor */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full min-h-[300px] bg-[#0D1117] text-text-primary font-mono text-sm p-4 resize-y focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </CardContent>
        </Card>

        {/* Output Panel */}
        {output !== null && (
          <Card className="bg-surface/50 border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success shrink-0" />
              <span className="text-sm font-mono text-success">{output}</span>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
