import React from 'react';
import { motion } from 'framer-motion';
import technicalProjectsData from '../../data/technicalProjects.json';
import './technical-projects.scss';

const byOrder = (a, b) => a.order - b.order;

function renderBullet(bullet, index) {
  const parts = bullet.split(/\*\*(.*?)\*\*/g);
  return (
    <li key={index}>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </li>
  );
}

export default function TechnicalProjects() {
  const projects = technicalProjectsData.slice().sort(byOrder);

  return (
    <div className="technical-projects">
      <h4 className="section-subheading mb-4">Technical Projects &amp; Exploration</h4>
      <div className="technical-projects-grid">
        {projects.map((project) => (
          <motion.div
            className="technical-project-card"
            key={project.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
          >
            <h5>{project.name}</h5>
            {project.subtitle && <p className="technical-project-subtitle">{project.subtitle}</p>}
            <ul>
              {project.bullets.map(renderBullet)}
            </ul>
            <div className="technical-project-tags">
              {project.tech.map((tech) => (
                <span className="badge bg-pink me-2 mb-2" key={tech}>{tech}</span>
              ))}
            </div>
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer" className="btn-outline">
                View Source on GitHub
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
