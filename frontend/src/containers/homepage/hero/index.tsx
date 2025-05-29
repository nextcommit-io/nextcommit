'use client';
import styled from 'styled-components';
import Image from 'next/image';
import HeroIllustration from '@/assets/hero-illustration.svg'; // Adjust path if needed

export const HomepageHeroContainer = () => {
  return (
    <>
      <HeroSection>
        <Content>
          <Title>Discover the Best of Open Source</Title>
          <Subtitle>
            A curated list of trending open source projects, updated daily.
            Browse, explore, and contribute to top-notch repositories.
          </Subtitle>
        </Content>
        <IllustrationWrapper>
          {/* <Image
            src={HeroIllustration}
            alt="Open source hero illustration"
            width={400}
            height={300}
          /> */}
        </IllustrationWrapper>
      </HeroSection>
    </>
  );
};

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
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #58a6ff;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #8b949e;
  line-height: 1.5;
`;

const IllustrationWrapper = styled.div`
  margin-top: 40px;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 40px;
  }
`;
