export async function fetchGitHubData(accessToken: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/vnd.github+json',
  };

  const [reposRes, prRes] = await Promise.all([
    fetch('https://api.github.com/user/repos', { headers }),
    fetch('https://api.github.com/search/issues?q=is:pr+author:@me', {
      headers,
    }),
  ]);

  const allRepos = await reposRes.json();
  const pullRequests = await prRes.json();

  const originalRepos = allRepos.filter((repo: any) => !repo.fork);
  const forkedRepos = allRepos.filter((repo: any) => repo.fork);

  // Fetch top commit and its code diffs for each original repo (limit to 5 repos)
  const commits = await Promise.all(
    originalRepos.slice(0, 5).map(async (repo: any) => {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${repo.full_name}/commits`,
        { headers }
      );
      const commitList = await commitsRes.json();
      const topCommit = commitList[0];

      if (!topCommit) return { repo: repo.full_name, commits: [] };

      const commitDetailRes = await fetch(
        `https://api.github.com/repos/${repo.full_name}/commits/${topCommit.sha}`,
        { headers }
      );
      const commitDetail = await commitDetailRes.json();

      return {
        repo: repo.full_name,
        commits: [
          {
            sha: topCommit.sha,
            message: topCommit.commit.message,
            html_url: topCommit.html_url,
            files: commitDetail.files || [],
          },
        ],
      };
    })
  );

  return { originalRepos, forkedRepos, pullRequests, commits };
}
