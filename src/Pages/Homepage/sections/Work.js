import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Icon from '../../../components/Icon/Icon';
import projectsData from '../../../data/projects.json';
import technicalProjectsData from '../../../data/technicalProjects.json';
import projectImages from '../../../lib/projectImages';
import renderRich from '../../../lib/renderRich';
import useSpotlight from '../../../lib/useSpotlight';
import './Work.scss';

const byOrder = (a, b) => a.order - b.order;
const projects = projectsData.slice().sort(byOrder);
const labs = technicalProjectsData.slice().sort(byOrder);

function ProjectCard({ project, index }) {
  const onMove = useSpotlight();
  return (
    <motion.article
      className="project card spotlight"
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <a href={project.url} target="_blank" rel="noreferrer" className="project-media" aria-label={`Visit ${project.projectName}`}>
        <img src={projectImages[project.image]} alt={`${project.projectName} screenshot`} loading="lazy" />
        <span className="project-media-cta">
          Visit live site <Icon name="arrowUpRight" size={15} />
        </span>
      </a>
      <div className="project-body">
        <div className="project-top">
          <span className="project-cat mono">{project.category}</span>
          <a href={project.url} target="_blank" rel="noreferrer" className="project-link" aria-label={`Open ${project.projectName}`}>
            <Icon name="arrowUpRight" size={18} />
          </a>
        </div>
        <h3>{project.projectName}</h3>
        <p>{project.desc}</p>
        <div className="tag-list">
          {project.techlist.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function LabCard({ lab, index }) {
  const onMove = useSpotlight();
  return (
    <motion.article
      className="lab card spotlight"
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="lab-top">
        <span className="lab-icon">
          <Icon name={lab.category === 'AI' ? 'sparkles' : 'cloud'} size={20} />
        </span>
        {lab.url ? (
          <a href={lab.url} target="_blank" rel="noreferrer" className="icon-btn" aria-label={`${lab.name} source on GitHub`}>
            <Icon name="github" />
          </a>
        ) : (
          <span className="lab-private mono">self-hosted</span>
        )}
      </div>
      <h3>{lab.name}</h3>
      {lab.subtitle && <p className="lab-subtitle">{lab.subtitle}</p>}
      <ul className="rich">
        {lab.bullets.map((b, i) => (
          <li key={i}>{renderRich(b)}</li>
        ))}
      </ul>
      <div className="tag-list">
        {lab.tech.map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section id="work" className="section work">
      <div className="container">
        <SectionHeading
          number="04"
          eyebrow="Selected work"
          title="Products and platforms I've helped ship."
          description="Production work across B2B commerce, developer hiring and client businesses — plus the AI and infrastructure projects I build to push my own skills."
        />

        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="labs">
          <div className="labs-head">
            <h3>Engineering lab</h3>
            <p>AI agents, local LLM tooling and self-hosted infrastructure.</p>
          </div>
          <div className="labs-grid">
            {labs.map((lab, i) => (
              <LabCard key={lab.name} lab={lab} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
