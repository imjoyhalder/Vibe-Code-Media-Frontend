"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DashboardSidebar } from "./DashboardSidebar";
import { Menu } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <DashboardSidebar isOpen={true} onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}