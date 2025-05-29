export interface OpenSourceProject {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  currentPeriodStars: number;
  avatar: string;
  builtBy: { username: string; href: string; avatar: string }[];
  tags?: string[];
}
