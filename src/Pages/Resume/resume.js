import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/Icon/Icon';
import profile from '../../data/profile.json';
import experienceData from '../../data/experience.json';
import educationData from '../../data/education.json';
import certificationsData from '../../data/certifications.json';
import skillsData from '../../data/skills.json';
import technicalProjectsData from '../../data/technicalProjects.json';
import renderRich from '../../lib/renderRich';
import { formatDuration } from '../../lib/dates';
import './resume.scss';

const byOrder = (a, b) => a.order - b.order;

function Block({ title, children }) {
  return (
    <motion.section
      className="cv-block"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="cv-block-title">{title}</h2>
      {children}
    </motion.section>
  );
}

function Resume() {
  const certifications = certificationsData.filter((c) => c.type === 'certification').sort(byOrder);
  const badges = certificationsData.filter((c) => c.type === 'badge').sort(byOrder);
  const awards = certificationsData.filter((c) => c.type === 'achievement').sort(byOrder);
  const education = educationData.slice().sort(byOrder);
  const experience = experienceData.filter((e) => e.visible).sort(byOrder);
  const projects = technicalProjectsData.slice().sort(byOrder);
  const skillGroups = [...new Set(skillsData.map((s) => s.category))].map((category) => ({
    category,
    skills: skillsData.filter((s) => s.category === category).sort(byOrder).map((s) => s.name),
  }));

  return (
    <div className="cv-page">
      <div className="container">
        <div className="cv-toolbar">
          <p className="mono">résumé / {profile.name.toLowerCase().replace(' ', '-')}</p>
        </div>

        <motion.article
          className="cv card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="cv-header">
            <div>
              <h1>{profile.name}</h1>
              <p className="cv-title">{profile.title}</p>
            </div>
            <ul className="cv-contact">
              <li><Icon name="email" size={14} /><a href={`mailto:${profile.contactEmail}`}>{profile.contactEmail}</a></li>
              <li><Icon name="mapPin" size={14} />{profile.location}</li>
              {profile.socialLinks.filter((l) => l.platform !== 'email').map((l) => (
                <li key={l.platform}>
                  <Icon name={l.platform} size={14} />
                  <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
                </li>
              ))}
            </ul>
          </header>
          <p className="cv-relocation"><Icon name="globe" size={14} /> {profile.relocation}</p>

          <div className="cv-grid">
            <div className="cv-main">
              <Block title="Professional Summary">
                <p className="cv-summary">{profile.summary}</p>
              </Block>

              <Block title="Work History">
                <ol className="cv-timeline">
                  {experience.map((job) => (
                    <li key={job.company}>
                      <div className="cv-job-head">
                        <h3>{job.role}</h3>
                        <span className="mono">{job.startDate} – {job.endDate}</span>
                      </div>
                      <p className="cv-job-meta">
                        {job.company} · {job.location} · <span>{formatDuration(job.startDate, job.endDate)}</span>
                      </p>
                      <ul className="cv-bullets rich">
                        {job.bullets.map((b, i) => <li key={i}>{renderRich(b)}</li>)}
                      </ul>
                    </li>
                  ))}
                </ol>
              </Block>

              <Block title="Projects & Technical Exploration">
                {projects.map((p) => (
                  <div className="cv-project" key={p.name}>
                    <h3>
                      {p.url ? <a href={p.url} target="_blank" rel="noreferrer">{p.name}</a> : p.name}
                      {p.subtitle && <span> — {p.subtitle}</span>}
                    </h3>
                    <ul className="cv-bullets">
                      {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                    <p className="cv-tech mono">{p.tech.join(' · ')}</p>
                  </div>
                ))}
              </Block>
            </div>

            <aside className="cv-side">
              <Block title="Core Skills">
                <div className="tag-list">
                  {profile.coreSkills.map((s) => <span className="tag" key={s}>{s}</span>)}
                </div>
              </Block>

              <Block title="Technical Skills">
                <dl className="cv-skills">
                  {skillGroups.map((g) => (
                    <div key={g.category}>
                      <dt>{g.category}</dt>
                      <dd>{g.skills.join(', ')}</dd>
                    </div>
                  ))}
                </dl>
              </Block>

              <Block title="Certifications">
                {certifications.map((c) => (
                  <div className="cv-item" key={c.title}>
                    <h4>{c.url ? <a href={c.url} target="_blank" rel="noreferrer">{c.title}</a> : c.title}</h4>
                    <p>{c.issuer} · <span className="mono">{c.date}{c.expires && ` (valid until ${c.expires})`}</span></p>
                    {c.skills && <p className="cv-cert-skills">{c.skills.join(' · ')}</p>}
                  </div>
                ))}
              </Block>

              {badges.length > 0 && (
                <Block title="Badges">
                  {badges.map((c) => (
                    <div className="cv-item" key={c.title}>
                      <h4>{c.url ? <a href={c.url} target="_blank" rel="noreferrer">{c.title}</a> : c.title}</h4>
                      <p>{c.issuer} · <span className="mono">{c.date}</span></p>
                      {c.skills && <p className="cv-cert-skills">{c.skills.join(' · ')}</p>}
                    </div>
                  ))}
                </Block>
              )}

              <Block title="Education">
                {education.map((e) => (
                  <div className="cv-item" key={e.degree}>
                    <h4>{e.degree}</h4>
                    <p>{e.institution} · <span className="mono">{e.dateRange}</span></p>
                  </div>
                ))}
              </Block>

              <Block title="Awards">
                {awards.map((a) => (
                  <div className="cv-item" key={a.title}>
                    <h4>{a.url ? <a href={a.url} target="_blank" rel="noreferrer">{a.title}</a> : a.title}</h4>
                    <p>{a.issuer}</p>
                  </div>
                ))}
              </Block>

              <Block title="Languages">
                <p className="cv-langs">{profile.languages.join(' · ')}</p>
              </Block>
            </aside>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export default Resume;
