// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { projectService } from "@/services/projects/project.service";
// import { ProjectDetailsSkeleton } from "@/components/ui/project-details-skeleton";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useAuth } from "@/context/AuthContext";
// import { toast } from "sonner";

// interface Project {
//   id: string;
//   title: string;
//   description: string;
//   promptUsed: string;
//   siteUrl?: string;
//   repoUrl?: string;
//   screenshot: string;
//   createdAt: string;
//   author: {
//     id: string;
//     name: string;
//     email: string;
//   };
//   tags: Array<{ id: string; name: string }>;
//   ratings: Array<{
//     id: string;
//     vibes: number;
//     creativity: number;
//     usefulness: number;
//     cursedness: number;
//     user: { name: string };
//   }>;
//   comments: Array<{
//     id: string;
//     content: string;
//     type: 'ROAST' | 'TOAST';
//     createdAt: string;
//     user: { id: string; name: string };
//   }>;
// }

// export default function ProjectDetailsPage() {
//   const params = useParams<{ id: string }>();
//   const { user, isLoggedIn } = useAuth();
//   const [project, setProject] = useState<Project | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // Rating form state
//   const [ratingForm, setRatingForm] = useState({
//     vibes: 3,
//     creativity: 3,
//     usefulness: 3,
//     cursedness: 3,
//   });
//   const [comment, setComment] = useState('');
//   const [commentType, setCommentType] = useState<'TOAST' | 'ROAST'>('TOAST');
//   const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  
//   // Check if user has already rated this project
//   const userRating = project?.ratings.find(rating => rating.user.name === user?.name);
//   const isProjectOwner = project?.author.id === user?.id;

//   const fetchProject = async () => {
//     if (!params.id) return;

//     try {
//       setIsLoading(true);
//       const { data, error } = await projectService.getProjectById(params.id);

//       if (error) {
//         setError(error);
//         setProject(null);
//       } else {
//         setProject(data);
//         setError(null);
//       }
//     } catch (err) {
//       setError("Failed to load project");
//       setProject(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmitReview = async () => {
//     if (!project || !isLoggedIn || userRating) return;

//     setIsSubmittingReview(true);
//     try {
//       const reviewData = {
//         rating: ratingForm,
//         comment: comment.trim() ? { content: comment, type: commentType } : undefined,
//       };

//       const { data, error } = await projectService.submitReview(project.id, reviewData);

//       if (error) {
//         toast.error(error);
//       } else {
//         toast.success("Review submitted successfully!");
//         // Refresh project data
//         await fetchProject();
//         // Reset form
//         setComment('');
//         setRatingForm({ vibes: 3, creativity: 3, usefulness: 3, cursedness: 3 });
//       }
//     } catch (err) {
//       toast.error("Failed to submit review");
//     } finally {
//       setIsSubmittingReview(false);
//     }
//   };

//   useEffect(() => {
//     fetchProject();
//   }, [params.id]);

//   if (isLoading) {
//     return <ProjectDetailsSkeleton />;
//   }

//   if (error) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <Card className="w-full max-w-md">
//           <CardContent className="pt-6 text-center">
//             <p className="text-lg font-semibold text-destructive">{error}</p>
//             <p className="text-sm text-muted-foreground mt-2">Could not load project details</p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <Card className="w-full max-w-md">
//           <CardContent className="pt-6 text-center">
//             <p className="text-lg font-semibold">Project not found</p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const calculateAverageScore = (ratings: any[]) => {
//     if (!ratings || ratings.length === 0) return "0.0";
//     const total = ratings.reduce((acc, curr) => {
//       const avg =
//         (curr.vibes + curr.creativity + curr.usefulness + curr.cursedness) / 4;
//       return acc + avg;
//     }, 0);
//     return (total / ratings.length).toFixed(1);
//   };

//   const averageScore = calculateAverageScore(project.ratings);

//   return (
//     <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="space-y-4">
//           <h1 className="text-4xl font-bold text-foreground">{project.title}</h1>
          
//           {/* Author Info */}
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
//               {project.author.name.charAt(0).toUpperCase()}
//             </div>
//             <div>
//               <p className="font-semibold text-foreground">{project.author.name}</p>
//               <p className="text-sm text-muted-foreground">
//                 {new Date(project.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Screenshot */}
//         {project.screenshot && (
//           <div className="relative w-full h-96 rounded-lg overflow-hidden border border-border shadow-lg">
//             <img
//               src={project.screenshot}
//               alt={project.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}

