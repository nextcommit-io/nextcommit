'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { signOut } from 'next-auth/react';
import {
  FaGithub,
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaMapMarkerAlt,
  FaLink,
  FaEdit,
  FaSignOutAlt,
  FaStar,
  FaCode,
  FaUsers,
  FaTrophy,
  FaBook,
  FaHeart,
  FaEye,
  FaDownload,
  FaChartLine,
  FaAward,
  FaMedal,
  FaExternalLinkAlt,
  FaPlus,
  FaMinus,
} from 'react-icons/fa';

const ProfileWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  padding: 40px 160px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(88, 166, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 107, 107, 0.1) 0%,
      transparent 50%
    );
  pointer-events: none;
  z-index: 1;
`;

const ProfileContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(20px);
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.accent},
      #ff6b6b
    );
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.colors.accent};
  box-shadow: 0 8px 32px rgba(88, 166, 255, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 8px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.textPrimary} 0%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const UserEmail = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserBio = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 24px;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ActionButton = styled.button<{
  variant?: 'primary' | 'secondary' | 'danger';
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.body};

  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, ${theme.colors.accent} 0%, #58a6ff 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(88, 166, 255, 0.3);
          }
        `;
      case 'danger':
        return `
          background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.05);
          color: ${theme.colors.textPrimary};
          border: 1px solid rgba(255, 255, 255, 0.1);
          &:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: ${theme.colors.accent};
          }
        `;
    }
  }}
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.accent},
      #ff6b6b
    );
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    border-color: ${({ theme }) => theme.colors.accent}40;
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background: linear-gradient(
    135deg,
    rgba(88, 166, 255, 0.2) 0%,
    rgba(255, 107, 107, 0.2) 100%
  );
  color: ${({ theme }) => theme.colors.accent};
  font-size: 20px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div``;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  backdrop-filter: blur(10px);
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.accent},
      #ff6b6b
    );
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${({ theme }) => theme.colors.accent}20;
    transform: translateX(4px);
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(88, 166, 255, 0.2) 0%,
    rgba(255, 107, 107, 0.2) 100%
  );
  color: ${({ theme }) => theme.colors.accent};
  font-size: 16px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
`;

const ActivityMeta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RepoCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${({ theme }) => theme.colors.accent}20;
    transform: translateY(-2px);
  }
`;

const RepoName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
`;

const RepoMeta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  gap: 16px;
`;

const RepoStats = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ContributionScoreCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(88, 166, 255, 0.1) 0%,
    rgba(255, 107, 107, 0.1) 100%
  );
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(88, 166, 255, 0.05) 0%,
      rgba(255, 107, 107, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ScoreHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ScoreTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ExperienceLevel = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ color }) => color}20;
  border: 1px solid ${({ color }) => color}40;
  color: ${({ color }) => color};
  font-weight: 600;
  font-size: 14px;
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
`;

const MainScore = styled.div`
  text-align: center;
`;

const ScoreNumber = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.mono};
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.accent}40;
`;

const ScoreLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ScoreBreakdown = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const BreakdownItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: ${({ theme }) => theme.colors.accent}40;
    transform: translateY(-2px);
  }
`;

const BreakdownValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-bottom: 4px;
`;

const BreakdownLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BadgesSection = styled.div`
  margin-bottom: 32px;
`;

const BadgesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
`;

const Badge = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ color }) => color}20;
  border: 1px solid ${({ color }) => color}40;
  color: ${({ color }) => color};
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${({ color }) => color}30;
  }
`;

const RecruiterSection = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 107, 107, 0.1) 0%,
    rgba(88, 166, 255, 0.1) 100%
  );
  border: 1px solid rgba(255, 107, 107, 0.2);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      #ff6b6b,
      ${({ theme }) => theme.colors.accent}
    );
  }
`;

const RecruiterTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RecruiterText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 16px;
`;

const RecruiterStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

const RecruiterStat = styled.div`
  text-align: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const RecruiterStatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const RecruiterStatLabel = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CodeSnippetsSection = styled.div`
  margin-bottom: 32px;
`;

const CodeSnippetCard = styled.div`
  background: rgba(13, 17, 23, 0.8);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  margin-bottom: 24px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    border-color: ${({ theme }) => theme.colors.accent}40;
  }
`;

const SnippetHeader = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SnippetInfo = styled.div`
  flex: 1;
