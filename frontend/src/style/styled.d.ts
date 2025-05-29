import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      border: string;
      textPrimary: string;
      textSecondary: string;
      accent: string;
      tagBackground: string;
      tagText: string;
    };
    fonts: {
      body: string;
      mono: string;
    };
  }
}
