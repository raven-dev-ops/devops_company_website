import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'dark',
  // eslint-disable-next-line no-empty-function
  toggleTheme: () => {},
});

