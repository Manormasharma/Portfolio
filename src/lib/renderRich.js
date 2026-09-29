import React from 'react';

// Supports **bold** markers from the data files without pulling in a markdown parser.
export default function renderRich(text) {
  return text
    .split(/\*\*(.*?)\*\*/g)
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}
