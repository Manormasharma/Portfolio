import React, { useMemo } from 'react';
import "./project.scss"
import ProjectShowcase from '../../components/Project-comp/ProjectShowcase';
import TechnicalProjects from '../../components/Project-comp/TechnicalProjects';
import { Container, Row, Col } from 'reactstrap';
import { AnimatePresence } from 'framer-motion';
import projectsData from '../../data/projects.json';
import projectImages from '../../lib/projectImages';
import SectionHeading from '../../components/SectionHeading/SectionHeading';

import { Link } from "react-router-dom";

const Project = () => {
  const sortedProjects = useMemo(
    () => projectsData.slice().sort((a, b) => a.order - b.order),
    []
  );

  return (
        <section id="project" className="project-sec section-padding">
          <Container>
            <SectionHeading number="03" title="Projects" />
          </Container>
          <Container>
              <div id="portfolio-grid" >
                <AnimatePresence>
                  {sortedProjects.map((project) => (
                    <ProjectShowcase
                      key={project.slug}
                      projectImage={projectImages[project.image]}
                      techlist={project.techlist}
                      url={project.url}
                      projectName={project.projectName}
                      desc={project.desc}
                      slug={project.slug}
                    />
                  ))}
                </AnimatePresence>
              </div>
          </Container>
          <Container>
            <TechnicalProjects />
          </Container>
          <Container>
            <Row className="mb-5 d-block d-md-none">
              <Col className="text-center">
                <div className='col-12 text-center'>
                  <Link to="/resume" className="btn-custom" size="lg" rel="noreferrer">Resume</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
  )
}

export default Project;
