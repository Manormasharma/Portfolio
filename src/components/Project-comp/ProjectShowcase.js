import React from 'react'
import { motion } from 'framer-motion';
import "./project-showcase.scss"

function ProjectShowcase(props) {
  return (
    <motion.div
      className='project-card'
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
    >
      <a href={props.url} target="_blank" rel="noreferrer" className="project-card-media">
        <img src={props.projectImage} alt={props.projectName} />
        <span className="project-card-overlay">Visit Live Site</span>
      </a>
      <div className="project-card-body">
        <h3>{props.projectName}</h3>
        <p>{props.desc}</p>
        <div className='project-card-tags'>
          {props.techlist.map((techlistItems) => (
            <span className="badge bg-pink me-2 mb-2" key={techlistItems}>{techlistItems}</span>
          ))}
        </div>
        <a href={props.url} target="_blank" className='btn-outline' rel="noreferrer">Take a look!</a>
      </div>
    </motion.div>
  )
}

export default ProjectShowcase;
