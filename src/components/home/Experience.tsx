import React from 'react';
import { Briefcase, Calendar, CheckCircle2, Building2, ExternalLink } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
  isCurrent?: boolean;
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      role: 'SQA Engineer',
      company: 'Therap BD',
      duration: 'Present',
      isCurrent: true,
      responsibilities: [
        'Executing comprehensive Test Planning for large-scale enterprise applications.',
        'Performing rigorous Manual Testing to ensure software reliability and performance.',
        'Efficient Bug Tracking and management using industry-standard tools.',
        'Implementing Quality Assurance protocols to maintain high standards of delivery.',
      ],
    },
    {
      role: 'Production Engineer',
      company: 'Industrial Sector',
      duration: 'Previous Role',
      responsibilities: [
        'Continuous Production Monitoring to ensure manufacturing efficiency and targets.',
        'Driving Process Optimization to reduce waste and improve throughput.',
        'Effective Team Coordination and leadership in a fast-paced production environment.',
        'Proposing and implementing Process Improvements using Lean methodologies.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-24">
          <h2 className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] mb-3">Resume</h2>
          <h3 className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight">Professional Experience</h3>
          <div className="w-16 h-1.5 bg-[#2563EB] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Main Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-[#E2E8F0]"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row items-center justify-between gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                
                {/* Timeline Dot/Icon Center */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div className={`w-10 h-10 rounded-xl border-4 border-[#F8FAFC] flex items-center justify-center transition-all duration-300 ${
                    exp.isCurrent 
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-200' 
                      : 'bg-white text-[#475569] shadow-sm border-[#E2E8F0]'
                  }`}>
                    <Briefcase size={18} />
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[45%] ml-10 md:ml-0">
                  <div className="bg-white p-8 rounded-[32px] border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#2563EB]/30 transition-all duration-500 group relative">
                    
                    {/* Active Status Indicator */}
                    {exp.isCurrent && (
                      <div className="absolute top-6 right-8 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
                        </span>
                        <span className="text-[10px] font-[800] text-[#2563EB] uppercase tracking-wider">Active</span>
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[11px] font-[800] text-[#2563EB] uppercase bg-[#2563EB]/5 px-3 py-1 rounded-lg">
                          <Calendar size={13} />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-[700] text-[#475569] uppercase tracking-wide">
                          <Building2 size={13} />
                          {exp.company}
                        </div>
                      </div>

                      {/* Role Details */}
                      <div>
                        <h4 className="text-2xl font-[800] text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-300">
                          {exp.role}
                        </h4>
                        <div className="w-8 h-1 bg-[#2563EB]/20 mt-2 rounded-full group-hover:w-12 transition-all duration-500"></div>
                      </div>

                      {/* Responsibilities List */}
                      <ul className="space-y-4">
                        {exp.responsibilities.map((item, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-3 group/item">
                            <div className="mt-1.5 shrink-0">
                              <CheckCircle2 size={16} className="text-[#2563EB] transition-transform duration-300 group-hover/item:scale-110" />
                            </div>
                            <span className="text-[#475569] text-sm leading-relaxed font-[400]">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Empty Spacer for Desktop Symmetry */}
                <div className="hidden md:block w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-24 text-center">
            <div className="inline-block p-1 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
              <button className="flex items-center gap-3 bg-[#0F172A] text-white px-10 py-4 rounded-xl font-[700] hover:bg-[#2563EB] transition-all duration-300 shadow-xl shadow-blue-900/10 active:scale-95">
                <ExternalLink size={18} />
                View Full Detailed Resume
              </button>
            </div>
            <p className="mt-6 text-[#475569] text-sm font-[500]">
              Interested in a deeper look? Download my PDF resume above.
            </p>
        </div>

      </div>
    </section>
  );
};

export default Experience;