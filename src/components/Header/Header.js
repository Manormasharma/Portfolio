import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Icon from '../Icon/Icon';
import profile from '../../data/profile.json';
import { SECTIONS, OPEN_PALETTE_EVENT } from '../../lib/site';
import useActiveSection from '../../lib/useActiveSection';
import useGoToSection from '../../lib/useGoToSection';
import './Header.scss';

const SECTION_IDS = SECTIONS.map((s) => s.id);
const initials = profile.name.split(' ').map((w) => w[0]).join('');
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS, isHome);
  const goToSection = useGoToSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return undefined;
    const onResize = () => window.innerWidth > 900 && setMenuOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  const onNav = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    goToSection(id);
  };

  const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="container site-header-inner">
        <Link to="/" className="brand" onClick={(e) => onNav(e, 'top')} aria-label={`${profile.name} — home`}>
          <span className="brand-mark">{initials}</span>
          <span className="brand-text">
            <span className="brand-name">{profile.name}</span>
            <span className="brand-role">{profile.tagline}</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`${process.env.PUBLIC_URL}/#${section.id}`}
              className={`site-nav-link${active === section.id ? ' is-active' : ''}`}
              onClick={(e) => onNav(e, section.id)}
            >
              {active === section.id && (
                <motion.span layoutId="nav-pill" className="site-nav-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
              )}
              <span className="site-nav-label">{section.label}</span>
            </a>
          ))}
        </nav>

        <div className="site-header-actions">
          <button type="button" className="palette-trigger" onClick={openPalette} aria-label="Open command menu">
            <Icon name="search" size={15} />
            <span className="palette-trigger-label">Quick jump</span>
            <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
          <ThemeToggle />
          <Link to="/resume" className="btn btn-primary btn-sm header-resume">
            Résumé
          </Link>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* portalled: the header's backdrop-filter would otherwise become the
          containing block for this fixed overlay and clip it to the header */}
      {createPortal(
        <AnimatePresence>
          {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {SECTIONS.map((section, i) => (
              <motion.a
                key={section.id}
                href={`${process.env.PUBLIC_URL}/#${section.id}`}
                onClick={(e) => onNav(e, section.id)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <span className="mono">0{i + 1}</span> {section.label}
              </motion.a>
            ))}
            <Link to="/resume" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
              View résumé
            </Link>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
