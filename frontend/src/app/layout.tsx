import StyledComponentsRegistry from '@/lib/registry';
import SessionWrapper from '@/contexts/SessionWrapper';
import ThemeWrapper from '@/contexts/ThemeWrapper';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://geistsans.vercel.app/font.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeWrapper>
            <SessionWrapper>{children}</SessionWrapper>
          </ThemeWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
