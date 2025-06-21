import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { fetchGitHubData } from '@/lib/github';
import { ProfileClient } from './profile-client';
import { HeaderContainer, FooterContainer } from '@/containers';

// Contribution scoring algorithm
const calculateContributionScore = (data: any) => {
  const { originalRepos, forkedRepos, pullRequests, commits } = data;

  let score = 0;
  const metrics = {
    repositories: 0,
    stars: 0,
    forks: 0,
    pullRequests: 0,
    commits: 0,
    languages: 0,
    experience: 0,
  };

  // Repository contributions (weight: 30%)
  const totalRepos = originalRepos.length + forkedRepos.length;
  metrics.repositories = totalRepos * 10;
  score += metrics.repositories * 0.3;

  // Stars earned (weight: 20%)
  const totalStars = originalRepos.reduce(
    (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
    0
  );
  metrics.stars = totalStars * 2;
  score += metrics.stars * 0.2;

  // Forks received (weight: 15%)
  const totalForks = originalRepos.reduce(
    (sum: number, repo: any) => sum + (repo.forks_count || 0),
    0
  );
  metrics.forks = totalForks * 3;
  score += metrics.forks * 0.15;

  // Pull requests (weight: 20%)
  const totalPRs = pullRequests.items?.length || 0;
  metrics.pullRequests = totalPRs * 15;
  score += metrics.pullRequests * 0.2;

  // Commits (weight: 10%)
  const totalCommits = commits.reduce(
    (sum: number, repoCommits: any) => sum + repoCommits.commits.length,
    0
  );
  metrics.commits = totalCommits * 5;
  score += metrics.commits * 0.1;

  // Language diversity (weight: 5%)
  const languageStats: { [key: string]: number } = {};
  originalRepos.forEach((repo: any) => {
    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
    }
  });
  const uniqueLanguages = Object.keys(languageStats).length;
  metrics.languages = uniqueLanguages * 20;
  score += metrics.languages * 0.05;

  // Experience level calculation
  const experienceLevel = calculateExperienceLevel(score);
  metrics.experience = experienceLevel.score;

  return {
    totalScore: Math.round(score),
    metrics,
    experienceLevel,
    breakdown: {
      repositories: { count: totalRepos, score: metrics.repositories },
      stars: { count: totalStars, score: metrics.stars },
      forks: { count: totalForks, score: metrics.forks },
      pullRequests: { count: totalPRs, score: metrics.pullRequests },
      commits: { count: totalCommits, score: metrics.commits },
      languages: { count: uniqueLanguages, score: metrics.languages },
    },
  };
};

const calculateExperienceLevel = (score: number) => {
  if (score >= 1000)
    return { level: 'Senior', badge: '🏆', color: '#ffd700', score: 1000 };
  if (score >= 500)
    return { level: 'Intermediate', badge: '⭐', color: '#c0c0c0', score: 500 };
  if (score >= 200)
    return { level: 'Junior+', badge: '🚀', color: '#cd7f32', score: 200 };
  if (score >= 100)
    return { level: 'Junior', badge: '🌱', color: '#90EE90', score: 100 };
  return { level: 'Beginner', badge: '🌱', color: '#90EE90', score: 50 };
};

const getContributionBadges = (data: any) => {
  const badges = [];
  const { originalRepos, forkedRepos, pullRequests, commits } = data;

  // Repository badges
  if (originalRepos.length >= 10)
    badges.push({ name: 'Repository Master', icon: '📚', color: '#ff6b6b' });
  else if (originalRepos.length >= 5)
    badges.push({ name: 'Project Creator', icon: '📁', color: '#4ecdc4' });
  else if (originalRepos.length >= 1)
    badges.push({ name: 'First Project', icon: '🎯', color: '#45b7d1' });

  // Star badges
  const totalStars = originalRepos.reduce(
    (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
    0
  );
  if (totalStars >= 100)
    badges.push({ name: 'Star Collector', icon: '⭐', color: '#ffd700' });
  else if (totalStars >= 50)
    badges.push({ name: 'Rising Star', icon: '✨', color: '#ffb6c1' });
  else if (totalStars >= 10)
    badges.push({ name: 'Getting Noticed', icon: '🌟', color: '#98fb98' });

  // Contribution badges
  const totalPRs = pullRequests.items?.length || 0;
  if (totalPRs >= 20)
    badges.push({ name: 'Open Source Hero', icon: '🦸', color: '#ff6b6b' });
  else if (totalPRs >= 10)
    badges.push({ name: 'Active Contributor', icon: '🤝', color: '#4ecdc4' });
  else if (totalPRs >= 5)
    badges.push({ name: 'Team Player', icon: '👥', color: '#45b7d1' });
  else if (totalPRs >= 1)
    badges.push({ name: 'First Contribution', icon: '🎉', color: '#98fb98' });

  // Language badges
  const languageStats: { [key: string]: number } = {};
  originalRepos.forEach((repo: any) => {
    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
    }
  });
  const uniqueLanguages = Object.keys(languageStats).length;
  if (uniqueLanguages >= 5)
    badges.push({ name: 'Polyglot Developer', icon: '🌍', color: '#ff6b6b' });
  else if (uniqueLanguages >= 3)
    badges.push({ name: 'Multi-Language', icon: '🔤', color: '#4ecdc4' });
  else if (uniqueLanguages >= 2)
    badges.push({ name: 'Versatile', icon: '🔄', color: '#45b7d1' });

  return badges;
};

