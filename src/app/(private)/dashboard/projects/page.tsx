

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  FolderKanban, 
  ChevronLeft, 
  ChevronRight,
  LayoutGrid
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { userService } from "@/services/user/user.service";
import { projectService } from "@/services/projects/project.service";
import type { UserProject } from "@/services/user/user.types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 10; 

  const router = useRouter();

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const result = await userService.getMyProjects({ page: currentPage, limit });
      if (result.data) {
        setProjects(result.data.projects || []);
        setTotalItems(result.data.total || 0);
      }
      setLoading(false);
    };
    loadProjects();
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / limit);

  const handleDelete = async (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(projectId);
    const result = await projectService.deleteProject(projectId);
    if (!result.error) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setTotalItems((prev) => prev - 1);
    }
    setDeletingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Header section with glassmorphism feel */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Portfolio</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">My Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage, edit, and organize your showcase items.</p>
        </div>
        <Button asChild className="rounded-full shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
          <Link href="/projects/new">
            <Plus className="h-4 w-4 mr-2" /> Create Project
          </Link>
        </Button>
      </div>

      {/* Grid Section */}
      <div className="grid gap-4 grid-cols-1">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-2xl" />
          ))
        ) : projects.length ? (
          projects.map((project) => (
            <Card 
              key={project.id} 
              onClick={() => router.push(`/project/${project.id}`)}
              className="group relative cursor-pointer border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <CardHeader className="p-6 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl font-bold truncate group-hover:text-primary transition-colors pr-8">
                    {project.title}
                  </CardTitle>
                  
                  <div className="absolute top-4 right-3 z-20">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-full bg-muted/20 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/project/${project.id}`); }}>
                          <Eye className="h-4 w-4 mr-2" /> View Full Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); router.push(`/projects/${project.id}/edit`); }}>
                          <Edit className="h-4 w-4 mr-2" /> Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={(e) => handleDelete(e, project.id)}
                          disabled={deletingId === project.id}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> 
                          {deletingId === project.id ? "Deleting..." : "Delete Project"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10">
                  {project.description || "No description provided for this project."}
                </p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40 mt-4">
                  {project.tags?.slice(0, 3).map((tag) => (
                    <Badge 
                      key={tag.name} 
                      variant="secondary" 
                      className="text-[10px] font-semibold bg-muted/50 hover:bg-primary/10 transition-colors border-none"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                  {project.tags && project.tags.length > 3 && (
                    <span className="text-[10px] text-muted-foreground font-medium self-center">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center border-2 border-dashed rounded-[2rem] bg-muted/10 border-border/60">
            <div className="p-6 bg-muted/20 rounded-full mb-4">
              <FolderKanban className="h-12 w-12 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Your portfolio is empty</h3>
            <p className="text-muted-foreground text-center max-w-xs mt-2">
              Start adding your amazing work to showcase it to the world.
            </p>
            <Button asChild className="mt-6 rounded-full px-8">
              <Link href="/projects/new">Add First Project</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Modern Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{(currentPage - 1) * limit + 1}</span> to{" "}
            <span className="font-semibold text-foreground">{Math.min(currentPage * limit, totalItems)}</span> of{" "}
            <span className="font-semibold text-foreground">{totalItems}</span> projects
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-xl h-9 px-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // খুব বেশি পেজ থাকলে শুধুমাত্র কারেন্ট পেজের আশেপাশের গুলো দেখানোর লজিক এখানে অ্যাড করা যায়
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="h-9 w-9 rounded-xl font-bold"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-xl h-9 px-4"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}