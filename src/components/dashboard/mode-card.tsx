import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  accentColor: string;
  badge?: string;
  disabled?: boolean;
  className?: string;
}

export function ModeCard({
  title,
  description,
  icon,
  href,
  accentColor,
  badge,
  disabled,
  className,
}: ModeCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-200 hover:shadow-lg",
        disabled && "opacity-60 pointer-events-none",
        className,
      )}
    >
      {/* Accent line */}
      <div className="absolute left-0 top-0 h-1 w-full" style={{ backgroundColor: accentColor }} />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            {icon}
          </div>
          {badge && (
            <span
              className="rounded-full px-2 py-0.5 text-xs font-semibold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {badge}
            </span>
          )}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <Button asChild variant="ghost" className="group/btn w-full justify-between px-0 hover:bg-transparent" style={{ color: accentColor }}>
          <Link href={href}>
            <span className="font-medium">Start playing</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
