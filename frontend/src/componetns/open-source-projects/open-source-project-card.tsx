import React from 'react';
import { OpenSourceProject } from '../../types/open-source-project';
import { Card } from '../../design-system/card';
import { Heading, Paragraph, Label } from '../../design-system/text';
import { Button } from '../../design-system/button';

interface Props {
  project: OpenSourceProject;
}

export const OpenSourceProjectCard: React.FC<Props> = ({ project }) => (
  <Card>
    <Heading>{project.name}</Heading>
    <Paragraph>{project.description}</Paragraph>
    <Label>Language: {project.language}</Label>
    <br />
    <Button href={project.url} target="_blank" rel="noopener noreferrer">
      View on GitHub
    </Button>
  </Card>
);
