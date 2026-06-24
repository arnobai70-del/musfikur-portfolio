import React from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Skills from '../components/home/Skills';
import Experience from '../components/home/Experience';
import Projects from '../components/home/Projects';
import Certifications from '../components/home/Certifications';
import Testimonials from '../components/home/Testimonials';
import Contact from '../components/home/Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;