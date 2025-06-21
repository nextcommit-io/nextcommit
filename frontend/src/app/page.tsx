'use client';
import {
  HomepageHeroContainer,
  OpenSourceProjectsContainer,
  HeaderContainer,
  FooterContainer,
} from '@/containers';
import {
  PageWrapper,
  FloatingElements,
  FloatingElement,
} from '@/components/page-wrapper';

export default function HomePage() {
  return (
    <>
      <HeaderContainer />
      <PageWrapper>
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
          <FloatingElement
            delay={1}
            duration={9}
            size={22}
            style={{ top: '80%', left: '20%' }}
          />
          <FloatingElement
            delay={3}
            duration={7}
            size={18}
            style={{ top: '90%', right: '30%' }}
          />
        </FloatingElements>

        <HomepageHeroContainer />
        <OpenSourceProjectsContainer />
      </PageWrapper>
      <FooterContainer />
    </>
  );
}
