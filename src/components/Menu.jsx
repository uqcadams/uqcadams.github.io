import React, { memo } from 'react';

const Menu = memo(({ isMenuOpen, closeMenu }) => {
  return (
    <section
      className={`menu ${isMenuOpen ? 'open' : ''}`}
      style={isMenuOpen ? { opacity: 1, zIndex: 1000, transition: '1s' } : { opacity: 0, zIndex: -5, transition: '1s' }}
    >
      <a className="menu-home gradient-text" href="#home" onClick={closeMenu}>Home</a>
      <a className="menu-about gradient-text" href="#about" onClick={closeMenu}>About Me</a>
      <a className="menu-portfolio gradient-text" href="#portfolio-1" onClick={closeMenu}>Portfolio</a>
      <a className="menu-portfolio gradient-text" href="#current" onClick={closeMenu}>Current Projects</a>
      <a className="menu-contact gradient-text" href="#contact" onClick={closeMenu}>Contact</a>
    </section>
  );
});

export default Menu;
