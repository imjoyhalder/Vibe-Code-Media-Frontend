"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a public project page: anyone can visit it.
  // Authentication is only required to post comments or ratings.
  return <>{children}</>;
}
