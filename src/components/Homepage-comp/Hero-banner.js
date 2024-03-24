

import hellowave from "../../lottie-json/hello-anim.json";

import React from 'react';
// import { useLottie } from "lottie-react";
import { Container, Row, Col } from 'reactstrap';
import Lottie from "lottie-react";
import linkedin from "./../../images/social/linkedin.png";
import gmail from "./../../images/social/gmail.png";

import github from './../../images/skills/github.png'

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
                        <li>Passionate and versatile frontend developer</li>
                        <li>Expertise in crafting robust and user-friendly web applications</li>
                        <li>Guaranteed to leave a lasting impact with every project</li>
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
}
