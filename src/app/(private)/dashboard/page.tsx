
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity as ActivityIcon, Briefcase, Shield, Sparkles, Zap, ArrowUpRight } from "lucide-react";
import { userService } from "@/services/user/user.service";
import { projectService } from "@/services/projects/project.service";
import type { UserActivityItem, UserProfile, UserProject } from "@/services/user/user.types";
import type { ProjectAverages } from "@/services/projects/project.types";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [activity, setActivity] = useState<UserActivityItem[]>([]);
  const [averages, setAverages] = useState<ProjectAverages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const [profileRes, projectsRes, activityRes, averagesRes] = await Promise.all([
          userService.getProfile(),
          userService.getMyProjects(),
          userService.getActivity({ limit: 5 }),
          projectService.getAverages(),
        ]);

        if (profileRes.data) setProfile(profileRes.data);
        if (projectsRes.data) setProjects(projectsRes.data.projects || []);
        if (activityRes.data) setActivity(activityRes.data.activity || []);
        if (averagesRes.data) setAverages(averagesRes.data || null);
        
        if (profileRes.error || projectsRes.error) {
          setError("Some data could not be loaded. Please refresh.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const averageScore = averages
    ? (((averages.vibes || 0) + (averages.creativity || 0) + (averages.usefulness || 0) + (averages.cursedness || 0)) / 4).toFixed(1)
    : "0.0";

  return (
    <div className="container mx-auto space-y-8 p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl">
            Monitor your progress and manage your creativity in one workspace.
          </p>
        </div>
        <Button asChild size="lg" className="rounded-full shadow-lg hover:shadow-primary/20 transition-all">
           <Link href="/projects/new">Add New Project</Link>
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Projects" 
          value={projects.length} 
          description="Total work" 
          icon={Briefcase} 
          color="blue"
        />
        <StatCard 
          title="Activity" 
          value={activity.length} 
          description="Recent hits" 
          icon={ActivityIcon} 
          color="emerald"
        />
        <StatCard 
          title="Avg Vibe" 
          value={averageScore} 
          description="Community score" 
          icon={Sparkles} 
          color="amber"
        />
        <StatCard 
          title="Status" 
          value={profile ? "Active" : "-"} 
          description={profile?.name || "Member"} 
          icon={Shield} 
          color="indigo"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Latest Projects List */}
        <Card className="lg:col-span-4 border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>My Projects</CardTitle>
              <CardDescription>View and manage your recent creations.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-primary hover:bg-primary/10">
              <Link href="/dashboard/projects">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
               <SkeletonLoader count={3} />
            ) : projects.length ? (
              projects.slice(0, 3).map((project) => (
                <Link 
                  key={project.id} 
                  href={`/project/${project.id}`}
                  className="group block rounded-xl border bg-background/50 p-4 transition-all hover:border-primary/50 hover:bg-accent/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/5">{project.ratings?.length || 0} ★</Badge>
                  </div>
                </Link>
              ))
            ) : (
              <EmptyState message="No projects yet. Start creating!" />
            )}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="lg:col-span-3 border-none shadow-md bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Updates on your projects.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <SkeletonLoader count={4} />
            ) : activity.length ? (
              activity.slice(0, 4).map((event) => (
                <div key={event.id} className="flex gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50">
                   <div className={cn(
                     "mt-1 flex h-8 w-8 items-center justify-center rounded-full shrink-0",
                     event.activityType === 'rating' ? "bg-amber-100 text-amber-600" : "bg-sky-100 text-sky-600"
                   )}>
                     {event.activityType === 'rating' ? <Zap className="h-4 w-4" /> : <ActivityIcon className="h-4 w-4" />}
                   </div>
                   <div className="flex-1 space-y-0.5">
                     <p className="text-sm font-semibold leading-none">{event.activityType === 'rating' ? "New Rating" : "Project Update"}</p>
                     <p className="text-xs text-muted-foreground">{event.project?.title}</p>
                   </div>
                   <time className="text-[10px] text-muted-foreground uppercase font-medium pt-1">
                     {new Date(event.createdAt).toLocaleDateString()}
                   </time>
                </div>
              ))
            ) : (
              <EmptyState message="No recent activity to show." />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- Helper Components for Clean Code ---

function StatCard({ title, value, description, icon: Icon, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
    amber: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    indigo: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20",
  };

  return (
    <Card className="overflow-hidden border-none shadow-sm transition-transform hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", colors[color])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function SkeletonLoader({ count }: { count: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-16 w-full animate-pulse rounded-xl bg-muted" />
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-3">
        <Briefcase className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}