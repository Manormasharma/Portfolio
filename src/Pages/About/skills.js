
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import bootstrap from './../../images/skills/bootstrap.png'
import css from './../../images/skills/css.png'
import git from './../../images/skills/git.png'
import github from './../../images/skills/github.png'
import html from './../../images/skills/html.png'
import jira from './../../images/skills/jira.png'
import js from './../../images/skills/js.png'
import node from './../../images/skills/node.png'
import postman from './../../images/skills/postman.png'
import react from './../../images/skills/react.png'
import sass from './../../images/skills/sass.png'
import webpack from './../../images/skills/webpack.png'
import wordpress from './../../images/skills/wordpress.png'
import python from './../../images/skills/python.png'
import photoshop from './../../images/skills/photoshop.png'
import figma from './../../images/skills/figma.svg'
import bitbucket from './../../images/skills/bitbucket.jpg'
import lottielogo from './../../images/skills/lottie.png'

import skills from "../../lottie-json/skills.json";
import Lottie from "lottie-react";

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

const Skills = () => {
  return (
      <>
        <div className="skills-sec section-padding">
          <Container>
            <Row className="">
              <Col lg="5" className='d-none d-lg-block'>
                <Lottie animationData={skills} interactivity={interactivity} />
              </Col>
              <Col lg={{ size: 6,  offset: 1 }} className='skills-sec'>
                <h4 className="section-subheading mb-4">Tech I Worked on and More...</h4>
                <div className="skills-icons d-flex align-items-center">
                  <img src={html} className="img-fluid" alt="HTML" title='HTML'/>
                  <img src={css} className="img-fluid" alt="CSS" title='CSS'/>
                  <img src={bootstrap} className="img-fluid" alt="Bootstrap" title='Bootstrap'/>
                  <img src={js} className="img-fluid" alt="Javascript" title='Javascript'/>
                  <img src={python} className="img-fluid" alt="Pythons" title='Pythons'/>
                  <img src={sass} className="img-fluid" alt="SASS" title='SASS'/>
                  <img src={wordpress} className="img-fluid" alt="Wordpress"  title='Wordpress'/>
                  <img src={webpack} className="img-fluid" alt="Webpack" title='Webpack'/>
                  <img src={node} className="img-fluid" alt="Node" title='Node'/>
                  <img src={react} className="img-fluid" alt="React" title='React'/>
                  <img src={jira} className="img-fluid" alt="Jira" title='Jira'/>
                  <img src={github} className="img-fluid" alt="Github" title='Github'/>
                  <img src={git} className="img-fluid" alt="Git" title='Git'/>
                  <img src={postman} className="img-fluid" alt="Postman" title='Postman'/>
                  <img src={photoshop} className="img-fluid" alt="Photoshop" title='Photoshop'/>
                  <img src={figma} className="img-fluid" alt="Figma" title='Figma'/>
                  <img src={bitbucket} className="img-fluid" alt="Bitbucket" title='Bitbucket'/>
                  <img src={lottielogo} className="img-fluid" alt="Lottie" title='Lottie'/>
                </div>
              </Col>
            </Row>
          </Container>
        </div>   
      </>
    );
}
export default Skills
