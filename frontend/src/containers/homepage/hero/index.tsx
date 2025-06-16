'use client';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
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
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 60px 160px;
  text-align: center;
  flex-grow: 1;
  z-index: 2;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 16px;
  font-family: ${({ theme }) => theme.fonts.body};

  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const Subtitle = styled.p`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 24px;
`;

const GitHubButton = styled.button`
  background-color: #24292f;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    background-color: #1b1f23;
  }
`;

const LottieBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  pointer-events: none;

  & > div {
    width: 100% !important;
    height: 100% !important;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

const Tag = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #1f6feb, #58a6ff);
  color: white;
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 999px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: ${({ theme }) => theme.fonts.body};
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #2b7bff, #79c0ff);
  }
`;

export const HomepageHeroContainer = () => {
  const handleSignIn = () => {
    console.log('Sign in with GitHub');
  };

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

          <GitHubButton onClick={handleSignIn}>
            <FaGithub size={18} />
            Sign in with GitHub
          </GitHubButton>
          <TagsContainer>
            <Tag>🚀 Fast Hiring</Tag>
            <Tag>✨ Beginner Friendly</Tag>
            <Tag>💼 Real Projects</Tag>
          </TagsContainer>
        </Content>
      </HeroSection>

      <LottieBottom>
        <Lottie animationData={animationData} loop autoplay />
      </LottieBottom>
    </HeroWrapper>
  );
};
