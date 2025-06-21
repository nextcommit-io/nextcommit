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

  // Sort repos by stars to identify high-value repositories
  const sortedRepos = originalRepos.sort(
    (a: any, b: any) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
  );

  // Fetch detailed commits with code snippets for top repositories (limit to 3)
  const commits = await Promise.all(
    sortedRepos.slice(0, 3).map(async (repo: any) => {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${repo.full_name}/commits`,
        { headers }
      );
      const commitList = await commitsRes.json();

      // Get detailed information for the most recent commits
      const detailedCommits = await Promise.all(
        commitList.slice(0, 3).map(async (commit: any) => {
          const commitDetailRes = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits/${commit.sha}`,
            { headers }
          );
          const commitDetail = await commitDetailRes.json();

          // Calculate commit value based on various factors
          const commitValue = calculateCommitValue(commitDetail, repo);

          return {
            sha: commit.sha,
            message: commit.commit.message,
            html_url: commit.html_url,
            date: commit.commit.author.date,
            files: commitDetail.files || [],
            value: commitValue,
            repo: repo.full_name,
            repoStars: repo.stargazers_count || 0,
            repoLanguage: repo.language,
          };
        })
      );

      return {
        repo: repo.full_name,
        repoStars: repo.stargazers_count || 0,
        repoLanguage: repo.language,
        commits: detailedCommits,
      };
    })
  );

  return { originalRepos, forkedRepos, pullRequests, commits };
}

// Calculate the value of a commit based on various factors
const calculateCommitValue = (commitDetail: any, repo: any) => {
  let value = 0;

  // Base value for any commit
  value += 10;

  // Value based on repository popularity
  const repoStars = repo.stargazers_count || 0;
  if (repoStars >= 1000) value += 50;
  else if (repoStars >= 500) value += 30;
  else if (repoStars >= 100) value += 20;
  else if (repoStars >= 50) value += 10;

  // Value based on number of files changed
  const filesChanged = commitDetail.files?.length || 0;
  if (filesChanged > 10) value += 30;
  else if (filesChanged > 5) value += 20;
  else if (filesChanged > 1) value += 10;

  // Value based on lines of code added/removed
  const additions = commitDetail.stats?.additions || 0;
  const deletions = commitDetail.stats?.deletions || 0;
  const totalChanges = additions + deletions;

  if (totalChanges > 100) value += 25;
  else if (totalChanges > 50) value += 15;
  else if (totalChanges > 10) value += 10;

  // Value based on commit message quality (indicating good practices)
  const message = commitDetail.commit?.message || '';
  if (
    message.length > 50 &&
    !message.includes('fix') &&
    !message.includes('update')
  )
    value += 15;
  if (
    message.includes('feat') ||
    message.includes('add') ||
    message.includes('implement')
  )
    value += 10;

  // Value based on file types (more complex files = higher value)
  const complexFiles =
    commitDetail.files?.filter(
      (file: any) =>
        file.filename.includes('.js') ||
        file.filename.includes('.ts') ||
        file.filename.includes('.py') ||
        file.filename.includes('.java') ||
        file.filename.includes('.cpp') ||
        file.filename.includes('.go')
    ).length || 0;

  value += complexFiles * 5;

  return value;
};
