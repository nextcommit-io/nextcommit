import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { fetchGitHubData } from '@/lib/github';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return <p>You must be signed in</p>;
  }

  const { originalRepos, forkedRepos, pullRequests, commits } =
    await fetchGitHubData(session.accessToken);

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
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.full_name}
            </a>
          </li>
        ))}
      </ul>

      <h2>Your Pull Requests</h2>
      <ul>
        {pullRequests.items?.map((pr: any) => (
          <li key={pr.id}>
            <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
              {pr.title}
            </a>
          </li>
        ))}
      </ul>

      <h2>Your Commits</h2>
      {commits.map((repoCommits: any) => (
        <div key={repoCommits.repo}>
          <h3>{repoCommits.repo}</h3>
          {repoCommits.commits.map((commit: any) => (
            <div key={commit.sha} style={{ marginBottom: '2rem' }}>
              <a
                href={commit.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{commit.message}</strong>
              </a>
              <ul>
                {commit.files.map((file: any) => (
                  <li key={file.filename} style={{ marginTop: '1rem' }}>
                    <p>
                      <strong>{file.filename}</strong> ({file.status})
                    </p>
                    {file.patch ? (
                      <pre
                        style={{
                          backgroundColor: '#f6f8fa',
                          padding: '1rem',
                          overflowX: 'auto',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {file.patch}
                      </pre>
                    ) : (
                      <p>No text diff available</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
