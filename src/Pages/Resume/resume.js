import React from 'react';
import "./resume.scss"
import profile from "../../data/profile.json";
import experienceData from "../../data/experience.json";
import educationData from "../../data/education.json";
import certificationsData from "../../data/certifications.json";
import Timeline from "../../components/Timeline/Timeline";
import SectionHeading from "../../components/SectionHeading/SectionHeading";

const byOrder = (a, b) => a.order - b.order;

function renderBullet(bullet, index) {
  // supports **bold** markers from the data files without pulling in a markdown parser
  const parts = bullet.split(/\*\*(.*?)\*\*/g);
  return (
    <li key={index}>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </li>
  );
}

function Resume() {
  const certifications = certificationsData.filter((c) => c.type === 'certification').sort(byOrder);
  const awards = certificationsData.filter((c) => c.type === 'achievement').sort(byOrder);
  const education = educationData.slice().sort(byOrder);
  const experience = experienceData.filter((e) => e.visible).slice().sort(byOrder);

  return (
    <>
<<<<<<< Updated upstream
    <section id="resume" className="resume py-5">
      <div className="container">
        <SectionHeading number="04" title="Resume" />
        <div className="row pb-5">
          <div className="col-lg-6">
            <h3 className="resume-title">Summary</h3>
            <div className="resume-item">
              <h4>{profile.name}</h4>
              {profile.title && <h5>{profile.title}</h5>}
              <p><em>{profile.summary}</em></p>
              <ul>
                <li><a href={`mailto:${profile.contactEmail}`}>{profile.contactEmail}</a></li>
                {profile.phone && <li>{profile.phone}</li>}
                {profile.location && <li>{profile.location}</li>}
=======
    <section id="resume" class="resume py-5">
      <div class="container">
        <div class="row pb-5">
          <div class="col-lg-6" data-aos="fade-up">
            <h3 class="resume-title">Summary</h3>
            <div class="resume-item pb-0">
              <h4>Manorma Sharma</h4>
              <p><em>Software Engineer (Full Stack — React.js / Node.js) with 5+ years building production-scale web applications.
                Experienced across the full stack — from component architecture, state management, and performance optimization
                (Core Web Vitals, code splitting, CDN delivery) to Node.js/Express backends, REST APIs, and secure authentication
                with JWT and RBAC. Track record of leading architecture redesigns, delivering measurable performance gains, and
                mentoring engineers across fast-paced, cross-functional teams.
              </em></p>
              <ul>
                <li><a href='mailto:mannuu0501@gmail.com'>mannuu0501@gmail.com</a></li>
>>>>>>> Stashed changes
              </ul>
              {profile.coreSkills && (
                <div className="core-skills-tags">
                  {profile.coreSkills.map((skill) => (
                    <span className="badge bg-pink me-2 mb-2" key={skill}>{skill}</span>
                  ))}
                </div>
              )}
            </div>

            <h3 className="resume-title">Certifications</h3>
            {certifications.map((cert) => (
              <div className="resume-item" key={cert.title}>
                <h4><a href={cert.url} target='_blank' rel="noreferrer">{cert.title}</a></h4>
                <h5>{cert.date}</h5>
                <p>{cert.issuer}</p>
              </div>
            ))}

            <h3 className="resume-title">Education</h3>
            {education.map((edu) => (
              <div className="resume-item" key={edu.degree}>
                <h4>{edu.degree}</h4>
                <h5>{edu.dateRange}</h5>
                <p><em>{edu.institution}</em></p>
              </div>
            ))}

            <h3 className="resume-title">Awards</h3>
            {awards.map((item) => (
              <div className="resume-item" key={item.title}>
                <h4><a href={item.url} target='_blank' rel="noreferrer"> {item.title}</a></h4>
                {item.date && <h5>{item.date}</h5>}
                <p><em>{item.issuer}</em></p>
              </div>
            ))}

            {profile.languages && (
              <>
                <h3 className="resume-title">Languages</h3>
                <div className="resume-item">
                  <p className="mb-0">{profile.languages.join(' • ')}</p>
                </div>
              </>
            )}
          </div>
<<<<<<< Updated upstream
          <div className="col-lg-6">
            <h3 className="resume-title">Experience</h3>
            <Timeline
              items={experience}
              renderItem={(job) => (
                <div className="timeline-content">
                  <h4>{job.company}{job.role ? ` - ${job.role}` : ''}</h4>
                  <h5>{job.startDate} - {job.endDate}</h5>
                  <p><em>{job.location}</em></p>
                  <p className='responsibilty'><strong>Responsibilities</strong></p>
                  <ul>
                    {job.bullets.map(renderBullet)}
                  </ul>
                </div>
              )}
            />
=======
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">           
            <h3 class="resume-title">Experience</h3>
            <div class="resume-item">
              <h4>HUMBEE (20p95) — Software Development Engineer</h4>
              <h5>Aug 2024 – Present</h5>
              <p><em>Noida, Delhi</em></p>
              <ul>
                <li>Led frontend architecture redesign of a multi-role B2B platform serving distributors, dealers, retailers, and manufacturers across <strong>4 distinct user roles</strong> in a single React.js codebase.</li>
                <li>Built and standardized <strong>30+ reusable React.js components</strong>, improving development velocity and cutting new-feature build time.</li>
                <li>Improved Web Core Vitals and reduced page load time by <strong>~30%</strong> through lazy loading, code splitting, and CDN caching.</li>
                <li>Implemented secure <strong>JWT authentication and Role-Based Access Control (RBAC)</strong> across all platform user types.</li>
                <li>Integrated <strong>Adobe Marketo</strong> for automated lead capture, reducing manual marketing handoffs.</li>
                <li>Configured <strong>AWS CloudFront CDN</strong> for optimized global content delivery, reducing asset latency for end users.</li>
                <li>Collaborated cross-functionally with backend and DevOps teams to streamline deployment pipelines.</li>
              </ul>
            </div>
            <div class="resume-item">
              <h4>Brickwork — Senior Web Developer</h4>
              <h5>Jan 2024 – Jul 2024</h5>
              <p><em>Bengaluru, Karnataka</em></p>
              <ul>
                  <li>Gathered and translated requirements from US-based enterprise clients into scalable CMS solutions on tight delivery timelines.</li>
                  <li>Developed and customized enterprise web applications using <strong>Crownpeak CMS</strong> for multiple client accounts.</li>
                  <li>Improved application performance and stability through structured refactoring, debugging, and code review.</li>
                  <li>Delivered features within Agile sprints, coordinating with cross-functional and distributed teams.</li>
              </ul>
            </div>
            <div class="resume-item">
              <h4>Freelance Web Developer</h4>
              <h5>May 2023 – Mar 2024</h5>
              <p><em>US-Based Event Technology Platform — Remote</em></p>
              <ul>
                  <li>Developed responsive event websites and attendee management systems for enterprise clients.</li>
                  <li>Built dynamic registration workflows and <strong>role-based access control</strong> systems for high-traffic events.</li>
                  <li>Delivered and optimized high-traffic event platforms, ensuring stable performance during peak registration windows.</li>
              </ul>
            </div>
            <div class="resume-item">
              <h4>HackerEarth — Web UI Developer</h4>
              <h5>May 2022 – Jun 2023</h5>
              <p><em>Bengaluru, Karnataka</em></p>
              <ul>
                  <li>Migrated legacy WordPress applications to React.js using REST APIs, improving maintainability and load performance.</li>
                  <li>Integrated <strong>HubSpot</strong> for marketing automation and analytics, improving campaign tracking accuracy.</li>
                  <li>Improved SEO, accessibility (WCAG), and Web Core Vitals scores across key product pages.</li>
                  <li>Built reusable UI components aligned with the product roadmap, supporting faster feature delivery.</li>
              </ul>
            </div>
            <div class="resume-item">
                <h4>Oceanic Studio — Front-End Developer</h4>
                <h5>Nov 2020 – Apr 2022</h5>
                <p><em>Delhi, India</em></p>
                <ul>
                    <li>Developed responsive, cross-browser UI using HTML, CSS, and JavaScript for client-facing web products.</li>
                    <li>Customized WordPress themes and integrated backend APIs to extend site functionality.</li>
                    <li>Improved performance and maintainability through modular, component-based coding practices.</li>
                </ul>
            </div>
            {/* <div class="resume-item">
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
            </div> */}
            
            {/* Work History Ends */}
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Resume
