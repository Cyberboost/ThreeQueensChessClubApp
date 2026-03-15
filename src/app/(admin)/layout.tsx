import { requireAdmin } from "@/lib/auth";

// Admin routes are always rendered dynamically
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="flex h-full w-56 flex-col border-r bg-card">
        <div className="flex h-16 items-center gap-3 border-b px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive text-white font-bold text-xs">
            A
          </div>
          <span className="font-semibold text-sm">Admin Panel</span>
        </div>
        <nav className="flex-1 p-3 space-y-1 text-sm text-muted-foreground">
          <a href="/admin" className="block rounded-lg px-3 py-2 hover:bg-muted">
            Dashboard
          </a>
          <a href="/admin/users" className="block rounded-lg px-3 py-2 hover:bg-muted">
            Users
          </a>
          <a href="/admin/moderation" className="block rounded-lg px-3 py-2 hover:bg-muted">
            Moderation
          </a>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
