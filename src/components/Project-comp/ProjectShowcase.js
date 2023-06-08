import React from 'react'
import "./project-showcase.scss"
function ProjectShowcase(props) {
  return (
    <div className='project py-4 py-lg-5 row no-gutter'>
      <div className='col-lg-6 mb-lg-5 pb-lg-5'>
        <a href={`${props.url}`}  target='_blank' rel="noreferrer" >
          <img class="img-fluid" src={props.projectImage} alt="project img" />
        </a>
      </div>
      <div className='col-lg-5 offset-lg-1 py-4 p-lg-0'>
        <div class="work-info">
          <div className='d-flex justify-content-between align-items-center pb-3'>
            <h3 className=''><strong>{props.projectName}</strong></h3> 
           
          </div>
          <p className=''>{props.desc}</p>
          <div className='pb-3 d-flex align-items-center flex-wrap'>
            <p className='me-4'>Technology Used : </p>
            {
              props.techlist.map((techlistItems) =>  
                <p><span class="badge bg-pink me-2">{techlistItems}</span></p>
              )
            }
            </div>
            <a href={`${props.url}`}  target="_blank" className='btn-custom' rel="noreferrer" >Take a look!</a>
        </div>
      </div> 
    </div>
  )
}

export default ProjectShowcase;