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
              <p><em>Experienced UI developer with 3+ years of expertise delivering quality
                applications. Skilled in HTML5, CSS, ReactJs, Sass, Bootstrap, NodeJs,
                WebPack, API integration, and website performance tuning. Proven
                ability to review code effectively for glitch-free projects.
              </em></p>
              <ul>
                <li><a href='mailto:manorma.business@gmail.com'>manorma.business@gmail.com</a></li>
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
                <h4>Higher Secondary (12th)</h4>
                <h5>2016 - 2015</h5>
                <p><em>CBSE Board</em></p>
              </div>
              <div class="resume-item">
                <h4>Matriculation (10th)</h4>
                <h5>2014 - 2013</h5>
                <p><em>CBSE Board</em></p>
              </div>
              {/* Education Ends */}

              <h3 class="resume-title">Certificates</h3>
              <div class="resume-item">
                <h4><a href="https://drive.google.com/open?id=1IxYdl5f3IXuzImMbhPbiRF4Yvk3U6p91" target='_blank' rel="noreferrer" > Python</a></h4>
                <h5>2019</h5>
                <p><em>Basent Technologies, Bengaluru, India </em></p>
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
              <h3 class="resume-title">Acheivements</h3>
              <div class="resume-item">
                <h4><a href="https://www.linkedin.com/in/manorma-sharma/overlay/1635521328499/single-media-viewer/?profileId=ACoAABQxusgBJh3LoClwJVZP-hS4RbA3f2YhftY" target='_blank' rel="noreferrer" > Hackerearth Kudos Award</a></h4>
                <h5>2022</h5>
                <p><em>Hackerearth, Bengaluru, India </em></p>
              </div>

              
            {/* Certificates Ends */}
          </div>
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">           
            <h3 class="resume-title">Experience</h3>
            <div class="resume-item">
              <h4>Brickwork - Senior Web Developer</h4>
              <h5>Jan 2024 - Present</h5>
              <p><em>Bengaluru, Karnataka</em></p>
              <p className='responsibilty'><strong>Responsibilities</strong></p>
              <ul>
                  <li>Ensure optimal performance and reliability of our websites through meticulous testing and proactive issue resolution.</li>
                  <li>Take ownership of project components, delivering them in alignment with business objectives.</li>
                  <li>Collaborate closely with onshore teams and agencies, utilizing Slack, Teams, Bitbucket, Jira, and Asana for effective communication and project management.</li>
                  <li>Drive improvements in user experience by specializing in React-based Crownpeak CMS.</li>
                  <li>Mentor junior team members to foster their professional growth and ensure team effectiveness.</li>
              </ul>
            </div>
            <div class="resume-item">
              <h4>Hackerearth - Web UI Developer</h4>
              <h5>May 2022 -  Jun 2023</h5>
              <p><em>Bengaluru, Karnataka</em></p>
              <p className='responsibilty'><strong>Responsibilities</strong></p>
              <ul>
                  <li>Spearheaded integration of Headless CMS using WordPress Rest API and React.js, enhancing web platform flexibility.</li>
                  <li>Demonstrated strong front-end development and UI design skills with successful React.js project delivery.</li>
                  <li>Led performance optimization efforts, improving website speed and SEO for enhanced user experience.</li>
                  <li>Monitored and optimized Web Core Vitals, ensuring optimal website responsiveness and Google ranking adherence.</li>
                  <li>Rapidly acquired expertise in Azure, CI/CD setup, React.js, Node.js, ES6, and WebPack to meet evolving project needs.</li>
              </ul>
            </div>
            <div class="resume-item">
                <h4>Oceanic Studio - Front-End Developer</h4>
                <h5>Nov 2020 - Apr 2022</h5>
                <p><em>Delhi, Delhi</em></p>
                <p className='responsibilty'><strong>Responsibilities</strong></p>
                <ul>
                    <li>Developed UI screens with CSS and JavaScript for validations, integrating jQuery for animations on both front and backend.</li>
                    <li>Customized templates for open-source and licensed web applications like WordPress.</li>
                    <li>Collaborated closely with coordination managers to gather and understand project needs effectively.</li>
                    <li>Acquired proficiency in technologies such as Sass, Gulp, Bitbucket, and PHP to enhance skill set and meet evolving project demands.</li>
                </ul>
            </div>
            <div class="resume-item">
                <h4>Hedkey Pvt. Ltd. - Web Developer Intern</h4>
                <h5>Jul 2020 - Oct 2020</h5>
                <p><em>Delhi, Delhi</em></p>
                <p className='responsibilty'><strong>Responsibilities</strong></p>
                <ul>
                  <li>Specialized in WordPress CMS, handling customization and optimization for client needs.</li>
                  <li>Expertise in converting PSD to HTML, ensuring precise design implementation.</li>
                  <li>Responsible for website performance tuning, enhancing speed and efficiency.</li>
                  <li>Direct client communication for requirements gathering and alignment.</li>
                  <li>Proficient in WordPress, PHP, Photoshop, XD, jQuery.</li>
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