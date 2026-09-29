import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Icon from '../../../components/Icon/Icon';
import certificationsData from '../../../data/certifications.json';
import educationData from '../../../data/education.json';
import useSpotlight from '../../../lib/useSpotlight';
import './Credentials.scss';

const byOrder = (a, b) => a.order - b.order;
const items = [
  ...certificationsData.filter((c) => c.type === 'certification').sort(byOrder)
    .map((c) => ({ kind: 'Certification', icon: 'badge', title: c.title, sub: c.issuer, date: c.date, expires: c.expires, url: c.url, skills: c.skills })),
  ...certificationsData.filter((c) => c.type === 'achievement').sort(byOrder)
    .map((c) => ({ kind: 'Award', icon: 'award', title: c.title, sub: c.issuer, date: c.date, url: c.url })),
  ...educationData.slice().sort(byOrder)
    .map((e) => ({ kind: 'Education', icon: 'graduation', title: e.degree, sub: e.institution, date: e.dateRange })),
];

function CredentialCard({ item, index }) {
  const onMove = useSpotlight();
  const Tag = item.url ? 'a' : 'div';
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Tag
        className={`credential card spotlight${item.url ? ' is-link' : ''}`}
        onMouseMove={onMove}
        {...(item.url ? { href: item.url, target: '_blank', rel: 'noreferrer' } : {})}
      >
        <div className="credential-top">
          <span className="credential-icon"><Icon name={item.icon} size={20} /></span>
          <span className="credential-kind mono">{item.kind}</span>
          {item.url && <Icon name="arrowUpRight" size={16} className="credential-go" />}
        </div>
        <h3>{item.title}</h3>
        <p>{item.sub}</p>
        {item.skills && (
          <div className="tag-list credential-skills">
            {item.skills.map((s) => <span className="tag" key={s}>{s}</span>)}
          </div>
        )}
        {item.date && (
          <span className="credential-date mono">
            {item.kind === 'Education' ? 'Completed' : 'Issued'} {item.date}
            {item.expires && ` · Valid until ${item.expires}`}
          </span>
        )}
      </Tag>
    </motion.div>
  );
}

export default function Credentials() {
  return (
    <section id="credentials" className="section credentials">
      <div className="container">
        <SectionHeading
          number="05"
          eyebrow="Credentials"
          title="Certified across cloud and AI."
        />
        <div className="credentials-grid">
          {items.map((item, i) => (
            <CredentialCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
