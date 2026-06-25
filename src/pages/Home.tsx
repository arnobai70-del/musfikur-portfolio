import React from 'react';
import { Helmet } from 'react-helmet-async';

// Page Sections Components
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Skills from '../components/home/Skills';
import Experience from '../components/home/Experience';
import Projects from '../components/home/Projects';
import Certifications from '../components/home/Certifications';
import Testimonials from '../components/home/Testimonials';
import Contact from '../components/home/Contact';

const Home: React.FC = () => {
  const siteTitle = "Musfikur Rahman Arnob | Production Engineer, SQA & Web Developer";
  const siteDescription = "Professional portfolio of Musfikur Rahman Arnob. Specialized in building reliable systems, process optimization, software quality assurance (SQA), and modern full-stack web development.";
  const siteKeywords = "Musfikur Rahman Arnob, Production Engineer, SQA Engineer, Web Developer, Full Stack Developer, Software Quality Assurance, Industrial Engineering, React Developer, Bangladesh, MRArnob.dev";
  const siteUrl = "https://musfikurrahmanarnob.dev"; // আপনার অরিজিনাল ডোমেইন বা ভার্সেল ইউআরএল
  const siteImage = "https://res.cloudinary.com/dkpju3m8n/image/upload/v1782354341/WhatsApp_Image_2026-06-25_at_8.25.13_AM_iwq7gc.jpg";

  return (
    <>
      {/* SEO & Meta Tags Configuration */}
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={siteImage} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImage} />

        {/* Search Engine Optimization Addons */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Musfikur Rahman Arnob" />
        <meta name="theme-color" content="#0F172A" />
      </Helmet>

      {/* Main Website Content Sections */}
      <div className="flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Testimonials />
        <Contact />
      </div>
    </>
  );
};

export default Home;