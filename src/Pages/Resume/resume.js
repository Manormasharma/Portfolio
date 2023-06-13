import React from 'react';
import "./resume.scss"

function Resume() {
  return (
    <>
    <section id="resume" class="resume py-5">
      <div class="container">
        <div class="row pb-5">
          <div class="col-lg-6" data-aos="fade-up">
            <h3 class="resume-title">Summary</h3>
            <div class="resume-item pb-0">
              <h4>Manorma Sharma</h4>
              <p><em>Expert in developing Responsive & Interactive websites | BCA
                Graduate | 2.5 years of experience in Web Development | Sound
                understanding of React js, Node js, Python, HTML5, SASS, Bootstrap 5,
                Wordpress | Capable of performance tuning, Testing and Deployment
                on live site.
              </em></p>
              <ul>
                <li>Delhi</li>
                <li>manorma.bussiness@gmail.com</li>
              </ul>
            </div>
            {/* Summary Ends */}

            <h3 class="resume-title">Education</h3>
              <div class="resume-item">
                <h4>Bachelors of Computer Applications(BCA)</h4>
                <h5>2019 - 2022</h5>
                <p><em>Indira Gandhi National Open University, Delhi, India</em></p>
              </div>
              <div class="resume-item">
                <h4>Higher Secondary</h4>
                <h5>2016 - 2015</h5>
                <p><em>CBSE Board</em></p>
              </div>
              {/* <div class="resume-item">
                <h4>Matriculation</h4>
                <h5>2014 - 2013</h5>
                <p><em>Govt. Girls Senior Secondary School, Delhi, India</em></p>
              </div> */}
              {/* Education Ends */}

              <h3 class="resume-title">Certificates</h3>
              <div class="resume-item">
                <h4><a href="https://drive.google.com/open?id=1IxYdl5f3IXuzImMbhPbiRF4Yvk3U6p91" target='_blank' rel="noreferrer" > Python</a></h4>
                <h5>2019</h5>
                <p><em>Basent Technologies, Banglore, India </em></p>
              </div>
              <div class="resume-item">
                <h4><a href="https://www.udemy.com/certificate/UC-C9NQAOHO/" target='_blank' rel="noreferrer" > Bootstrap</a></h4>
                <h5>2019</h5>
                <p><em>Udemy</em></p>
              </div>
              <div class="resume-item">
                <h4><a href="https://www.udemy.com/certificate/UC-1JPF0MUV/" target='_blank' rel="noreferrer" >HTML 5 and CSS 3</a></h4>
                <h5>2019</h5>
                <p><em>Udemy</em></p>
              </div>
              <div class="resume-item">
                <h4><a href="https://www.linkedin.com/learning/certificates/3294c11fcf7554509608e9807bb6b11e965cc15161c160c333089ff6eaedd434" target='_blank' rel="noreferrer" > GitHub Essential Training</a></h4>
                <h5>2021</h5>
                <p><em>Linkedin</em></p>
              </div>
              <div class="resume-item">
                <h4><a href="https://www.linkedin.com/learning/certificates/93088bd2631fc6209c9c4a60e7158810ddc6f366969e4a994a3ef34622e18596" target='_blank' rel="noreferrer" > Sass Essential Training</a></h4>
                <h5>2021</h5>
                <p><em>Linkedin</em></p>
              </div>
              <h3 class="resume-title">Awards</h3>
              <div class="resume-item">
                <h4><a href="https://www.linkedin.com/in/manorma-sharma/overlay/1635521328499/single-media-viewer/?profileId=ACoAABQxusgBJh3LoClwJVZP-hS4RbA3f2YhftY" target='_blank' rel="noreferrer" > Hackerearth Kudos Award</a></h4>
                <h5>2022</h5>
                <p><em>Hackerearth, Banglore, India </em></p>
              </div>

              
            {/* Certificates Ends */}
          </div>
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">           
            <h3 class="resume-title">Experience</h3>
            <div class="resume-item">
              <h4>Hackerearth - Web UI Developer</h4>
              <h5>05/2022 - 06/2023</h5>
              <p><em>Banglore, Karnataka</em></p>
              <p className='responsibilty'><strong>Responsibilities</strong></p>
              <ul>
                  <li>Template customization of open-source web applications like WordPress</li>
                  <li>Worked on in-house projects</li>
                  <li>Responsible for performance tuning of the website</li>
                  <li>Manage the SEO improvements</li>
                  <li>Web Core vitals</li>
                  <li>Responsible for Performance tuning of the website, Manage the SEO improvements, Web Core vitals</li>
                  <li>Learned technologies: Basics of Azure, CI/CD Setup, React Js, ES6, WebPack, WordPress Template customization, Canvas JS </li>
              </ul>
            </div>
            <div class="resume-item">
                <h4>Oceanic Studio - Front-End Developer</h4>
                <h5>11/2020 - 04/2022</h5>
                <p><em>Delhi, Delhi</em></p>
                <p className='responsibilty'><strong>Responsibilities</strong></p>
                <ul>
                    <li>Responsible for delivery of assigned module, components or phases of project</li>
                    <li>Gather requirements by working closely with coordinate manager</li>
                    <li>Communicate conceptual ideas and design effectively in cross-functional product development team</li>
                    <li>Developed UI screens using CSS, JavaScript for validations, and jQuery for animations Frontend and Backend of Projects</li>
                    <li>Designing website layouts, CSS animation</li>
                    <li>Create presentation for client to showcase deliveries and innovations</li>
                    <li>Code review and knowledge sharing sessions with peers and support them in HTML structuring</li>
                    <li>Decision making to solve any given problem statement</li>
                    <li>Learned technologies like Sass, Gulp, Bitbucket, PHP</li>
                </ul>
            </div>
            <div class="resume-item">
                <h4>Hedkey Pvt. Ltd. - Web Developer Intern</h4>
                <h5>7/2020 - 11/2022</h5>
                <p><em>Delhi, Delhi</em></p>
                <p className='responsibilty'><strong>Responsibilities</strong></p>
                <ul>
                  <li>Mainly worked on WordPress CMS</li>
                  <li>Responsible for converting the PSD to HTML</li> 
                  <li>Responsible for performance tuning of website.</li>
                  <li>Directly communicate with clients to gather requirements</li>
                  <li>Worked on Magento, Open cart, Joomla CMS.</li>
                  <li>Learned Technologies: Wordpress, PHP, Photoshop, XD, JQuery</li>
                </ul>
            </div>
            
            {/* Work History Ends */}
          </div>
        </div>
      </div>
      <div>
      </div>
    </section>
    </>
  )
}

export default Resume