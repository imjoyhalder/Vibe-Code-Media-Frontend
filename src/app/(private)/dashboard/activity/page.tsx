"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Activity, 
  MessageSquare, 
  Zap, 
  Clock, 
  ChevronRight, 
  History,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { userService } from "@/services/user/user.service";
import type { UserActivityItem } from "@/services/user/user.types";
import { cn } from "@/lib/utils";

export default function ActivityPage() {
  const [activity, setActivity] = useState<UserActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 10;

  useEffect(() => {
    const loadActivity = async () => {
      setLoading(true);
      const result = await userService.getActivity({ page: currentPage, limit });
      if (result.error) {
        setError(result.error);
      } else {
        setActivity(result.data?.activity || []);
        setTotalItems(result.data?.total || 0);
      }
      setLoading(false);
    };

    loadActivity();
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="max-w-4xl mx-auto space-y-8  ">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
          <History className="h-3 w-3" /> Timeline
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Activity Feed
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          A real-time overview of your interactions and contributions across the platform.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive flex items-center gap-3">
          <Zap className="h-4 w-4" /> {error}
        </div>
      )}

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Logs
              </CardTitle>
              <CardDescription>Everything you have done recently</CardDescription>
            </div>
            <Badge variant="outline" className="animate-pulse bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              Live
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="divide-y divide-border/50">
              {[...Array(3)].map((_, i) => <ActivitySkeleton key={i} />)}
            </div>
          ) : activity.length ? (
            <>
              <div className="divide-y divide-border/50">
                {activity.map((item, index) => (
                  <ActivityItem key={item.id || index} item={item} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-border/50 bg-muted/20">
                  <p className="text-xs text-muted-foreground">
                    Showing Page {currentPage} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center space-y-3">
              <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto opacity-50">
                <Activity className="h-6 w-6" />
              </div>
              <p className="text-muted-foreground text-sm">No activities recorded yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// --- Sub-components ---

function ActivityItem({ item }: { item: UserActivityItem }) {
  const isRating = item.activityType === "rating";
  
  return (
    <Link 
      href={`/project/${item.project?.id}`}
      className="flex items-start gap-4 p-5 transition-all hover:bg-muted/50 group"
    >
      <div className={cn(
        "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-110",
        isRating 
          ? "bg-amber-500/10 border-amber-500/20 text-amber-500" 
          : "bg-sky-500/10 border-sky-500/20 text-sky-500"
      )}>
        {isRating ? <Zap className="h-5 w-5 fill-current" /> : <MessageSquare className="h-5 w-5" />}
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-foreground leading-none">
              {isRating ? "Project Rated" : "New Comment"}
              <span className="ml-2 font-normal text-muted-foreground">on</span>
            </h4>
            <p className="text-sm font-medium text-primary line-clamp-1">
              {item.project?.title || "Project Title"}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground uppercase tracking-tighter shrink-0">
            <Clock className="h-3 w-3" />
            {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* Content Box */}
        <div className="relative rounded-2xl bg-muted/30 border border-border/40 p-3 text-sm text-foreground/80 leading-relaxed group-hover:border-primary/20 group-hover:bg-muted/50 transition-colors">
          {isRating ? (
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-semibold text-[13px]">
              <span className="flex items-center gap-1">Vibes: <span className="text-amber-500">{item.vibes}</span></span>
              <span className="flex items-center gap-1">Creativity: <span className="text-purple-500">{item.creativity}</span></span>
              <span className="flex items-center gap-1">Usefulness: <span className="text-emerald-500">{item.usefulness}</span></span>
              <span className="flex items-center gap-1">Cursedness: <span className="text-red-500">{item.cursedness}</span></span>
            </div>
          ) : (
            <p className="text-foreground/90 font-medium">
              &quot;{item.content}&quot;
            </p>
          )}
        </div>
      </div>

      <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity pr-2">
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Link>
  );
}

function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-4 p-5">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <div className="flex-1 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-12 w-full rounded-2xl" />
      </div>
    </div>
  );
}