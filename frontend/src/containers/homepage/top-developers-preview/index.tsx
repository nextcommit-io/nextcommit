'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaStar,
  FaCode,
  FaUsers,
  FaTrophy,
  FaMedal,
  FaAward,
  FaArrowRight,
  FaMapMarkerAlt,
  FaBuilding,
} from 'react-icons/fa';

const SectionWrapper = styled.section`
  padding: 80px 160px;
  background: linear-gradient(
    135deg,
    rgba(13, 17, 23, 0.8) 0%,
    rgba(22, 27, 34, 0.8) 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #58a6ff 50%,
      transparent 100%
    );
  }

  @media (max-width: 1200px) {
    padding: 60px 80px;
  }

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #58a6ff 0%, #7ee787 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #58a6ff, #7ee787);
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #8b949e;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ViewAllButton = styled.button`
  background: linear-gradient(
    135deg,
    rgba(88, 166, 255, 0.1) 0%,
    rgba(126, 231, 135, 0.1) 100%
  );
  border: 1px solid rgba(88, 166, 255, 0.3);
  color: #58a6ff;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(88, 166, 255, 0.2) 0%,
      rgba(126, 231, 135, 0.2) 100%
    );
    border-color: rgba(88, 166, 255, 0.5);
    transform: translateY(-2px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const DevelopersContainer = styled.div`
  position: relative;
  margin: 0 -20px;
  padding: 20px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 60px;
    z-index: 3;
    pointer-events: none;
  }
`;

const DevelopersList = styled.div`
  display: flex;
  gap: 24px;
  min-width: max-content;
  padding: 20px 0;
`;

const DeveloperCard = styled.div<{ rank: number }>`
  background: rgba(13, 17, 23, 0.8);
  border: 1px solid #30363d;
  border-radius: 20px;
  padding: 24px;
  min-width: 280px;
  max-width: 280px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  ${({ rank }) => {
    if (rank === 1) {
      return `
        border-color: #ffd700;
        transform: scale(1.05);
        
        &:hover {
          transform: scale(1.08);
        }
      `;
    } else if (rank === 2) {
      return `
        border-color: #c0c0c0;
        transform: scale(1.02);
        
        &:hover {
          transform: scale(1.05);
        }
      `;
    } else if (rank === 3) {
      return `
        border-color: #cd7f32;
        
        &:hover {
          transform: scale(1.03);
        }
      `;
    }
    return `
      &:hover {
        transform: translateY(-4px);
        border-color: #58a6ff40;
      }
    `;
  }}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ rank }) => {
      if (rank === 1) return 'linear-gradient(90deg, #ffd700, #ffed4e)';
      if (rank === 2) return 'linear-gradient(90deg, #c0c0c0, #e5e5e5)';
      if (rank === 3) return 'linear-gradient(90deg, #cd7f32, #daa520)';
      return 'linear-gradient(90deg, #58a6ff, #7ee787)';
    }};
    border-radius: 20px 20px 0 0;
  }
`;

const RankBadge = styled.div<{ rank: number }>`
  position: absolute;
  top: -12px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: white;
  background: ${({ rank }) => {
    if (rank === 1) return 'linear-gradient(135deg, #ffd700, #ffed4e)';
    if (rank === 2) return 'linear-gradient(135deg, #c0c0c0, #e5e5e5)';
    if (rank === 3) return 'linear-gradient(135deg, #cd7f32, #daa520)';
    return 'linear-gradient(135deg, #58a6ff, #7ee787)';
  }};
  z-index: 2;
`;

const RankIcon = styled.div<{ rank: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  svg {
    color: ${({ rank }) => {
      if (rank === 1) return '#b8860b';
      if (rank === 2) return '#696969';
      if (rank === 3) return '#8b4513';
      return '#ffffff';
    }};
  }
`;

const DeveloperHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const Avatar = styled.div<{ rank: number }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid
    ${({ rank }) => {
      if (rank === 1) return '#ffd700';
      if (rank === 2) return '#c0c0c0';
      if (rank === 3) return '#cd7f32';
      return '#58a6ff';
    }};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
  }
`;

const DeveloperInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const DeveloperName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #c9d1d9;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeveloperTitle = styled.div`
  font-size: 13px;
  color: #8b949e;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
`;

const ScoreBadge = styled.div<{ score: number }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  background: ${({ score }) => {
    if (score >= 90) return 'rgba(255, 215, 0, 0.15)';
    if (score >= 80) return 'rgba(192, 192, 192, 0.15)';
    if (score >= 70) return 'rgba(205, 127, 50, 0.15)';
    return 'rgba(144, 238, 144, 0.15)';
  }};
  color: ${({ score }) => {
    if (score >= 90) return '#ffd700';
    if (score >= 80) return '#c0c0c0';
    if (score >= 70) return '#cd7f32';
    return '#90EE90';
  }};
  border: 1px solid
    ${({ score }) => {
      if (score >= 90) return '#ffd700';
      if (score >= 80) return '#c0c0c0';
      if (score >= 70) return '#cd7f32';
      return '#90EE90';
    }}40;
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #c9d1d9;
`;

const StatLabel = styled.div`
  font-size: 10px;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LanguagesSection = styled.div`
  margin-bottom: 16px;
`;

const LanguagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
`;

const LanguageTag = styled.span`
  padding: 4px 8px;
  background: rgba(88, 166, 255, 0.1);
  color: #58a6ff;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(88, 166, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(88, 166, 255, 0.2);
    transform: translateY(-1px);
  }
`;

const ContactSection = styled.div`
  border-top: 1px solid #30363d;
  padding-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvailabilityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: rgba(46, 160, 67, 0.15);
  color: #7ee787;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(46, 160, 67, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(46, 160, 67, 0.25);
    transform: translateY(-1px);
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px;
  color: #8b949e;
  font-size: 16px;
`;

interface Developer {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  company: string;
  contributionScore: number;
  experienceLevel: string;
  stats: {
    repositories: number;
    starsEarned: number;
    contributions: number;
    languages: number;
  };
  topLanguages: string[];
  availability: string;
  hourlyRate: string;
}

export const TopDevelopersPreviewContainer = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopDevelopers();
  }, []);

  const fetchTopDevelopers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/top-developers?limit=6&sortBy=score');
      if (!response.ok) throw new Error('Failed to fetch developers');

      const data = await response.json();
      setDevelopers(data.developers);
    } catch (err) {
      console.error('Error fetching top developers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    window.location.href = '/top-developers';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <FaTrophy size={10} />;
    if (score >= 80) return <FaMedal size={10} />;
    if (score >= 70) return <FaAward size={10} />;
    return <FaStar size={10} />;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <FaTrophy size={14} />;
    if (rank === 2) return <FaMedal size={14} />;
    if (rank === 3) return <FaAward size={14} />;
    return <FaStar size={14} />;
  };

  if (loading) {
    return (
      <SectionWrapper>
        <LoadingState>Loading top developers...</LoadingState>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <SectionHeader>
        <SectionTitle>Top Developers</SectionTitle>
        <SectionSubtitle>
          Meet the most talented open source contributors. These developers have
          proven their skills through real contributions and are ready for new
          opportunities.
        </SectionSubtitle>
        <ViewAllButton onClick={handleViewAll}>
          View All Developers
          <FaArrowRight size={14} />
        </ViewAllButton>
      </SectionHeader>

      <DevelopersContainer>
        <DevelopersList>
          {developers.map((developer, index) => (
            <DeveloperCard key={developer.id} rank={index + 1}>
              <RankBadge rank={index + 1}>
                <RankIcon rank={index + 1}>{getRankIcon(index + 1)}</RankIcon>
              </RankBadge>

              <DeveloperHeader>
                <Avatar rank={index + 1}>
                  <img src={developer.avatar} alt={developer.name} />
                </Avatar>
                <DeveloperInfo>
                  <DeveloperName>{developer.name}</DeveloperName>
                  <DeveloperTitle>
                    <FaBuilding size={10} />
                    {developer.company}
                  </DeveloperTitle>
                  <ScoreBadge score={developer.contributionScore}>
                    {getScoreIcon(developer.contributionScore)}
                    {developer.contributionScore} pts
                  </ScoreBadge>
                </DeveloperInfo>
              </DeveloperHeader>

              <StatsGrid>
                <StatItem>
                  <StatValue>{developer.stats.repositories}</StatValue>
                  <StatLabel>Repos</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{developer.stats.starsEarned}</StatValue>
                  <StatLabel>Stars</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{developer.stats.contributions}</StatValue>
                  <StatLabel>Contributions</StatLabel>
                </StatItem>
              </StatsGrid>

              <LanguagesSection>
                <LanguagesList>
                  {developer.topLanguages.slice(0, 4).map((language) => (
                    <LanguageTag key={language}>{language}</LanguageTag>
                  ))}
                </LanguagesList>
              </LanguagesSection>

              <ContactSection>
                <AvailabilityBadge>{developer.availability}</AvailabilityBadge>
              </ContactSection>
            </DeveloperCard>
          ))}
        </DevelopersList>
      </DevelopersContainer>
    </SectionWrapper>
  );
};
