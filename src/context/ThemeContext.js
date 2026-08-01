import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

// Light (teal accent) is this site's identity — confirmed over the dark
// variants during design review. Dark stays available as an opt-in fallback
// (dark-indigo, the most neutral of the tried variants) for visitors who
// prefer it, via the toggle.
const DEFAULT_THEME = 'light';
const DARK_FALLBACK = 'dark-indigo';
const VALID_THEME_IDS = ['light', DARK_FALLBACK];

function getInitialTheme() {
  const stored = window.localStorage.getItem('theme');
  return VALID_THEME_IDS.includes(stored) ? stored : DEFAULT_THEME;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const isDark = theme !== 'light';
  const toggleTheme = () => setTheme((t) => (t === 'light' ? DARK_FALLBACK : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
