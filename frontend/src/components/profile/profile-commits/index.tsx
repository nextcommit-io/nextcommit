'use client';
import { Commit } from '@/types';

interface ProfileCommitsProps {
  commits: Commit[];
  selectedCommits: string[];
  onCommitSelection: (commitSha: string) => void;
  isEditing: boolean;
}

export const ProfileCommits: React.FC<ProfileCommitsProps> = ({
  commits,
  selectedCommits,
  onCommitSelection,
  isEditing
}) => {
  const displayCommits = isEditing 
    ? commits 
    : commits.filter(commit => selectedCommits.includes(commit.sha));

  if (displayCommits.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px 20px',
        color: '#6c757d',
        fontSize: 16
      }}>
        {isEditing ? 'Select commits to display on your profile' : 'No commits selected'}
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
      gap: 16
    }}>
      {displayCommits.map((commit, index) => (
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
          onClick={isEditing ? () => onCommitSelection(commit.sha) : undefined}
        >
          <div style={{ marginBottom: 12 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              marginBottom: 8
            }}>
              <div style={{ 
                fontSize: 12, 
                fontFamily: 'monospace',
                background: '#f8f9fa',
                padding: '4px 8px',
                borderRadius: 6,
                color: '#6c757d',
                fontWeight: 600
              }}>
                {commit.sha}
              </div>
              <span style={{ 
                fontSize: 12, 
                color: '#28a745',
                fontWeight: 500
              }}>
                {commit.author}
              </span>
            </div>
            
            <h3 style={{ 
              fontSize: 16, 
              fontWeight: 600, 
              color: '#212529',
              margin: '0 0 8px 0',
              lineHeight: 1.4
            }}>
              {commit.message.length > 60 
                ? `${commit.message.substring(0, 60)}...` 
                : commit.message
              }
            </h3>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              fontSize: 14,
              color: '#6c757d'
            }}>
              <span style={{ fontWeight: 500 }}>{commit.repo}</span>
              <span>•</span>
              <span>{commit.date}</span>
            </div>
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
                checked={selectedCommits.includes(commit.sha)}
                onChange={() => onCommitSelection(commit.sha)}
                disabled={!selectedCommits.includes(commit.sha) && selectedCommits.length >= 3}
                style={{ 
                  transform: 'scale(1.2)',
                  cursor: 'pointer'
                }}
              />
              <span style={{ 
                fontSize: 14, 
                color: selectedCommits.includes(commit.sha) ? '#28a745' : '#6c757d',
                fontWeight: 500
              }}>
                {selectedCommits.includes(commit.sha) ? 'Selected' : 'Select'}
              </span>
            </div>
          )}
          
          <a
            href={commit.url}
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
            View Commit →
          </a>
        </div>
      ))}
    </div>
  );
}; 