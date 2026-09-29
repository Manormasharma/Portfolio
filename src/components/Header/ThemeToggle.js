import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon/Icon';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`;
  return (
    <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={label} title={label}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-flex' }}
        >
          <Icon name={isDark ? 'sun' : 'moon'} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
