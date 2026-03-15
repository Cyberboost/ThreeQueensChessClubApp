import type { Metadata } from "next";
import { Bot, Zap } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SKILL_LEVEL_CONFIG } from "@/config/app";
import type { SkillLevel } from "@prisma/client";

export const metadata: Metadata = {
  title: "Play vs AI",
};

const levels = Object.entries(SKILL_LEVEL_CONFIG) as [
  SkillLevel,
  (typeof SKILL_LEVEL_CONFIG)[SkillLevel],
][];

export default async function PlayAiPage() {
  await requireAuth();

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Play vs AI"
        description="Choose your challenge level and play against our AI opponent."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map(([level, config]) => (
          <Card
            key={level}
            className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <Badge variant="secondary" className="text-xs">
                  {config.minRating}–{config.maxRating === 9999 ? "∞" : config.maxRating}
                </Badge>
              </div>
              <CardTitle className="text-lg" style={{ color: config.color }}>
                {config.label}
              </CardTitle>
              <CardDescription className="text-sm">{config.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                style={{ borderColor: config.color, color: config.color }}
                disabled
              >
                <Bot className="mr-2 h-4 w-4" />
                Play as {config.label}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed bg-muted/30">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-sm">AI Opponent Coming Soon</p>
            <p className="text-sm text-muted-foreground">
              Stockfish-powered AI with adaptive difficulty. Under development.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
