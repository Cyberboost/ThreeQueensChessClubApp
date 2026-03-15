import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db/prisma";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [userCount, profileCount, matchCount, openModerationCount] = await Promise.all([
    prisma.user.count(),
    prisma.childProfile.count({ where: { isActive: true } }),
    prisma.match.count(),
    prisma.moderationEvent.count({ where: { status: "OPEN" } }),
  ]);

  const stats = [
    { label: "Guardians", value: userCount },
    { label: "Child Profiles", value: profileCount },
    { label: "Total Matches", value: matchCount },
    { label: "Open Moderation", value: openModerationCount },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader title="Admin Dashboard" description="Platform overview and moderation." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="py-5 text-center">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
