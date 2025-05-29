'use client';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData from '@/../public/lotties/bg1.json';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px 40px;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 100px 60px 60px;
    text-align: left;
  }
`;

const Content = styled.div`
  max-width: 700px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 16px;
  font-family: ${({ theme }) => theme.fonts.body};

  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
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

const IllustrationWrapper = styled.div`
  margin-top: 40px;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 40px;
  }
`;

export const HomepageHeroContainer = () => {
  const handleSignIn = () => {
    // TODO: Integrate with auth provider like NextAuth
    console.log('Sign in with GitHub');
  };

  return (
    <HeroSection>
      <Content>
        <Title>Contribute. Learn. Get Hired.</Title>
        <Subtitle>
          NextCommit helps junior developers grow their skills and land jobs by
          contributing to real-world open source projects. Start your journey
          with GitHub — one commit at a time.
        </Subtitle>

        <GitHubButton onClick={handleSignIn}>
          <FaGithub size={18} />
          Sign in with GitHub
        </GitHubButton>
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{
            width: '100vw',
            height: '300px',
          }}
        />
      </Content>

      <IllustrationWrapper>
        {/* Optional: add illustration */}
        {/* <Image src={HeroIllustration} alt="Illustration" width={400} height={300} /> */}
      </IllustrationWrapper>
    </HeroSection>
  );
};
