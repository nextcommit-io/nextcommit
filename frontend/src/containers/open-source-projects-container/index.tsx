'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { OpenSourceProject } from '@/types';
import { OpenSourceProjectCard } from '@/components';
import { ProjectFiltersContainer } from '../project-filters-container';

const Container = styled.div`
  padding: 80px 160px;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: transparent;
  position: relative;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-top: 48px;
  position: relative;
  z-index: 2;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StyledHeading = styled.div`
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.textPrimary} 0%,
    ${({ theme }) => theme.colors.accent} 50%,
    #ff6b6b 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.accent},
      #ff6b6b
    );
    border-radius: 2px;
  }

  @media (min-width: 768px) {
    &::after {
      width: 100px;
    }
  }
`;

const SubHeading = styled.p`
  font-size: clamp(16px, 2.5vw, 20px);
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 40px;
  line-height: 1.7;
  max-width: 900px;
  position: relative;
  z-index: 2;
  font-weight: 400;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  position: relative;
  z-index: 2;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(88, 166, 255, 0.2);
  border-top: 3px solid ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.accent}40;
  margin-bottom: 24px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  text-align: center;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 40px;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 24px;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const ErrorText = styled.div`
  font-size: 18px;
  color: #ff6b6b;
  font-weight: 500;
  margin-bottom: 16px;
`;

