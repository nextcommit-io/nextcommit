'use client';

interface ProfileStatsProps {
  totalCommits: number;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ 
  totalCommits
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center',
      marginBottom: 32,
      padding: '24px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: 16,
      border: '1px solid #dee2e6'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          fontSize: 36, 
          fontWeight: 700, 
          color: '#007bff',
          marginBottom: 8
        }}>
          {totalCommits.toLocaleString()}
        </div>
        <div style={{ 
          fontSize: 16, 
          color: '#6c757d',
          fontWeight: 500
        }}>
          Total Commits
        </div>
      </div>
    </div>
  );
}; 