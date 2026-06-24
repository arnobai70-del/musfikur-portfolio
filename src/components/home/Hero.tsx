import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, ArrowRight, Code, ShieldCheck, Settings } from 'lucide-react';

const Hero: React.FC = () => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Musfikur Rahman Arnob | Production & SQA Engineer, Web Developer</title>
        <meta 
          name="description" 
          content="Portfolio of Musfikur Rahman Arnob - A professional Production Engineer, SQA Engineer, and Web Developer specializing in reliable systems and modern digital experiences." 
        />
        <meta name="keywords" content="Musfikur Rahman Arnob, Production Engineer, SQA Engineer, Web Developer, Software Quality Assurance, Portfolio" />
      </Helmet>

      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#FFFFFF]">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-[#0F172A]/5 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left Content - Typography & CTA */}
            <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-sm font-bold tracking-wide uppercase">
                  Available for Opportunities
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-[800] text-[#0F172A] leading-[1.1] tracking-tight">
                  Musfikur Rahman <br />
                  <span className="text-[#2563EB]">Arnob</span>
                </h1>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-[#475569] font-[500] text-lg md:text-xl">
                  <span className="flex items-center gap-2">
                    <Settings size={18} className="text-[#2563EB]" /> Production Engineer
                  </span>
                  <span className="hidden md:block text-[#E2E8F0]">|</span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#2563EB]" /> SQA Engineer
                  </span>
                  <span className="hidden md:block text-[#E2E8F0]">|</span>
                  <span className="flex items-center gap-2">
                    <Code size={18} className="text-[#2563EB]" /> Web Developer
                  </span>
                </div>
              </div>

              <p className="max-w-2xl mx-auto lg:mx-0 text-[#475569] text-base md:text-lg leading-relaxed font-[400]">
                I build reliable systems, optimize processes, and create modern digital experiences through engineering, quality assurance, and web development.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={handleContactClick}
                  className="group w-full sm:w-auto bg-[#0F172A] text-white px-8 py-4 rounded-xl font-[700] flex items-center justify-center gap-2 hover:bg-[#2563EB] transition-all duration-300 shadow-xl shadow-blue-900/10"
                >
                  Hire Me
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  className="w-full sm:w-auto border-2 border-[#E2E8F0] text-[#0F172A] px-8 py-4 rounded-xl font-[700] flex items-center justify-center gap-2 hover:bg-[#F8FAFC] hover:border-[#2563EB] transition-all duration-300"
                >
                  <FileText size={20} />
                  Download CV
                </button>
              </div>

              {/* Stats Section */}
              <div className="pt-10 flex items-center justify-center lg:justify-start gap-10">
                <div>
                  <div className="text-3xl font-[800] text-[#0F172A]">02+</div>
                  <div className="text-[11px] uppercase tracking-widest text-[#475569] font-[700] mt-1">Years Exp.</div>
                </div>
                <div className="w-px h-12 bg-[#E2E8F0]"></div>
                <div>
                  <div className="text-3xl font-[800] text-[#0F172A]">20+</div>
                  <div className="text-[11px] uppercase tracking-widest text-[#475569] font-[700] mt-1">Projects</div>
                </div>
                <div className="w-px h-12 bg-[#E2E8F0]"></div>
                <div>
                  <div className="text-3xl font-[800] text-[#0F172A]">10+</div>
                  <div className="text-[11px] uppercase tracking-widest text-[#475569] font-[700] mt-1">Certifications</div>
                </div>
              </div>
            </div>

            {/* Right Side - Profile Image with Corporate Accents */}
            <div className="flex-1 relative group">
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] mx-auto">
                
                {/* Modern Geometric Accents */}
                <div className="absolute -inset-4 border-2 border-[#2563EB]/20 rounded-[40px] rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
                <div className="absolute -inset-4 border-2 border-[#0F172A]/10 rounded-[40px] -rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>

                {/* Main Image Container */}
                <div className="absolute inset-0 bg-[#F8FAFC] rounded-[32px] overflow-hidden border border-[#E2E8F0] shadow-2xl z-10">
                  <img 
                    src="https://via.placeholder.com/800x800?text=Musfikur+Arnob" 
                    alt="Musfikur Rahman Arnob" 
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                  />
                </div>

                {/* Floating Badge 1 - SQA */}
                <div className="absolute -bottom-4 -left-8 bg-white p-4 rounded-2xl shadow-2xl border border-[#E2E8F0] z-20 animate-bounce-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center text-[#2563EB]">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#475569] uppercase font-bold tracking-tighter">Specialist</div>
                      <div className="text-sm font-[800] text-[#0F172A]">SQA Engineer</div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2 - Engineering */}
                <div className="absolute top-10 -right-10 bg-white p-4 rounded-2xl shadow-2xl border border-[#E2E8F0] z-20 animate-pulse-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#0F172A]/5 rounded-xl flex items-center justify-center text-[#0F172A]">
                      <Settings size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#475569] uppercase font-bold tracking-tighter">Process</div>
                      <div className="text-sm font-[800] text-[#0F172A]">Production Eng.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Adding custom animations to your global CSS or Tailwind via style tag for this component */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(0.98); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
        .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
        .animate-pulse-subtle { animation: pulse-subtle 3s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default Hero;