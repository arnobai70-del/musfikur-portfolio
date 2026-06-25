import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { motion, Variants } from 'framer-motion';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  ShieldCheck, 
  Loader2,
  Medal
} from 'lucide-react';

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

  // Fetch Certifications from Firestore
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

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section id="certifications" className="py-24 bg-[#F8FAFC] overflow-hidden font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] mb-3"
          >
            <Award size={18} />
            <span>Achievements</span>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight"
          >
            Certifications & <br /> <span className="text-[#2563EB]">Professional Credentials</span>
          </motion.h3>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1.5 bg-[#2563EB] mx-auto mt-6 rounded-full"
          ></motion.div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#2563EB] mb-4" />
            <p className="text-slate-500 font-medium">Fetching credentials...</p>
          </div>
        ) : certifications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
            <Medal size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">No certifications displayed yet.</p>
          </div>
        ) : (
          /* Certifications Grid */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {certifications.map((cert) => (
              <motion.div 
                key={cert.id}
                variants={cardVariants}
                className="bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group h-full"
              >
                {/* Certificate Image Wrapper */}
                <div className="relative h-52 overflow-hidden bg-slate-50 p-4">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0F172A]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute top-6 right-6 p-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white text-blue-600">
                    <ShieldCheck size={20} />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 pt-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#2563EB] uppercase tracking-widest mb-3 bg-blue-50 w-fit px-3 py-1 rounded-lg">
                    <Calendar size={12} />
                    {cert.issueDate}
                  </div>

                  <h4 className="text-xl font-[800] text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors leading-tight">
                    {cert.title}
                  </h4>
                  
                  <p className="text-sm font-bold text-slate-500 mb-6 flex items-center gap-1.5">
                    <Award size={14} className="text-slate-300" />
                    {cert.organization}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50">
                    {cert.verificationLink ? (
                      <a 
                        href={cert.verificationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full text-sm font-bold text-slate-700 hover:text-[#2563EB] transition-all group/btn"
                      >
                        Verify Credential
                        <div className="p-2 rounded-full bg-slate-50 group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all">
                          <ExternalLink size={14} />
                        </div>
                      </a>
                    ) : (
                      <span className="text-xs font-bold text-slate-300 uppercase italic">Digital Badge Only</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Certifications;