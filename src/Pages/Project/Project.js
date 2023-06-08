import React from 'react';
import "./project.scss"
import ProjectShowcase from '../../components/Project-comp/ProjectShowcase';
import { Container, Row, Col } from 'reactstrap';
import blackFriday from './../../images/projects/black-friday-deal.png';
import spherecom from './../../images/projects/spherecom.png';
import ryaanace from './../../images/projects/ryaanace.png';
// import panipatHandloom from './../../images/projects/panipat-handloom.png';
import offseason from './../../images/projects/hackerearth-offseason.png';
import jassiBindra from './../../images/projects/jassibindra.png';


import { Link, Outlet } from "react-router-dom";

const Project = () => {
  return (
        <section id="project" class="project-sec section-padding  bg-image">
          <Container>
            <Row className="mb-5 ">
              <Col className="text-center">
                <h3 className="section-title">Projects</h3>
              </Col>
            </Row>
          </Container>
          <Container>
            <Outlet />
              <div id="portfolio-grid" >
                <ProjectShowcase 
                  projectImage={offseason} 
                  techlist={['HTML', 'BOOTSTRAP', 'WORDPRESS', 'JQUERY']}  
                  url="https://hire101.hackerearth.com/" 
                  projectName="Hire 1o1"
                  desc="I have actively contributed to the success of Hire 1o1 on HackerEarth, utilizing my expertise in web development, front-end design, and user experience. By creating seamless interfaces with HTML, SCSS, and JavaScript, I have enhanced functionality and user engagement. With technologies such as Bootstrap and jQuery, I have developed responsive and interactive elements." />
                <ProjectShowcase 
                  projectImage={jassiBindra} 
                  techlist={['HTML', 'CSS', 'PHP', 'JAVASCRIPT']}  
                  url="http://www.jassibindradesigns.com/" projectName="Jassi Bindra"
                  desc="Presenting my collaboration with Jassi Bindra—a website that demonstrates my web development expertise through captivating design and intuitive functionality. Using HTML, CSS, and JavaScript, I've crafted an engaging, responsive user experience that brings the client's vision to life."
                  />
                <ProjectShowcase 
                  projectImage={blackFriday}
                  techlist={['HTML', 'SCSS', 'WORDPRESS', 'JAVASCRIPT']}  
                  url="https://www.hackerearth.com/recruit/black-friday-deal/" 
                  projectName="Black Friday"
                  desc="I have been instrumental in transforming the recruitment landscape and maximizing Black Friday potential. As a developer, I leverage HTML, SCSS, JavaScript, and Bootstrap to create a seamless and efficient interface that enhances the recruitment experience."
                />
                <ProjectShowcase 
                  projectImage={spherecom} 
                  techlist={['WORDPRESS CMS']} 
                  url="https://spherecom.in/" 
                  projectName="Spherecom"
                  desc="Using my expertise in Wordpress and Frontend technologies, I created a visually appealing and responsive layout that effectively communicates the company's story and values. With attention to detail and collaboration with design and content teams, I ensured a seamless and intuitive navigation experience for website visitors."
                />
                <ProjectShowcase 
                  projectImage={ryaanace} 
                  techlist={['WORDPRESS', 'SCSS', 'PHP', 'JAVASCRIPT']}  
                  url="https://ryaannace.com/" 
                  projectName="Ryaanace"
                  desc="Through my attention to detail and dedication to user experience, I crafted a user-friendly interface that effectively showcases the client's online services. By leveraging my frontend development expertise."
                />
                {/* <ProjectShowcase 
                  projectImage={panipatHandloom} 
                  techlist={['HTML', 'SCSS', 'PHP', 'JAVASCRIPT']} 
                  url="https://thepanipathandloom.com/" 
                  projectName="Panipat Handloom"
                  desc="As a key member of the development team, I have played a crucial role in creating an exceptional online platform for The Panipat Handloom. Through my expertise in HTML, SCSS, Gulp, JavaScript and PHP, I have designed and implemented an immersive and visually appealing website. "
                /> */}
              </div>
          </Container>
          <Container>
            <Row className="mb-5 d-block d-md-none">
              <Col className="text-center">
                <div className='col-12 text-center'>
                  <Link to="/portfolio/resume" className="btn-custom" size="lg" download rel="noreferrer">Resume</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
  )
}

export default Project;