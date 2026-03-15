import type { Metadata } from "next";
import { Swords, Bot, GraduationCap, Trophy, Flame } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { getChildProfilesByGuardian } from "@/lib/db/queries";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { ModeCard } from "@/components/dashboard/mode-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/app";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const { dbUser } = await requireAuth();
  const childProfiles = await getChildProfilesByGuardian(dbUser.id);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Welcome back!"
        description="Your chess club is ready to play."
        action={
          childProfiles.length === 0 ? (
            <Button asChild size="sm">
              <Link href={`${ROUTES.parent}/profiles/new`}>Add a player</Link>
            </Button>
          ) : undefined
        }
      />

      {/* Child profile empty state */}
      {childProfiles.length === 0 && (
        <EmptyState
          icon={<Swords className="h-6 w-6" />}
          title="No players yet"
          description="Add a player profile to get started. You can create one profile per player."
          action={
            <Button asChild>
              <Link href={`${ROUTES.parent}/profiles/new`}>Create first profile</Link>
            </Button>
          }
        />
      )}

      {/* Stats row */}
      {childProfiles.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Players"
            value={childProfiles.length}
            description="Active profiles"
            icon={<Trophy className="h-4 w-4" />}
          />
          <StatCard
            title="Games Played"
            value={childProfiles.reduce(
              (sum, p) => sum + (p.ratingProfile?.gamesPlayed ?? 0),
              0,
            )}
            description="Across all profiles"
            icon={<Swords className="h-4 w-4" />}
          />
          <StatCard
            title="Current Streak"
            value="—"
            description="Days active"
            icon={<Flame className="h-4 w-4" />}
          />
          <StatCard
            title="Top Level"
            value={childProfiles[0]?.ratingProfile?.currentLevel ?? "—"}
            description="Highest ranked player"
            icon={<Trophy className="h-4 w-4" />}
          />
        </div>
      )}

      {/* Mode selection */}
      <div className="space-y-4">
        <SectionHeader title="Play" description="Choose how you want to play today." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ModeCard
            title="Player vs Player"
            description="Challenge a friend or get matched with another player. Live, real-time chess."
            icon={<Swords className="h-6 w-6" />}
            href={ROUTES.play}
            accentColor="#7C3AED"
            badge="Live"
          />
          <ModeCard
            title="Play vs AI"
            description="Practice against our AI opponent. Choose your difficulty and play at your own pace."
            icon={<Bot className="h-6 w-6" />}
            href={ROUTES.playAi}
            accentColor="#2563EB"
          />
          <ModeCard
            title="Training Mode"
            description="Learn while you play with AI coaching, hints, and personalized guidance."
            icon={<GraduationCap className="h-6 w-6" />}
            href={ROUTES.training}
            accentColor="#059669"
            badge="AI-Powered"
          />
        </div>
      </div>
    </div>
  );
}
