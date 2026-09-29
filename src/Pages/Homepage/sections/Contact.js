import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import Icon from '../../../components/Icon/Icon';
import profile from '../../../data/profile.json';
import { socialLink, OPEN_CHAT_EVENT } from '../../../lib/site';
import useSpotlight from '../../../lib/useSpotlight';
import './Contact.scss';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const onMove = useSpotlight();
  const email = socialLink('email');
  const linkedin = socialLink('linkedin');
  const github = socialLink('github');

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contactEmail);
      setCopied(true);
    } catch (err) {
      window.location.href = email.url;
    }
  };

  const channels = [
    linkedin && { icon: 'linkedin', label: 'LinkedIn', value: linkedin.label, href: linkedin.url },
    github && { icon: 'github', label: 'GitHub', value: github.label, href: github.url },
    { icon: 'email', label: 'Email', value: profile.contactEmail, href: email.url },
  ].filter(Boolean);

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          className="contact-panel card spotlight"
          onMouseMove={onMove}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="contact-glow" />
          <SectionHeading
            number="06"
            eyebrow="Contact"
            align="center"
            title={<>Let's build something <span className="text-gradient">great together.</span></>}
            description={`I'm open to full-stack and frontend engineering roles. ${profile.relocation}.`}
          />

          <div className="contact-email">
            <a href={email.url} className="btn btn-primary">
              <Icon name="email" /> {profile.contactEmail}
            </a>
            <button type="button" className="btn btn-ghost" onClick={copyEmail} aria-live="polite">
              <Icon name={copied ? 'check' : 'copy'} /> {copied ? 'Copied!' : 'Copy email'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}>
              <Icon name="sparkles" /> Ask my AI assistant
            </button>
          </div>

          <div className="contact-channels">
            {channels.map((c) => (
              <a
                key={c.label}
                className="channel"
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <span className="channel-icon"><Icon name={c.icon} /></span>
                <span className="channel-text">
                  <span className="channel-label">{c.label}</span>
                  <span className="channel-value">{c.value}</span>
                </span>
                <Icon name="arrowUpRight" size={16} className="channel-go" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
