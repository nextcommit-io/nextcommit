'use client';

import styled from 'styled-components';
import { Text } from '@/design-system';
import theme from '@/styles/theme'

const Wrapper = styled.main`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default function HomePage() {
  return (
    <Wrapper>
      <Text size="lg" weight="bold">
        NextCommit
      </Text>
    </Wrapper>
  );
}
