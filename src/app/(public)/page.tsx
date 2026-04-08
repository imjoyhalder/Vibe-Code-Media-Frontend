import ProjectCard from "@/components/projects/ProjectCard";
import { projectService } from "@/services/projects/project.service";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr"; // Keeping icons consistent

export default async function FeedPage() {
  // Fetching data directly on the server
  const { data, error } = await projectService.getProjects();
  
  // Adjusted based on your console.log structure
  const projects = data?.data?.projects || [];

  return (
    <main className="mx-auto ">
      {/* Header Section */}
      <header className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            VibeCode Feed
          </h1>
          <p className="text-base text-muted-foreground">
            Explore the latest high-vibe projects from our developer community.
          </p>
        </div>
        
        <Link 
          href="/projects/new" 
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20 active:scale-95"
        >
          <Plus weight="bold" className="size-4" />
          Submit Project
        </Link>
      </header>

      {/* Error State */}
      {error && (
        <div className="mb-10 rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center text-destructive">
          <p className="font-semibold">Failed to load feed</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      )}

      {/* 🚀 Optimized Project Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-4 size-16 rounded-full bg-muted flex items-center justify-center text-3xl">
            ✨
          </div>
          <h3 className="text-xl font-bold text-foreground">No projects yet</h3>
          <p className="mt-2 text-muted-foreground">
            Be the trendsetter. Share your first project with the world!
          </p>
          <Link href="/projects/new" className="mt-6 text-sm font-bold text-primary underline-offset-4 hover:underline">
            Get started →
          </Link>
        </div>
      )}
    </main>
  );
}