
"use client";

import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/user/user.service";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, List, LayoutGrid, UserCircle2 } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  bio?: string | null;
  createdAt: string;
}

interface UserProject {
  id: string;
  title: string;
  createdAt: string;
}

interface RatingActivity {
  activityType: "rating";
  id: string;
  createdAt: string;
  vibes: number;
  creativity: number;
  usefulness: number;
  cursedness: number;
  project: {
    id: string;
    title: string;
    screenshot: string | null;
  };
}

interface CommentActivity {
  activityType: "comment";
  id: string;
  content: string;
  type: string;
  createdAt: string;
  project: {
    id: string;
    title: string;
    screenshot: string | null;
  };
}

type UserActivityItem = RatingActivity | CommentActivity;

export default function DashboardPage() {
  const { login } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formValues, setFormValues] = useState({ name: "", bio: "" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [activity, setActivity] = useState<UserActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(profile?.avatarUrl || "");
      return;
    }

    const objectUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [avatarFile, profile?.avatarUrl]);

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      const [profileRes, projectsRes, activityRes] = await Promise.all([
        userService.getProfile(),
        userService.getMyProjects(),
        userService.getActivity({ limit: 6 }),
      ]);

      if (profileRes.data) {
        setProfile(profileRes.data);
        setFormValues({ name: profileRes.data.name, bio: profileRes.data.bio || "" });
      } else {
        toast.error(profileRes.error || "Could not load profile.");
      }

      if (projectsRes.data) {
        setProjects(projectsRes.data.projects || []);
      } else {
        toast.error(projectsRes.error || "Could not load projects.");
      }

      if (activityRes.data) {
        setActivity(activityRes.data.activity || []);
      } else {
        toast.error(activityRes.error || "Could not load activity.");
      }

      setIsLoading(false);
    };

    loadDashboard();
  }, []);

  const handleChange = (field: "name" | "bio", value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAvatarFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!profile) return;
    if (formValues.name.trim().length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }

    const formData = new FormData();
    formData.append("name", formValues.name.trim());
    formData.append("bio", formValues.bio.trim());
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    setIsSubmitting(true);
    const { data, error } = await userService.updateProfile(formData);

    if (error) {
      toast.error(error);
      setIsSubmitting(false);
      return;
    }

    if (data) {
      setProfile(data);
      setFormValues({ name: data.name, bio: data.bio || "" });
      const token = localStorage.getItem("token");
      if (token) {
        login(token, data);
      }
      toast.success("Profile updated successfully.");
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-3">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Dashboard</div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Account overview</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Review your profile, update account details, and track recent activity.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <Card className="sticky top-6 border border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle>Sections</CardTitle>
                <CardDescription>Navigate your dashboard.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="#profile" className="block rounded-2xl border border-border/70 bg-muted px-4 py-3 text-sm font-medium text-foreground transition hover:bg-primary/10">
                  Profile
                </a>
                <a href="#activity" className="block rounded-2xl border border-border/70 bg-muted px-4 py-3 text-sm font-medium text-foreground transition hover:bg-primary/10">
                  Activity
                </a>
                <a href="#projects" className="block rounded-2xl border border-border/70 bg-muted px-4 py-3 text-sm font-medium text-foreground transition hover:bg-primary/10">
                  Projects
                </a>
              </CardContent>
            </Card>

            <Card className="border border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle>Quick stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-border/70 bg-muted p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Projects</p>
                      <p className="mt-2 text-2xl font-bold text-foreground">{projects.length}</p>
                    </div>
                    <LayoutGrid className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-muted p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Activity</p>
                      <p className="mt-2 text-2xl font-bold text-foreground">{activity.length}</p>
                    </div>
                    <List className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="space-y-8">
            <section id="profile" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
                <Card className="border border-border/70 shadow-sm">
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Review your current account details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-muted p-6 sm:flex-row sm:items-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {profile?.avatarUrl ? (
                          <img src={profile.avatarUrl} alt={profile.name} className="h-24 w-24 rounded-full object-cover" />
                        ) : (
                          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary">
                            {profile?.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h2 className="text-xl font-semibold text-foreground">{profile?.name}</h2>
                          <p className="text-sm text-muted-foreground">{profile?.email}</p>
                        </div>
                        <p className="text-sm leading-6 text-foreground">{profile?.bio || "No biography yet. Add a short bio below."}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Member since {profile?.createdAt ? new Date(profile?.createdAt).toLocaleDateString() : ""}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border/70 shadow-sm">
                  <CardHeader>
                    <CardTitle>Update profile</CardTitle>
                    <CardDescription>Change your name, bio, or avatar.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formValues.name}
                          onChange={(event) => handleChange("name", event.target.value)}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={formValues.bio}
                          onChange={(event) => handleChange("bio", event.target.value)}
                          placeholder="A short biography"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Avatar</Label>
                        <input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="block w-full rounded-xl border border-border/70 bg-background p-2 text-sm text-foreground"
                        />
                      </div>
                      {avatarPreview && (
                        <div className="rounded-3xl overflow-hidden border border-border shadow-sm">
                          <img src={avatarPreview} alt="Avatar preview" className="w-full object-cover" />
                        </div>
                      )}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                          {isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() => {
                            setFormValues({ name: profile?.name || "", bio: profile?.bio || "" });
                            setAvatarFile(null);
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="activity" className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Recent activity</h2>
                  <p className="text-sm text-muted-foreground">Latest ratings and comments from your account.</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-muted px-4 py-2 text-sm text-foreground">
                  {activity.length} items
                </div>
              </div>
              <Card className="border border-border/70 shadow-sm">
                <CardContent className="space-y-4">
                  {activity.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No activity found yet.</p>
                  ) : (
                    activity.map((item) => (
                      <div key={item.id} className="rounded-3xl border border-border/70 bg-muted p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                              <UserCircle2 className="h-4 w-4 text-primary" />
                              {item.activityType === "rating" ? "Rating" : "Comment"} on {item.project.title}
                            </div>
                            <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</p>
                          </div>
                          <Badge variant="secondary" className="rounded-full px-2 py-1 text-xs font-semibold">
                            {item.activityType}
                          </Badge>
                        </div>
                        <div className="mt-3 text-sm leading-6 text-foreground">
                          {item.activityType === "rating" ? (
                            <>
                              Vibes: {item.vibes}, Creativity: {item.creativity}, Usefulness: {item.usefulness}, Cursedness: {item.cursedness}
                            </>
                          ) : (
                            <>
                              <span className="font-medium">{item.type.toLowerCase()}</span>: {item.content}
                            </>
                          )}
                        </div>
                        <a href={`/project/${item.project.id}`} className="mt-3 inline-block text-sm font-medium text-primary transition hover:underline">
                          View project details
                        </a>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </section>

            <section id="projects" className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Your projects</h2>
                  <p className="text-sm text-muted-foreground">Latest projects you created on the platform.</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-muted px-4 py-2 text-sm text-foreground">
                  {projects.length} projects
                </div>
              </div>
              <Card className="border border-border/70 shadow-sm">
                <CardContent className="space-y-4">
                  {projects.length === 0 ? (
                    <p className="text-sm text-muted-foreground">You have not created any projects yet.</p>
                  ) : (
                    projects.map((project) => (
                      <div key={project.id} className="rounded-3xl border border-border/70 bg-muted p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
                            <p className="text-sm text-muted-foreground">Created {new Date(project.createdAt).toLocaleDateString()}</p>
                          </div>
                          <a href={`/project/${project.id}`} className="text-sm font-medium text-primary transition hover:underline">
                            View project
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