//         {/* Description */}
//         <div className="space-y-2">
//           <h2 className="text-xl font-semibold text-foreground">About</h2>
//           <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
//             {project.description}
//           </p>
//         </div>

//         {/* Prompt Used */}
//         {project.promptUsed && (
//           <div className="space-y-2">
//             <h2 className="text-xl font-semibold text-foreground">Prompt Used</h2>
//             <div className="bg-muted/50 p-4 rounded-lg border">
//               <p className="text-foreground whitespace-pre-wrap leading-relaxed font-mono text-sm">
//                 {project.promptUsed}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Links */}
//         {(project.siteUrl || project.repoUrl) && (
//           <div className="space-y-3">
//             <h3 className="text-lg font-semibold text-foreground">Links</h3>
//             <div className="flex gap-4">
//               {project.siteUrl && (
//                 <a
//                   href={project.siteUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
//                 >
//                   🌐 Live Site
//                 </a>
//               )}
//               {project.repoUrl && (
//                 <a
//                   href={project.repoUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
//                 >
//                   📁 Repository
//                 </a>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Tags */}
//         {project.tags && project.tags.length > 0 && (
//           <div className="space-y-3">
//             <h3 className="text-lg font-semibold text-foreground">Tags</h3>
//             <div className="flex flex-wrap gap-2">
//               {project.tags.map((tag) => (
//                 <span
//                   key={tag.id}
//                   className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
//                 >
//                   #{tag.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="text-center">
//                 <p className="text-sm text-muted-foreground mb-1">Vibe Score</p>
//                 <p className="text-3xl font-bold text-primary">⭐ {averageScore}</p>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="pt-6">
//               <div className="text-center">
//                 <p className="text-sm text-muted-foreground mb-1">Ratings</p>
//                 <p className="text-3xl font-bold text-foreground">{project.ratings.length}</p>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="pt-6">
//               <div className="text-center">
//                 <p className="text-sm text-muted-foreground mb-1">Status</p>
//                 <p className="text-xl font-semibold text-green-600">Published</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Rating Form - Only for authenticated users who haven't rated yet */}
//         {isLoggedIn && !userRating && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Rate this Project</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="vibes">Vibes (1-5)</Label>
//                   <Input
//                     id="vibes"
//                     type="number"
//                     min="1"
//                     max="5"
//                     value={ratingForm.vibes}
//                     onChange={(e) => setRatingForm(prev => ({ ...prev, vibes: parseInt(e.target.value) || 1 }))}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="creativity">Creativity (1-5)</Label>
//                   <Input
//                     id="creativity"
//                     type="number"
//                     min="1"
//                     max="5"
//                     value={ratingForm.creativity}
//                     onChange={(e) => setRatingForm(prev => ({ ...prev, creativity: parseInt(e.target.value) || 1 }))}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="usefulness">Usefulness (1-5)</Label>
//                   <Input
//                     id="usefulness"
//                     type="number"
//                     min="1"
//                     max="5"
//                     value={ratingForm.usefulness}
//                     onChange={(e) => setRatingForm(prev => ({ ...prev, usefulness: parseInt(e.target.value) || 1 }))}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="cursedness">Cursedness (1-5)</Label>
//                   <Input
//                     id="cursedness"
//                     type="number"
//                     min="1"
//                     max="5"
//                     value={ratingForm.cursedness}
//                     onChange={(e) => setRatingForm(prev => ({ ...prev, cursedness: parseInt(e.target.value) || 1 }))}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="comment">Comment (Optional)</Label>
//                 <Textarea
//                   id="comment"
//                   placeholder="Share your thoughts about this project..."
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   rows={3}
//                 />
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     id="toast"
//                     name="commentType"
//                     value="TOAST"
//                     checked={commentType === 'TOAST'}
//                     onChange={(e) => setCommentType(e.target.value as 'TOAST')}
//                   />
//                   <Label htmlFor="toast">🍞 Toast (Positive)</Label>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     id="roast"
//                     name="commentType"
//                     value="ROAST"
//                     checked={commentType === 'ROAST'}
//                     onChange={(e) => setCommentType(e.target.value as 'ROAST')}
//                   />
//                   <Label htmlFor="roast">🔥 Roast (Critical)</Label>
//                 </div>
//               </div>

//               <Button
//                 onClick={handleSubmitReview}
//                 disabled={isSubmittingReview}
//                 className="w-full"
//               >
//                 {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
//               </Button>
//             </CardContent>
//           </Card>
//         )}

