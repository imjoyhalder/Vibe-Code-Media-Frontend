"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { projectService } from "@/services/projects/project.service";
import { ProjectDetailsSkeleton } from "@/components/ui/project-details-skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  description: string;
  screenshot: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
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
}

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!params.id) return;

      try {
        setIsLoading(true);
        const { data, error } = await projectService.getProjectById(params.id);

        if (error) {
          setError(error);
          setProject(null);
        } else {
          setProject(data);
          setError(null);
        }
      } catch (err) {
        setError("Failed to load project");
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-semibold text-destructive">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">Could not load project details</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-semibold">Project not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculateAverageScore = (ratings: any[]) => {
    if (!ratings || ratings.length === 0) return "0.0";
    const total = ratings.reduce((acc, curr) => {
      const avg =
        (curr.vibes + curr.creativity + curr.usefulness + curr.cursedness) / 4;
      return acc + avg;
    }, 0);
    return (total / ratings.length).toFixed(1);
  };

  const averageScore = calculateAverageScore(project.ratings);

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{project.title}</h1>
          
          {/* Author Info */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
              {project.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-foreground">{project.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Screenshot */}
        {project.screenshot && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden border border-border shadow-lg">
            <img
              src={project.screenshot}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">About</h2>
          <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Vibe Score</p>
                <p className="text-3xl font-bold text-primary">⭐ {averageScore}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Ratings</p>
                <p className="text-3xl font-bold text-foreground">{project.ratings.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="text-xl font-semibold text-green-600">Published</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ratings Section */}
        {project.ratings && project.ratings.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Community Ratings</h2>
            <div className="space-y-3">
              {project.ratings.map((rating) => (
                <Card key={rating.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-foreground">{rating.user.name}</p>
                      <div className="flex gap-4 text-sm">
                        <span>🎨 {rating.creativity}</span>
                        <span>⚡ {rating.usefulness}</span>
                        <span>😈 {rating.cursedness}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💯</span>
                      <span className="font-bold text-primary">
                        {((rating.vibes + rating.creativity + rating.usefulness + rating.cursedness) / 4).toFixed(1)}/10
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}