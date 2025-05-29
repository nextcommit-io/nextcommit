// style/StyledComponentsRegistry.tsx
'use client';

import { theme } from '@/style';
import React from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyleSheetManager>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyleSheetManager>
  );
}
