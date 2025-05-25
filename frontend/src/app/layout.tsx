import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
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
          <SessionWrapper>{children}</SessionWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
