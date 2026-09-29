import React from 'react';
import Icon from '../Icon/Icon';
import profile from '../../data/profile.json';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="site-footer-links">
          {profile.socialLinks.map((link) => (
            <a
              key={link.platform}
              className="icon-btn"
              href={link.url}
              title={link.label}
              aria-label={link.platform}
              target={link.platform === 'email' ? undefined : '_blank'}
              rel="noreferrer"
            >
              <Icon name={link.platform} size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
