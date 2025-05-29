'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { OpenSourceProject } from '@/types';
import { OpenSourceProjectCard } from '@/components';
import { ProjectFiltersContainer } from '../project-filters-container';

const Container = styled.div`
  margin: 0 auto;
  padding: 60px 20px;
  background-color: #0d1117;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 40px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledHeading = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #58a6ff;
  text-align: center;
`;

const OpenSourceProjectsContainer: React.FC = () => {
  const [projects, setProjects] = useState<OpenSourceProject[]>([]);
  const [language, setLanguage] = useState('All');
  const [sort, setSort] = useState('most_stars');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingProjects = async () => {
      try {
        const res = await fetch(
          'https://gtrend.yapie.me/repositories?since=daily'
        );
        if (!res.ok) throw new Error('Failed to fetch trending projects');

        const data = await res.json();

        const formattedProjects: OpenSourceProject[] = data.map(
          (repo: any) => ({
            name: `${repo.author}/${repo.name}`,
            description: repo.description,
            url: repo.url,
            language: repo.language || 'N/A',
            stars: repo.stars,
            forks: repo.forks,
            currentPeriodStars: repo.currentPeriodStars,
            avatar: repo.avatar,
            builtBy: repo.builtBy,
          })
        );

        setProjects(formattedProjects);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProjects();
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
  }, [projects, language, sort]);

  if (loading) return <Container>Loading trending projects...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <StyledHeading>
        🔥 {filteredProjects.length.toLocaleString()} open source projects you
        can contribute to today
      </StyledHeading>

      <ProjectFiltersContainer
        language={language}
        setLanguage={setLanguage}
        sort={sort}
        setSort={setSort}
        languageOptions={languageOptions}
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
