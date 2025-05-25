export async function fetchGitHubData(accessToken: string) {
  const headers = {
    Authorization: `token ${accessToken}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const [repos, pullRequests] = await Promise.all([
    fetch('https://api.github.com/user/repos?per_page=100', { headers }).then(
      (res) => res.json()
    ),
    fetch('https://api.github.com/search/issues?q=is:pr+author:@me', {
      headers,
    }).then((res) => res.json()),
  ]);

  // Split into forks and originals
  const forkedRepos = repos.filter((repo: any) => repo.fork);
  const originalRepos = repos.filter((repo: any) => !repo.fork);

  return { originalRepos, forkedRepos, pullRequests };
}
