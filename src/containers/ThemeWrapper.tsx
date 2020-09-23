import React from 'react';
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
  a {
    text-decoration: none;
  }
  a:focus {
    outline: none;
  }
`;

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    lid: {
      brand: '#0c65EB',
      brandLight: '#1C9EF7',
      brandDark: '#074E9C',
      stroke: '#E4E4E4',
      bg: '#fff',
      bgMed: '#E5E9Ef',
      fg: '#040404',
      fgMed: '#5B5B5B',
      fgLight: '#A1A7B0',
      buttonBg: '#D8E0E7',
      buttonBgDk: '#4A4A4A'
    }
  },
  fonts: {
    body: 'Gotham, sans-serif',
    heading: 'Gotham, serif',
    mono: 'Menlo, monospace'
  }
  // breakpoints: ['650px', '900px', '1240px', '1920px']
};

interface IThemeWrapper {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<IThemeWrapper> = ({ children }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Global styles={GlobalStyles} />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
