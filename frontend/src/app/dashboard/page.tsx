import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { fetchGitHubData } from '@/lib/github';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return <p>You must be signed in</p>;
  }

  const { originalRepos, forkedRepos, pullRequests } = await fetchGitHubData(
    session.accessToken
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your GitHub Repos</h1>
      <ul>
        {originalRepos.map((repo: any) => (
          <li key={repo.id}>{repo.full_name}</li>
        ))}
      </ul>

      <h2>Forked Repositories</h2>
      <ul>
        {forkedRepos.map((repo: any) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank">
              {repo.full_name}
            </a>
          </li>
        ))}
      </ul>

      <h2>Your Pull Requests</h2>
      <ul>
        {pullRequests.items?.map((pr: any) => (
          <li key={pr.id}>
            <a href={pr.html_url} target="_blank">
              {pr.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
