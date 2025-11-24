import React, { useState, memo } from 'react';

const CurrentProjectsCard = memo(({ project, id }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id={id}>
      <div className={`section-image-holder ${isExpanded ? 'section-image-holder-toggle' : ''}`}>
        <img src={project.image} className={`section-image ${isExpanded ? 'section-image-toggle' : ''}`} alt={project.title} />
      </div>

      <div className={`section-text ${isExpanded ? 'section-text-toggle' : ''}`}>
        <div className={`text-full ${isExpanded ? 'text-full-toggle' : ''}`}>
          <h2 className="text-heading">{project.heading}</h2>
          <div className="text-full-description">
            <div className="text-main-description">
              <p className="project-intro">{project.intro}</p>

              <div className="current-projects-list">
                {project.projects.map((subProject, index) => (
                  <div key={index} className="current-project-item">
                    <h3 className="project-title">{subProject.name}</h3>
                    <p className="project-description">{subProject.description}</p>
                    <div className="project-links">
                      {subProject.links.live ? (
                        <>
                          <a href={subProject.links.live} className="project-link-btn" target="_blank" rel="noreferrer">View Live</a>
                          <a href={subProject.links.repo} className="project-link-btn" target="_blank" rel="noreferrer">Source Code</a>
                        </>
                      ) : (
                        <a href={subProject.links.notes} className="project-link-btn" target="_blank" rel="noreferrer">View Concept Notes</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div id="more-projects">More projects can be viewed on the desktop site.</div>
            </div>
          </div>
          <div className="text-btn">
            <a className="btn-link" onClick={toggleExpand}>Close</a>
          </div>
        </div>

        <div className={`text ${isExpanded ? 'text-blurb-toggle' : ''}`}>
          <h2 className="text-heading">{project.title.toUpperCase()}</h2>
          <div className="dividers">
            <div className="text-divider"></div>
          </div>
          <p className="text-blurb">{project.blurb}</p>
          <div className="text-btn">
            <a className="btn-link" onClick={toggleExpand}>Learn More</a>
          </div>
        </div>
      </div>

      <div className={`section-title ${isExpanded ? 'section-title-toggle' : ''}`}>&lt; {project.title.toUpperCase()} &gt;</div>
    </section>
  );
});

export default CurrentProjectsCard;
