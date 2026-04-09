"use client";

import { Metadata } from "next";
import { DashboardSidebar } from "@/components/common/DashboardSidebar";
import { MobileNav } from "@/components/common/MobileNav";

// Note: Metadata exports cannot be in client components
// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Manage your projects and profile.",
// };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar - Hidden on mobile, visible on md and up */}
      <div className="hidden md:flex">
        <DashboardSidebar isOpen={true} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header with Mobile Menu */}
        <header >
          <MobileNav />
          <div className="ml-auto flex items-center gap-4">
            {/* Additional header items can go here */}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl space-y-4 p-4 md:space-y-6 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}