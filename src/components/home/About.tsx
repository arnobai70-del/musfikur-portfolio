import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Target, 
  Award, 
  Briefcase, 
  Rocket 
} from 'lucide-react';

const About: React.FC = () => {
  
  // Animation Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const stats = [
    { label: 'Years Experience', value: '02+', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Projects Completed', value: '20+', icon: Rocket, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Certifications', value: '10+', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Visual Element & Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden border-[12px] border-slate-50 shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dkpju3m8n/image/upload/v1782354341/WhatsApp_Image_2026-06-25_at_8.25.13_AM_iwq7gc.jpg" 
                alt="About Musfikur Rahman Arnob" 
                className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-slate-100 rounded-full -z-10"></div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="space-y-10">
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] flex items-center gap-2">
                <User size={16} /> About Me
              </h2>
              <h3 className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight leading-tight">
                Engineering Excellence with <br /> 
                <span className="text-[#2563EB]">Digital Innovation</span>
              </h3>
              <div className="w-20 h-1.5 bg-[#2563EB] rounded-full"></div>
            </motion.div>

            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-[#475569] text-lg leading-relaxed">
                Hello! I'm <span className="font-bold text-[#0F172A]">Musfikur Rahman Arnob</span>, a multi-disciplinary professional blending the worlds of 
                <span className="text-[#2563EB] font-semibold"> Industrial Production Engineering</span>, 
                <span className="text-[#2563EB] font-semibold"> Software Quality Assurance</span>, and 
                <span className="text-[#2563EB] font-semibold"> Web Development</span>.
              </p>
              
              <p className="text-[#475569] leading-relaxed">
                With a solid background in Production Engineering, I have a keen eye for process optimization and system reliability. My transition into SQA and Web Development allowed me to apply engineering principles to digital products, ensuring they are not only functional but also built to the highest quality standards.
              </p>
            </motion.div>

            {/* Educational & Goal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 bg-[#F8FAFC] rounded-3xl border border-slate-100 space-y-3 group hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                  <GraduationCap size={24} />
                </div>
                <h4 className="font-[800] text-[#0F172A]">Education</h4>
                <p className="text-sm text-[#475569] leading-relaxed">
                  B.Sc. in Industrial & Production Engineering (IPE) - focused on process efficiency.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 bg-[#F8FAFC] rounded-3xl border border-slate-100 space-y-3 group hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                  <Target size={24} />
                </div>
                <h4 className="font-[800] text-[#0F172A]">Career Goals</h4>
                <p className="text-sm text-[#475569] leading-relaxed">
                  To lead engineering teams in developing robust, optimized, and high-quality software systems.
                </p>
              </motion.div>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center md:text-left"
                >
                  <h5 className="text-2xl md:text-3xl font-[800] text-[#0F172A]">{stat.value}</h5>
                  <p className="text-[10px] md:text-xs font-bold text-[#475569] uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;