// Process and extract high-value code snippets
const processCodeSnippets = (commits: any[]) => {
  const allCommits = commits.flatMap((repoCommits: any) =>
    repoCommits.commits.map((commit: any) => ({
      ...commit,
      repoName: repoCommits.repo,
      repoStars: repoCommits.repoStars,
      repoLanguage: repoCommits.repoLanguage,
    }))
  );

  // Sort by value and get top commits
  const topCommits = allCommits
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 5);

  return topCommits.map((commit: any) => {
    // Extract the most significant file changes
    const significantFiles = commit.files
      .filter(
        (file: any) =>
          file.patch &&
          (file.filename.includes('.js') ||
            file.filename.includes('.ts') ||
            file.filename.includes('.py') ||
            file.filename.includes('.java') ||
            file.filename.includes('.cpp') ||
            file.filename.includes('.go') ||
            file.filename.includes('.tsx') ||
            file.filename.includes('.jsx'))
      )
      .slice(0, 2); // Limit to 2 files per commit

    return {
      ...commit,
      significantFiles: significantFiles.map((file: any) => ({
        filename: file.filename,
        status: file.status,
        additions: file.additions,
        deletions: file.deletions,
        patch: file.patch,
        language: getLanguageFromFilename(file.filename),
      })),
    };
  });
};

const getLanguageFromFilename = (filename: string) => {
  if (filename.includes('.ts') || filename.includes('.tsx'))
    return 'TypeScript';
  if (filename.includes('.js') || filename.includes('.jsx'))
    return 'JavaScript';
  if (filename.includes('.py')) return 'Python';
  if (filename.includes('.java')) return 'Java';
  if (filename.includes('.cpp') || filename.includes('.cc')) return 'C++';
  if (filename.includes('.go')) return 'Go';
  if (filename.includes('.rs')) return 'Rust';
  if (filename.includes('.php')) return 'PHP';
  if (filename.includes('.rb')) return 'Ruby';
  return 'Other';
};

const formatCodeSnippet = (patch: string, maxLines: number = 15) => {
  if (!patch) return '';

  const lines = patch.split('\n');
  const formattedLines = lines.slice(0, maxLines).map((line: string) => {
    if (line.startsWith('+'))
      return { type: 'addition', content: line.substring(1) };
    if (line.startsWith('-'))
      return { type: 'deletion', content: line.substring(1) };
    return { type: 'context', content: line };
  });

  return formattedLines;
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return (
      <>
        <HeaderContainer />
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
            color: '#ff6b6b',
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          Please sign in to view your profile
        </div>
        <FooterContainer />
      </>
    );
  }

  try {
    const { originalRepos, forkedRepos, pullRequests, commits } =
      await fetchGitHubData(session.accessToken);

    // Calculate contribution score and experience
    const contributionScore = calculateContributionScore({
      originalRepos,
      forkedRepos,
      pullRequests,
      commits,
    });
    const badges = getContributionBadges({
      originalRepos,
      forkedRepos,
      pullRequests,
      commits,
    });

    // Process high-value code snippets
    const codeSnippets = processCodeSnippets(commits);

    // Calculate stats from real data
    const totalStars = originalRepos.reduce(
      (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
      0
    );
    const totalForks = originalRepos.reduce(
      (sum: number, repo: any) => sum + (repo.forks_count || 0),
      0
    );
    const totalContributions = pullRequests.items?.length || 0;
    const totalCommits = commits.reduce(
      (sum: number, repoCommits: any) => sum + repoCommits.commits.length,
      0
    );

    // Get user's top languages
    const languageStats: { [key: string]: number } = {};
    originalRepos.forEach((repo: any) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });
    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([lang]) => lang);

    // Create activity items from real data
    const recentActivity = [];

    // Add recent commits
    commits.slice(0, 2).forEach((repoCommits: any) => {
      repoCommits.commits.forEach((commit: any) => {
        recentActivity.push({
          type: 'commit',
          title: `Committed to ${repoCommits.repo}`,
          meta: `${commit.message.substring(0, 50)}...`,
          time: 'Recently',
          icon: 'code',
        });
      });
    });

    // Add recent pull requests
    if (pullRequests.items) {
      pullRequests.items.slice(0, 2).forEach((pr: any) => {
        recentActivity.push({
          type: 'pr',
          title: `Opened PR: ${pr.title.substring(0, 40)}...`,
          meta: `in ${pr.repository?.full_name || 'unknown repo'}`,
          time: 'Recently',
          icon: 'users',
        });
      });
    }

    // Add repository creation
    if (originalRepos.length > 0) {
      recentActivity.push({
        type: 'repo',
        title: `Created ${originalRepos.length} repositories`,
        meta: 'Your original projects',
        time: 'Recently',
        icon: 'star',
      });
    }

    const profileData = {
      user: session.user,
      stats: {
        starsEarned: totalStars,
        repositories: originalRepos.length,
        contributions: totalContributions,
        achievements:
          Math.floor(totalCommits / 10) + Math.floor(totalStars / 10),
      },
      contributionScore,
      badges,
      codeSnippets,
      topLanguages,
      recentActivity,
      repositories: originalRepos,
      forkedRepos,
      pullRequests: pullRequests.items || [],
    };

    return (
      <>
        <HeaderContainer />
        <ProfileClient profileData={profileData} />
        <FooterContainer />
      </>
    );
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return (
      <>
        <HeaderContainer />
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
            color: '#ff6b6b',
            fontSize: '18px',
            fontWeight: '500',
          }}
        >
          Error loading profile data. Please try again later.
        </div>
        <FooterContainer />
      </>
    );
  }
}
