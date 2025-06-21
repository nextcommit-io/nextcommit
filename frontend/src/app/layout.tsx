// app/layout.tsx

import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/components/theme-provider';
import GlobalStyles from '@/components/global-styles';
import SessionWrapper from '@/contexts/SessionWrapper';

export const metadata: Metadata = {
  title: 'NextCommit',
  description: 'GitHub login example',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <GlobalStyles />
            <SessionWrapper>{children}</SessionWrapper>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
