'use client';

import styled from 'styled-components';
import {
  FaGithub,
  FaSignOutAlt,
  FaUser,
  FaCode,
  FaUsers,
} from 'react-icons/fa';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 160px;
  position: relative;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.accent} 50%,
      transparent 100%
    );
  }
`;

const LogoWrapper = styled.div`
  gap: 12px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.accent},
      #58a6ff
    );
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

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
  background: linear-gradient(135deg, #24292f 0%, #1b1f23 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.3s ease;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

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
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #1b1f23 0%, #24292f 100%);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(0);
  }
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  position: relative;

  .code-icon {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.accent};
    filter: drop-shadow(0 0 8px ${({ theme }) => theme.colors.accent}40);
  }

  .brand-text {
    font-size: 22px;
    font-weight: 800;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.textPrimary} 0%,
      ${({ theme }) => theme.colors.accent} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: ${({ theme }) => theme.fonts.body};
    letter-spacing: -0.5px;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: ${({ theme }) => theme.colors.accent}40;
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(88, 166, 255, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  box-shadow: 0 0 15px ${({ theme }) => theme.colors.accent}40;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px ${({ theme }) => theme.colors.accent}60;
  }
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.body};
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  z-index: 1;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-width: 200px;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-8px)')};
  transition: all 0.3s ease;
  margin-top: 8px;
  backdrop-filter: blur(10px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.accent} 50%,
      transparent 100%
    );
  }
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 14px 18px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all 0.2s ease;
  font-weight: 500;
  position: relative;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(88, 166, 255, 0.1) 0%,
      rgba(88, 166, 255, 0.05) 100%
    );
    color: ${({ theme }) => theme.colors.accent};
  }

  &:first-child {
    border-radius: 12px 12px 0 0;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
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

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const DevBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
`;

export const HeaderContainer = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSignIn = () => {
    signIn('github');
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    router.push('/new-profile');
    setIsDropdownOpen(false);
  };

  const handleTopDevelopersClick = () => {
    router.push('/top-developers');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isLoading = status === 'loading';

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <LogoLink href="/">
          <FaCode className="code-icon" />
          <span className="brand-text">NextCommit</span>
        </LogoLink>
      </LogoWrapper>

      {isLoading ? (
        <LoadingSpinner />
      ) : session?.user ? (
        <UserSection ref={dropdownRef}>
          <UserInfo onClick={toggleDropdown}>
            <Avatar
              src={session.user.image || '/default-avatar.svg'}
              alt={session.user.name || 'User avatar'}
              onError={(e) => {
                e.currentTarget.src = '/default-avatar.svg';
              }}
            />
            <UserName>{session.user.name || session.user.email}</UserName>
            <DevBadge>DEV</DevBadge>
          </UserInfo>

          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownItem onClick={handleProfileClick}>
              <FaUser size={16} />
              Profile
            </DropdownItem>
            <DropdownItem onClick={handleTopDevelopersClick}>
              <FaUsers size={16} />
              Top Developers
            </DropdownItem>
            <DropdownItem onClick={handleSignOut}>
              <FaSignOutAlt size={16} />
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </UserSection>
      ) : (
        <GitHubButton onClick={handleSignIn}>
          <FaGithub size={18} />
          Sign in with GitHub
        </GitHubButton>
      )}
    </HeaderWrapper>
  );
};
