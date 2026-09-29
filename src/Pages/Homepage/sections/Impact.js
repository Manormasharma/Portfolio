import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import Icon from '../../../components/Icon/Icon';
import profile from '../../../data/profile.json';
import experienceData from '../../../data/experience.json';
import skillsData from '../../../data/skills.json';
import skillIcons, { monoIcons } from '../../../lib/skillIcons';
import useSpotlight from '../../../lib/useSpotlight';
import './Impact.scss';

function CountUp({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

// one entry per logo, plus any skill flagged `marquee` in skills.json
const logos = skillsData
  .filter((s) => s.icon && skillIcons[s.icon])
  .filter((s, i, arr) => arr.findIndex((o) => o.icon === s.icon) === i);
const logoNames = new Set(logos.map((s) => s.name));
const marqueeItems = [...logos, ...skillsData.filter((s) => s.marquee && !logoNames.has(s.name))];

export default function Impact() {
  const onMove = useSpotlight();
  const companies = experienceData.filter((e) => e.visible).sort((a, b) => a.order - b.order);

  return (
    <section id="impact" className="impact">
      <div className="container">
        <div className="metrics">
          {profile.metrics.map((m, i) => (
            <motion.div
              key={m.key}
              className="metric card spotlight"
              onMouseMove={onMove}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <p className="metric-value text-gradient">
                <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </p>
              <p className="metric-label">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="companies">
          <p className="companies-title mono">Experience across</p>
          <div className="companies-list">
            {companies.map((c) => (
              <span key={c.company} className="company-name">{c.shortName || c.company}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((s, i) => (
            <span className="marquee-item" key={`${s.name}-${i}`}>
              {s.icon && skillIcons[s.icon] ? (
                <img src={skillIcons[s.icon]} alt="" loading="lazy" className={monoIcons.has(s.icon) ? 'is-mono' : undefined} />
              ) : (
                <Icon name={s.glyph || 'code'} size={20} className="marquee-glyph" />
              )}
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
