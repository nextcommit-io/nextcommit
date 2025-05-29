// app/layout.tsx

import type { Metadata } from 'next';

import SessionWrapper from '@/contexts/SessionWrapper';
import StyledRoot from '@/components/styled-root';
import { HeaderContainer } from '@/containers';

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
      <body style={{ margin: 0, padding: 0 }}>
        <StyledRoot>
          <HeaderContainer />
          <SessionWrapper>{children}</SessionWrapper>
        </StyledRoot>
      </body>
    </html>
  );
}
