import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/config/app";

export const metadata: Metadata = {
  title: "Get Started",
};

export default async function OnboardingPage() {
  await requireAuth();

  return (
    <Card className="shadow-xl rounded-2xl border">
      <CardHeader className="text-center">
        <CardTitle className="font-display text-2xl">Welcome to Three Queens!</CardTitle>
        <CardDescription className="text-base">
          Let&apos;s set up your guardian account so you can create profiles for your players.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-sm text-center">
          <p className="font-medium text-foreground">You&apos;re almost ready!</p>
          <p className="text-muted-foreground mt-1">
            As a guardian, you&apos;ll create and manage chess profiles for the girls in your life.
          </p>
        </div>
        <Button asChild className="w-full" size="lg">
          <Link href={ROUTES.dashboard}>
            Go to Dashboard
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
