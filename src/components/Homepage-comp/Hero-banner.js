import hellowave from "../../lottie-json/hello-anim.json";

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import linkedin from "./../../images/social/linkedin.png";
import gmail from "./../../images/social/gmail.png";
import github from './../../images/skills/github.png'
import profile from "../../data/profile.json";

const socialIcons = {
  github: { icon: github, width: 22 },
  linkedin: { icon: linkedin, width: 20 },
  email: { icon: gmail, width: 22 },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function HeroBanner() {
  return (
    <div className="herobanner">
      <Container>
        <Row className="align-items-center">
          <Col lg="7">
            <motion.div
              className="hero-content"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <motion.p variants={item} className="hero-greeting">Hi, my name is</motion.p>
              <motion.h1 variants={item} className="hero-name">{profile.name}.</motion.h1>
              <motion.h2 variants={item} className="hero-tagline">{profile.tagline}</motion.h2>
              <motion.p variants={item} className="hero-lede">{profile.heroIntro}</motion.p>
              <motion.ul variants={item} className="hero-bullets">
                {profile.heroBioBullets.map((bullet, index) => (
                  <li key={index}><span className="hero-bullet-marker">▹</span>{bullet}</li>
                ))}
              </motion.ul>
              <motion.div variants={item} className="hero-cta d-flex flex-wrap align-items-center gap-3">
                <a href="#project" className="btn-custom">View My Work</a>
              </motion.div>
              <motion.div variants={item} className="hero-social mt-4">
                {profile.socialLinks.map((link) => {
                  const meta = socialIcons[link.platform];
                  if (!meta) return null;
                  return (
                    <motion.a
                      key={link.platform}
                      whileHover={{ y: -3 }}
                      className="social-icon-link me-2"
                      href={link.url}
                      title={link.platform}
                      target={link.platform === 'email' ? undefined : '_blank'}
                      rel="noreferrer"
                    >
                      <img src={meta.icon} className="img-fluid" width={meta.width} alt={link.platform} />
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          </Col>
          <Col lg="5" className="d-none d-lg-block">
            <Lottie animationData={hellowave} loop="false" mode="scroll" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
