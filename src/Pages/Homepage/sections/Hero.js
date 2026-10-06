import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Icon from '../../../components/Icon/Icon';
import profile from '../../../data/profile.json';
import experienceData from '../../../data/experience.json';
import certificationsData from '../../../data/certifications.json';
import { scrollToSection, OPEN_CHAT_EVENT } from '../../../lib/site';
import './Hero.scss';

const current = experienceData.slice().sort((a, b) => a.order - b.order)[0];
const certs = certificationsData.filter((c) => c.type === 'certification');

// The "editor" card renders the profile as code — each tab is a different view of the same data.
const TABS = {
  'engineer.ts': [
    ['kw', 'const '], ['var', 'engineer'], ['p', ' = {'], 'br',
    ['ind'], ['key', 'name'], ['p', ': '], ['str', `'${profile.name}'`], ['p', ','], 'br',
    ['ind'], ['key', 'role'], ['p', ': '], ['str', `'${profile.tagline}'`], ['p', ','], 'br',
    ['ind'], ['key', 'experience'], ['p', ': '], ['str', `'${profile.yearsExperience} years'`], ['p', ','], 'br',
    ['ind'], ['key', 'company'], ['p', ': '], ['str', `'${current.company}'`], ['p', ','], 'br',
    ['ind'], ['key', 'basedIn'], ['p', ': '], ['str', `'${profile.location}'`], ['p', ','], 'br',
    ['ind'], ['key', 'stack'], ['p', ': ['], ['str', "'React'"], ['p', ', '], ['str', "'Next.js'"], ['p', ', '], ['str', "'Python'"], ['p', ', '], ['str', "'GenAI'"], ['p', ', '], ['str', "'AWS'"], ['p', '],'], 'br',
    ['ind'], ['key', 'openTo'], ['p', ': ['], ['str', "'India'"], ['p', ', '], ['str', "'Europe'"], ['p', '],'], 'br',
    ['ind'], ['key', 'available'], ['p', ': '], ['kw', 'true'], ['p', ','], 'br',
    ['p', '};'],
  ],
  'impact.json': [
    ['p', '{'], 'br',
    ...profile.metrics.flatMap((m, i) => [
      ['ind'], ['key', `"${m.key}"`], ['p', ': '],
      ['num', `"${m.prefix || ''}${m.value}${m.suffix}"`], ['p', i < profile.metrics.length - 1 ? ',' : ''], 'br',
    ]),
    ['p', '}'],
  ],
  'certs.yml': certs.flatMap((c) => [
    ['p', '- '], ['key', 'name'], ['p', ': '], ['str', c.title], 'br',
    ['ind'], ['key', 'issuer'], ['p', ': '], ['var', c.issuer], 'br',
    ['ind'], ['key', 'issued'], ['p', ': '], ['num', c.date], 'br',
  ]),
};

function CodeLines({ tokens }) {
  const lines = [[]];
  tokens.forEach((t) => (t === 'br' ? lines.push([]) : lines[lines.length - 1].push(t)));
  return (
    <ol className="code-lines">
      {lines.map((line, i) => (
        <motion.li key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
          {line.map(([type, text], j) =>
            type === 'ind' ? <span key={j} className="code-ind" /> : <span key={j} className={`tok-${type}`}>{text}</span>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

function EditorCard() {
  const [tab, setTab] = useState('engineer.ts');
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="editor-wrap"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div className="editor glass" style={{ rotateX, rotateY }}>
        <div className="editor-bar">
          <span className="editor-dots"><i /><i /><i /></span>
          <div className="editor-tabs" role="tablist">
            {Object.keys(TABS).map((name) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={tab === name}
                className={`editor-tab${tab === name ? ' is-active' : ''}`}
                onClick={() => setTab(name)}
              >
                {tab === name && <motion.span layoutId="editor-tab" className="editor-tab-bg" />}
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="editor-body">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <CodeLines tokens={TABS[tab]} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="editor-status">
          <span><i className="status-dot" /> main</span>
          <span>UTF-8 · TypeScript</span>
        </div>
      </motion.div>
      <motion.div
        className="floating-chip glass chip-a"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon name="gauge" size={16} /> ~30% faster page loads
      </motion.div>
      <motion.div
        className="floating-chip glass chip-b"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon name="badge" size={16} /> AWS Certified AI Practitioner
      </motion.div>
    </motion.div>
  );
}

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const roles = profile.rotatingRoles;
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2400);
    return () => clearInterval(t);
  }, [roles.length]);

  return (
    <span className="rotating-role">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const rise = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function Hero() {
  const socials = profile.socialLinks;
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <motion.div className="hero-copy" variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={rise} className="availability glass">
            <span className="availability-dot" />
            {profile.availability}
            <span className="availability-extra">
              <span className="availability-sep" />
              <Icon name="globe" size={14} /> {profile.locationLine}
            </span>
          </motion.div>

          <motion.p variants={rise} className="hero-hello">
            Hi, I'm <strong>{profile.name}</strong> — {profile.tagline}
          </motion.p>

          <motion.h1 variants={rise} className="hero-title">
            Building <span className="text-gradient">production web platforms</span> and AI-powered products.
          </motion.h1>

          <motion.p variants={rise} className="hero-focus">
            <span className="mono">Focus</span> <RotatingRole />
          </motion.p>

          <motion.p variants={rise} className="hero-lede">{profile.heroIntro}</motion.p>

          <motion.div variants={rise} className="hero-ai" aria-label="AI and GenAI focus">
            {profile.aiHighlights.map((h) => (
              <span key={h} className="ai-chip">{h}</span>
            ))}
          </motion.div>

          <motion.div variants={rise} className="hero-actions">
            <Link className="btn btn-primary" to="/resume">
              <Icon name="file" /> View Resume
            </Link>
            <button type="button" className="btn btn-ghost" onClick={() => scrollToSection('work')}>
              <Icon name="arrowRight" /> View Projects
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}>
              <Icon name="sparkles" /> Ask my AI assistant
            </button>
          </motion.div>

          <motion.div variants={rise} className="hero-socials">
            {socials.map((s) => (
              <a
                key={s.platform}
                className="icon-btn"
                href={s.url}
                target={s.platform === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={s.platform}
                title={s.label}
              >
                <Icon name={s.platform} />
              </a>
            ))}
            <span className="hero-location">
              <Icon name="mapPin" size={14} /> {profile.location} · {profile.workAuthNote}
            </span>
          </motion.div>
        </motion.div>

        <EditorCard />
      </div>

      <button type="button" className="scroll-cue" onClick={() => scrollToSection('impact')} aria-label="Scroll down">
        <span />
      </button>
    </section>
  );
}
