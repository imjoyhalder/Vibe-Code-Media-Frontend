"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import { ProjectListSkeleton } from "../../components/projects/ProjectListSkeleton";
import { projectService } from "@/services/projects/project.service";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FeedPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const fetchProjects = async (title?: string, tag?: string) => {
    setIsLoading(true);
    const { data, error } = await projectService.getProjects({ title, tag, limit: 30 });

    if (error) {
      setError(error);
      setProjects([]);
    } else {
      setError(null);
      setProjects(data?.data?.projects || []);
    }
    console.log(data?.data?.projects);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetchProjects(searchTerm.trim() || undefined, selectedTag || undefined);
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [searchTerm, selectedTag]);

  // Collect unique tags from all projects
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach(project => {
      project.tags?.forEach((tag: { name: string }) => {
        tagSet.add(tag.name);
      });
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  const searchPlaceholder = useMemo(
    () => (searchTerm ? `Searching for "${searchTerm}"` : "Search projects by title..."),
    [searchTerm]
  );

  console.log(searchTerm)

  return (
    <main className="mx-auto w-full max-w-7xl pt-6">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            VibeCode Feed
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Explore live projects from the community. Search by title and discover fresh creativity.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[320px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              aria-label="Search projects by title"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-border bg-background/80 py-3 pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full border-border bg-background/80 hover:bg-accent hover:text-accent-foreground"
              >
                <Filter className="h-4 w-4" />
                {selectedTag ? `Tag: ${selectedTag}` : "Filter by tag"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => setSelectedTag("")}
                className={!selectedTag ? "bg-accent" : ""}
              >
                All tags
              </DropdownMenuItem>
              {availableTags.map((tag) => (
                <DropdownMenuItem
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={selectedTag === tag ? "bg-accent" : ""}
                >
                  {tag}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-10 rounded-3xl border border-destructive/20 bg-destructive/5 p-6 text-center text-destructive">
          <p className="font-semibold">Unable to load projects</p>
          <p className="mt-2 text-sm opacity-80">{error}</p>
        </div>
      )}

      {isLoading ? (
        <ProjectListSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 && !error && !isLoading && (
        <div className="rounded-3xl border border-border bg-muted p-10 text-center">
          <p className="text-3xl">✨</p>
          <h2 className="mt-4 text-2xl font-bold text-foreground">No matching projects</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different search term or filter.
          </p>
        </div>
      )}
    </main>
  );
}