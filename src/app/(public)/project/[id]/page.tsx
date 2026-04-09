
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { projectService } from "@/services/projects/project.service";
import { ProjectDetailsSkeleton } from "@/components/ui/project-details-skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  Globe,
  Star,
  MessageSquare,
  Flame,
  Coffee,
  Calendar,
  User as UserIcon,
  Tag,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronRight,
  Terminal,
  GlobeLock,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { UserAvatar } from "@/components/common/UserAvatar";
import Link from "next/link";


// ... (Interface Project remains the same as your input)

export interface Project {
  id: string;
  title: string;
  description: string;
  promptUsed: string;
  siteUrl?: string;
  repoUrl?: string;
  screenshot: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  tags: Array<{ id: string; name: string }>;
  ratings: Array<{
    id: string;
    vibes: number;
    creativity: number;
    usefulness: number;
    cursedness: number;
    user: { id: string; name: string };
  }>;
  comments: Array<{
    id: string;
    content: string;
    type: 'ROAST' | 'TOAST';
    createdAt: string;
    user: { id: string; name: string, avatarUrl: string };
  }>;
}

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [ratingForm, setRatingForm] = useState({ vibes: 1, creativity: 1, usefulness: 1, cursedness: 1 });
  const [comment, setComment] = useState('');
  const [commentType, setCommentType] = useState<'TOAST' | 'ROAST'>('TOAST');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const userRating = project?.ratings.find(rating => rating.user.id === user?.id);
  const isProjectOwner = project?.author.id === user?.id;

  const fetchProject = async () => {
    if (!params.id) return;
    try {
      setIsLoading(true);
      const { data, error } = await projectService.getProjectById(params.id);
      if (error) { setError(error); setProject(null); }
      else { setProject(data); setError(null); }
    } catch (err) { setError("Failed to load project"); }
    finally { setIsLoading(false); }
  };

  const handleDelete = async () => {
    if (!project || !isProjectOwner) return;

    setIsDeleting(true);
    const { error } = await projectService.deleteProject(project.id);
    setIsDeleting(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Project deleted successfully!");
    router.push("/");
  };

  const handleSubmitReview = async () => {
    if (!project || !isLoggedIn || userRating || isProjectOwner) return;
    setIsSubmittingReview(true);
    try {
      const reviewData = {
        rating: ratingForm,
        comment: comment.trim() ? { content: comment, type: commentType } : undefined,
      };
      const { error } = await projectService.submitReview(project.id, reviewData);
      if (error) { toast.error(error); }
      else {
        toast.success("Review submitted successfully!");
        await fetchProject();
        setComment('');
        setRatingForm({ vibes: 3, creativity: 3, usefulness: 3, cursedness: 3 });
      }
    } catch (err) { toast.error("Failed to submit review"); }
    finally { setIsSubmittingReview(false); }
  };

  useEffect(() => { fetchProject(); }, [params.id]);

  if (isLoading) return <ProjectDetailsSkeleton />;
  if (error || !project) return <ErrorState message={error || "Project not found"} />;

  const ratingCount = project.ratings.length;
  const averageScore = ratingCount > 0
    ? (project.ratings.reduce((acc, curr) => acc + (curr.vibes + curr.creativity + curr.usefulness + curr.cursedness) / 4, 0) / ratingCount).toFixed(1)
    : "0.0";

  const ratingBreakdown = ratingCount > 0 ? {
    vibes: project.ratings.reduce((acc, curr) => acc + curr.vibes, 0) / ratingCount,
    creativity: project.ratings.reduce((acc, curr) => acc + curr.creativity, 0) / ratingCount,
    usefulness: project.ratings.reduce((acc, curr) => acc + curr.usefulness, 0) / ratingCount,
    cursedness: project.ratings.reduce((acc, curr) => acc + curr.cursedness, 0) / ratingCount,
  } : {
    vibes: 0,
    creativity: 0,
    usefulness: 0,
    cursedness: 0,
  };

  // console.log("Project Data:", project);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* 1. HERO HEADER */}
      <div className=" ">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                <Terminal className="size-4" />
                <span>Project Workspace</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{project.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-card/50 border">
                  <UserAvatar
                    name={project.author.name}
                    avatarUrl={project.author.avatarUrl}
                    size="md"
                    showBorder={true}
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Created by</p>
                    <p className="text-sm font-medium text-primary">{project.author.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-l pl-4">
                  <Calendar className="size-4" />
                  <span className="text-sm">{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Owner Exclusive Controls */}
            {isProjectOwner && (
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 md:flex-none gap-2"
                  onClick={() => router.push(`/projects/${project.id}/edit`)}
                >
                  <Edit3 className="size-4" /> Edit Project
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1 md:flex-none gap-2"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="size-4" /> Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT COLUMN: MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-12">
            {/* Visual Preview */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl transition-all hover:border-primary/20">
              <img src={project.screenshot} alt={project.title} className="w-full h-full object-cover" />
            </div>

            {/* About Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <ChevronRight className="size-5 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Executive Summary</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap">
                {project.description}
              </p>
            </section>

            {/* Technical Context */}
            {project.promptUsed && (
              <Card className="bg-muted/30 border-dashed">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Terminal className="size-4" /> Input Logic / Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="text-sm leading-relaxed block font-mono bg-background/50 p-4 rounded-xl border italic text-foreground/80">
                    `{project?.promptUsed}`
                  </code>
                </CardContent>
              </Card>
            )}

            {/* Rating Breakdown */}
            <Card className="bg-card/50 border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Rating Breakdown</CardTitle>
                <CardDescription>{ratingCount} review{ratingCount === 1 ? '' : 's'} submitted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {([
                  { label: 'Vibes', value: ratingBreakdown.vibes },
                  { label: 'Creativity', value: ratingBreakdown.creativity },
                  { label: 'Utility', value: ratingBreakdown.usefulness },
                  { label: 'Cursedness', value: ratingBreakdown.cursedness },
                ]).map(metric => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>{metric.label}</span>
                      <span>{metric.value.toFixed(1)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, Math.max(0, (metric.value / 5) * 100))}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Comments Feed */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <MessageSquare className="size-5" /> Discussion
                </h2>
                <Badge variant="outline">{project.comments.length} Comments</Badge>
              </div>

              <div className="grid gap-4">
                {project.comments.length > 0 ? (
                  project.comments.map((comment) => (
                    <Card key={comment.id} className="border border-border/50 bg-card/30 hover:bg-card/50 transition-all duration-200 hover:shadow-md">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <UserAvatar
                              name={comment.user.name}
                              avatarUrl={comment.user.avatarUrl}
                              size="lg"
                              showBorder={true}
                            />
                            <div>
                              <p className="text-sm font-semibold text-foreground">{comment.user.name}</p>
                              <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <Badge
                            variant={comment.type === 'TOAST' ? 'secondary' : 'destructive'}
                            className="rounded-full px-3 py-1 text-xs font-medium"
                          >
                            {comment.type === 'TOAST' ? (
                              <><Coffee className="size-3 mr-1" /> Toast</>
                            ) : (
                              <><Flame className="size-3 mr-1" /> Roast</>
                            )}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center py-10 text-muted-foreground text-sm border border-dashed rounded-3xl italic">No feedback submitted yet.</p>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <aside className="space-y-8">
            {/* Global Stats */}
            <Card className="bg-primary text-primary-foreground border-none shadow-xl shadow-primary/20 overflow-hidden">
              <CardContent className="p-8 text-center space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Project Score</p>
                <div className="text-7xl font-black">{averageScore}</div>
                <div className="flex justify-center gap-1.5 py-2 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`size-4 ${Number(averageScore) / 2 >= s ? 'fill-current' : 'opacity-20'}`} />
                  ))}
                </div>
                <p className="text-xs opacity-60 font-medium">Verified by {project.ratings.length} contributors</p>
              </CardContent>
            </Card>

            {ratingCount > 0 && (
              <Card className="bg-card/50 border border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Latest Ratings</CardTitle>
                  <CardDescription>{Math.min(3, ratingCount)} recent ratings from the community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.ratings.slice(0, 5).map((rating) => (
                    <div key={rating.id} className="rounded-3xl border border-border/70 p-4 bg-background/80">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">{rating.user.name}</p>
                          <p className="text-xs text-muted-foreground">{rating.vibes + rating.creativity + rating.usefulness + rating.cursedness}/20 total</p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star key={index} className={`size-4 ${Math.round((rating.vibes + rating.creativity + rating.usefulness + rating.cursedness) / 4) > index ? 'fill-current' : 'opacity-30'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                        <div className="rounded-2xl bg-muted/20 p-3">
                          <p className="font-semibold text-foreground">Vibes</p>
                          <p>{rating.vibes}/5</p>
                        </div>
                        <div className="rounded-2xl bg-muted/20 p-3">
                          <p className="font-semibold text-foreground">Creativity</p>
                          <p>{rating.creativity}/5</p>
                        </div>
                        <div className="rounded-2xl bg-muted/20 p-3">
                          <p className="font-semibold text-foreground">Utility</p>
                          <p>{rating.usefulness}/5</p>
                        </div>
                        <div className="rounded-2xl bg-muted/20 p-3">
                          <p className="font-semibold text-foreground">Cursedness</p>
                          <p>{rating.cursedness}/5</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Resource Access */}
            <Card>
              <CardHeader><CardTitle className="text-sm uppercase tracking-wider">Resources</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {project.siteUrl && (
                  <Button asChild className="w-full justify-between" variant="outline">
                    <a href={project.siteUrl} target="_blank">Live Deployment <ExternalLink className="size-4" /></a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button asChild className="w-full justify-between" variant="secondary">
                    <a href={project.repoUrl} target="_blank">Source Repository <GlobeLock className="size-4" /></a>
                  </Button>
                )}
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t mt-4">
                    {project.tags.map(t => (
                      <Badge key={t.id} variant="secondary" className="text-[10px] font-bold">#{t.name}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Review Terminal */}
            {isLoggedIn && !userRating && !isProjectOwner ? (
              <Card className="border-primary/20 bg-primary/5 shadow-inner">
                <CardHeader>
                  <CardTitle className="text-lg">Submit Feedback</CardTitle>
                  <CardDescription>Quantify your experience and leave a note.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <MetricInput label="Vibes" value={ratingForm.vibes} onChange={(v) => setRatingForm(p => ({ ...p, vibes: v }))} />
                      <MetricInput label="Innovation" value={ratingForm.creativity} onChange={(v) => setRatingForm(p => ({ ...p, creativity: v }))} />
                      <MetricInput label="Utility" value={ratingForm.usefulness} onChange={(v) => setRatingForm(p => ({ ...p, usefulness: v }))} />
                      <MetricInput label="Cursedness" value={ratingForm.cursedness} onChange={(v) => setRatingForm(p => ({ ...p, cursedness: v }))} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase">Commentary</Label>
                    <Textarea placeholder="Constructive feedback..." className="bg-background resize-none h-24" value={comment} onChange={(e) => setComment(e.target.value)} />
                  </div>

                  <RadioGroup defaultValue="TOAST" onValueChange={(v) => setCommentType(v as any)} className="flex justify-between items-center p-3 bg-background rounded-xl border">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="TOAST" id="t" />
                      <Label htmlFor="t" className="flex items-center gap-1 text-xs font-bold"><Coffee className="size-3" /> Toast</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="ROAST" id="r" />
                      <Label htmlFor="r" className="flex items-center gap-1 text-xs font-bold"><Flame className="size-3" /> Roast</Label>
                    </div>
                  </RadioGroup>

                  <Button onClick={handleSubmitReview} className="w-full font-bold" disabled={isSubmittingReview}>
                    {isSubmittingReview ? "Processing..." : "Submit Review"}
                  </Button>
                </CardContent>
              </Card>
            ) : !isLoggedIn ? (
              <Card className="border border-border bg-card/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Login required</CardTitle>
                  <CardDescription>To post a rating or comment, you must be signed in.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">This is a public project page, but rating and commenting are reserved for authenticated users only.</p>
                  <Button asChild className="w-full">
                    <Link href="/login">Login to Rate</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            {isLoggedIn && userRating && (
              <Card className="border border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle>Your Rating</CardTitle>
                  <CardDescription>You already rated this project.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className={`size-4 ${Math.round((userRating.vibes + userRating.creativity + userRating.usefulness + userRating.cursedness) / 4) > index ? 'fill-current text-yellow-400' : 'opacity-30'}`} />
                    ))}
                  </div>
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <div className="rounded-2xl bg-muted/20 p-3">
                      <p className="font-semibold text-foreground">Vibes</p>
                      <p>{userRating.vibes}/5</p>
                    </div>
                    <div className="rounded-2xl bg-muted/20 p-3">
                      <p className="font-semibold text-foreground">Creativity</p>
                      <p>{userRating.creativity}/5</p>
                    </div>
                    <div className="rounded-2xl bg-muted/20 p-3">
                      <p className="font-semibold text-foreground">Utility</p>
                      <p>{userRating.usefulness}/5</p>
                    </div>
                    <div className="rounded-2xl bg-muted/20 p-3">
                      <p className="font-semibold text-foreground">Cursedness</p>
                      <p>{userRating.cursedness}/5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="size-5" /> Delete Project
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this project? This action cannot be undone and will remove all associated ratings and comments.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Sub-component for clean Rating Inputs with Sliders
function MetricInput({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="space-y-3 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-semibold text-foreground">{label}</Label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{value}</span>
          <span className="text-xs text-muted-foreground">/5</span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        max={5}
        min={1}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );
}

// Sub-component for handling errors professionally
function ErrorState({ message }: { message: string }) {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
      <div className="size-20 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20 shadow-xl shadow-destructive/5">
        <Flame className="size-10 text-destructive animate-pulse" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black tracking-tight">{message}</h2>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">This project might have been removed or the connection was interrupted.</p>
      </div>
      <Button variant="outline" className="rounded-full px-8" onClick={() => window.location.reload()}>Try Reconnecting</Button>
    </div>
  );
}