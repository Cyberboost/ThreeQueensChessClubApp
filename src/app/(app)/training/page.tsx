import type { Metadata } from "next";
import { GraduationCap, Lightbulb, Target, BookOpen } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Training Mode",
};

const trainingModules = [
  {
    title: "Opening Principles",
    description: "Learn the fundamentals of strong opening play.",
    icon: BookOpen,
    color: "#7C3AED",
    available: false,
  },
  {
    title: "Tactics & Puzzles",
    description: "Sharpen your tactical vision with interactive puzzles.",
    icon: Target,
    color: "#DC2626",
    available: false,
  },
  {
    title: "AI Coaching",
    description: "Play a game with real-time move guidance and explanations.",
    icon: Lightbulb,
    color: "#059669",
    available: false,
  },
];

export default async function TrainingPage() {
  await requireAuth();

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Training Mode"
        description="Learn, practice, and grow with personalized AI coaching."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trainingModules.map((module) => (
          <Card key={module.title} className="group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${module.color}20`, color: module.color }}
                >
                  <module.icon className="h-5 w-5" />
                </div>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              <CardTitle className="text-base">{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                <GraduationCap className="mr-2 h-4 w-4" />
                Start Module
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">AI Training Coach</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Our AI coach will analyze your games, identify patterns, and provide personalized
                recommendations to help you improve. Powered by Stockfish and adaptive skill
                modeling.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
