import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      heading: string;
      text: string;
    };
    fonts: {
      primary: string;
    };
  }
}
