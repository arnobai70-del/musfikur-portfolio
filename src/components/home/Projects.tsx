import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { motion, Variants } from 'framer-motion';
import { 
  Code2, 
  ExternalLink, 
  Layers, 
  ArrowUpRight,
  Loader2,
  Terminal,
  Globe
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const projectsData: Project[] = [];
        
        querySnapshot.forEach((doc) => {
          projectsData.push({ id: doc.id, ...doc.data() } as Project);
        });
        
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
    <section id="projects" className="py-24 bg-white overflow-hidden font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] mb-3"
            >
              My Portfolio
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight"
            >
              Featured Projects & <br /> <span className="text-[#2563EB]">Technical Solutions</span>
            </motion.h3>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest">
              <Layers size={18} />
              <span>Total Projects: {projects.length}</span>
            </div>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#2563EB] mb-4" />
            <p className="text-slate-500 font-medium tracking-wide">Loading amazing works...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-[#F8FAFC] rounded-[40px] border border-dashed border-slate-200">
            <Code2 size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">No projects found. Check back soon!</p>
          </div>
        ) : (
          /* Projects Grid */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                variants={cardVariants}
                className="group bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Project Image Wrapper */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-[#0F172A] rounded-full hover:bg-[#2563EB] hover:text-white transition-all shadow-lg"
                      >
                        <Globe size={20} />
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-[#0F172A] rounded-full hover:bg-[#2563EB] hover:text-white transition-all shadow-lg"
                      >
                        <Terminal size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 bg-slate-50 text-slate-400 rounded-lg">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-[800] text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors leading-tight">
                    {project.title}
                  </h4>
                  <p className="text-[#475569] text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                    <a 
                      href={project.liveLink || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors"
                    >
                      Live Demo <ArrowUpRight size={16} />
                    </a>
                    <a 
                      href={project.githubLink || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <Code2 size={16} /> Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        {!loading && projects.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <button className="px-10 py-4 bg-[#F8FAFC] text-[#0F172A] border border-slate-200 rounded-2xl font-bold text-sm hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all duration-300 shadow-sm active:scale-95">
              Explore More Case Studies
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;