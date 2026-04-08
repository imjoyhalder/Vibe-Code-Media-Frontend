// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";

// interface ProjectCardProps {
//   project: {
//     id: string;
//     title: string;
//     description: string;
//     screenshot: string;
//     createdAt: string;
//     author: {
//       name: string;
//     };
//     tags: Array<{ id: string; name: string }>;
//     comments: Array<{ id: string }>;
//     ratings: Array<{
//       vibes: number;
//       creativity: number;
//       usefulness: number;
//       cursedness: number;
//     }>;
//   };
// }

// export default function ProjectCard({ project }: ProjectCardProps) {
//   const calculateVibeScore = (ratings: any[]) => {
//     if (!ratings || ratings.length === 0) return "0.0";
//     const total = ratings.reduce((acc, curr) => {
//       const avg =
//         (curr.vibes +
//           curr.creativity +
//           curr.usefulness +
//           curr.cursedness) /
//         4;
//       return acc + avg;
//     }, 0);
//     return (total / ratings.length).toFixed(1);
//   };

//   const vibeScore = calculateVibeScore(project.ratings);

//   return (
//     <Link href={`/project/${project.id}`}>
//       <Card className="group cursor-pointer overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
        
//         {/* IMAGE */}
//         {project.screenshot ? (
//           <div className="relative w-full aspect-video overflow-hidden">
//             <Image
//               src={project.screenshot}
//               alt={project.title}
//               fill
//               className="object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//         ) : (
//           <div className="flex h-44 items-center justify-center bg-muted text-muted-foreground">
//             No preview available
//           </div>
//         )}

//         {/* CONTENT */}
//         <CardContent className="p-5">
          
//           {/* AUTHOR + DATE */}
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-9 h-9 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
//               {project.author.name.charAt(0)}
//             </div>

//             <div className="text-sm text-gray-600">
//               <p className="font-medium text-gray-800">
//                 {project.author.name}
//               </p>
//               <p className="text-xs">
//                 {new Date(project.createdAt).toDateString()}
//               </p>
//             </div>
//           </div>

//           {/* TITLE */}
//           <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-purple-600 transition">
//             {project.title}
//           </h2>

//           {/* DESCRIPTION */}
//           <p className="text-sm text-gray-500 line-clamp-2 mb-3">
//             {project.description}
//           </p>

//           {/* TAGS */}
//           <div className="flex flex-wrap gap-2 mb-4">
//             {project.tags?.map((tag) => (
//               <span
//                 key={tag.id}
//                 className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md"
//               >
//                 #{tag.name}
//               </span>
//             ))}
//           </div>

//           {/* FOOTER */}
//           <div className="flex items-center justify-between text-sm text-gray-500">
            
//             {/* REACTIONS (fake UI like dev.to) */}
//             <div className="flex items-center gap-3">
//               <span>❤️ 12</span>
//               <span>💬 {project?.comments.length}</span>
//             </div>

//             {/* VIBE SCORE */}
//             <div className="font-semibold text-purple-600">
//               ⭐ {vibeScore}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    screenshot: string;
    createdAt: string;
    author: {
      name: string;
      avatarUrl?: string | null;
    };
    tags: Array<{ id: string; name: string }>;
    comments: Array<{ id: string }>;
    ratings: Array<{
      vibes: number;
      creativity: number;
      usefulness: number;
      cursedness: number;
    }>;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const calculateVibeScore = (ratings: any[]) => {
    if (!ratings || ratings.length === 0) return "0.0";
    const total = ratings.reduce((acc, curr) => {
      const avg = (curr.vibes + curr.creativity + curr.usefulness + curr.cursedness) / 4;
      return acc + avg;
    }, 0);
    return (total / ratings.length).toFixed(1);
  };

  const vibeScore = calculateVibeScore(project.ratings);
  

  return (
    <Link href={`/project/${project.id}`} className="block h-full">
      <Card className="group relative h-full flex flex-col overflow-hidden border-border/50 bg-card hover:bg-accent/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
        
        {/* IMAGE SECTION */}
        <div className="relative w-full aspect-video overflow-hidden">
          {project.screenshot ? (
            <>
              <Image
                src={project.screenshot}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Vibe Score Overlay */}
              <div className="absolute top-3 right-3 z-10">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  {vibeScore}
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/50 text-muted-foreground italic text-sm">
              No preview available
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        <CardContent className="p-5 flex flex-col flex-1">
          
          {/* AUTHOR INFO */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative size-9 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-purple-500 animate-pulse opacity-50 blur-[2px]" />
              <div className="relative size-full rounded-full bg-secondary flex items-center justify-center border border-border overflow-hidden">
                {project.author.avatarUrl ? (
                   <Image src={project.author.avatarUrl} alt={project.author.name} fill className="object-cover" />
                ) : (
                  <span className="text-sm font-bold text-foreground">
                    {project.author.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate leading-tight">
                {project.author.name}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                {new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* TITLE & DESCRIPTION */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-card-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* TAGS */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag.id} 
                  variant="secondary" 
                  className="text-[10px] font-medium bg-secondary/50 hover:bg-secondary text-secondary-foreground border-none"
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}

          {/* FOOTER STATS */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors">
                <Heart className="size-4" />
                <span className="text-xs font-medium">12</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <MessageSquare className="size-4" />
                <span className="text-xs font-medium">{project?.comments.length}</span>
              </div>
            </div>
            
            <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
              Vibecode Proj
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}