const ErrorSubtext = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 400px;
`;

const StatsBar = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 40px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const Stat = styled.div`
  text-align: center;
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Curated list of beginner-friendly open source projects
const BEGINNER_FRIENDLY_PROJECTS: OpenSourceProject[] = [
  {
    name: 'freeCodeCamp/freeCodeCamp',
    description:
      "Learn to code for free with freeCodeCamp's open source curriculum. Perfect for beginners with comprehensive tutorials and certifications.",
    url: 'https://github.com/freeCodeCamp/freeCodeCamp',
    language: 'TypeScript',
    stars: 372000,
    forks: 33000,
    currentPeriodStars: 1200,
    avatar: 'https://avatars.githubusercontent.com/u/9892522?v=4',
    builtBy: [
      {
        username: 'QuincyLarson',
        href: 'https://github.com/QuincyLarson',
        avatar: 'https://avatars.githubusercontent.com/u/985197?v=4',
      },
    ],
    tags: [
      'beginner-friendly',
      'documentation',
      'education',
      'good-first-issue',
    ],
  },
  {
    name: 'microsoft/Web-Dev-For-Beginners',
    description:
      '24 lessons, 12 weeks, get started as a web developer. Learn HTML, CSS, JavaScript, and more with hands-on projects.',
    url: 'https://github.com/microsoft/Web-Dev-For-Beginners',
    language: 'JavaScript',
    stars: 75000,
    forks: 12000,
    currentPeriodStars: 800,
    avatar: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    builtBy: [
      {
        username: 'jlooper',
        href: 'https://github.com/jlooper',
        avatar: 'https://avatars.githubusercontent.com/u/1450004?v=4',
      },
    ],
    tags: ['beginner-friendly', 'tutorial', 'web-development', 'microsoft'],
  },
  {
    name: 'firstcontributions/first-contributions',
    description:
      'Help beginners to contribute to open source projects. A place to start if you want to contribute to open source software.',
    url: 'https://github.com/firstcontributions/first-contributions',
    language: 'Markdown',
    stars: 35000,
    forks: 7000,
    currentPeriodStars: 300,
    avatar: 'https://avatars.githubusercontent.com/u/24963113?v=4',
    builtBy: [
      {
        username: 'Roshanjossey',
        href: 'https://github.com/Roshanjossey',
        avatar: 'https://avatars.githubusercontent.com/u/8488446?v=4',
      },
    ],
    tags: [
      'beginner-friendly',
      'first-contribution',
      'good-first-issue',
      'hacktoberfest',
    ],
  },
  {
    name: 'EbookFoundation/free-programming-books',
    description:
      'Freely available programming books. A comprehensive collection of free programming books in various languages.',
    url: 'https://github.com/EbookFoundation/free-programming-books',
    language: 'HTML',
    stars: 280000,
    forks: 56000,
    currentPeriodStars: 900,
    avatar: 'https://avatars.githubusercontent.com/u/14127308?v=4',
    builtBy: [
      {
        username: 'vhf',
        href: 'https://github.com/vhf',
        avatar: 'https://avatars.githubusercontent.com/u/12707960?v=4',
      },
    ],
    tags: ['beginner-friendly', 'documentation', 'books', 'education'],
  },
  {
    name: 'public-apis/public-apis',
    description:
      'A collective list of free APIs for use in software and web development. Great for building portfolio projects.',
    url: 'https://github.com/public-apis/public-apis',
    language: 'Python',
    stars: 250000,
    forks: 29000,
    currentPeriodStars: 700,
    avatar: 'https://avatars.githubusercontent.com/u/51114207?v=4',
    builtBy: [
      {
        username: 'davemachado',
        href: 'https://github.com/davemachado',
        avatar: 'https://avatars.githubusercontent.com/u/12865326?v=4',
      },
    ],
    tags: ['beginner-friendly', 'api', 'portfolio', 'good-first-issue'],
  },
  {
    name: '30-seconds/30-seconds-of-code',
    description:
      'Short code snippets for all your development needs. Perfect for learning JavaScript patterns and techniques.',
    url: 'https://github.com/30-seconds/30-seconds-of-code',
    language: 'JavaScript',
    stars: 110000,
    forks: 12000,
    currentPeriodStars: 400,
    avatar: 'https://avatars.githubusercontent.com/u/23021756?v=4',
    builtBy: [
      {
        username: 'Chalarangelo',
        href: 'https://github.com/Chalarangelo',
        avatar: 'https://avatars.githubusercontent.com/u/8281875?v=4',
      },
    ],
    tags: ['beginner-friendly', 'javascript', 'snippets', 'learning'],
  },
  {
    name: 'sindresorhus/awesome',
    description:
      'A curated list of awesome lists. A great resource for finding tools, libraries, and resources for any technology.',
    url: 'https://github.com/sindresorhus/awesome',
    language: 'Markdown',
    stars: 260000,
    forks: 26000,
    currentPeriodStars: 600,
    avatar: 'https://avatars.githubusercontent.com/u/170270?v=4',
    builtBy: [
      {
        username: 'sindresorhus',
        href: 'https://github.com/sindresorhus',
        avatar: 'https://avatars.githubusercontent.com/u/170270?v=4',
      },
    ],
    tags: ['beginner-friendly', 'curated', 'resources', 'awesome'],
  },
  {
    name: 'jwasham/coding-interview-university',
    description:
      'A complete computer science study plan to become a software engineer. Perfect for interview preparation.',
    url: 'https://github.com/jwasham/coding-interview-university',
    language: 'Shell',
    stars: 260000,
    forks: 69000,
    currentPeriodStars: 500,
    avatar: 'https://avatars.githubusercontent.com/u/3771963?v=4',
    builtBy: [
      {
        username: 'jwasham',
        href: 'https://github.com/jwasham',
        avatar: 'https://avatars.githubusercontent.com/u/3771963?v=4',
      },
    ],
    tags: [
      'beginner-friendly',
      'interview-prep',
      'computer-science',
      'learning',
    ],
  },
  {
    name: 'kamranahmedse/developer-roadmap',
    description:
      'Interactive roadmaps, guides and other educational content to help developers grow in their career.',
    url: 'https://github.com/kamranahmedse/developer-roadmap',
    language: 'TypeScript',
    stars: 240000,
    forks: 34000,
    currentPeriodStars: 800,
    avatar: 'https://avatars.githubusercontent.com/u/4921183?v=4',
    builtBy: [
      {
        username: 'kamranahmedse',
        href: 'https://github.com/kamranahmedse',
        avatar: 'https://avatars.githubusercontent.com/u/4921183?v=4',
      },
    ],
    tags: ['beginner-friendly', 'roadmap', 'career', 'learning'],
  },
  {
    name: 'practical-tutorials/project-based-learning',
    description:
      'Curated list of project-based tutorials. Learn by building real-world projects.',
    url: 'https://github.com/practical-tutorials/project-based-learning',
    language: 'HTML',
    stars: 110000,
    forks: 16000,
    currentPeriodStars: 300,
    avatar: 'https://avatars.githubusercontent.com/u/50626037?v=4',
    builtBy: [
      {
        username: 'tuvtran',
        href: 'https://github.com/tuvtran',
        avatar: 'https://avatars.githubusercontent.com/u/1189968?v=4',
      },
    ],
    tags: ['beginner-friendly', 'project-based', 'tutorials', 'portfolio'],
  },
  {
    name: 'MunGell/awesome-for-beginners',
    description:
      'A list of awesome beginners-friendly projects. Find projects that welcome new contributors.',
    url: 'https://github.com/MunGell/awesome-for-beginners',
    language: 'Markdown',
    stars: 52000,
    forks: 7000,
    currentPeriodStars: 200,
    avatar: 'https://avatars.githubusercontent.com/u/8124394?v=4',
    builtBy: [
      {
        username: 'MunGell',
        href: 'https://github.com/MunGell',
        avatar: 'https://avatars.githubusercontent.com/u/8124394?v=4',
      },
    ],
    tags: [
      'beginner-friendly',
      'good-first-issue',
      'hacktoberfest',
      'contributing',
    ],
  },
  {
    name: 'microsoft/PowerToys',
    description:
      'Windows system utilities to maximize productivity. Great for learning C# and Windows development.',
    url: 'https://github.com/microsoft/PowerToys',
    language: 'C#',
    stars: 95000,
    forks: 5500,
    currentPeriodStars: 400,
    avatar: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    builtBy: [
      {
        username: 'crutkas',
        href: 'https://github.com/crutkas',
        avatar: 'https://avatars.githubusercontent.com/u/1108243?v=4',
      },
    ],
    tags: [
      'beginner-friendly',
      'csharp',
      'windows',
      'microsoft',
      'good-first-issue',
    ],
  },
];

