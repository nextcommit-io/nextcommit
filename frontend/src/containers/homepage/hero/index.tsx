'use client';
import styled from 'styled-components';
import {
  FaGithub,
  FaCode,
  FaRocket,
  FaStar,
  FaArrowRight,
  FaUsers,
} from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';

const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
  background: transparent;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 80px 160px;
  text-align: center;
  flex-grow: 1;
  z-index: 2;
  position: relative;

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    align-items: center;
  }
`;

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
  position: relative;

  @media (max-width: 992px) {
    max-width: 100%;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: clamp(36px, 5vw, 64px);
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.textPrimary} 0%,
    ${({ theme }) => theme.colors.accent} 50%,
    #ff6b6b 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.accent},
      #ff6b6b
    );
    border-radius: 2px;
  }

  @media (max-width: 992px) {
    margin: 0 auto 24px;
  }

  @media (min-width: 768px) {
    &::after {
      width: 80px;
    }
  }
`;

const Subtitle = styled.p`
  font-size: clamp(18px, 2.5vw, 24px);
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 32px;
  font-weight: 400;
  max-width: 600px;

  @media (max-width: 992px) {
    margin: 0 auto 32px;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #24292f 0%, #1b1f23 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 16px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  margin-bottom: 32px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #1b1f23 0%, #24292f 100%);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(-1px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const DashboardButton = styled(CTAButton)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent} 0%,
    #58a6ff 100%
  );

  &:hover {
    background: linear-gradient(
      135deg,
      #58a6ff 0%,
      ${({ theme }) => theme.colors.accent} 100%
    );
  }
`;

const BrowseButton = styled(CTAButton)`
  background: linear-gradient(
    135deg,
    rgba(255, 107, 107, 0.8) 0%,
    rgba(255, 107, 107, 0.6) 100%
  );
  margin-left: 16px;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 107, 107, 0.9) 0%,
      rgba(255, 107, 107, 0.7) 100%
    );
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;

  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(
    135deg,
    rgba(88, 166, 255, 0.1) 0%,
    rgba(255, 107, 107, 0.1) 100%
  );
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: ${({ theme }) => theme.fonts.body};
  white-space: nowrap;
  border: 1px solid rgba(88, 166, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(88, 166, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(88, 166, 255, 0.2);
    border-color: ${({ theme }) => theme.colors.accent};
    background: linear-gradient(
      135deg,
      rgba(88, 166, 255, 0.2) 0%,
      rgba(255, 107, 107, 0.2) 100%
    );
  }

  &:hover::before {
    left: 100%;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1) rotate(5deg);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 40px;

  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const Stat = styled.div`
  text-align: center;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
    border-color: ${({ theme }) => theme.colors.accent}40;
  }
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(88, 166, 255, 0.2);
  border-top: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.accent}40;
  margin-bottom: 32px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const IllustrationContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 400px;
  perspective: 1000px;

  @media (max-width: 992px) {
    display: none;
  }
`;

const DevIllustration = styled.div`
  width: 450px;
  height: 320px;
  background: rgba(13, 17, 23, 0.5);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  backdrop-filter: blur(12px);
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  transform: rotateY(-15deg) rotateX(10deg);
  transform-style: preserve-3d;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotateY(0deg) rotateX(0deg) scale(1.05);
  }
`;

const IllustrationHeader = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const CodeArea = styled.div`
  padding: 16px;
`;

const CodeLine = styled.div<{ delay?: number }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: pre;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  ${({ delay }) => delay && `animation-delay: ${delay}s;`}

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .keyword {
    color: #c678dd;
  }
  .function {
    color: #61afef;
  }
  .string {
    color: #98c379;
  }
  .tag {
    color: #e06c75;
  }
  .punctuation {
    color: #abb2bf;
  }
  .comment {
    color: #5c6370;
  }
  .text {
    color: #abb2bf;
  }
`;

export const HomepageHeroContainer = () => {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn('github');
  };

  const handleBrowseDevelopers = () => {
    window.location.href = '/top-developers';
  };

  const isLoading = status === 'loading';

  return (
    <HeroWrapper>
      <HeroSection>
        <Content>
          <Title>Contribute. Learn. Get Hired.</Title>
          <Subtitle>
            NextCommit helps junior developers grow their skills and land jobs
            by contributing to real-world open source projects. Start your
            journey with GitHub — one commit at a time.
          </Subtitle>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ButtonGroup>
              <CTAButton onClick={handleSignIn}>
                <FaGithub size={20} />
                Sign in with GitHub
              </CTAButton>
              <BrowseButton onClick={handleBrowseDevelopers}>
                <FaUsers size={20} />
                Browse Top Developers
              </BrowseButton>
            </ButtonGroup>
          )}

          <TagsContainer>
            <Tag>
              <FaRocket size={14} />
              Fast Hiring
            </Tag>
            <Tag>
              <FaCode size={14} />
              Beginner Friendly
            </Tag>
            <Tag>
              <FaStar size={14} />
              Real Projects
            </Tag>
            <Tag>
              <FaUsers size={14} />
              Top Talent
            </Tag>
          </TagsContainer>

          <StatsContainer>
            <Stat>
              <StatNumber>500+</StatNumber>
              <StatLabel>Projects</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>2.5k+</StatNumber>
              <StatLabel>Developers</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>95%</StatNumber>
              <StatLabel>Success Rate</StatLabel>
            </Stat>
          </StatsContainer>
        </Content>
        <IllustrationContainer>
          <DevIllustration>
            <IllustrationHeader>
              <HeaderDot color="#ff5f56" />
              <HeaderDot color="#ffbd2e" />
              <HeaderDot color="#27c93f" />
            </IllustrationHeader>
            <CodeArea>
              <CodeLine delay={0.5}>
                <span className="comment">
                  {'//'} Build your first component
                </span>
              </CodeLine>
              <CodeLine delay={1.0}>
                <span className="keyword">import</span> React{' '}
                <span className="keyword">from</span>{' '}
                <span className="string">'react'</span>;
              </CodeLine>
              <CodeLine delay={1.5} />
              <CodeLine delay={2.0}>
                {`const `}
                <span className="function">ProfileCard</span>
                {` = ({ user }) => {`}
              </CodeLine>
              <CodeLine delay={2.5}>
                {'  '}
                <span className="keyword">return</span> (
              </CodeLine>
              <CodeLine delay={3.0}>
                {'    '}
                {`<`}
                <span className="tag">div</span>
                {` className=`}
                <span className="string">"card"</span>
                {`>`}
              </CodeLine>
              <CodeLine delay={3.5}>
                {'      '}
                {`<`}
                <span className="tag">h2</span>
                {`>{user.name}</`}
                <span className="tag">h2</span>
                {`>`}
              </CodeLine>
              <CodeLine delay={4.0}>
                {'    '}
                {`</`}
                <span className="tag">div</span>
                {`>`}
              </CodeLine>
              <CodeLine delay={4.5}>{'  '});</CodeLine>
              <CodeLine delay={5.0}>{'};'}</CodeLine>
            </CodeArea>
          </DevIllustration>
        </IllustrationContainer>
      </HeroSection>
    </HeroWrapper>
  );
};
