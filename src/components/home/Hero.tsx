import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Settings, ShieldCheck, Code, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  // Function to scroll to contact section
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation Variants with explicit TypeScript types
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.3 
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 bg-white overflow-hidden">
      {/* Background Subtle Gradient Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-slate-50 rounded-full blur-[100px] opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Availability Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-blue-700 text-xs font-extrabold uppercase tracking-widest">
                Available for opportunities
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-[800] text-[#0F172A] tracking-tighter leading-[1.1]">
                Musfikur <br /> Rahman <br />
                <span className="text-[#2563EB]">Arnob</span>
              </h1>
            </motion.div>

            {/* Professional Titles with Icons */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-[#475569] font-semibold">
                  <Settings size={18} className="text-[#2563EB]" />
                  <span>Production Engineer</span>
                </div>
                <div className="flex items-center gap-2 text-[#475569] font-semibold">
                  <ShieldCheck size={18} className="text-[#2563EB]" />
                  <span>SQA Engineer</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#475569] font-semibold">
                <Code size={18} className="text-[#2563EB]" />
                <span>Web Developer</span>
              </div>
            </motion.div>

            {/* Tagline Paragraph */}
            <motion.p variants={itemVariants} className="text-[#475569] text-lg leading-relaxed max-w-lg">
              I build reliable systems, optimize processes, and create modern digital experiences through engineering, quality assurance, and web development.
            </motion.p>

            {/* Single CTA Button - Hire Me */}
            <motion.div variants={itemVariants} className="pt-4">
              <button 
                onClick={scrollToContact}
                className="bg-[#0F172A] text-white px-10 py-5 rounded-2xl font-[800] text-sm hover:bg-[#2563EB] transition-all duration-300 shadow-2xl shadow-blue-900/20 flex items-center gap-3 group active:scale-95"
              >
                Hire Me
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Quick Stats Section */}
            <motion.div variants={itemVariants} className="pt-10 flex flex-wrap items-center gap-12 border-t border-slate-100">
              <div className="space-y-1">
                <h3 className="text-3xl font-[800] text-[#0F172A]">02+</h3>
                <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest">Years Exp.</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-[800] text-[#0F172A]">20+</h3>
                <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest">Projects</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-[800] text-[#0F172A]">10+</h3>
                <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest">Certifications</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Column (Image Area) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Animated Decorative Shapes */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[80%] h-[80%] border border-blue-100 rounded-[60px] rotate-6 animate-pulse"></div>
              <div className="w-[85%] h-[85%] border border-slate-100 rounded-[60px] -rotate-3"></div>
            </div>

            {/* Profile Image Container */}
            <div className="relative w-full max-w-[400px] aspect-[4/5] bg-[#F8FAFC] rounded-[60px] border border-slate-100 shadow-inner overflow-hidden group">
              <img 
                src="https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg" 
                alt="Musfikur Rahman Arnob" 
                className="w-full h-full object-cover filter saturate-[0.8] group-hover:saturate-[1.1] transition-all duration-700"
              />
              
              {/* Floating Badge 1: Production Eng. */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-20 -right-4 md:-right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Settings size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Process</p>
                  <p className="text-sm font-extrabold text-slate-900 leading-none">Production Eng.</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: SQA Engineer */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-16 -left-4 md:-left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Specialist</p>
                  <p className="text-sm font-extrabold text-slate-900 leading-none">SQA Engineer</p>
                </div>
              </motion.div>
            </div>

            {/* Verification/Trust Indicator */}
            <div className="absolute -bottom-6 right-10 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-50 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#2563EB]" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Top Rated Talent</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;