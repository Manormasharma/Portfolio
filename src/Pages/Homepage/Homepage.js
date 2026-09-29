import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from './sections/Hero';
import Impact from './sections/Impact';
import About from './sections/About';
import Experience from './sections/Experience';
import Work from './sections/Work';
import Skills from './sections/Skills';
import Credentials from './sections/Credentials';
import Contact from './sections/Contact';
import { scrollToSection } from '../../lib/site';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // arriving from another route via the nav / command palette
  useEffect(() => {
    const target = location.state?.scrollTo || location.hash.replace('#', '');
    if (!target) return;
    requestAnimationFrame(() => {
      if (target === 'top') window.scrollTo({ top: 0 });
      else scrollToSection(target);
    });
    if (location.state?.scrollTo) navigate(location.pathname, { replace: true, state: null });
  }, [location, navigate]);

  return (
    <>
      <Hero />
      <Impact />
      <About />
      <Experience />
      <Skills />
      <Work />
      <Credentials />
      <Contact />
    </>
  );
};

export default Home;
