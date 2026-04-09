"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { projectService } from "@/services/projects/project.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ImagePlus, Tag, ArrowRight, Globe, GitBranch, Sparkles } from "lucide-react";

const initialState = {
  title: "",
  description: "",
  promptUsed: "",
  siteUrl: "",
  repoUrl: "",
  tags: "",
};

export default function NewProjectPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState(initialState);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!screenshotFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(screenshotFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [screenshotFile]);

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

    if (!screenshotFile) {
      toast.error("Please upload a screenshot for your project.");
      return;
    }

    const formData = new FormData();
    formData.append("title", formValues.title.trim());
    formData.append("description", formValues.description.trim());
    formData.append("promptUsed", formValues.promptUsed.trim());

    if (formValues.siteUrl.trim()) {
      formData.append("siteUrl", formValues.siteUrl.trim());
    }

    if (formValues.repoUrl.trim()) {
      formData.append("repoUrl", formValues.repoUrl.trim());
    }

    tags.forEach((tag) => formData.append("tags", tag));
    formData.append("screenshot", screenshotFile);

    setIsSubmitting(true);

    const { data, error } = await projectService.createProject(formData);

    setIsSubmitting(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Project submitted successfully!");
    if (data?.id) {
      router.push(`/project/${data.id}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="size-4" /> Create Project
          </div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Post your project with confidence</h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Complete the form to publish your project. Add a screenshot, a short description, your prompt or idea, and optional repo or live links.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <Card className="border border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle>Create project details</CardTitle>
                <CardDescription>Use clear titles and a strong description so others can understand your build.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project title</Label>
                    <Input
                      id="title"
                      value={formValues.title}
                      onChange={(event) => handleChange("title", event.target.value)}
                      placeholder="A bold, descriptive title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project description</Label>
                    <Textarea
                      id="description"
                      rows={6}
                      value={formValues.description}
                      onChange={(event) => handleChange("description", event.target.value)}
                      placeholder="Describe what your project does, who it's for, and what makes it special."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promptUsed">Prompt Used</Label>
                    <Textarea
                      id="promptUsed"
                      rows={4}
                      value={formValues.promptUsed}
                      onChange={(event) => handleChange("promptUsed", event.target.value)}
                      placeholder="Enter the prompt or concept you used to create this project."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle>Media & tags</CardTitle>
                <CardDescription>Upload one screenshot and add tags to make your project more discoverable.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="screenshot">Screenshot</Label>
                  <div className="rounded-3xl border border-dashed border-border/70 p-4">
                    <label className="group flex min-h-[180px] flex-col items-center justify-center rounded-3xl border border-transparent bg-muted/40 px-4 py-6 text-center transition hover:border-border hover:bg-muted">
                      <ImagePlus className="mb-3 size-7 text-primary transition group-hover:scale-105" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Choose a project screenshot</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, or WebP. Max file size enforced by your browser.</p>
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
                  <p className="text-xs text-muted-foreground">Separate tags with commas. Example: <span className="font-semibold">react, tailwind, api</span>.</p>
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
                <CardTitle>Post checklist</CardTitle>
                <CardDescription>Review the details before publishing so your project looks polished.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Sparkles className="size-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Strong first impression</p>
                      <p>Use a crisp title and concise description.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="size-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Resources</p>
                      <p>Optional live site and repo links help visitors evaluate your project.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GitBranch className="size-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Tags</p>
                      <p>Include 2–4 tags for easier discoverability.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-border/70 bg-muted/70 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Tip</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/90">
                    Projects with clean screenshots and real live/demo links get more attention. Keep your prompt or idea clear so others can reuse it.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish project"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-[0.25em]">Preview guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><ArrowRight className="size-4 text-primary" /> Add a screenshot that clearly shows your app or interface.</p>
                <p className="flex items-center gap-2"><ArrowRight className="size-4 text-primary" /> Include a repo if you want contributors to inspect the code.</p>
                <p className="flex items-center gap-2"><ArrowRight className="size-4 text-primary" /> Keep the prompt short but descriptive.</p>
              </CardContent>
            </Card>
          </aside>
        </form>
      </div>
    </div>
  );
}
