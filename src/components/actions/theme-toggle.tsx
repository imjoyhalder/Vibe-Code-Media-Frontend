'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { setThemeAction } from "./actions";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = async () => {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";

    // 1. Immediate UI update
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);

    // 2. Sync with Cookie
    await setThemeAction(newTheme);

    // 3. Refresh Server Components
    router.refresh();
  };

  if (!mounted) return <div className="p-2 h-9 w-9" />; // Placeholder to avoid layout shift

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex items-center justify-center rounded-md p-2",
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      aria-label="Toggle theme"
    >
      {/* Sun Icon: Visible in Light, Hidden/Rotated in Dark */}
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      
      {/* Moon Icon: Hidden/Rotated in Light, Visible in Dark */}
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}