const OpenSourceProjectsContainer: React.FC = () => {
  const [projects, setProjects] = useState<OpenSourceProject[]>([]);
  const [language, setLanguage] = useState('All');
  const [sort, setSort] = useState('most_stars');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API call with our curated data
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Add some randomization to make it feel more dynamic
        const shuffledProjects = [...BEGINNER_FRIENDLY_PROJECTS]
          .sort(() => Math.random() - 0.5)
          .map((project) => ({
            ...project,
            currentPeriodStars: Math.floor(Math.random() * 1000) + 100, // Random trending stars
            stars: project.stars + Math.floor(Math.random() * 1000), // Slight variation
          }));

        setProjects(shuffledProjects);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const languageOptions = useMemo(
    () => [
      'All',
      ...Array.from(new Set(projects.map((p) => p.language))).sort(),
    ],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    let list = [...projects];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (language !== 'All') {
      list = list.filter((p) => p.language === language);
    }

    switch (sort) {
      case 'most_stars':
        return list.sort((a, b) => b.stars - a.stars);
      case 'fewest_stars':
        return list.sort((a, b) => a.stars - b.stars);
      case 'most_forks':
        return list.sort((a, b) => b.forks - a.forks);
      case 'fewest_forks':
        return list.sort((a, b) => a.forks - b.forks);
      case 'most_trending':
        return list.sort((a, b) => b.currentPeriodStars - a.currentPeriodStars);
      default:
        return list;
    }
  }, [projects, language, sort, searchQuery]);

  const totalStars = useMemo(
    () => filteredProjects.reduce((sum, project) => sum + project.stars, 0),
    [filteredProjects]
  );

  const totalForks = useMemo(
    () => filteredProjects.reduce((sum, project) => sum + project.forks, 0),
    [filteredProjects]
  );

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>
            🚀 Loading amazing projects for your journey...
          </LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorIcon>❌</ErrorIcon>
          <ErrorText>{error}</ErrorText>
          <ErrorSubtext>
            Don't worry! You can still explore our curated list of
            beginner-friendly projects.
          </ErrorSubtext>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <StyledHeading>
        🚀 {filteredProjects.length} Beginner-Friendly Projects to Launch Your
        Career
      </StyledHeading>
      <SubHeading>
        Curated specifically for junior developers seeking their first job.
        These projects are perfect for building your portfolio, gaining
        real-world experience, and making meaningful contributions to open
        source.
      </SubHeading>

      <StatsBar>
        <Stat>
          <StatNumber>{filteredProjects.length}</StatNumber>
          <StatLabel>Projects</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{(totalStars / 1000).toFixed(1)}k</StatNumber>
          <StatLabel>Total Stars</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{(totalForks / 1000).toFixed(1)}k</StatNumber>
          <StatLabel>Total Forks</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>12</StatNumber>
          <StatLabel>Languages</StatLabel>
        </Stat>
      </StatsBar>

      <ProjectFiltersContainer
        language={language}
        setLanguage={setLanguage}
        sort={sort}
        setSort={setSort}
        languageOptions={languageOptions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ProjectsGrid>
        {filteredProjects.map((project) => (
          <OpenSourceProjectCard key={project.name} project={project} />
        ))}
      </ProjectsGrid>
    </Container>
  );
};

export { OpenSourceProjectsContainer };