`;

const SnippetTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const SnippetMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SnippetValue = styled.div<{ value: number }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  background: ${({ value }) => {
    if (value >= 80) return 'rgba(255, 215, 0, 0.2)';
    if (value >= 60) return 'rgba(192, 192, 192, 0.2)';
    if (value >= 40) return 'rgba(205, 127, 50, 0.2)';
    return 'rgba(144, 238, 144, 0.2)';
  }};
  color: ${({ value }) => {
    if (value >= 80) return '#ffd700';
    if (value >= 60) return '#c0c0c0';
    if (value >= 40) return '#cd7f32';
    return '#90EE90';
  }};
  border: 1px solid
    ${({ value }) => {
      if (value >= 80) return '#ffd700';
      if (value >= 60) return '#c0c0c0';
      if (value >= 40) return '#cd7f32';
      return '#90EE90';
    }}40;
`;

const SnippetLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  transition: all 0.3s ease;

  &:hover {
    color: #58a6ff;
    transform: translateX(2px);
  }
`;

const CodeContainer = styled.div`
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const FileHeader = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileName = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
`;

const FileStats = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CodeBlock = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  padding: 16px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
`;

const CodeLine = styled.div<{ type: 'addition' | 'deletion' | 'context' }>`
  ${({ type }) => {
    switch (type) {
      case 'addition':
        return `
          background: rgba(46, 160, 67, 0.2);
          color: #7ee787;
          border-left: 3px solid #7ee787;
          padding-left: 8px;
        `;
      case 'deletion':
        return `
          background: rgba(248, 81, 73, 0.2);
          color: #ff7b72;
          border-left: 3px solid #ff7b72;
          padding-left: 8px;
        `;
      default:
        return `
          color: #8b949e;
          padding-left: 11px;
        `;
    }
  }}
`;

const NoSnippetsMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
`;

interface ProfileData {
  user: any;
  stats: {
    starsEarned: number;
    repositories: number;
    contributions: number;
    achievements: number;
  };
  contributionScore: {
    totalScore: number;
    experienceLevel: {
      level: string;
      badge: string;
      color: string;
      score: number;
    };
    breakdown: {
      repositories: { count: number; score: number };
      stars: { count: number; score: number };
      forks: { count: number; score: number };
      pullRequests: { count: number; score: number };
      commits: { count: number; score: number };
      languages: { count: number; score: number };
    };
  };
  badges: Array<{
    name: string;
    icon: string;
    color: string;
  }>;
  codeSnippets: Array<{
    sha: string;
    message: string;
    html_url: string;
    date: string;
    value: number;
    repoName: string;
    repoStars: number;
    repoLanguage: string;
    significantFiles: Array<{
      filename: string;
      status: string;
      additions: number;
      deletions: number;
      patch: string;
      language: string;
    }>;
  }>;
  topLanguages: string[];
  recentActivity: Array<{
    type: string;
    title: string;
    meta: string;
    time: string;
    icon: string;
  }>;
  repositories: any[];
  forkedRepos: any[];
  pullRequests: any[];
}

interface ProfileClientProps {
  profileData: ProfileData;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'code':
      return <FaCode size={16} />;
    case 'users':
      return <FaUsers size={16} />;
    case 'star':
      return <FaStar size={16} />;
    case 'download':
      return <FaDownload size={16} />;
    default:
      return <FaCode size={16} />;
  }
};

const formatCodeSnippet = (patch: string, maxLines: number = 15) => {
  if (!patch) return [];

  const lines = patch.split('\n');
  return lines.slice(0, maxLines).map((line: string) => {
    if (line.startsWith('+'))
      return { type: 'addition' as const, content: line.substring(1) };
    if (line.startsWith('-'))
      return { type: 'deletion' as const, content: line.substring(1) };
    return { type: 'context' as const, content: line };
  });
};

export function ProfileClient({ profileData }: ProfileClientProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleGitHubClick = () => {
    if (profileData.user?.name) {
      window.open(`https://github.com/${profileData.user.name}`, '_blank');
    }
  };

  return (
    <ProfileWrapper>
      <BackgroundDecoration />
      <ProfileContainer>
        <ProfileHeader>
          <ProfileInfo>
            <Avatar>
              <img
                src={profileData.user?.image || '/default-avatar.svg'}
                alt={profileData.user?.name || 'User'}
              />
            </Avatar>
            <UserDetails>
              <UserName>{profileData.user?.name || 'Developer'}</UserName>
              <UserEmail>
                <FaEnvelope size={14} />
                {profileData.user?.email || 'No email provided'}
              </UserEmail>
              <UserBio>
                Passionate developer building the future, one commit at a time.
                Always learning, always growing. Let's create something amazing
                together! 🚀
              </UserBio>
              <ProfileActions>
                <ActionButton
                  variant="primary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FaEdit size={14} />
                  Edit Profile
                </ActionButton>
                <ActionButton variant="secondary" onClick={handleGitHubClick}>
                  <FaGithub size={14} />
                  View GitHub
                </ActionButton>
                <ActionButton variant="danger" onClick={handleSignOut}>
                  <FaSignOutAlt size={14} />
                  Sign Out
                </ActionButton>
              </ProfileActions>
            </UserDetails>
          </ProfileInfo>
        </ProfileHeader>

        <ContributionScoreCard>
          <ScoreHeader>
            <ScoreTitle>
              <FaChartLine size={24} />
              Contribution Score
            </ScoreTitle>
            <ExperienceLevel
              color={profileData.contributionScore.experienceLevel.color}
            >
              {profileData.contributionScore.experienceLevel.badge}
              {profileData.contributionScore.experienceLevel.level}
            </ExperienceLevel>
          </ScoreHeader>

          <ScoreDisplay>
            <MainScore>
              <ScoreNumber>
                {profileData.contributionScore.totalScore}
              </ScoreNumber>
              <ScoreLabel>Total Score</ScoreLabel>
            </MainScore>
          </ScoreDisplay>

          <ScoreBreakdown>
            <BreakdownItem>
              <BreakdownValue>
                {profileData.contributionScore.breakdown.repositories.count}
              </BreakdownValue>
              <BreakdownLabel>Repositories</BreakdownLabel>
            </BreakdownItem>
            <BreakdownItem>
              <BreakdownValue>
                {profileData.contributionScore.breakdown.stars.count}
              </BreakdownValue>
              <BreakdownLabel>Stars Earned</BreakdownLabel>
            </BreakdownItem>
            <BreakdownItem>
              <BreakdownValue>
                {profileData.contributionScore.breakdown.pullRequests.count}
              </BreakdownValue>
              <BreakdownLabel>Pull Requests</BreakdownLabel>
            </BreakdownItem>
            <BreakdownItem>
              <BreakdownValue>
                {profileData.contributionScore.breakdown.commits.count}
              </BreakdownValue>
              <BreakdownLabel>Commits</BreakdownLabel>
            </BreakdownItem>
            <BreakdownItem>
              <BreakdownValue>
                {profileData.contributionScore.breakdown.languages.count}
              </BreakdownValue>
              <BreakdownLabel>Languages</BreakdownLabel>
            </BreakdownItem>
            <BreakdownItem>
              <BreakdownValue>
                {profileData.contributionScore.breakdown.forks.count}
              </BreakdownValue>
              <BreakdownLabel>Forks</BreakdownLabel>
            </BreakdownItem>
          </ScoreBreakdown>
        </ContributionScoreCard>

        <RecruiterSection>
          <RecruiterTitle>
            <FaAward size={18} />
            For Recruiters
          </RecruiterTitle>
          <RecruiterText>
            This developer has demonstrated strong open source contribution
            skills with real-world experience. Their GitHub activity shows
            consistent engagement, technical diversity, and community
            involvement.
          </RecruiterText>
          <RecruiterStats>
            <RecruiterStat>
              <RecruiterStatValue>
                {profileData.contributionScore.experienceLevel.level}
              </RecruiterStatValue>
              <RecruiterStatLabel>Experience Level</RecruiterStatLabel>
            </RecruiterStat>
            <RecruiterStat>
              <RecruiterStatValue>
                {profileData.stats.repositories}
              </RecruiterStatValue>
              <RecruiterStatLabel>Original Projects</RecruiterStatLabel>
            </RecruiterStat>
            <RecruiterStat>
              <RecruiterStatValue>
                {profileData.stats.contributions}
              </RecruiterStatValue>
              <RecruiterStatLabel>Contributions</RecruiterStatLabel>
            </RecruiterStat>
            <RecruiterStat>
              <RecruiterStatValue>
                {profileData.topLanguages.length}
              </RecruiterStatValue>
              <RecruiterStatLabel>Languages</RecruiterStatLabel>
            </RecruiterStat>
          </RecruiterStats>
        </RecruiterSection>

        <CodeSnippetsSection>
          <SectionTitle>
            <FaCode size={20} />
            High-Value Code Contributions
          </SectionTitle>
          {profileData.codeSnippets.length > 0 ? (
            profileData.codeSnippets.map((snippet, index) => (
              <CodeSnippetCard key={index}>
                <SnippetHeader>
                  <SnippetInfo>
                    <SnippetTitle>{snippet.message}</SnippetTitle>
                    <SnippetMeta>
                      <span>{snippet.repoName}</span>
                      <span>⭐ {snippet.repoStars} stars</span>
                      <span>{snippet.repoLanguage}</span>
                      <span>{new Date(snippet.date).toLocaleDateString()}</span>
                    </SnippetMeta>
                  </SnippetInfo>
                  <div
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <SnippetValue value={snippet.value}>
                      <FaTrophy size={10} />
                      {snippet.value} pts
                    </SnippetValue>
                    <SnippetLink
                      href={snippet.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt size={12} />
                      View
                    </SnippetLink>
                  </div>
                </SnippetHeader>
                <CodeContainer>
                  {snippet.significantFiles.map((file, fileIndex) => (
                    <div key={fileIndex}>
                      <FileHeader>
                        <FileName>{file.filename}</FileName>
                        <FileStats>
                          <span style={{ color: '#7ee787' }}>
                            <FaPlus size={10} /> +{file.additions}
                          </span>
                          <span style={{ color: '#ff7b72' }}>
                            <FaMinus size={10} /> -{file.deletions}
                          </span>
                          <span>{file.language}</span>
                        </FileStats>
                      </FileHeader>
                      <CodeBlock>
                        {formatCodeSnippet(file.patch, 12).map(
                          (line, lineIndex) => (
                            <CodeLine key={lineIndex} type={line.type}>
                              {line.content}
                            </CodeLine>
                          )
                        )}
                      </CodeBlock>
                    </div>
                  ))}
                </CodeContainer>
              </CodeSnippetCard>
            ))
          ) : (
            <NoSnippetsMessage>
              <FaCode
                size={24}
                style={{ marginBottom: '12px', opacity: 0.5 }}
              />
              <div>No high-value code contributions found yet.</div>
              <div style={{ fontSize: '14px', marginTop: '8px', opacity: 0.7 }}>
                Start contributing to open source projects to see your code
                here!
              </div>
            </NoSnippetsMessage>
          )}
        </CodeSnippetsSection>

        <BadgesSection>
          <SectionTitle>
            <FaMedal size={20} />
            Achievement Badges
          </SectionTitle>
          <BadgesGrid>
            {profileData.badges.map((badge, index) => (
              <Badge key={index} color={badge.color}>
                <span>{badge.icon}</span>
                {badge.name}
              </Badge>
            ))}
          </BadgesGrid>
        </BadgesSection>

        <StatsGrid>
          <StatCard>
            <StatIcon>
              <FaStar size={20} />
            </StatIcon>
            <StatValue>{profileData.stats.starsEarned}</StatValue>
            <StatLabel>Stars Earned</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>
              <FaCode size={20} />
            </StatIcon>
            <StatValue>{profileData.stats.repositories}</StatValue>
            <StatLabel>Repositories</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>
              <FaUsers size={20} />
            </StatIcon>
            <StatValue>{profileData.stats.contributions}</StatValue>
            <StatLabel>Contributions</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>
              <FaTrophy size={20} />
            </StatIcon>
            <StatValue>{profileData.stats.achievements}</StatValue>
            <StatLabel>Achievements</StatLabel>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <MainContent>
            <Section>
              <SectionTitle>
                <FaBook size={20} />
                Recent Activity
              </SectionTitle>
              {profileData.recentActivity.map((activity, index) => (
                <ActivityItem key={index}>
                  <ActivityIcon>{getIconComponent(activity.icon)}</ActivityIcon>
                  <ActivityContent>
                    <ActivityTitle>{activity.title}</ActivityTitle>
                    <ActivityMeta>
                      {activity.meta} • {activity.time}
                    </ActivityMeta>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </Section>

            <Section>
              <SectionTitle>
                <FaCode size={20} />
                Top Repositories
              </SectionTitle>
              {profileData.repositories.slice(0, 5).map((repo) => (
                <RepoCard key={repo.id}>
                  <RepoName>{repo.full_name}</RepoName>
                  <RepoMeta>
                    <RepoStats>
                      <FaStar size={12} />
                      {repo.stargazers_count || 0}
                    </RepoStats>
                    <RepoStats>
                      <FaUsers size={12} />
                      {repo.forks_count || 0}
                    </RepoStats>
                    <span>{repo.language || 'Unknown'}</span>
                  </RepoMeta>
                </RepoCard>
              ))}
            </Section>
          </MainContent>

          <Sidebar>
            <Section>
              <SectionTitle>
                <FaUser size={20} />
                Profile Info
              </SectionTitle>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#8b949e',
                  }}
                >
                  <FaCalendar size={14} />
                  <span>Joined GitHub</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#8b949e',
                  }}
                >
                  <FaMapMarkerAlt size={14} />
                  <span>Developer</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#8b949e',
                  }}
                >
                  <FaLink size={14} />
                  <span>
                    github.com/{profileData.user?.name?.toLowerCase()}
                  </span>
                </div>
              </div>
            </Section>

            <Section>
              <SectionTitle>
                <FaHeart size={20} />
                Top Languages
              </SectionTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {profileData.topLanguages.map((language) => (
                  <span
                    key={language}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(88, 166, 255, 0.1)',
                      color: '#58a6ff',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '500',
                      border: '1px solid rgba(88, 166, 255, 0.2)',
                    }}
                  >
                    {language}
                  </span>
                ))}
              </div>
            </Section>
          </Sidebar>
        </ContentGrid>
      </ProfileContainer>
    </ProfileWrapper>
  );
}
