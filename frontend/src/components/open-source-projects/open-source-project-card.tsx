import React from 'react';
import styled from 'styled-components';
import { OpenSourceProject } from '../../types/open-source-project';
import { FaStar, FaCodeBranch, FaFire } from 'react-icons/fa';

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00ADD8',
  Ruby: '#701516',
  Java: '#b07219',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Rust: '#dea584',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Swift: '#ffac45',
  Scala: '#c22d40',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  'Objective-C': '#438eff',
  Assembly: '#6E4C13',
  Perl: '#0298c3',
  Lua: '#000080',
  'N/A': '#c0c0c0',
};

const Card = styled.div`
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0 6px rgba(90, 170, 255, 0.15);
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  background-color: #0d1117;
`;
const RepoHeader = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  margin-bottom: 8px;

  a {
    color: #58a6ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #c9d1d9;
`;

const TagsContainer = styled.div`
  margin: 12px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  background: #21262d;
  color: #58a6ff;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 12px;
`;

const Stats = styled.div`
  font-size: 13px;
  color: #8b949e;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 8px;

  svg {
    margin-right: 4px;
  }
`;

const Language = styled.span<{ color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
  }
`;

const CardContent = styled.div`
  padding: 16px;
`;

export const OpenSourceProjectCard: React.FC<{
  project: OpenSourceProject;
}> = ({ project }) => {
  const [owner, repo] = project.name.split('/');
  const languageColor = languageColors[project.language] || '#c0c0c0';

  return (
    <Card>
      <CoverImage src={project.avatar} alt={`${owner}'s avatar`} />
      <CardContent>
        <RepoHeader>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {owner} / <strong>{repo}</strong>
          </a>
        </RepoHeader>

        <Description>{project.description}</Description>

        <TagsContainer>
          {[...(project.tags || []), project.language].map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>

        <Stats>
          <span>
            <FaStar /> {project.stars.toLocaleString()}
          </span>
          <span>
            <FaFire /> {project.currentPeriodStars}
          </span>
          <span>
            <FaCodeBranch /> {project.forks}
          </span>
          <Language color={languageColor}>{project.language}</Language>
        </Stats>
      </CardContent>
    </Card>
  );
};
