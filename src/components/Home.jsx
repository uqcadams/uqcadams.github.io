import React, { memo } from 'react';

const Home = memo(({ id }) => {
  return (
    <section id={id}>
      <div className="section-image-holder image-border">
        <img src="/img/img1.jpg" className="section-image" alt="Landing Page Image" />
        <div className="image-overlay"></div>
      </div>

      <div className="section-text">
        <div className="text">
          <h2 className="text-heading">CHRIS ADAMS</h2>
          <div className="dividers">
            <div className="text-divider"></div>
          </div>
          <p className="text-blurb">PhD Researcher / Interaction Design / Ethics</p>
        </div>
      </div>

      <div className="section-title">&lt; HOME &gt;</div>
    </section>
  );
});

export default Home;
