import hellowave from "../../lottie-json/hello-anim.json";

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import linkedin from "./../../images/social/linkedin.png";
import gmail from "./../../images/social/gmail.png";
import github from './../../images/skills/github.png'
import profile from "../../data/profile.json";

<<<<<<< Updated upstream
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
=======
export default class HeroBanner extends React.Component{
  render() {
    return (
      <>
        <div className="herobanner py-5">
          <Container>
              <Row className="hero-content align-items-center">
                <Col lg="7">
                    <div className="">
                      <h1>HEY, I'M MANORMA SHARMA</h1>
                      <p>💻 <strong>Need a Web Wizard? Look No Further!</strong> 💻<br className="d-md-block"/>
                      Are you ready to elevate your web projects to the next level? With a blend of innovation, expertise, and unwavering dedication, I'm here to bring your vision to life!</p>
                      <p><strong>✨ Why Choose Me?</strong></p>
                      <ul>
                        <li>Software Engineer — Full Stack (React.js / Node.js) with 5+ years of experience</li>
                        <li>Expertise in performance optimization, JWT/RBAC auth, AWS, and CI/CD</li>
                        <li>Building AI-powered apps with Google ADK, RAG, and local LLMs</li>
                      </ul>
                      {/* <p>Ready to make magic happen? Let's chat: <a href="mailto:manorma.bussiness@gmail.com?subject=Mail from Manorma Portfolio" >YourEmail@example.com</a>.</p> */}
                      <p>You can find me here :  </p>
                      <a className='me-3' href='https://github.com/Manormasharma' title='Github' target="_blank" rel="noreferrer">
                        <img src={github} className="img-fluid" width={50}  alt="github"/>
                      </a>
                      <a className='me-4' href='mailto:manorma.bussiness@gmail.com?subject=Mail from Manorma Portfolio' title='Gmail' rel="noreferrer">
                        <img src={gmail} className="img-fluid" width={35}  alt="gmail"/>
                      </a>
                      <a className='' href='https://www.linkedin.com/in/manorma-sharma/' target="_blank" title='Linkedin' rel="noreferrer">
                        <img src={linkedin} className="img-fluid" width={30}  alt="linkedin"/>
                      </a>
                    </div>
                </Col>
                <Col lg="5" className="pt-5 mt-5 d-none d-md-block">
                  <Lottie animationData={hellowave} loop="false" mode="scroll" />
                </Col>
              </Row>
          </Container>
        </div>    
        {/* <div class="coloredborder"></div> */}
      </>
    );
  }
>>>>>>> Stashed changes
}
