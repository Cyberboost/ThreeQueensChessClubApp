import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppNavbarProps {
  title?: string;
}

export function AppNavbar({ title }: AppNavbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {title && (
        <h1 className="text-lg font-semibold">{title}</h1>
      )}
      <div className="ml-auto flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
}
