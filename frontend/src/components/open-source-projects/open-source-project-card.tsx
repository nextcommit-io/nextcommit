import React from 'react';
import styled from 'styled-components';
import { OpenSourceProject } from '../../types/open-source-project';
import {
  FaStar,
  FaCodeBranch,
  FaFire,
  FaExternalLinkAlt,
} from 'react-icons/fa';

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
  Markdown: '#083fa1',
};

const Card = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(88, 166, 255, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: ${({ theme }) => theme.colors.accent}40;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const RepoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      color: #ff6b6b;
      transform: translateX(4px);
    }
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 16px;
  font-weight: 400;
`;

const TagsContainer = styled.div`
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: linear-gradient(
    135deg,
    rgba(88, 166, 255, 0.1) 0%,
    rgba(255, 107, 107, 0.1) 100%
  );
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 6px 12px;
  font-size: 11px;
  border-radius: 20px;
  font-weight: 500;
  border: 1px solid rgba(88, 166, 255, 0.2);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(88, 166, 255, 0.2) 0%,
      rgba(255, 107, 107, 0.2) 100%
    );
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const Stats = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      transform: scale(1.05);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }

  span:hover svg {
    transform: scale(1.2);
  }
`;

const Language = styled.span<{ color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    box-shadow: 0 0 8px ${(props) => props.color}40;
    transition: all 0.3s ease;
  }

  &:hover::before {
    box-shadow: 0 0 12px ${(props) => props.color}60;
    transform: scale(1.2);
  }
`;

const CardContent = styled.div`
  padding: 20px;
  position: relative;
  z-index: 1;
`;

const TrendingBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  z-index: 2;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

const ExternalLinkIcon = styled(FaExternalLinkAlt)`
  font-size: 12px;
  opacity: 0.7;
  transition: all 0.3s ease;

  ${RepoHeader} a:hover & {
    opacity: 1;
    transform: translateX(2px);
  }
`;

export const OpenSourceProjectCard: React.FC<{
  project: OpenSourceProject;
}> = ({ project }) => {
  const [owner, repo] = project.name.split('/');
  const languageColor = languageColors[project.language] || '#c0c0c0';
  const isTrending = project.currentPeriodStars > 500;

  return (
    <Card>
      {isTrending && <TrendingBadge>🔥 Trending</TrendingBadge>}
      <CoverImage src={project.avatar} alt={`${owner}'s avatar`} />
      <CardContent>
        <RepoHeader>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {owner} / <strong>{repo}</strong>
            <ExternalLinkIcon />
          </a>
        </RepoHeader>

        <Description>{project.description}</Description>

        <TagsContainer>
          {[...(project.tags || []), project.language]
            .slice(0, 4)
            .map((tag) => (
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
            <FaCodeBranch /> {project.forks.toLocaleString()}
          </span>
          <Language color={languageColor}>{project.language}</Language>
        </Stats>
      </CardContent>
    </Card>
  );
};
