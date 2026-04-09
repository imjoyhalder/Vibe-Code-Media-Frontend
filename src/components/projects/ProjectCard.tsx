
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/common/UserAvatar";

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

interface ratings {
  vibes: number;
  creativity: number;
  usefulness: number;
  cursedness: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const calculateVibeScore = (ratings: ratings[] = []) => {
    if (!ratings || ratings.length === 0) return "0.0";
    const total = ratings.reduce((acc, curr) => {
      const avg = (curr.vibes + curr.creativity + curr.usefulness + curr.cursedness) / 4;
      return acc + avg;
    }, 0);
    return (total / ratings.length).toFixed(1);
  };

  const vibeScore = Number(calculateVibeScore(project.ratings));
  

  return (
    <Link href={`/project/${project.id}`} className="block h-full">
      <Card className="group relative h-full flex flex-col overflow-hidden border-border/50 bg-card hover:bg-accent/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
        
        {/* IMAGE SECTION */}
        {/* <div className="relative w-full aspect-video overflow-hidden">
          {project.screenshot ? (
            <>
              <Image
                src={project.screenshot}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              

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
        </div> */}

        {/* CONTENT SECTION */}
        <CardContent className="p-5 flex flex-col flex-1">
          
          {/* AUTHOR INFO */}
          <div className="flex items-center gap-3 mb-4">
            <UserAvatar
              name={project.author.name}
              avatarUrl={project.author.avatarUrl}
              size="sm"
              showGradient={true}
            />

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
          {project.tags?.length > 0 && (
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
                <span className="text-xs font-medium">{project?.comments?.length ?? 0}</span>
              </div>
            </div>
            
            <div className="text-[10px] text-2xl font-bold text-muted-foreground/60 uppercase tracking-widest">
              <h1 className="text-sm font-bold">Rating ✨{vibeScore}</h1>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}