import React from 'react';
import { User, GraduationCap, Briefcase, Target, Award, Code, CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Years of Experience', value: '02+', icon: <Briefcase size={24} /> },
    { label: 'Projects Completed', value: '20+', icon: <Code size={24} /> },
    { label: 'Certifications Earned', value: '10+', icon: <Award size={24} /> },
  ];

  return (
    <section id="about" className="py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] mb-3">About Me</h2>
          <h3 className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight">Professional Journey & Expertise</h3>
          <div className="w-16 h-1.5 bg-[#2563EB] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Stats & Profile Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group">
              <div className="absolute -inset-2 bg-[#2563EB]/5 rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
                <div className="space-y-6">
                  <p className="text-[#475569] text-lg leading-relaxed font-[400] italic">
                    "I am a results-driven professional with a unique blend of engineering precision, a quality assurance mindset, and modern web development skills."
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-[#E2E8F0]">
                    <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center text-white font-[800]">M</div>
                    <div>
                      <h4 className="font-[700] text-[#0F172A]">Musfikur Rahman Arnob</h4>
                      <p className="text-[11px] text-[#475569] font-[700] uppercase tracking-wider">Engineering & Development</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white p-5 rounded-2xl border border-[#E2E8F0] flex items-center gap-5 hover:border-[#2563EB]/30 transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  <div className="p-3 bg-[#F8FAFC] text-[#2563EB] rounded-xl group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-[800] text-[#0F172A]">{stat.value}</div>
                    <div className="text-sm text-[#475569] font-[500]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed Introduction & Background */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Introduction */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#0F172A]">
                <div className="w-10 h-10 bg-[#2563EB]/10 rounded-full flex items-center justify-center text-[#2563EB]">
                  <User size={22} />
                </div>
                <h4 className="font-[800] text-xl">Who I Am</h4>
              </div>
              <p className="text-[#475569] text-lg leading-relaxed font-[400]">
                As a <span className="font-[700] text-[#0F172A]">Production Engineer</span> and <span className="font-[700] text-[#0F172A]">SQA Engineer</span>, I have a deep passion for optimizing systems. My transition into <span className="font-[700] text-[#2563EB]">Web Development</span> allows me to bridge the gap between industrial efficiency and digital innovation. I thrive on solving complex problems and delivering high-quality, scalable solutions.
              </p>
            </div>

            {/* Education & Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Education */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-[#0F172A]">
                  <GraduationCap className="text-[#2563EB]" size={22} />
                  <h4 className="font-[800] text-lg">Education</h4>
                </div>
                <div className="pl-6 border-l-2 border-[#E2E8F0] space-y-4">
                  <div className="relative">
                    <div className="absolute -left-[26px] top-1 w-2 h-2 bg-[#2563EB] rounded-full"></div>
                    <h5 className="font-[700] text-[#0F172A] text-sm uppercase tracking-wide">B.Sc. in Engineering</h5>
                    <p className="text-[#475569] text-sm mt-1">Industrial and Production Engineering (IPE)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <p className="text-sm text-[#475569] font-[400]">Strong foundation in process optimization and quality control systems.</p>
                  </div>
                </div>
              </div>

              {/* Career Goals */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-[#0F172A]">
                  <Target className="text-[#2563EB]" size={22} />
                  <h4 className="font-[800] text-lg">Career Goals</h4>
                </div>
                <div className="pl-6 border-l-2 border-[#E2E8F0] space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <p className="text-sm text-[#475569] font-[400]">To lead digital transformation in modern production environments.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <p className="text-sm text-[#475569] font-[400]">To build high-performance software with zero-defect quality assurance.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Journey Highlights */}
            <div className="bg-[#0F172A] p-10 rounded-[32px] text-white relative overflow-hidden group shadow-xl">
              {/* Decorative Icon */}
              <Briefcase size={140} className="absolute -right-10 -bottom-10 text-white/5 rotate-12 transition-transform duration-700 group-hover:scale-110" />
              
              <div className="relative z-10 space-y-5">
                <h4 className="text-xl font-[800] flex items-center gap-3">
                  <div className="w-8 h-px bg-[#2563EB]"></div>
                  Professional Journey
                </h4>
                <p className="text-slate-300 leading-relaxed font-[400]">
                  My career started in the industrial sector, focusing on production planning and engineering. Recognizing the power of technology, I expanded my expertise into Software Quality Assurance (SQA) and Full-Stack Development. This multi-disciplinary approach allows me to view projects from both a technical and operational perspective, ensuring every solution is both efficient and robust.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;