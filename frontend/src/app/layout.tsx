import StyledComponentsRegistry from '@/lib/registry';
import SessionWrapper from '@/contexts/SessionWrapper';
import ThemeWrapper from '@/contexts/ThemeWrapper';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
