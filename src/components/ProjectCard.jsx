import React, { useState, memo } from 'react';

const ProjectCard = memo(({ project, id }) => {
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
              {project.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {project.links && (
                <div className="text-nav">
                  <a href={project.links.live} className="gradient-text" target="_blank" rel="noreferrer">Click here</a> to view the site in action, or alternatively <a href={project.links.repo} className="gradient-text" target="_blank" rel="noreferrer">explore the source code</a> in the GitHub repo.
                </div>
              )}
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

export default ProjectCard;
