'use client';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '@/style/theme';
import { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
