import React from 'react';
import { motion } from 'framer-motion';
import './SectionHeading.scss';

export default function SectionHeading({ number, eyebrow, title, description, align = 'left' }) {
  return (
    <motion.div
      className={`section-heading section-heading-${align}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <p className="section-heading-eyebrow">
        <span className="section-heading-number">{number}</span>
        <span className="section-heading-line" />
        {eyebrow}
      </p>
      <h2 className="section-heading-title">{title}</h2>
      {description && <p className="section-heading-desc">{description}</p>}
    </motion.div>
  );
}
