
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import bootstrap from './../../images/skills/bootstrap.png'
import css from './../../images/skills/css.png'
import git from './../../images/skills/git.png'
import github from './../../images/skills/github.png'
import gulp from './../../images/skills/gulp.png'
import heroku from './../../images/skills/heroku.png'
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

const style = {
    height: 300,
};
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
                  <a className='' href='' title='HTML'>
                    <img src={html} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='CSS'>
                    <img src={css} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Bootstrap'>
                    <img src={bootstrap} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Javascript'>
                    <img src={js} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Pythons'>
                    <img src={python} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='SASS'>
                    <img src={sass} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Wordpress'>
                    <img src={wordpress} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Webpack'>
                    <img src={webpack} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Node'>
                    <img src={node} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='React'>
                    <img src={react} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Jira'>
                    <img src={jira} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Github'>
                    <img src={github} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Git'>
                    <img src={git} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Postman'>
                    <img src={postman} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Photoshop'>
                    <img src={photoshop} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Figma'>
                    <img src={figma} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Bitbucket'>
                    <img src={bitbucket} className="img-fluid"/>
                  </a>
                  <a className='' href='' title='Lottie'>
                    <img src={lottielogo} className="img-fluid"/>
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </div>   
      </>
    );
}
export default Skills
