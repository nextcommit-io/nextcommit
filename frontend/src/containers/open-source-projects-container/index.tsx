'use client';
import React, { useEffect, useState } from 'react';
import { OpenSourceProject } from '@/types';
import styled from 'styled-components';
import { OpenSourceProjectCard } from '@/components';

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

  if (loading) return <Container>Loading trending projects...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <StyledHeading>🔥 Trending Open Source Projects</StyledHeading>
      <ProjectsGrid>
        {projects.map((project) => (
          <OpenSourceProjectCard key={project.name} project={project} />
        ))}
      </ProjectsGrid>
    </Container>
  );
};

export { OpenSourceProjectsContainer };
