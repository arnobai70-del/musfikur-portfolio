import React from 'react';
import { Settings, Code2, ShieldCheck, Users, CheckCircle2, Zap, Shield, Laptop, Smartphone } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Engineering',
      icon: <Settings size={24} />,
      skills: [
        { name: 'Production Planning', level: 90 },
        { name: 'Process Optimization', level: 85 },
        { name: 'Quality Control', level: 88 },
        { name: 'Lean Manufacturing', level: 82 },
      ],
    },
    {
      title: 'Software Development',
      icon: <Code2 size={24} />,
      skills: [
        { name: 'React & TypeScript', level: 85 },
        { name: 'JavaScript (ES6+)', level: 88 },
        { name: 'Firebase & Firestore', level: 80 },
        { name: 'HTML5 & Tailwind CSS', level: 95 },
        { name: 'WordPress Development', level: 85 },
      ],
    },
    {
      title: 'QA & Testing',
      icon: <ShieldCheck size={24} />,
      skills: [
        { name: 'Manual Testing', level: 92 },
        { name: 'Test Cases & Documentation', level: 90 },
        { name: 'Bug Reporting & Tracking', level: 88 },
        { name: 'Quality Assurance Standards', level: 90 },
      ],
    },
    {
      title: 'Professional Skills',
      icon: <Users size={24} />,
      skills: [
        { name: 'Leadership & Management', level: 85 },
        { name: 'Technical Communication', level: 90 },
        { name: 'Analytical Problem Solving', level: 92 },
        { name: 'Agile Collaboration', level: 95 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] mb-3">Technical Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight">Core Proficiencies</h3>
          <div className="w-16 h-1.5 bg-[#2563EB] mx-auto mt-6 rounded-full"></div>
          <p className="mt-8 text-[#475569] max-w-2xl mx-auto text-lg font-[400]">
            A specialized skill set bridging the gap between industrial engineering precision and modern software development excellence.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="bg-[#F8FAFC] p-8 rounded-[32px] border border-[#E2E8F0] hover:border-[#2563EB]/30 transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-blue-900/5"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-white rounded-2xl text-[#2563EB] shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500">
                  {category.icon}
                </div>
                <h4 className="text-2xl font-[800] text-[#0F172A]">{category.title}</h4>
              </div>

              <div className="space-y-7">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#0F172A] font-[700] text-sm flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-[#2563EB]" />
                        {skill.name}
                      </span>
                      <span className="text-[#475569] text-xs font-[800]">{skill.level}%</span>
                    </div>
                    
                    {/* Professional Progress Bar */}
                    <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-[#E2E8F0]/50">
                      <div 
                        className="h-full bg-[#2563EB] rounded-full transition-all duration-1000 ease-in-out relative"
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Professional Trust Badges */}
        <div className="mt-24 pt-12 border-t border-[#E2E8F0] grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-2 group cursor-default">
                <div className="text-[#0F172A] font-[800] text-xl flex items-center gap-2 group-hover:text-[#2563EB] transition-colors">
                  <Zap size={20} /> FAST
                </div>
                <span className="text-[10px] text-[#475569] font-[700] uppercase tracking-widest">Optimized Performance</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 group cursor-default">
                <div className="text-[#0F172A] font-[800] text-xl flex items-center gap-2 group-hover:text-[#2563EB] transition-colors">
                  <Shield size={20} /> SECURE
                </div>
                <span className="text-[10px] text-[#475569] font-[700] uppercase tracking-widest">Quality Assured</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 group cursor-default">
                <div className="text-[#0F172A] font-[800] text-xl flex items-center gap-2 group-hover:text-[#2563EB] transition-colors">
                  <Laptop size={20} /> CLEAN
                </div>
                <span className="text-[10px] text-[#475569] font-[700] uppercase tracking-widest">Scalable Codebase</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 group cursor-default">
                <div className="text-[#0F172A] font-[800] text-xl flex items-center gap-2 group-hover:text-[#2563EB] transition-colors">
                  <Smartphone size={20} /> ADAPTIVE
                </div>
                <span className="text-[10px] text-[#475569] font-[700] uppercase tracking-widest">Full Responsiveness</span>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;