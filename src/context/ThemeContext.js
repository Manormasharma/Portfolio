import React, { createContext, useContext, useLayoutEffect, useState } from 'react';

const ThemeContext = createContext(null);

// Dark is the default identity; light is opt-in. public/index.html applies
// the stored value before first paint so there's no flash on load.
const DEFAULT_THEME = 'dark';
const VALID_THEME_IDS = ['dark', 'light'];

function getInitialTheme() {
  const stored = window.localStorage.getItem('theme');
  return VALID_THEME_IDS.includes(stored) ? stored : DEFAULT_THEME;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // layout effect so the attribute is in place before any child's passive
  // effect (e.g. Plasma) reads the new CSS variables
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const isDark = theme === 'dark';
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

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
