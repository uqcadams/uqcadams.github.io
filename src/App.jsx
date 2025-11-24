import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Home from './components/Home';
import ProjectCard from './components/ProjectCard';
import CurrentProjectsCard from './components/CurrentProjectsCard';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { aboutData, projectsData, currentProjectsData } from './data/content';
import './css/normalize.css';
import './css/style.css';
import './css/background-shapes.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Remove preload class
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.classList.remove('preload-transitions');
    }
  }, []);

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Menu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />

      <Home id="home" />

      <ProjectCard project={aboutData} id="about" />

      {projectsData.map((project) => (
        <ProjectCard key={project.id} project={project} id={project.id} />
      ))}

      <CurrentProjectsCard project={currentProjectsData} id="current" />

      <Contact id="contact" />

      <Footer />
    </div>
  );
}

export default App;
