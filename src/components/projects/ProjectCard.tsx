import Image from "next/image";

interface ProjectCardProps {
  project: {
    title: string;
    screenshot: string;
    author: {
      name: string;
    };
    tags: Array<{ id: string; name: string }>;
    ratings: Array<{
      vibes: number;
      creativity: number;
      usefulness: number;
      cursedness: number;
    }>;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Calculate average vibe score
  const calculateVibeScore = (ratings: any[]) => {
    if (!ratings || ratings.length === 0) return "0.0";
    const total = ratings.reduce((acc, curr) => {
      const avg = (curr.vibes + curr.creativity + curr.usefulness + curr.cursedness) / 4;
      return acc + avg;
    }, 0);
    return (total / ratings.length).toFixed(1);
  };

  const vibeScore = calculateVibeScore(project.ratings);

  return (
    <div className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      {/* FIX: The parent must be 'relative' for 'fill' to work.
          'aspect-video' ensures a consistent 16:9 ratio for all screenshots.
      */}
      <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
        <Image
          src={project.screenshot}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={false}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 truncate pr-2">
            {project.title}
          </h3>
          <div className="flex items-center bg-purple-50 text-purple-700 text-xs font-bold px-2 py-1 rounded-full border border-purple-100">
            ⭐ {vibeScore}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags?.map((tag) => (
            <span 
              key={tag.id} 
              className="text-[11px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-100"
            >
              #{tag.name}
            </span>
          ))}
          {project.tags?.length === 0 && (
            <span className="text-[11px] text-gray-300 italic">no tags</span>
          )}
        </div>

        {/* Author Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-bold mr-2 shadow-sm">
              {project.author.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">{project.author.name}</span>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
            View details →
          </button>
        </div>
      </div>
    </div>
  );
}