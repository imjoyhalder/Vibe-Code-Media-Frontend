"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { projectService } from "@/services/projects/project.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ImagePlus, Tag, ArrowRight, Globe, GitBranch, Sparkles, Loader } from "lucide-react";

const initialState = {
  title: "",
  description: "",
  promptUsed: "",
  siteUrl: "",
  repoUrl: "",
  tags: "",
};

interface EditProject {
  id: string;
  title: string;
  description: string;
  promptUsed: string;
  siteUrl?: string;
  repoUrl?: string;
  screenshot: string;
  tags: Array<{ id: string; name: string }>;
}

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [formValues, setFormValues] = useState(initialState);
  const [project, setProject] = useState<EditProject | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!screenshotFile && project?.screenshot) {
      setPreviewUrl(project.screenshot);
      return;
    }

    if (!screenshotFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(screenshotFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [screenshotFile, project]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!params.id) return;

      try {
        setIsLoading(true);
        const { data, error } = await projectService.getProjectById(params.id);

        if (error) {
          toast.error(error);
          router.push("/");
          return;
        }

        if (data) {
          setProject(data);
          setFormValues({
            title: data.title,
            description: data.description,
            promptUsed: data.promptUsed,
            siteUrl: data.siteUrl || "",
            repoUrl: data.repoUrl || "",
            tags: data.tags.map((t: { id: string; name: string }) => t.name).join(", "),
          });
        }
      } catch (err) {
        toast.error("Failed to load project");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.id, router]);

  const tags = useMemo(
    () =>
      formValues.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [formValues.tags]
  );

  const handleChange = (field: keyof typeof initialState, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleScreenshot = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setScreenshotFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!project) return;

    if (formValues.title.trim().length < 3) {
      toast.error("Title must be at least 3 characters.");
      return;
    }

    if (formValues.description.trim().length < 10) {
      toast.error("Description must be at least 10 characters.");
      return;
    }

    if (formValues.promptUsed.trim().length < 1) {
      toast.error("Prompt used is required.");
      return;
    }

    setIsSubmitting(true);

    const updateData = screenshotFile ? new FormData() : {};

    if (screenshotFile instanceof FormData || typeof updateData === "object") {
      if (screenshotFile) {
        const fd = new FormData();
        fd.append("title", formValues.title.trim());
        fd.append("description", formValues.description.trim());
        fd.append("promptUsed", formValues.promptUsed.trim());
        if (formValues.siteUrl.trim()) fd.append("siteUrl", formValues.siteUrl.trim());
        if (formValues.repoUrl.trim()) fd.append("repoUrl", formValues.repoUrl.trim());
        tags.forEach((tag) => fd.append("tags", tag));
        fd.append("screenshot", screenshotFile);
        const { error } = await projectService.updateProject(project.id, fd);
        if (error) {
          toast.error(error);
          setIsSubmitting(false);
          return;
        }
      } else {
        const jsonData = {
          title: formValues.title.trim(),
          description: formValues.description.trim(),
          promptUsed: formValues.promptUsed.trim(),
          ...(formValues.siteUrl.trim() && { siteUrl: formValues.siteUrl.trim() }),
          ...(formValues.repoUrl.trim() && { repoUrl: formValues.repoUrl.trim() }),
          tags: tags.length > 0 ? tags : undefined,
        };
        const { error } = await projectService.updateProject(project.id, jsonData);
        if (error) {
          toast.error(error);
          setIsSubmitting(false);
          return;
        }
      }
    }

    setIsSubmitting(false);
    toast.success("Project updated successfully!");
    router.push(`/project/${project.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="size-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="size-4" /> Edit Project
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Update your project</h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Modify project details, screenshot, and metadata.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <Card className="border border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle>Update project details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project title</Label>
                    <Input
                      id="title"
                      value={formValues.title}
                      onChange={(event) => handleChange("title", event.target.value)}
                      placeholder="Project title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project description</Label>
                    <Textarea
                      id="description"
                      rows={6}
                      value={formValues.description}
                      onChange={(event) => handleChange("description", event.target.value)}
                      placeholder="Project description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promptUsed">Prompt / idea</Label>
                    <Textarea
                      id="promptUsed"
                      rows={4}
                      value={formValues.promptUsed}
                      onChange={(event) => handleChange("promptUsed", event.target.value)}
                      placeholder="Prompt or concept"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle>Media & tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="screenshot">Screenshot (optional)</Label>
                  <div className="rounded-3xl border border-dashed border-border/70 p-4">
                    <label className="group flex min-h-[180px] flex-col items-center justify-center rounded-3xl border border-transparent bg-muted/40 px-4 py-6 text-center transition hover:border-border hover:bg-muted">
                      <ImagePlus className="mb-3 size-7 text-primary transition group-hover:scale-105" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Update screenshot (optional)</p>
                        <p className="text-xs text-muted-foreground">Leave blank to keep current image.</p>
                      </div>
                      <input
                        id="screenshot"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleScreenshot}
                      />
                    </label>
                  </div>

                  {previewUrl && (
                    <div className="rounded-3xl overflow-hidden border border-border shadow-sm">
                      <img src={previewUrl} alt="Screenshot preview" className="w-full h-64 object-cover" />
                    </div>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">Live site URL</Label>
                    <Input
                      id="siteUrl"
                      type="url"
                      value={formValues.siteUrl}
                      onChange={(event) => handleChange("siteUrl", event.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repoUrl">Repository URL</Label>
                    <Input
                      id="repoUrl"
                      type="url"
                      value={formValues.repoUrl}
                      onChange={(event) => handleChange("repoUrl", event.target.value)}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formValues.tags}
                    onChange={(event) => handleChange("tags", event.target.value)}
                    placeholder="web3, AI, productivity"
                  />
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full px-2 py-1 text-xs font-semibold">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="sticky top-6 border border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle>Save changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </aside>
        </form>
      </div>
    </div>
  );
}
