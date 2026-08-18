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
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Resume
