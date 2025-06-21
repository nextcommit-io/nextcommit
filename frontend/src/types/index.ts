export * from './open-source-project';

export interface Repo {
  name: string;
  stars: number;
  url: string;
  description: string;
  language: string;
  updatedAt: string;
  isFork?: boolean;
}

export interface Commit {
  sha: string;
  message: string;
  repo: string;
  url: string;
  date: string;
  author: string;
  fullSha: string;
}

export interface UserProfile {
  avatar: string;
  name: string;
  bio: string;
  totalCommits: number;
  topRepos: Repo[];
  commits: Commit[];
}
