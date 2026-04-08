"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    screenshot: string;
    createdAt: string;
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
  const calculateVibeScore = (ratings: any[]) => {
    if (!ratings || ratings.length === 0) return "0.0";
    const total = ratings.reduce((acc, curr) => {
      const avg =
        (curr.vibes +
          curr.creativity +
          curr.usefulness +
          curr.cursedness) /
        4;
      return acc + avg;
    }, 0);
    return (total / ratings.length).toFixed(1);
  };

  const vibeScore = calculateVibeScore(project.ratings);

  return (
    <Link href={`/project/${project.id}`}>
      <Card className="group cursor-pointer overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
        
        {/* IMAGE */}
        {/* <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div> */}

        {/* CONTENT */}
        <CardContent className="p-5">
          
          {/* AUTHOR + DATE */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
              {project.author.name.charAt(0)}
            </div>

            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800">
                {project.author.name}
              </p>
              <p className="text-xs">
                {new Date(project.createdAt).toDateString()}
              </p>
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-purple-600 transition">
            {project.title}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {project.description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tag) => (
              <span
                key={tag.id}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md"
              >
                #{tag.name}
              </span>
            ))}
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            
            {/* REACTIONS (fake UI like dev.to) */}
            <div className="flex items-center gap-3">
              <span>❤️ 12</span>
              <span>💬 4</span>
            </div>

            {/* VIBE SCORE */}
            <div className="font-semibold text-purple-600">
              ⭐ {vibeScore}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}