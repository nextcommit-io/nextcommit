'use client';

import styled from 'styled-components';

export const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 30% 20%,
        rgba(88, 166, 255, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 70% 80%,
        rgba(255, 107, 107, 0.05) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

export const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

export const FloatingElement = styled.div<{
  delay: number;
  duration: number;
  size: number;
}>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent}15,
    transparent
  );
  border-radius: 50%;
  animation: float ${({ duration }) => duration}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.05);
    }
  }
`;
