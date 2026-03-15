import type { Metadata } from "next";
import { APP_NAME } from "@/config/app";

export const metadata: Metadata = {
  title: {
    template: `%s — ${APP_NAME}`,
    default: APP_NAME,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand mark */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-lg">
            3Q
          </div>
          <div>
            <p className="font-display text-xl font-bold">Three Queens Chess Club</p>
            <p className="text-sm text-muted-foreground">
              Play, learn, and grow with confidence.
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
