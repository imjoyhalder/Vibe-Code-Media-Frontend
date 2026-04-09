"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showBorder?: boolean;
  showGradient?: boolean;
}

const sizeClasses = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-16",
};

const textSizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export function UserAvatar({
  name,
  avatarUrl,
  size = "md",
  className,
  showBorder = false,
  showGradient = false,
}: UserAvatarProps) {
  const sizeClass = sizeClasses[size];
  const textSizeClass = textSizeClasses[size];

  return (
    <div className={cn("relative flex-shrink-0", sizeClass, className)}>
      {showGradient && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 animate-pulse opacity-50 blur-[2px]" />
      )}
      <div
        className={cn(
          "relative size-full rounded-full bg-secondary flex items-center justify-center border overflow-hidden",
          showBorder && "border-primary/20",
          showGradient && "border-border/50"
        )}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-cover"
            sizes={`${size === "xs" ? 24 : size === "sm" ? 32 : size === "md" ? 40 : size === "lg" ? 48 : 64}px`}
          />
        ) : (
          <span className={cn("font-bold text-foreground", textSizeClass)}>
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}