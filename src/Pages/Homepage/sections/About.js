import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Icon from '../../../components/Icon/Icon';
import profile from '../../../data/profile.json';
import educationData from '../../../data/education.json';
import useSpotlight from '../../../lib/useSpotlight';
import './About.scss';

const PILLAR_ICONS = ['layers', 'code', 'shield', 'gauge', 'cloud', 'sparkles'];

const facts = [
  { icon: 'mapPin', label: 'Based in', value: profile.location },
  { icon: 'globe', label: 'Relocation', value: 'Global (visa sponsorship) · Bengaluru · Pune · Hyderabad' },
  { icon: 'briefcase', label: 'Experience', value: `${profile.yearsExperience} years, 5 teams` },
  { icon: 'graduation', label: 'Education', value: `${educationData[0].degree.split(',')[0]} — IGNOU` },
  { icon: 'user', label: 'Languages', value: profile.languages.join(' · ') },
];

export default function About() {
  const onMove = useSpotlight();

  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeading
          number="01"
          eyebrow="About"
          title={<>Engineering products end-to-end, <span className="text-gradient">with craft and ownership.</span></>}
        />

        <div className="about-grid">
          <motion.div
            className="about-bio"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {profile.bioParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          <motion.aside
            className="about-facts card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="about-facts-title mono">Quick facts</p>
            <ul>
              {facts.map((f) => (
                <li key={f.label}>
                  <Icon name={f.icon} size={16} />
                  <span className="fact-label">{f.label}</span>
                  <span className="fact-value">{f.value}</span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>

        <h3 className="about-sub">What I bring to a team</h3>
        <div className="pillars">
          {profile.pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              className="pillar card spotlight"
              onMouseMove={onMove}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <span className="pillar-icon">
                <Icon name={PILLAR_ICONS[i % PILLAR_ICONS.length]} size={20} />
              </span>
              <h4>{pillar.title}</h4>
              <p>{pillar.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