//         {/* User already rated message */}
//         {isLoggedIn && userRating && (
//           <Card>
//             <CardContent className="pt-6">
//               <p className="text-center text-muted-foreground">
//                 You've already rated this project. Thanks for your feedback! ✨
//               </p>
//             </CardContent>
//           </Card>
//         )}

//         {/* Login prompt for rating */}
//         {!isLoggedIn && (
//           <Card>
//             <CardContent className="pt-6 text-center">
//               <p className="text-muted-foreground mb-4">
//                 Want to rate and comment on this project?
//               </p>
//               <Button asChild>
//                 <a href="/auth/login">Login to Rate</a>
//               </Button>
//             </CardContent>
//           </Card>
//         )}

//         {/* Ratings Section */}
//         {project.ratings && project.ratings.length > 0 && (
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-foreground">Community Ratings</h2>
//             <div className="space-y-3">
//               {project.ratings.map((rating) => (
//                 <Card key={rating.id}>
//                   <CardContent className="pt-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <p className="font-medium text-foreground">{rating.user.name}</p>
//                       <div className="flex gap-4 text-sm">
//                         <span>🎨 {rating.creativity}</span>
//                         <span>⚡ {rating.usefulness}</span>
//                         <span>😈 {rating.cursedness}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-2xl">💯</span>
//                       <span className="font-bold text-primary">
//                         {((rating.vibes + rating.creativity + rating.usefulness + rating.cursedness) / 4).toFixed(1)}/10
//                       </span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Comments Section */}
//         {project.comments && project.comments.length > 0 && (
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold text-foreground">Comments</h2>
//             <div className="space-y-4">
//               {project.comments.map((comment) => (
//                 <Card key={comment.id}>
//                   <CardContent className="pt-4">
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex items-center gap-3">
//                         <div className="h-8 w-8 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
//                           {comment.user.name.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="font-medium text-foreground">{comment.user.name}</p>
//                           <p className="text-xs text-muted-foreground">
//                             {new Date(comment.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         comment.type === 'TOAST' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-red-100 text-red-800'
//                       }`}>
//                         {comment.type === 'TOAST' ? '🍞 Toast' : '🔥 Roast'}
//                       </span>
//                     </div>
//                     <p className="text-foreground whitespace-pre-wrap leading-relaxed">
//                       {comment.content}
//                     </p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Project Owner Actions */}
//         {isProjectOwner && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Project Management</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex gap-3">
//                 <Button variant="outline">
//                   Edit Project
//                 </Button>
//                 <Button variant="destructive">
//                   Delete Project
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//       </div>
//     </div>
//   );
// }


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


// ... (Interface Project remains the same as your input)

interface Project {
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
    user: { name: string };
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
  
  const userRating = project?.ratings.find(rating => rating.user.name === user?.name);
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

  const averageScore = project.ratings.length > 0 
    ? (project.ratings.reduce((acc, curr) => acc + (curr.vibes + curr.creativity + curr.usefulness + curr.cursedness) / 4, 0) / project.ratings.length).toFixed(1)
    : "0.0";
  console.log("Project Data:", project);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* 1. HERO HEADER */}
      <div className="border-b bg-card/50 ">
        <div className="max-w-6xl mx-auto px-6 py-8">
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
                    "{project.promptUsed}"
                  </code>
                </CardContent>
              </Card>
            )}

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
                      <Star key={s} className={`size-4 ${Number(averageScore)/2 >= s ? 'fill-current' : 'opacity-20'}`} />
                    ))}
                  </div>
                  <p className="text-xs opacity-60 font-medium">Verified by {project.ratings.length} contributors</p>
               </CardContent>
            </Card>

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
            {isLoggedIn && !userRating && !isProjectOwner && (
              <Card className="border-primary/20 bg-primary/5 shadow-inner">
                <CardHeader>
                  <CardTitle className="text-lg">Submit Feedback</CardTitle>
                  <CardDescription>Quantify your experience and leave a note.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <MetricInput label="Vibes" value={ratingForm.vibes} onChange={(v) => setRatingForm(p => ({...p, vibes: v}))} />
                      <MetricInput label="Innovation" value={ratingForm.creativity} onChange={(v) => setRatingForm(p => ({...p, creativity: v}))} />
                      <MetricInput label="Utility" value={ratingForm.usefulness} onChange={(v) => setRatingForm(p => ({...p, usefulness: v}))} />
                      <MetricInput label="Cursedness" value={ratingForm.cursedness} onChange={(v) => setRatingForm(p => ({...p, cursedness: v}))} />
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