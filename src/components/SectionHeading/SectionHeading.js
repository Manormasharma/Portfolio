import React from 'react';
import './SectionHeading.scss';

export default function SectionHeading({ number, title, align = 'left' }) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <h2 className="section-heading-title">
        <span className="section-heading-number">{number}.</span> {title}
      </h2>
      <span className="section-heading-rule" />
    </div>
  );
}
