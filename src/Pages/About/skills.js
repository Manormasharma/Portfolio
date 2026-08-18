import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from "lottie-react";
import skillsAnim from "../../lottie-json/skills.json";
import skillsData from "../../data/skills.json";
import skillIcons from "../../lib/skillIcons";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import "./skills.scss";

const interactivity = {
    mode:"cursor",
    player: "#eightthLottie",
    actions: [
        {
            position: { x: [0, 1], y: [0, 1] },
            type: "seek",
            frames: [0, 90]
        }
    ]
};

const categories = [...new Set(skillsData.map((s) => s.category))];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const visibleSkills = skillsData
    .filter((s) => s.category === activeCategory)
    .sort((a, b) => a.order - b.order);

  return (
      <div id="skills" className="skills-sec section-padding">
        <Container>
          <SectionHeading number="02" title="Skills" />
          <Row className="align-items-center">
            <Col lg="5" className='d-none d-lg-block'>
              <Lottie animationData={skillsAnim} interactivity={interactivity} />
            </Col>
            <Col lg={{ size: 6,  offset: 1 }}>
              <div className="skills-tabs d-flex flex-wrap justify-content-center justify-content-lg-start">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`skills-tab${category === activeCategory ? ' active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  className="skills-grid"
                  variants={gridVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                >
                  {visibleSkills.map((skill) => {
                    const icon = skill.icon && skillIcons[skill.icon];
                    return (
                      <motion.div
                        className="skill-chip"
                        key={skill.name}
                        variants={chipVariants}
                        whileHover={{ y: -4 }}
                      >
                        {icon && <img src={icon} alt={skill.name} title={skill.name} />}
                        <span>{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </Col>
          </Row>
        </Container>
      </div>
    );
}
export default Skills
