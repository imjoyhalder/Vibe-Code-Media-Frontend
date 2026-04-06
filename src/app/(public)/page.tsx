
import ProjectCard from "@/components/projects/ProjectCard";
import { projectService } from "@/services/projects/project.service";
import Link from "next/link";

export default async function FeedPage() {
  // Fetching data directly on the server
  const { data, error } = await projectService.getProjects();
  const projects = data?.data?.projects || [];
  console.log(projects)

  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">VibeCode Feed</h1>
          <p className="text-gray-500">Discover what the community is building.</p>
        </div>
        <Link 
          href="/projects/new" 
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Submit Project
        </Link>
      </header>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && !error && (
        <div className="text-center py-20 text-gray-400">
          <p>No projects found. Be the first to upload one!</p>
        </div>
      )}
    </main>
  );
}