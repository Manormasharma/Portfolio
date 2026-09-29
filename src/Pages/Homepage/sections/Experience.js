import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Icon from '../../../components/Icon/Icon';
import experienceData from '../../../data/experience.json';
import renderRich from '../../../lib/renderRich';
import { formatDuration } from '../../../lib/dates';
import './Experience.scss';

const jobs = experienceData.filter((e) => e.visible).sort((a, b) => a.order - b.order);

export default function Experience() {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef([]);
  const job = jobs[index];

  const onKeyDown = (e) => {
    const forward = e.key === 'ArrowDown' || e.key === 'ArrowRight';
    const back = e.key === 'ArrowUp' || e.key === 'ArrowLeft';
    if (!forward && !back) return;
    e.preventDefault();
    const next = (index + (forward ? 1 : -1) + jobs.length) % jobs.length;
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHeading
          number="02"
          eyebrow="Experience"
          title="Five teams. One throughline: shipping reliable products at scale."
          description="From agency front-ends to leading architecture on a multi-role B2B platform — select a role to see the details."
        />

        <div className="exp-layout">
          <div className="exp-tabs" role="tablist" aria-label="Work history" onKeyDown={onKeyDown}>
            {jobs.map((j, i) => (
              <button
                key={j.company}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`exp-tab-${i}`}
                aria-selected={i === index}
                aria-controls="exp-panel"
                tabIndex={i === index ? 0 : -1}
                className={`exp-tab${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              >
                {i === index && (
                  <motion.span layoutId="exp-indicator" className="exp-tab-bg" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />
                )}
                <span className="exp-tab-company">{j.shortName || j.company}</span>
                <span className="exp-tab-meta">
                  {j.role}
                </span>
                <span className="exp-tab-dates mono">{j.startDate} — {j.endDate}</span>
              </button>
            ))}
          </div>

          <div className="exp-panel card" id="exp-panel" role="tabpanel" aria-labelledby={`exp-tab-${index}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="exp-head">
                  <div>
                    <h3>
                      {job.role} <span className="exp-at">@ {job.company}</span>
                    </h3>
                    <p className="exp-sub">
                      <span><Icon name="briefcase" size={14} /> {job.startDate} — {job.endDate}</span>
                      <span className="exp-duration">{formatDuration(job.startDate, job.endDate)}</span>
                      <span><Icon name="mapPin" size={14} /> {job.location}</span>
                    </p>
                  </div>
                  {index === 0 && <span className="exp-current"><i /> Current role</span>}
                </div>

                {job.summary && <p className="exp-summary">{job.summary}</p>}

                <ul className="exp-bullets rich">
                  {job.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      {renderRich(b)}
                    </motion.li>
                  ))}
                </ul>

                {job.tech && (
                  <div className="tag-list exp-tech">
                    {job.tech.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
