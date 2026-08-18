import React from 'react';
import { motion } from 'framer-motion';
import './Timeline.scss';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const entryVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Timeline({ items, renderItem }) {
  return (
    <motion.div
      className="timeline"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {items.map((item, index) => (
        <motion.div className="timeline-entry" variants={entryVariant} key={item.company || item.title || index}>
          <span className="timeline-dot" />
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  );
}
