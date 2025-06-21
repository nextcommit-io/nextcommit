'use client';
import styled from 'styled-components';
import {
  FaGithub,
  FaCode,
  FaRocket,
  FaStar,
  FaArrowRight,
} from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import Lottie from 'lottie-react';
import animationData from '@/../public/lotties/bg1.json';

const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(88, 166, 255, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(255, 107, 107, 0.1) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 80px 160px;
  text-align: center;
  flex-grow: 1;
  z-index: 2;
  position: relative;

  @media (min-width: 768px) {
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

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(
      135deg,
      rgba(88, 166, 255, 0.05) 0%,
      rgba(255, 107, 107, 0.05) 100%
    );
    border-radius: 20px;
    filter: blur(20px);
    z-index: -1;
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

const LottieBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  opacity: 0.6;

  & > div {
    width: 100% !important;
    height: 100% !important;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
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
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
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

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const FloatingElement = styled.div<{
  delay: number;
  duration: number;
  size: number;
}>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent}20,
    transparent
  );
  border-radius: 50%;
  animation: float ${({ duration }) => duration}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
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

export const HomepageHeroContainer = () => {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn('github');
  };

  const handleGoToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const isLoading = status === 'loading';

  return (
    <HeroWrapper>
      <FloatingElements>
        <FloatingElement
          delay={0}
          duration={6}
          size={20}
          style={{ top: '20%', left: '10%' }}
        />
        <FloatingElement
          delay={2}
          duration={8}
          size={15}
          style={{ top: '60%', right: '15%' }}
        />
        <FloatingElement
          delay={4}
          duration={7}
          size={25}
          style={{ top: '30%', right: '25%' }}
        />
      </FloatingElements>

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
          ) : session?.user ? (
            <DashboardButton onClick={handleGoToDashboard}>
              <FaArrowRight size={20} />
              Go to Dashboard
            </DashboardButton>
          ) : (
            <CTAButton onClick={handleSignIn}>
              <FaGithub size={20} />
              Sign in with GitHub
            </CTAButton>
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
      </HeroSection>

      <LottieBottom>
        <Lottie animationData={animationData} loop autoplay />
      </LottieBottom>
    </HeroWrapper>
  );
};
