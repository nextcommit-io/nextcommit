import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { fetchGitHubData } from '@/lib/github';
import { ProfileClient } from './profile-client';
import { HeaderContainer, FooterContainer } from '@/containers';

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
