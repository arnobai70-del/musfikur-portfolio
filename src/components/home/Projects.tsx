import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ExternalLink, Code2, Layout, Loader2 } from 'lucide-react';

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

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Portfolio & Projects | Musfikur Rahman Arnob</title>
        <meta name="description" content="Explore the professional projects of Musfikur Rahman Arnob, ranging from web development to engineering optimization tools." />
      </Helmet>

      <section id="projects" className="py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <h2 className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em]">Portfolio</h2>
              <h3 className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight">Featured Projects</h3>
              <div className="w-16 h-1.5 bg-[#2563EB] rounded-full"></div>
            </div>
            <p className="text-[#475569] max-w-md text-lg font-[400] leading-relaxed">
              A curated selection of my work across software development and engineering, focused on quality and performance.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#2563EB] mb-4" />
              <p className="text-[#475569] font-medium animate-pulse">Loading amazing projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 bg-[#F8FAFC] rounded-[32px] border border-[#E2E8F0]">
              <Layout className="mx-auto w-12 h-12 text-[#475569]/30 mb-4" />
              <p className="text-[#475569] font-medium">No projects available at the moment.</p>
            </div>
          ) : (
            /* Projects Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="group bg-[#F8FAFC] rounded-[32px] overflow-hidden border border-[#E2E8F0] hover:border-[#2563EB]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 flex flex-col"
                >
                  {/* Project Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    
                    {/* Floating Category/Label (Optional based on data) */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md text-[#0F172A] px-4 py-1.5 rounded-full text-[10px] font-[800] uppercase tracking-wider shadow-sm border border-[#E2E8F0]">
                        Project Case
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex-1 space-y-4">
                      <h4 className="text-2xl font-[800] text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-300">
                        {project.title}
                      </h4>
                      <p className="text-[#475569] text-sm leading-relaxed font-[400] line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-[10px] font-[700] text-[#2563EB] bg-[#2563EB]/5 border border-[#2563EB]/10 px-3 py-1 rounded-lg uppercase tracking-wide"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links/Actions */}
                    <div className="flex items-center gap-4 pt-8 mt-8 border-t border-[#E2E8F0]">
                      {project.liveLink && (
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-[#0F172A] text-white py-3 rounded-xl text-sm font-[700] hover:bg-[#2563EB] transition-all shadow-lg shadow-blue-900/10 active:scale-95"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] text-[#0F172A] py-3 rounded-xl text-sm font-[700] hover:border-[#2563EB] hover:text-[#2563EB] transition-all active:scale-95"
                        >
                          <Code2 size={16} />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;