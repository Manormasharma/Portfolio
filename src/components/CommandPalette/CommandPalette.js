import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../Icon/Icon';
import { useTheme } from '../../context/ThemeContext';
import profile from '../../data/profile.json';
import { SECTIONS, OPEN_PALETTE_EVENT, OPEN_CHAT_EVENT, socialLink } from '../../lib/site';
import useGoToSection from '../../lib/useGoToSection';
import './CommandPalette.scss';

const SECTION_ICONS = { about: 'user', experience: 'briefcase', work: 'layers', skills: 'code', contact: 'email' };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [toast, setToast] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const goToSection = useGoToSection();
  const { isDark, toggleTheme } = useTheme();

  const close = useCallback(() => setOpen(false), []);

  const commands = useMemo(() => {
    const linkedin = socialLink('linkedin');
    const github = socialLink('github');
    return [
      ...SECTIONS.map((s) => ({
        group: 'Navigate',
        label: `Go to ${s.label}`,
        icon: SECTION_ICONS[s.id],
        run: () => goToSection(s.id),
      })),
      { group: 'Résumé', label: 'Open résumé page', icon: 'file', run: () => navigate('/resume') },
      {
        group: 'Contact',
        label: 'Copy email address',
        icon: 'copy',
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.contactEmail);
            setToast('Email copied to clipboard');
          } catch (err) {
            setToast(profile.contactEmail);
          }
        },
      },
      linkedin && { group: 'Contact', label: 'Open LinkedIn', icon: 'linkedin', run: () => window.open(linkedin.url, '_blank', 'noopener') },
      github && { group: 'Contact', label: 'Open GitHub', icon: 'github', run: () => window.open(github.url, '_blank', 'noopener') },
      { group: 'General', label: 'Ask my AI assistant', icon: 'sparkles', run: () => window.dispatchEvent(new Event(OPEN_CHAT_EVENT)) },
      { group: 'General', label: `Switch to ${isDark ? 'light' : 'dark'} theme`, icon: isDark ? 'sun' : 'moon', keepOpen: true, run: toggleTheme },
    ].filter(Boolean);
  }, [goToSection, navigate, isDark, toggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const execute = (command) => {
    if (!command) return;
    if (!command.keepOpen) close();
    command.run();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(results[cursor]);
    } else if (e.key === 'Escape') {
      close();
    }
  };

  let lastGroup = null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={close}
          >
            <motion.div
              className="palette"
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="palette-search">
                <Icon name="search" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type a command or search…"
                  aria-label="Search commands"
                />
                <kbd>esc</kbd>
              </div>
              <div className="palette-list" role="listbox">
                {results.length === 0 && <p className="palette-empty">No results for “{query}”</p>}
                {results.map((command, index) => {
                  const showGroup = command.group !== lastGroup;
                  lastGroup = command.group;
                  return (
                    <React.Fragment key={command.label}>
                      {showGroup && <p className="palette-group">{command.group}</p>}
                      <button
                        type="button"
                        role="option"
                        aria-selected={index === cursor}
                        className={`palette-item${index === cursor ? ' is-active' : ''}`}
                        onMouseEnter={() => setCursor(index)}
                        onClick={() => execute(command)}
                      >
                        <Icon name={command.icon} size={16} />
                        <span>{command.label}</span>
                        <Icon name="arrowRight" size={14} className="palette-item-go" />
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="palette-footer">
                <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                <span><kbd>↵</kbd> select</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <Icon name="check" size={16} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
