import profile from '../data/profile.json';

export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export function socialLink(platform) {
  return profile.socialLinks.find((l) => l.platform === platform);
}

export const OPEN_PALETTE_EVENT = 'portfolio:open-palette';
export const OPEN_CHAT_EVENT = 'portfolio:open-chat';

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
