
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
                <p>Discover more about my professional endeavors and expertise, centered around programming and technology.<br className="d-none d-lg-block"/>primarily focused on programming and technology.</p>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col lg="5">
                  <h4 className="section-subheading mb-4">Let's know more about me</h4>
                  <p>I offer a wide range of expertise, handling all aspects of development. This includes creating appealing user interfaces with HTML, CSS, JavaScript, React, and Ecmascript, as well as designing efficient server-side architecture using Python or JavaScript (Node.js). I also have a basic understanding of Azure.</p>
                  <p>I excel in seamless integration, optimal performance, and API development. With a strong track record of successful projects, I'm confident in surpassing your expectations.</p> 
                  <p>Browse my portfolio to see my past achievements and experience firsthand how my skills can enhance your online presence. Let's create impactful digital experiences together to drive your business forward. </p>
                  <p>Contact me today at mannuu0501@gmail.com to discuss your project requirements and start an exciting development journey together!</p>
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
