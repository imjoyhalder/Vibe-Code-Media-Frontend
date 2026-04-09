"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar1";
import { Footer } from "./footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
       
      <main className="flex-1 px-4 md:px-6 lg:px-10 mb-10">
        {children}
      </main>
      
      {!isDashboard && <Footer />}
    </>
  );
}