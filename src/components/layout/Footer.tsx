import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Experience', path: '#experience' },
    { name: 'Projects', path: '#projects' },
    { name: 'Certifications', path: '#certifications' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <footer className="bg-white border-t border-[#E2E8F0] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Left: Branding & Contact Email */}
          <div className="space-y-6">
            <NavLink to="/" className="text-xl font-extrabold text-[#0F172A] tracking-tighter">
              MusfikurRahmanArnob<span className="text-[#2563EB]">.dev</span>
            </NavLink>
            <p className="text-[#475569] text-sm max-w-xs">
              Building reliable systems, optimizing processes, and creating modern digital experiences through engineering and development.
            </p>
            <div className="pt-2">
              <a
                href="mailto:contact@musfikurrahmanarnob.dev"
                className="inline-flex items-center gap-3 px-4 py-2 bg-[#F8FAFC] rounded-xl text-[#475569] hover:text-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-300 border border-[#E2E8F0]"
              >
                <Mail size={18} />
                <span className="text-sm font-medium">contact@musfikurrahmanarnob.dev</span>
              </a>
            </div>
          </div>

          {/* Center: Quick Links */}
          <div>
            <h3 className="text-[#0F172A] font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-[#475569] hover:text-[#2563EB] transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Legal */}
          <div className="md:text-right">
            <h3 className="text-[#0F172A] font-bold mb-6 text-lg">Legal</h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/privacy-policy" className="text-[#475569] hover:text-[#2563EB] transition-colors text-sm font-medium">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms-conditions" className="text-[#475569] hover:text-[#2563EB] transition-colors text-sm font-medium">
                  Terms & Conditions
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-[#E2E8F0] pt-8 mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[#475569] text-sm">
            © {currentYear} Musfikur Rahman Arnob. All Rights Reserved.
          </p>
          <p className="text-[#475569] text-xs font-medium">
            Designed & Developed by <span className="text-[#0F172A] font-bold">Musfikur Rahman Arnob</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;