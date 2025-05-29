'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/style/theme';
import { StyleSheetManager } from 'styled-components';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.body};
  min-height: 100vh;
`;

export default function StyledRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyleSheetManager>
      <ThemeProvider theme={theme}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </ThemeProvider>
    </StyleSheetManager>
  );
}
