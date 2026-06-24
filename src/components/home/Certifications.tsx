import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Award, ExternalLink, Calendar, CheckCircle, Loader2, ShieldCheck, Globe, Trophy } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  image: string;
  verificationLink: string;
}

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'certifications'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const certData: Certification[] = [];
        querySnapshot.forEach((doc) => {
          certData.push({ id: doc.id, ...doc.data() } as Certification);
        });
        setCertifications(certData);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Certifications & Credentials | Musfikur Rahman Arnob</title>
        <meta name="description" content="Professional certifications and credentials of Musfikur Rahman Arnob in Engineering, SQA, and Web Development." />
      </Helmet>

      <section id="certifications" className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center mb-20">
            <h2 className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] mb-3">Credentials</h2>
            <h3 className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight">Professional Certifications</h3>
            <div className="w-16 h-1.5 bg-[#2563EB] mx-auto mt-6 rounded-full"></div>
            <p className="mt-8 text-[#475569] max-w-2xl mx-auto text-lg font-[400]">
              A testament to my commitment to continuous learning and excellence across engineering and software development industries.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#2563EB] mb-4" />
              <p className="text-[#475569] font-medium animate-pulse">Fetching credentials...</p>
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[32px] border border-[#E2E8F0] shadow-sm">
              <Award className="mx-auto w-12 h-12 text-[#475569]/30 mb-4" />
              <p className="text-[#475569] font-medium">No certifications showcased at the moment.</p>
            </div>
          ) : (
            /* Certifications Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="bg-white rounded-[32px] overflow-hidden border border-[#E2E8F0] hover:border-[#2563EB]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 group flex flex-col"
                >
                  {/* Certificate Preview/Image */}
                  <div className="relative h-52 overflow-hidden bg-[#0F172A]">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-6 right-6">
                       <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-white/20">
                          <Award size={20} className="text-[#2563EB]" />
                       </div>
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2 text-[#2563EB]">
                        <CheckCircle size={14} className="fill-[#2563EB]/10" />
                        <span className="text-[10px] font-[800] uppercase tracking-widest">Verified Credential</span>
                      </div>
                      
                      <h4 className="text-xl font-[800] text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-tight">
                        {cert.title}
                      </h4>
                      
                      <p className="text-[#475569] font-[700] text-sm flex items-center gap-2">
                        <Globe size={14} className="text-[#E2E8F0]" />
                        {cert.organization}
                      </p>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between pt-6 mt-8 border-t border-[#E2E8F0]">
                      <div className="flex items-center gap-2 text-[#475569] text-xs font-[600]">
                        <Calendar size={14} className="text-[#2563EB]" />
                        {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                      
                      {cert.verificationLink && (
                        <a 
                          href={cert.verificationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#0F172A] font-[800] text-xs hover:text-[#2563EB] transition-colors group/link"
                        >
                          Verify Online
                          <ExternalLink size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Achievement Trust Badges */}
          <div className="mt-20 pt-10 border-t border-[#E2E8F0] flex flex-wrap justify-center gap-10 md:gap-20">
             <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-[800] text-[#0F172A] leading-none">100%</span>
                  <span className="text-[10px] font-[700] uppercase tracking-widest text-[#475569]">Verified</span>
                </div>
             </div>
             <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                  <Trophy size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-[800] text-[#0F172A] leading-none">10+</span>
                  <span className="text-[10px] font-[700] uppercase tracking-widest text-[#475569]">Credentials</span>
                </div>
             </div>
             <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#475569] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                  <Globe size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-[800] text-[#0F172A] leading-none">Global</span>
                  <span className="text-[10px] font-[700] uppercase tracking-widest text-[#475569]">Recognition</span>
                </div>
             </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Certifications;