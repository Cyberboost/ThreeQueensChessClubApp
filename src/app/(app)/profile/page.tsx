import type { Metadata } from "next";
import { Trophy, Star, Clock, TrendingUp } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { getChildProfilesByGuardian } from "@/lib/db/queries";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { SKILL_LEVEL_CONFIG } from "@/config/app";

export const metadata: Metadata = {
  title: "Profile & Achievements",
};

export default async function ProfilePage() {
  const { dbUser } = await requireAuth();
  const childProfiles = await getChildProfilesByGuardian(dbUser.id);

  if (childProfiles.length === 0) {
    return (
      <div className="space-y-6">
        <SectionHeader title="Profile" description="Your player stats and achievements." />
        <EmptyState
          icon={<Trophy className="h-6 w-6" />}
          title="No profiles yet"
          description="Create a player profile to start tracking achievements and progress."
        />
      </div>
    );
  }

  const profile = childProfiles[0];
  const levelConfig = profile.ratingProfile
    ? SKILL_LEVEL_CONFIG[profile.ratingProfile.currentLevel]
    : null;

  return (
    <div className="space-y-8">
      <SectionHeader title="Profile" description="Stats, level, and achievements." />

      {/* Profile header */}
      <Card>
        <CardContent className="flex items-center gap-6 py-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-4xl">
            ♛
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">{profile.displayName}</h2>
              {levelConfig && (
                <Badge
                  className="text-white"
                  style={{ backgroundColor: levelConfig.color }}
                >
                  {levelConfig.label}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-muted-foreground text-sm">
              Rating: {profile.ratingProfile?.internalRating?.toFixed(0) ?? "—"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold">{profile.ratingProfile?.gamesPlayed ?? 0}</p>
            <p className="mt-1 text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Clock className="h-3 w-3" /> Games Played
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-emerald-600">{profile.ratingProfile?.gamesWon ?? 0}</p>
            <p className="mt-1 text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Star className="h-3 w-3" /> Wins
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-rose-500">{profile.ratingProfile?.gamesLost ?? 0}</p>
            <p className="mt-1 text-xs text-muted-foreground">Losses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-3xl font-bold text-amber-500">{profile.ratingProfile?.gamesDrawn ?? 0}</p>
            <p className="mt-1 text-xs text-muted-foreground">Draws</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements placeholder */}
      <div className="space-y-4">
        <SectionHeader
          title="Achievements"
          description="Badges and milestones earned on your journey."
        />
        <EmptyState
          icon={<TrendingUp className="h-6 w-6" />}
          title="No achievements yet"
          description="Play games and complete training to unlock achievements."
        />
      </div>
    </div>
  );
}
