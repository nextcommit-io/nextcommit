'use client';

import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  padding: 60px 160px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  z-index: 2;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const Copyright = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 24px;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 24px;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-4px);
  }
`;

const MadeWithLove = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.mono};

  span {
    color: #ff6b6b;
  }
`;

export const FooterContainer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <Copyright>
          © {new Date().getFullYear()} NextCommit. All rights reserved.
        </Copyright>
        <SocialLinks>
          <SocialLink
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </SocialLink>
          <SocialLink
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </SocialLink>
          <SocialLink
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </SocialLink>
        </SocialLinks>
        <MadeWithLove>
          Made with <span>❤️</span> by developers, for developers.
        </MadeWithLove>
      </FooterContent>
    </FooterWrapper>
  );
};
