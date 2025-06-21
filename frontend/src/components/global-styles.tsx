'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fonts.body};
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  #__next {
    min-height: 100vh;
  }
`;

export default GlobalStyles;
