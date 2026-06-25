import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll effect for navbar background and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section for high-end user experience
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: 'home' },
    { name: 'About', path: 'about' },
    { name: 'Skills', path: 'skills' },
    { name: 'Experience', path: 'experience' },
    { name: 'Projects', path: 'projects' },
    { name: 'Certifications', path: 'certifications' },
    { name: 'Contact', path: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed w-full top-0 left-0 z-[100] transition-all duration-500 ${
        scrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-[#E2E8F0] py-3 shadow-sm' 
        : 'bg-white/50 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo - Updated to MRArnob */}
          <div className="flex-shrink-0">
            <NavLink 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl md:text-2xl font-[800] text-[#0F172A] tracking-tighter flex items-center"
            >
              MRArnob<span className="text-[#2563EB]">.dev</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-1 mr-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.path)}
                  className={`px-4 py-2 text-sm font-[600] transition-all duration-300 rounded-lg relative group ${
                    activeSection === link.path 
                    ? 'text-[#2563EB]' 
                    : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {link.name}
                  {/* Active Indicator Underline */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#2563EB] transition-all duration-300 ${
                    activeSection === link.path ? 'w-4' : 'w-0 group-hover:w-2'
                  }`}></span>
                </button>
              ))}
            </div>
            
            {/* CTA Button - Hire Me */}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#0F172A] text-white px-7 py-3 rounded-xl font-[700] text-sm hover:bg-[#2563EB] transition-all duration-300 shadow-xl shadow-blue-900/10 flex items-center gap-2 group active:scale-95"
            >
              Hire Me
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0F172A] p-2 hover:bg-[#F8FAFC] rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-[#E2E8F0] shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-8 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.path)}
              className={`block w-full text-left px-4 py-3 rounded-2xl font-[700] text-lg transition-all ${
                activeSection === link.path 
                ? 'bg-[#2563EB]/5 text-[#2563EB] pl-6' 
                : 'text-[#475569] hover:bg-[#F8FAFC]'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-6">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full bg-[#0F172A] text-white px-6 py-4 rounded-2xl font-[800] text-center hover:bg-[#2563EB] transition-all shadow-lg shadow-blue-900/10"
            >
              Hire Me Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;