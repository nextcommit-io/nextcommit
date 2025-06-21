'use client';
import { Repo } from '@/types';

interface ProfileRepositoriesProps {
  repositories: Repo[];
  selectedRepos: string[];
  onRepoSelection: (repoName: string) => void;
  isEditing: boolean;
}

export const ProfileRepositories: React.FC<ProfileRepositoriesProps> = ({
  repositories,
  selectedRepos,
  onRepoSelection,
  isEditing
}) => {
  const displayRepos = isEditing 
    ? repositories 
    : repositories.filter(repo => selectedRepos.includes(repo.name));

  if (displayRepos.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px 20px',
        color: '#6c757d',
        fontSize: 16
      }}>
        {isEditing ? 'Select repositories to display on your profile' : 'No repositories selected'}
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: 16
    }}>
      {displayRepos.map((repo, index) => (
        <div
          key={index}
          style={{
            padding: 20,
            border: '2px solid #e9ecef',
            borderRadius: 12,
            background: 'white',
            transition: 'all 0.2s',
            cursor: isEditing ? 'pointer' : 'default'
          }}
          onMouseOver={isEditing ? (e) => {
            (e.target as HTMLDivElement).style.borderColor = '#007bff';
            (e.target as HTMLDivElement).style.transform = 'translateY(-2px)';
            (e.target as HTMLDivElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
          } : undefined}
          onMouseOut={isEditing ? (e) => {
            (e.target as HTMLDivElement).style.borderColor = '#e9ecef';
            (e.target as HTMLDivElement).style.transform = 'translateY(0)';
            (e.target as HTMLDivElement).style.boxShadow = 'none';
          } : undefined}
          onClick={isEditing ? () => onRepoSelection(repo.name) : undefined}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: 12
          }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              color: '#212529',
              margin: 0,
              flex: 1,
              marginRight: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              {repo.name}
              {repo.isFork && (
                <span style={{
                  fontSize: 12,
                  color: '#6c757d',
                  fontWeight: 400,
                  padding: '2px 6px',
                  background: '#f8f9fa',
                  borderRadius: 4,
                  border: '1px solid #dee2e6'
                }}>
                  Fork
                </span>
              )}
            </h3>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 4,
              color: '#ffc107',
              fontSize: 14,
              fontWeight: 600
            }}>
              ⭐ {repo.stars.toLocaleString()}
            </div>
          </div>

          {repo.description && (
            <p style={{ 
              fontSize: 14, 
              color: '#6c757d', 
              margin: '0 0 12px 0',
              lineHeight: 1.4
            }}>
              {repo.description.length > 100 
                ? `${repo.description.substring(0, 100)}...` 
                : repo.description
              }
            </p>
          )}

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12,
            marginBottom: 12,
            fontSize: 12,
            color: '#6c757d'
          }}>
            {repo.language && (
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 4,
                padding: '2px 8px',
                background: '#f8f9fa',
                borderRadius: 12,
                fontWeight: 500
              }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  background: '#007bff' 
                }} />
                {repo.language}
              </span>
            )}
            <span>Updated {new Date(repo.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
          
          {isEditing && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              marginTop: 12
            }}>
              <input
                type="checkbox"
                checked={selectedRepos.includes(repo.name)}
                onChange={() => onRepoSelection(repo.name)}
                disabled={!selectedRepos.includes(repo.name) && selectedRepos.length >= 3}
                style={{ 
                  transform: 'scale(1.2)',
                  cursor: 'pointer'
                }}
              />
              <span style={{ 
                fontSize: 14, 
                color: selectedRepos.includes(repo.name) ? '#28a745' : '#6c757d',
                fontWeight: 500
              }}>
                {selectedRepos.includes(repo.name) ? 'Selected' : 'Select'}
              </span>
            </div>
          )}
          
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: 12,
              padding: '8px 16px',
              background: '#f8f9fa',
              color: '#007bff',
              textDecoration: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#007bff';
              (e.target as HTMLAnchorElement).style.color = 'white';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#f8f9fa';
              (e.target as HTMLAnchorElement).style.color = '#007bff';
            }}
          >
            View Repository →
          </a>
        </div>
      ))}
    </div>
  );
}; 