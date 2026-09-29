import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Icon from '../../../components/Icon/Icon';
import skillsData from '../../../data/skills.json';
import profile from '../../../data/profile.json';
import skillIcons, { monoIcons } from '../../../lib/skillIcons';
import useSpotlight from '../../../lib/useSpotlight';
import './Skills.scss';

const CATEGORY_ORDER = [
  'Frontend', 'Backend & APIs', 'Languages', 'Cloud & DevOps',
  'AI & GenAI', 'Testing & Performance', 'Databases', 'Tools & Practices',
];
const CATEGORY_ICONS = {
  Frontend: 'layers', 'Backend & APIs': 'code', Languages: 'file', 'Cloud & DevOps': 'cloud',
  'AI & GenAI': 'sparkles', 'Testing & Performance': 'gauge', Databases: 'layers', 'Tools & Practices': 'briefcase',
};

const categories = [...new Set(skillsData.map((s) => s.category))].sort(
  (a, b) => (CATEGORY_ORDER.indexOf(a) + 1 || 99) - (CATEGORY_ORDER.indexOf(b) + 1 || 99)
);

function SkillGroup({ category, query, index }) {
  const onMove = useSpotlight();
  const skills = skillsData.filter((s) => s.category === category).sort((a, b) => a.order - b.order);
  const q = query.trim().toLowerCase();
  const matches = q ? skills.filter((s) => s.name.toLowerCase().includes(q)).length : skills.length;

  return (
    <motion.div
      className={`skill-group card spotlight${q && !matches ? ' is-dim' : ''}`}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
    >
      <div className="skill-group-head">
        <span className="skill-group-icon"><Icon name={CATEGORY_ICONS[category] || 'code'} size={16} /></span>
        <h3>{category}</h3>
        <span className="skill-group-count mono">{q ? `${matches}/${skills.length}` : skills.length}</span>
      </div>
      <div className="skill-chips">
        {skills.map((s) => {
          const icon = s.icon && skillIcons[s.icon];
          const hit = q && s.name.toLowerCase().includes(q);
          return (
            <span key={s.name} className={`skill-chip${hit ? ' is-hit' : ''}${q && !hit ? ' is-miss' : ''}`}>
              {icon && <img src={icon} alt="" loading="lazy" className={monoIcons.has(s.icon) ? 'is-mono' : undefined} />}
              {s.name}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [query, setQuery] = useState('');
  const total = useMemo(() => new Set(skillsData.map((s) => s.name)).size, []);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeading
          number="03"
          eyebrow="Toolkit"
          title="A full-stack toolkit, sharpened in production."
          description={`${total} technologies across ${categories.length} disciplines. Search to see where a tool fits.`}
        />

        <div className="skills-search glass">
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “React”, “AWS”, “RAG”…"
            aria-label="Search skills"
          />
          {query && (
            <button type="button" className="skills-clear" onClick={() => setQuery('')} aria-label="Clear search">
              <Icon name="close" size={16} />
            </button>
          )}
        </div>

        <div className="skills-grid">
          {categories.map((c, i) => (
            <SkillGroup key={c} category={c} query={query} index={i} />
          ))}
        </div>

        <div className="competencies">
          <p className="competencies-title mono">Core competencies</p>
          <div className="competencies-list">
            {profile.coreSkills.map((s) => (
              <span key={s} className="competency">
                <Icon name="check" size={14} /> {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
