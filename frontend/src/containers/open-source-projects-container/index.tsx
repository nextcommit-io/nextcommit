import { OpenSourceProjectCard } from '@/componetns/open-source-projects/open-source-project-card';
import { Heading } from '@/design-system';
import { OpenSourceProject } from '@/types';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const mockProjects: OpenSourceProject[] = [
  {
    name: 'Odigos',
    description: 'Observability framework with zero code changes.',
    url: 'https://github.com/keyval-dev/odigos',
    language: 'Go',
  },
  {
    name: 'React',
    description:
      'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    url: 'https://github.com/facebook/react',
    language: 'JavaScript',
  },
  {
    name: 'Next.js',
    description: 'The React framework for production.',
    url: 'https://github.com/vercel/next.js',
    language: 'TypeScript',
  },
];

const OpenSourceProjectsContainer: React.FC = () => (
  <Container>
    <Heading>Featured Open Source Projects</Heading>
    {mockProjects.map((project) => (
      <OpenSourceProjectCard key={project.name} project={project} />
    ))}
  </Container>
);

export { OpenSourceProjectsContainer };
