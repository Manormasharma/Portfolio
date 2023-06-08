

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
                    <p>Are you looking to hire a skilled and versatile full stack developer?<br className="d-md-block"/>
                      Look no further! As a full stack developer with a passion for creating robust and user-friendly web applications. With a deep understanding of both front-end and back-end technologies</p>
                    <p>You can find me here :  </p>
                    <a className='me-3' href='https://github.com/Manormasharma' title='Github' target="_blank" rel="noreferrer">
                      <img src={github} className="img-fluid" width={50}  alt="github"/>
                    </a>
                    <a className='me-4' href='mailto:mannuu0501@gmail.com?subject=Mail from Manorma Portfolio' title='Gmail' rel="noreferrer">
                      <img src={gmail} className="img-fluid" width={35}  alt="gmail"/>
                    </a>
                    <a className='' href='https://www.linkedin.com/in/manorma-sharma/' target="_blank" title='Linkedin' rel="noreferrer">
                      <img src={linkedin} className="img-fluid" width={30}  alt="linkedin"/>
                    </a>
                  </div>
                  <div>
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
