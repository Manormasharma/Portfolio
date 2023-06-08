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


import { Outlet } from "react-router-dom";

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
                  desc="I proudly showcase my involvement with Hire 1o1 on HackerEarth. Through my expertise in web development, front-end design, and user experience, I have contributed to the platform's success. I have crafted seamless interfaces using HTML, SCSS, and JavaScript, enhancing functionality and user engagement. With technologies like Bootstrap and jQuery, I have created responsive and interactive elements." />
                <ProjectShowcase 
                  projectImage={jassiBindra} 
                  techlist={['HTML', 'CSS', 'PHP', 'JAVASCRIPT']}  
                  url="http://www.jassibindradesigns.com/" projectName="Jassi Bindra"
                  desc="Presenting my collaboration with Jassi Bindra. This website exemplifies my expertise in web development, showcasing a seamless blend of captivating design and intuitive functionality. By leveraging HTML, CSS, and JavaScript, I have crafted an engaging user experience that brings the client's vision to life. With attention to detail and a focus on responsive design."
                  />
                <ProjectShowcase 
                  projectImage={blackFriday}
                  techlist={['HTML', 'SCSS', 'WORDPRESS', 'JAVASCRIPT']}  
                  url="https://www.hackerearth.com/recruit/black-friday-deal/" 
                  projectName="Black Friday"
                  desc="Through my work on this project, I have played a key role in revolutionizing the recruitment landscape and helping companies make the most of the Black Friday season. As a developer, I have contributed my expertise in web development, designing a seamless and efficient interface that enhances the recruitment experience. By utilizing HTML, SCSS, and JavaScript, Bootstrap."
                />
                <ProjectShowcase 
                  projectImage={spherecom} 
                  techlist={['WORDPRESS CMS']} 
                  url="https://spherecom.in/" 
                  projectName="Spherecom"
                  desc="By utilizing my expertise in Wordpress and Frontend technologies, I crafted a visually appealing and responsive layout that effectively communicates the company's story and values. Through attention to detail and meticulous design implementation, I ensured a seamless and intuitive navigation experience for website visitors. Collaborating closely with the design and content teams"
                />
                <ProjectShowcase 
                  projectImage={ryaanace} 
                  techlist={['WORDPRESS', 'SCSS', 'PHP', 'JAVASCRIPT']}  
                  url="https://ryaannace.com/" 
                  projectName="Ryaanace"
                  desc="Through my attention to detail and dedication to user experience, I crafted a user-friendly interface that effectively showcases the client's portfolio and services. By leveraging my frontend development expertise."
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
        </section>
  )
}

export default Project;