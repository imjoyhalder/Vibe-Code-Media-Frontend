export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  bio?: string | null;
  createdAt?: string | null;
}

export interface ProjectTag {
  id: string;
  name: string;
}

export interface ProjectRating {
  id: string;
  vibes: number;
  creativity: number;
  usefulness: number;
  cursedness: number;
  createdAt: string;
}

export interface ProjectComment {
  id: string;
  content: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
}

export interface UserProject {
  id: string;
  title: string;
  description: string;
  promptUsed?: string | null;
  siteUrl?: string | null;
  repoUrl?: string | null;
  screenshot?: string | null;
  tags?: ProjectTag[];
  ratings?: ProjectRating[];
  comments?: ProjectComment[];
  createdAt?: string;
}

export interface ActivityProject {
  id: string;
  title: string;
  screenshot?: string | null;
}

export interface RatingActivity {
  id: string;
  activityType: "rating";
  project: ActivityProject;
  vibes: number;
  creativity: number;
  usefulness: number;
  cursedness: number;
  createdAt: string;
}

export interface CommentActivity {
  id: string;
  activityType: "comment";
  project: ActivityProject;
  content: string;
  createdAt: string;
}

export type UserActivityItem = RatingActivity | CommentActivity;

export interface UserProjectResponse {
  projects: UserProject[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface UserActivityResponse {
  activity: UserActivityItem[];
  total: number;
  page: number;
  limit: number;
}
