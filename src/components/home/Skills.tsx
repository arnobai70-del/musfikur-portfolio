import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Settings, 
  Code2, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Cpu, 
  Globe, 
  Terminal 
} from 'lucide-react';

interface SkillItem {
  name: string;
  level: number; // Percentage for progress indicator
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: SkillItem[];
}

const Skills: React.FC = () => {
  
  const skillCategories: SkillCategory[] = [
    {
      title: "Engineering",
      icon: Settings,
      color: "blue",
      skills: [
        { name: "Production Planning", level: 90 },
        { name: "Process Optimization", level: 85 },
        { name: "Quality Control", level: 95 },
        { name: "Lean Manufacturing", level: 80 },
      ]
    },
    {
      title: "Software Dev",
      icon: Code2,
      color: "emerald",
      skills: [
        { name: "React & TypeScript", level: 88 },
        { name: "JavaScript (ES6+)", level: 92 },
        { name: "Firebase & Firestore", level: 85 },
        { name: "HTML5 & Tailwind CSS", level: 95 },
      ]
    },
    {
      title: "QA & Testing",
      icon: ShieldCheck,
      color: "purple",
      skills: [
        { name: "Manual Testing", level: 98 },
        { name: "Test Case Design", level: 95 },
        { name: "Bug Reporting (Jira)", level: 90 },
        { name: "Quality Assurance", level: 96 },
      ]
    },
    {
      title: "Professional",
      icon: Zap,
      color: "amber",
      skills: [
        { name: "Leadership", level: 85 },
        { name: "Problem Solving", level: 92 },
        { name: "Communication", level: 88 },
        { name: "Team Collaboration", level: 95 },
      ]
    }
  ];

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#F8FAFC] overflow-hidden font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] mb-3"
          >
            My Expertise
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight"
          >
            Skills & Technical Proficiency
          </motion.h3>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1.5 bg-[#2563EB] mx-auto mt-6 rounded-full"
          ></motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 group"
            >
              {/* Category Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                category.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                category.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                category.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                <category.icon size={28} />
              </div>

              <h4 className="text-xl font-[800] text-[#0F172A] mb-8 group-hover:text-[#2563EB] transition-colors">
                {category.title}
              </h4>

              {/* Skills List with Progress Bars */}
              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-slate-300" />
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress Bar Background */}
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      {/* Animated Progress Fill */}
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (sIdx * 0.1) }}
                        className={`h-full rounded-full ${
                          category.color === 'blue' ? 'bg-blue-600' :
                          category.color === 'emerald' ? 'bg-emerald-600' :
                          category.color === 'purple' ? 'bg-purple-600' :
                          'bg-amber-600'
                        }`}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Subtle Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500"
        >
          <div className="flex items-center gap-2 font-bold text-slate-900"><Globe size={20}/> HTML5</div>
          <div className="flex items-center gap-2 font-bold text-slate-900"><Terminal size={20}/> JAVASCRIPT</div>
          <div className="flex items-center gap-2 font-bold text-slate-900"><Cpu size={20}/> REACT</div>
          <div className="flex items-center gap-2 font-bold text-slate-900"><ShieldCheck size={20}/> JIRA</div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;