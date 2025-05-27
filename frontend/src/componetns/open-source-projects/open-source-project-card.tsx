import React from 'react';
import { OpenSourceProject } from '../../types/open-source-project';
import { Card } from '../../design-system/card';
import { Heading, Paragraph, Label } from '../../design-system/text';
import { Button } from '../../design-system/button';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background-color: #161b22;
  border: 1px solid #30363d;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 8px rgba(90, 170, 255, 0.2);
  }
`;

const ProjectName = styled(Heading)`
  font-family: 'Fira Code', monospace;
  font-size: 20px;
  color: #58a6ff;
  margin-bottom: 8px;
`;

const ProjectDescription = styled(Paragraph)`
  font-size: 14px;
  color: #c9d1d9;
`;

const ProjectLanguage = styled(Label)`
  display: inline-block;
  font-size: 12px;
  margin-top: 10px;
  color: #8b949e;
`;

export const OpenSourceProjectCard: React.FC<{
  project: OpenSourceProject;
}> = ({ project }) => (
  <StyledCard>
    <ProjectName>{project.name}</ProjectName>
    <ProjectDescription>{project.description}</ProjectDescription>
    <ProjectLanguage>Language: {project.language}</ProjectLanguage>
    <br />
    <Button href={project.url} target="_blank" rel="noopener noreferrer">
      View on GitHub
    </Button>
  </StyledCard>
);
