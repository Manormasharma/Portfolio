import { useCallback } from 'react';

// Feeds the cursor position into --mx / --my so `.spotlight::before`
// can paint a radial highlight that follows the pointer.
export default function useSpotlight() {
  return useCallback((event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);
}
