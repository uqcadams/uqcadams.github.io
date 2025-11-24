import React, { memo, useState, useEffect } from 'react';

const Footer = memo(() => {
  const [activeSection, setActiveSection] = useState('home');
  const sections = ['home', 'about', 'portfolio-1', 'portfolio-2', 'portfolio-3', 'portfolio-4', 'portfolio-5', 'current', 'contact'];

  // Intersection Observer for Navigation
  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sectionElements = document.querySelectorAll('section');
    sectionElements.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionElements.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <footer className="footer">
      {sections.map((section) => (
        <a key={section} className="nav-container" href={`#${section}`}>
          <div className={`nav ${activeSection === section ? 'currentNav' : ''}`}></div>
        </a>
      ))}
    </footer>
  );
});

export default Footer;
