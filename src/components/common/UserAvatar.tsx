// "use client";

// import * as React from "react";
// import Image from "next/image";
// import { cn } from "@/lib/utils";

// interface UserAvatarProps {
//   name: string;
//   avatarUrl?: string | null;
//   size?: "xs" | "sm" | "md" | "lg" | "xl";
//   className?: string;
//   showBorder?: boolean;
//   showGradient?: boolean;
// }

// const sizeClasses = {
//   xs: "size-6",
//   sm: "size-8",
//   md: "size-10",
//   lg: "size-12",
//   xl: "size-16",
// };

// const textSizeClasses = {
//   xs: "text-xs",
//   sm: "text-sm",
//   md: "text-sm",
//   lg: "text-base",
//   xl: "text-lg",
// };

// export function UserAvatar({
//   name,
//   avatarUrl,
//   size = "md",
//   className,
//   showBorder = false,
//   showGradient = false,
// }: UserAvatarProps) {
//   const sizeClass = sizeClasses[size];
//   const textSizeClass = textSizeClasses[size];

//   return (
//     <div className={cn("relative flex-shrink-0", sizeClass, className)}>
//       {showGradient && (
//         <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 animate-pulse opacity-50 blur-[2px]" />
//       )}
//       <div
//         className={cn(
//           "relative size-full rounded-full bg-secondary flex items-center justify-center border overflow-hidden",
//           showBorder && "border-primary/20",
//           showGradient && "border-border/50"
//         )}
//       >
//         {avatarUrl ? (
//           <Image
//             src={avatarUrl}
//             alt={name}
//             fill
//             className="object-cover"
//             sizes={`${size === "xs" ? 24 : size === "sm" ? 32 : size === "md" ? 40 : size === "lg" ? 48 : 64}px`}
//           />
//         ) : (
//           <span className={cn("font-bold text-foreground", textSizeClass)}>
//             {name.charAt(0).toUpperCase()}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

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
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const textSizeClasses = {
  xs: "text-[10px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-xl",
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

  
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?";

  return (
    <div className={cn("relative flex-shrink-0 group", sizeClass, className)}>
     
      {showGradient && (
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-primary via-purple-500 to-blue-500 opacity-75 blur-[1px] group-hover:opacity-100 transition duration-500" />
      )}
      
      <div
        className={cn(
          "relative h-full w-full rounded-full flex items-center justify-center overflow-hidden transition-all",
          
          "bg-muted border border-border/50",
          showBorder && "border-primary/40 shadow-sm",
          showGradient && "border-transparent bg-background p-[1.5px]" // গ্রেডিয়েন্ট থাকলে ইনসেট লুক
        )}
      >
        <div className="relative h-full w-full rounded-full overflow-hidden flex items-center justify-center bg-secondary">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <span className={cn(
              "font-bold tracking-tighter select-none",
              "text-muted-foreground group-hover:text-primary transition-colors",
              textSizeClass
            )}>
              {initials}
            </span>
          )}
        </div>
      </div>

     
      <div className="absolute bottom-0 right-0 h-[25%] w-[25%] rounded-full border-2 border-background bg-emerald-500 shadow-sm" />
    </div>
  );
}