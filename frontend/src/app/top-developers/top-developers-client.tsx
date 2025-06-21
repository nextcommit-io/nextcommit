'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaStar,
  FaCode,
  FaUsers,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaFilter,
  FaSort,
  FaSearch,
  FaTrophy,
  FaMedal,
  FaAward,
  FaDollarSign,
  FaClock,
  FaBuilding,
  FaGlobe,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
  padding: 32px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #58a6ff 0%, #7ee787 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #8b949e;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FiltersSection = styled.div`
  background: rgba(13, 17, 23, 0.8);
  border: 1px solid #30363d;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  backdrop-filter: blur(10px);
`;

const FiltersTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #c9d1d9;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #8b949e;
`;

const FilterSelect = styled.select`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 10px 12px;
  color: #c9d1d9;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #58a6ff;
    box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.2);
  }

  option {
    background: #0d1117;
    color: #c9d1d9;
  }
`;

const FilterInput = styled.input`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 10px 12px;
  color: #c9d1d9;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #58a6ff;
    box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.2);
  }

  &::placeholder {
    color: #8b949e;
  }
`;

const SortSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ResultsCount = styled.div`
  color: #8b949e;
  font-size: 14px;
`;

const SortSelect = styled.select`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 8px 12px;
  color: #c9d1d9;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #58a6ff;
  }
`;

const DevelopersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const DeveloperCard = styled.div`
  background: rgba(13, 17, 23, 0.8);
  border: 1px solid #30363d;
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    border-color: #58a6ff40;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #58a6ff, #7ee787);
  }
`;

const DeveloperHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #30363d;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeveloperInfo = styled.div`
  flex: 1;
`;

const DeveloperName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #c9d1d9;
  margin-bottom: 4px;
`;

const DeveloperTitle = styled.div`
  font-size: 14px;
  color: #8b949e;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ScoreBadge = styled.div<{ score: number }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ score }) => {
    if (score >= 90) return 'rgba(255, 215, 0, 0.2)';
    if (score >= 80) return 'rgba(192, 192, 192, 0.2)';
    if (score >= 70) return 'rgba(205, 127, 50, 0.2)';
    return 'rgba(144, 238, 144, 0.2)';
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

const DeveloperBio = styled.p`
  font-size: 14px;
  color: #8b949e;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #8b949e;
`;

const LanguagesSection = styled.div`
  margin-bottom: 16px;
`;

const LanguagesTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #8b949e;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LanguagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const LanguageTag = styled.span`
  padding: 4px 8px;
  background: rgba(88, 166, 255, 0.1);
  color: #58a6ff;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(88, 166, 255, 0.2);
`;

const ContactSection = styled.div`
  border-top: 1px solid #30363d;
  padding-top: 16px;
  margin-top: 16px;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const RateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #7ee787;
  font-weight: 500;
`;

const AvailabilityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(46, 160, 67, 0.2);
  color: #7ee787;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(46, 160, 67, 0.3);
`;

const ContactButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ContactButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  ${({ variant }) =>
    variant === 'primary'
      ? `
        background: #58a6ff;
        color: white;
        &:hover {
          background: #4a9eff;
          transform: translateY(-1px);
        }
      `
      : `
        background: rgba(88, 166, 255, 0.1);
        color: #58a6ff;
        border: 1px solid rgba(88, 166, 255, 0.3);
        &:hover {
          background: rgba(88, 166, 255, 0.2);
          transform: translateY(-1px);
        }
      `}
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px;
  color: #8b949e;
  font-size: 16px;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 60px;
  color: #ff6b6b;
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
  topRepos: Array<{
    name: string;
    stars: number;
    language: string;
  }>;
  availability: string;
  hourlyRate: string;
  contactInfo: {
    email: string;
    linkedin: string;
    twitter: string;
  };
}

