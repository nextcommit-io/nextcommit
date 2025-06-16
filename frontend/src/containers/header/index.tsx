'use client';

import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 60px 160px;
`;

const LogoWrapper = styled.div`
  gap: 12px;

  img {
    height: 32px;
  }

  span {
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fonts.body};
  }
`;

const GitHubButton = styled.button`
  background-color: #24292f;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    background-color: #1b1f23;
  }
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fonts.body};
  }
`;

export const HeaderContainer = () => {
  const handleSignIn = () => {
    // Replace with actual logic, e.g., next-auth signIn("github")
    console.log('Sign in with GitHub');
  };

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <LogoLink>
          <span>{'</>'}</span>
          <span>NextCommit</span>
        </LogoLink>
      </LogoWrapper>

      <GitHubButton onClick={handleSignIn}>
        <FaGithub size={16} />
        Sign in with GitHub
      </GitHubButton>
    </HeaderWrapper>
  );
};
