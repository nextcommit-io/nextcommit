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

interface ProfileData {
  user: any;
  stats: {
    starsEarned: number;
    repositories: number;
    contributions: number;
    achievements: number;
  };
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