export function TopDevelopersClient() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    sortBy: 'score',
    location: '',
    languages: '',
    experienceLevel: '',
  });

  useEffect(() => {
    fetchDevelopers();
  }, [filters]);

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        sortBy: filters.sortBy,
        limit: '20',
        ...(filters.location && { location: filters.location }),
        ...(filters.languages && { languages: filters.languages }),
        ...(filters.experienceLevel && {
          experienceLevel: filters.experienceLevel,
        }),
      });

      const response = await fetch(`/api/top-developers?${params}`);
      if (!response.ok) throw new Error('Failed to fetch developers');

      const data = await response.json();
      setDevelopers(data.developers);
      setError(null);
    } catch (err) {
      setError('Failed to load developers');
      console.error('Error fetching developers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (
    type: 'email' | 'linkedin' | 'twitter',
    contactInfo: any
  ) => {
    switch (type) {
      case 'email':
        window.open(`mailto:${contactInfo.email}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://${contactInfo.linkedin}`, '_blank');
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/${contactInfo.twitter.replace('@', '')}`,
          '_blank'
        );
        break;
    }
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <FaTrophy size={12} />;
    if (score >= 80) return <FaMedal size={12} />;
    if (score >= 70) return <FaAward size={12} />;
    return <FaStar size={12} />;
  };

  if (loading) {
    return (
      <PageWrapper>
        <Container>
          <LoadingState>Loading top developers...</LoadingState>
        </Container>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <Container>
          <ErrorState>{error}</ErrorState>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <Header>
          <Title>Top Developers</Title>
          <Subtitle>
            Discover and connect with the most talented open source
            contributors. Filter by skills, location, and experience level to
            find your perfect match.
          </Subtitle>
        </Header>

        <FiltersSection>
          <FiltersTitle>
            <FaFilter size={16} />
            Find Your Perfect Developer
          </FiltersTitle>

          <FiltersGrid>
            <FilterGroup>
              <FilterLabel>Location</FilterLabel>
              <FilterInput
                type="text"
                placeholder="e.g., San Francisco, Remote"
                value={filters.location}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Languages</FilterLabel>
              <FilterInput
                type="text"
                placeholder="e.g., JavaScript, Python"
                value={filters.languages}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, languages: e.target.value }))
                }
              />
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Experience Level</FilterLabel>
              <FilterSelect
                value={filters.experienceLevel}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    experienceLevel: e.target.value,
                  }))
                }
              >
                <option value="">All Levels</option>
                <option value="Senior">Senior</option>
                <option value="Mid-Senior">Mid-Senior</option>
                <option value="Mid">Mid</option>
                <option value="Junior">Junior</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Sort By</FilterLabel>
              <FilterSelect
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                }
              >
                <option value="score">Contribution Score</option>
                <option value="stars">Stars Earned</option>
                <option value="repositories">Repositories</option>
                <option value="contributions">Contributions</option>
                <option value="rate">Hourly Rate</option>
              </FilterSelect>
            </FilterGroup>
          </FiltersGrid>
        </FiltersSection>

        <SortSection>
          <ResultsCount>Showing {developers.length} developers</ResultsCount>
        </SortSection>

        <DevelopersGrid>
          {developers.map((developer) => (
            <DeveloperCard key={developer.id}>
              <DeveloperHeader>
                <Avatar>
                  <img src={developer.avatar} alt={developer.name} />
                </Avatar>
                <DeveloperInfo>
                  <DeveloperName>{developer.name}</DeveloperName>
                  <DeveloperTitle>
                    <FaBuilding size={12} />
                    {developer.company}
                  </DeveloperTitle>
                  <ScoreBadge score={developer.contributionScore}>
                    {getScoreIcon(developer.contributionScore)}
                    {developer.contributionScore} pts
                  </ScoreBadge>
                </DeveloperInfo>
              </DeveloperHeader>

              <DeveloperBio>{developer.bio}</DeveloperBio>

              <StatsGrid>
                <StatItem>
                  <FaCode size={12} />
                  {developer.stats.repositories} repos
                </StatItem>
                <StatItem>
                  <FaStar size={12} />
                  {developer.stats.starsEarned} stars
                </StatItem>
                <StatItem>
                  <FaUsers size={12} />
                  {developer.stats.contributions} contributions
                </StatItem>
                <StatItem>
                  <FaGlobe size={12} />
                  {developer.stats.languages} languages
                </StatItem>
              </StatsGrid>

              <LanguagesSection>
                <LanguagesTitle>Top Languages</LanguagesTitle>
                <LanguagesList>
                  {developer.topLanguages.slice(0, 4).map((language) => (
                    <LanguageTag key={language}>{language}</LanguageTag>
                  ))}
                </LanguagesList>
              </LanguagesSection>

              <ContactSection>
                <ContactInfo>
                  <RateInfo>
                    <FaDollarSign size={12} />
                    {developer.hourlyRate}/hr
                  </RateInfo>
                  <AvailabilityBadge>
                    <FaClock size={10} />
                    {developer.availability}
                  </AvailabilityBadge>
                </ContactInfo>

                <ContactButtons>
                  <ContactButton
                    variant="primary"
                    onClick={() =>
                      handleContact('email', developer.contactInfo)
                    }
                  >
                    <FaEnvelope size={12} />
                    Email
                  </ContactButton>
                  <ContactButton
                    variant="secondary"
                    onClick={() =>
                      handleContact('linkedin', developer.contactInfo)
                    }
                  >
                    <FaLinkedin size={12} />
                    LinkedIn
                  </ContactButton>
                  <ContactButton
                    variant="secondary"
                    onClick={() =>
                      handleContact('twitter', developer.contactInfo)
                    }
                  >
                    <FaTwitter size={12} />
                    Twitter
                  </ContactButton>
                </ContactButtons>
              </ContactSection>
            </DeveloperCard>
          ))}
        </DevelopersGrid>
      </Container>
    </PageWrapper>
  );
}
