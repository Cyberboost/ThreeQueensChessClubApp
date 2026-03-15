import type { Metadata } from "next";
import { Swords, Users, Clock } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Play",
};

export default async function PlayPage() {
  await requireAuth();

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Player vs Player"
        description="Challenge a friend or join the matchmaking queue."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick match */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Quick Match</CardTitle>
              <Badge variant="emerald">Coming Soon</Badge>
            </div>
            <CardDescription>
              Get matched with a player at your skill level. Fast, fun, and fair.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full" size="lg">
              <Users className="mr-2 h-5 w-5" />
              Find a Match
            </Button>
          </CardContent>
        </Card>

        {/* Challenge a friend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Swords className="h-5 w-5 text-primary" />
              Challenge a Friend
            </CardTitle>
            <CardDescription>
              Send a challenge invite to someone you know.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled className="w-full">
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active games placeholder */}
      <div className="space-y-4">
        <SectionHeader title="Active Games" />
        <EmptyState
          icon={<Clock className="h-6 w-6" />}
          title="No active games"
          description="Start a match to see it here."
        />
      </div>
    </div>
  );
}
