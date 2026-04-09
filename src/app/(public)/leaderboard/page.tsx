"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Sparkles, Clock } from "lucide-react";
import { projectService } from "@/services/projects/project.service";
import ProjectCard from "@/components/projects/ProjectCard";
import { ProjectListSkeleton } from "@/components/projects/ProjectListSkeleton";
import { Button } from "@/components/ui/button";
import { Project } from "../project/[id]/page";

const timeRanges = [
  { label: "This Week", value: "week" as const },
  { label: "This Month", value: "month" as const },
  { label: "All Time", value: "all" as const },
];

type TimeRange = (typeof timeRanges)[number]["value"];

export default function LeaderboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      setIsLoading(true);
      const { data, error } = await projectService.getProjects({ sort: "vibeScore", limit: 36, timeRange });

      if (error) {
        setError(error);
        setProjects([]);
      } else {
        setError(null);
        setProjects(data?.data?.projects || []);
      }

      setIsLoading(false);
    };

    loadLeaderboard();
  }, [timeRange]);

  return (
    <main className="mx-auto w-full max-w-7xl pt-6 pb-10">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
            <Trophy className="h-4 w-4" />
            Leaderboard
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Top Vibes
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Browse the highest-rated community projects, ranked by average vibe score. Filter by the latest week, month, or all time.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {timeRanges.map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? "secondary" : "outline"}
              className="rounded-full px-4"
              onClick={() => setTimeRange(option.value)}
            >
              <span className="inline-flex items-center gap-2">
                {option.value === "all" ? <Sparkles className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                {option.label}
              </span>
            </Button>
          ))}
          <Button asChild variant="secondary" className="rounded-full px-5 sm:px-6">
            <Link href="/projects/new">Post Project</Link>
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-10 rounded-3xl border border-destructive/20 bg-destructive/5 p-6 text-center text-destructive">
          <p className="font-semibold">Unable to load leaderboard</p>
          <p className="mt-2 text-sm opacity-80">{error}</p>
        </div>
      )}

      {isLoading ? (
        <ProjectListSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {!isLoading && !error && projects.length === 0 && (
        <div className="rounded-3xl border border-border bg-muted p-10 text-center">
          <p className="text-3xl">🥲</p>
          <h2 className="mt-4 text-2xl font-bold text-foreground">No leaderboard projects found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different time window or add a new project to start climbing the leaderboard.
          </p>
        </div>
      )}
    </main>
  );
}
