import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import Skills from './skills';
import Lottie from "lottie-react";
import female from "../../lottie-json/working-women.json";
import profile from "../../data/profile.json";
import experienceData from "../../data/experience.json";
import projectsData from "../../data/projects.json";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import "./about.scss"

const interactivity = {
  mode:"scroll",
    actions: [
        {
            visibility:[0,0.3],
            type: "stop",
            frames: [0]
        },
        {
        visibility: [0.3,1],
            type: "seek",
            frames: [0, 120]
        }
    ]
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const stats = [
    { label: 'Years Experience', value: profile.yearsExperience },
    { label: 'Companies', value: `${experienceData.filter((e) => e.visible).length}` },
    { label: 'Projects Shipped', value: `${projectsData.length}+` },
  ];

  return (
    <>
      <div id="about" className="about-sec section-padding bg-gray">
        <Container>
          <SectionHeading number="01" title="About Me" />
          <Row className="mb-5">
            <Col>
              <p className="about-intro">{profile.aboutIntro}</p>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg="5">
                <motion.div
                  className="bio-card card-surface"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                >
                  <h4 className="section-subheading mb-4">Let's know more about me</h4>
                  {profile.bioParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <p className="mb-0">Reach out today at <a href={`mailto:${profile.contactEmail}`}>{profile.contactEmail}</a> and let's turn your vision into reality.</p>
                </motion.div>
                <motion.div
                  className="stats-row"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                >
                  {stats.map((stat) => (
                    <div className="stat-chip" key={stat.label}>
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>
            </Col>
            <Col lg="7" className='skills-sec d-none d-lg-block'>
              <Lottie animationData={female} interactivity={interactivity} />
            </Col>
          </Row>
        </Container>
      </div>
      <Skills />
    </>
  );
}
