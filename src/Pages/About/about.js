
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
                <p>Here, you can discover additional details about me, my professional endeavors, and my current expertise <br className="d-none d-lg-block"/>primarily focused on programming and technology.</p>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col lg="5">
                  <h4 className="section-subheading mb-4">Let's know more about me</h4>
                  <p>I bring vast expertise to the table, possessing a versatile skill set that enables me to handle all aspects of the development process. 
                    From creating visually appealing user interfaces using HTML, CSS, and JavaScript , React, Ecmascript, to designing efficient server-side architecture with languages like
                    Python or JavaScript (Node.js). Having basic knowledge of Azure is a plus</p>
                  <p>I ensure seamless integration and optimal performance. Moreover, my proficiency in API development and deployment 
                    strategies equips me to deliver comprehensive solutions. With a proven track record of successful projects, I am confident in my ability to surpass your
                    expectations.</p> 
                  <p>Explore my portfolio to witness my past accomplishments and experience firsthand how my skills can enhance your web presence. Together,
                    we can forge innovative and impactful digital experiences that will drive your business forward. </p>
                  <p>Reach out to me today to discuss your project requirements and embark on an exciting development journey!</p>
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
