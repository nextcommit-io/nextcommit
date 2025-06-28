'use client';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/components';
import SessionWrapper from '@/contexts/SessionWrapper';
import { FirebaseProvider } from '@/contexts';
import { theme } from '@/style';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SessionWrapper>
        <FirebaseProvider>{children}</FirebaseProvider>
      </SessionWrapper>
    </ThemeProvider>
  );
}
