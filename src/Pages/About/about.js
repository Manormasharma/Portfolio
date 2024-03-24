
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Skills from './skills';
import Lottie from "lottie-react";
import female from "../../lottie-json/working-women.json";
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
export default class About extends React.Component{
    
  render() {
    return (
      <>
        <div className="about-sec section-padding bg-gray">
          <Container>
            <Row className="mb-5 ">
              <Col className="text-center">
                <h3 className="section-title">ABOUT ME</h3>
                <p>Unlock the tech realm with me! From sleek code to innovative solutions, I'm your go-to for all things programming and tech. Let's make waves in the digital world together! 🚀</p>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col lg="5">
                  <h4 className="section-subheading mb-4">Let's know more about me</h4>
                  <p>As a versatile developer, I specialize in crafting eye-catching user interfaces and building powerful server-side architectures. From HTML to React, and Python to Node.js, I have the skills to turn your ideas into digital masterpieces.</p>
                  <p>With a proven track record of successful projects, I guarantee seamless integration, optimal performance, and captivating user experiences. Plus, I have a knack for API development and a basic understanding of Azure for all your cloud needs.</p> 
                  <p>Reach out today at <a href='mailto:manorma.business@gmail.com'>manorma.business@gmail.com</a> and let's turn your vision into reality. Let's make waves in the digital world.</p>
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
}
