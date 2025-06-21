// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Space_Grotesk, Fira_Code } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import { Providers } from '@/components/providers';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: 'NextCommit',
  description: 'GitHub login example',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${firaCode.variable}`}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
