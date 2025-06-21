'use client';
import { useState, useEffect } from 'react';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileContent } from '@/components/profile/profile-content';
import { ProfileEditModal } from '@/components/profile/profile-edit-modal';
import { ProfileStats } from '@/components/profile/profile-stats';
import { ProfileRepositories } from '@/components/profile/profile-repositories';
import { ProfileCommits } from '@/components/profile/profile-commits';
import { ProfileAvatarModal } from '@/components/profile/profile-avatar-modal';
import { useSession } from 'next-auth/react';
import { UserProfile, Repo, Commit } from '@/types';

const ProfileContainer = () => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [customName, setCustomName] = useState('');
  const [customBio, setCustomBio] = useState('');
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [selectedCommits, setSelectedCommits] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'repos' | 'commits'>('repos');
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [allCommits, setAllCommits] = useState<Commit[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      setLoading(false);
      return;
    }
    fetchProfile();
  }, [session, status]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const sessionResponse = await fetch('/api/session');
      if (!sessionResponse.ok) throw new Error('Failed to fetch session');
      const sessionData = await sessionResponse.json();
      if (!sessionData.login) throw new Error('GitHub username not found in session');
      const headers: HeadersInit = { 'Accept': 'application/vnd.github.v3+json' };
      if (sessionData.accessToken) headers['Authorization'] = `token ${sessionData.accessToken}`;
      const userResponse = await fetch(`https://api.github.com/users/${sessionData.login}`, { headers });
      if (!userResponse.ok) throw new Error(`Failed to fetch user data: ${userResponse.status} ${userResponse.statusText}`);
      const userData = await userResponse.json();
      const reposResponse = await fetch(`https://api.github.com/users/${sessionData.login}/repos?sort=stars&per_page=100&type=owner`, { headers });
      if (!reposResponse.ok) throw new Error(`Failed to fetch repositories: ${reposResponse.status} ${reposResponse.statusText}`);
      const reposData = await reposResponse.json();
      let topRepos: Repo[] = reposData
        .filter((repo: { fork: boolean; stargazers_count: number }) => !repo.fork)
        .sort((a: { stargazers_count: number }, b: { stargazers_count: number }) => b.stargazers_count - a.stargazers_count)
        .slice(0, 20)
        .map((repo: { name: string; stargazers_count: number; html_url: string; description: string; language: string; updated_at: string }) => ({
          name: repo.name,
          stars: repo.stargazers_count,
          url: repo.html_url,
          description: repo.description || '',
          language: repo.language || '',
          updatedAt: repo.updated_at
        }));
      if (topRepos.length === 0) {
        topRepos = reposData
          .sort((a: { stargazers_count: number }, b: { stargazers_count: number }) => b.stargazers_count - a.stargazers_count)
          .slice(0, 20)
          .map((repo: { name: string; stargazers_count: number; html_url: string; description: string; language: string; updated_at: string; fork: boolean }) => ({
            name: repo.name,
            stars: repo.stargazers_count,
            url: repo.html_url,
            description: repo.description || '',
            language: repo.language || '',
            updatedAt: repo.updated_at,
            isFork: repo.fork
          }));
      }
      const commits: Commit[] = [];
      for (const repo of topRepos.slice(0, 10)) {
        try {
          const commitsResponse = await fetch(`https://api.github.com/repos/${sessionData.login}/${repo.name}/commits?per_page=10&author=${sessionData.login}`, { headers });
          if (commitsResponse.ok) {
            const repoCommits = await commitsResponse.json();
            repoCommits.forEach((commit: any) => {
              commits.push({
                sha: commit.sha.substring(0, 7),
                message: commit.commit.message.split('\n')[0],
                repo: `${sessionData.login}/${repo.name}`,
                url: commit.html_url,
                date: new Date(commit.commit.author.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }),
                author: commit.commit.author.name,
                fullSha: commit.sha
              });
            });
          }
        } catch {}
      }
      const sortedCommits = commits
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 20);
      const profileData: UserProfile = {
        avatar: userData.avatar_url,
        name: userData.name || userData.login,
        bio: userData.bio || '',
        totalCommits: userData.public_repos * 10,
        topRepos,
        commits: sortedCommits.length > 0 ? sortedCommits : [
          {
            sha: 'no-commits',
            message: 'No commits found or commits are private',
            repo: 'GitHub',
            url: `https://github.com/${sessionData.login}`,
            date: 'N/A',
            author: sessionData.login,
            fullSha: 'no-commits'
          }
        ]
      };
      setProfile(profileData);
      setCustomName(profileData.name);
      setCustomBio(profileData.bio);
      setSelectedRepos([]);
      setSelectedCommits([]);
      setAllRepos(topRepos);
      setAllCommits(commits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setCustomAvatar(null);
    setCustomName(profile?.name || '');
    setCustomBio(profile?.bio || '');
  };
  const handleSave = () => {
    if (profile) {
      setProfile({
        ...profile,
        avatar: avatarPreview || profile.avatar,
        name: customName,
        bio: customBio
      });
      setAvatarPreview(null);
    }
    setIsEditing(false);
    setCustomAvatar(null);
  };
  const handleRepoSelection = (repoName: string) => {
    setSelectedRepos(prev =>
      prev.includes(repoName)
        ? prev.filter(name => name !== repoName)
        : prev.length < 3
          ? [...prev, repoName]
          : prev
    );
  };
  const handleCommitSelection = (commitSha: string) => {
    setSelectedCommits(prev =>
      prev.includes(commitSha)
        ? prev.filter(sha => sha !== commitSha)
        : prev.length < 3
          ? [...prev, commitSha]
          : prev
    );
  };

  if (status === 'loading') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        fontSize: 18,
        color: '#6c757d'
      }}>
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        maxWidth: 600,
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: 32,
          color: '#212529',
          marginBottom: 16,
          fontWeight: 600
        }}>
          Sign in to view your profile
        </h2>
        <p style={{
          fontSize: 18,
          color: '#6c757d',
          marginBottom: 32,
          lineHeight: 1.6
        }}>
          Connect your GitHub account to see your profile, repositories, and commit history.
        </p>
        <a
          href="/signin"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => (e.target as HTMLAnchorElement).style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => (e.target as HTMLAnchorElement).style.transform = 'translateY(0)'}
        >
          Sign in with GitHub
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        fontSize: 18,
        color: '#6c757d',
        flexDirection: 'column',
        gap: 16
      }}>
        <div>{'Loading your profile...'}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        maxWidth: 600,
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: 32,
          color: '#dc3545',
          marginBottom: 16,
          fontWeight: 600
        }}>
          Error loading profile
        </h2>
        <p style={{
          fontSize: 18,
          color: '#6c757d',
          marginBottom: 32,
          lineHeight: 1.6
        }}>
          {error}
        </p>
        <button
          onClick={fetchProfile}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.transform = 'translateY(0)'}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '40px 20px',
      minHeight: '100vh'
    }}>
      <ProfileHeader
        profile={profile}
        customAvatar={customAvatar}
        isEditing={isEditing}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
        onAvatarClick={() => setShowFileInput(true)}
      />
      <ProfileContent>
        <ProfileStats
          totalCommits={profile.totalCommits}
        />
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: 'flex',
            gap: 8,
            marginBottom: 16,
            borderBottom: '2px solid #e9ecef',
            paddingBottom: 8
          }}>
            <button
              onClick={() => setViewMode('repos')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: viewMode === 'repos' ? '#007bff' : 'transparent',
                color: viewMode === 'repos' ? 'white' : '#6c757d',
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              Featured Repositories
            </button>
            <button
              onClick={() => setViewMode('commits')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: viewMode === 'commits' ? '#007bff' : 'transparent',
                color: viewMode === 'commits' ? 'white' : '#6c757d',
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              Featured Commits
            </button>
          </div>
          {viewMode === 'repos' ? (
            <ProfileRepositories
              repositories={profile.topRepos.filter(repo => selectedRepos.includes(repo.name))}
              selectedRepos={selectedRepos}
              onRepoSelection={handleRepoSelection}
              isEditing={false}
            />
          ) : (
            <ProfileCommits
              commits={profile.commits.filter(commit => selectedCommits.includes(commit.sha))}
              selectedCommits={selectedCommits}
              onCommitSelection={handleCommitSelection}
              isEditing={false}
            />
          )}
        </div>
      </ProfileContent>
      {isEditing && (
        <ProfileEditModal
          profile={{
            ...profile,
            topRepos: allRepos,
            commits: allCommits
          }}
          customName={customName}
          customBio={customBio}
          selectedRepos={selectedRepos}
          selectedCommits={selectedCommits}
          onNameChange={setCustomName}
          onBioChange={setCustomBio}
          onRepoSelection={handleRepoSelection}
          onCommitSelection={handleCommitSelection}
          onSave={handleSave}
          onCancel={handleCancel}
          avatarPreview={avatarPreview}
          onAvatarFileChange={handleAvatarChange}
        />
      )}
      {showFileInput && (
        <ProfileAvatarModal
          onAvatarChange={handleAvatarChange}
          onClose={() => setShowFileInput(false)}
        />
      )}
    </div>
  );
};

export { ProfileContainer }; 