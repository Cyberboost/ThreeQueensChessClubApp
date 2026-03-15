import type { Metadata } from "next";
import { Shield, Users, Settings, PlusCircle } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { getChildProfilesByGuardian } from "@/lib/db/queries";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { SKILL_LEVEL_CONFIG } from "@/config/app";

export const metadata: Metadata = {
  title: "Parent Controls",
};

export default async function ParentPage() {
  const { dbUser } = await requireAuth();
  const childProfiles = await getChildProfilesByGuardian(dbUser.id);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Parent Controls"
        description="Manage player profiles and safety settings for the players in your account."
        action={
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Player
          </Button>
        }
      />

      {/* Child profiles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Player Profiles</h3>
        {childProfiles.length === 0 ? (
          <EmptyState
            icon={<Users className="h-6 w-6" />}
            title="No players yet"
            description="Add profiles for the players you&apos;re managing."
            action={
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add First Player
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {childProfiles.map((profile) => {
              const levelConfig = profile.ratingProfile
                ? SKILL_LEVEL_CONFIG[profile.ratingProfile.currentLevel]
                : null;

              return (
                <Card key={profile.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-xl">
                        ♛
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{profile.displayName}</CardTitle>
                        {levelConfig && (
                          <Badge
                            variant="secondary"
                            className="mt-1 text-xs"
                            style={{ color: levelConfig.color }}
                          >
                            {levelConfig.label}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" disabled>
                        <Settings className="mr-1.5 h-3.5 w-3.5" />
                        Settings
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        View Stats
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Safety settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Safety &amp; Settings</h3>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-start gap-4 py-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Guardian Controls</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Set daily play limits, manage communication permissions, and review activity. Full
                parental controls are coming in the next release.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
