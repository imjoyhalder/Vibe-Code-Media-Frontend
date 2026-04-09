
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Activity,
  Users,
  Settings,
  LogOut,
  Plus,
  X,
  Menu
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserAvatar } from "./UserAvatar";

const navItems = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Activity", href: "/dashboard/activity", icon: Activity },
  { title: "Team", href: "/dashboard/team", icon: Users },
  { title: "Settings", href: "/dashboard/profile", icon: Settings },
];

export function DashboardSidebar({ isOpen = true, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden" 
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 md:top-16 z-40 flex h-screen w-64 flex-col border-r bg-card text-card-foreground transition-transform duration-300 ease-in-out",
          !isOpen && "-translate-x-full"
        )}
      >
        {/* Logo Section */}
        {/* <div className="flex h-16 items-center justify-between border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
              <span className="text-sm font-bold text-primary-foreground">V</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Vibecode</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div> */}

        {/* Action Button */}
        <div className="px-4 py-6">
          <Button asChild className="w-full justify-start gap-2 shadow-md hover:shadow-lg transition-all" size="lg">
            <Link href="/projects/create">
              <Plus className="h-5 w-5" />
              <span className="font-semibold">Create Project</span>
            </Link>
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/10"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Section */}
        <div className="mt-auto border-t bg-muted/30 p-4">
          {user && (
            <div className="mb-4 flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent/50">
              <UserAvatar name={user.name || "User"} avatarUrl={user.avatarUrl} size="sm" />
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-bold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          )}
          {/* <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            onClick={() => {
              logout();
              onClose?.();
            }}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Button> */}
        </div>
      </aside>
    </>
  );
}