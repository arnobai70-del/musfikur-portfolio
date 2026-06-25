import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  User
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  review: string;
  rating: number;
  image: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch Testimonials from Firestore
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data: Testimonial[] = [];
        
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Testimonial);
        });
        
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Helper for actual fetch call if function name mismatch
  const fetchProjects = async () => {
     try {
        const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data: Testimonial[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Testimonial);
        });
        setTestimonials(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  // Slider Navigation
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play slider (Optional)
  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(nextTestimonial, 6000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] mb-3"
          >
            Testimonials
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight"
          >
            What Clients <span className="text-[#2563EB]">Say About Me</span>
          </motion.h3>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1.5 bg-[#2563EB] mx-auto mt-6 rounded-full"
          ></motion.div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#2563EB] mb-4" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-10 text-slate-400 font-medium">No testimonials yet. Your review could be the first!</div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            {/* Quote Icon Background */}
            <div className="absolute -top-10 -left-10 text-slate-50 opacity-10">
              <Quote size={180} />
            </div>

            {/* Slider Content */}
            <div className="relative z-10 min-h-[400px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonials[currentIndex].id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full bg-white p-10 md:p-16 rounded-[48px] border border-slate-100 shadow-2xl shadow-blue-900/5 text-center"
                >
                  {/* Client Image */}
                  <div className="relative inline-block mb-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-50 mx-auto">
                      {testimonials[currentIndex].image ? (
                        <img 
                          src={testimonials[currentIndex].image} 
                          alt={testimonials[currentIndex].name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <User size={40} />
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                      <Quote size={14} fill="white" />
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xl md:text-2xl text-[#475569] leading-relaxed italic mb-8 font-medium">
                    "{testimonials[currentIndex].review}"
                  </p>

                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className={i < testimonials[currentIndex].rating ? "text-amber-400 fill-amber-400" : "text-slate-200"} 
                      />
                    ))}
                  </div>

                  {/* Client Info */}
                  <h4 className="text-xl font-[800] text-[#0F172A] mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm font-bold text-[#2563EB] uppercase tracking-widest">
                    {testimonials[currentIndex].position}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-6 mt-12">
              <button 
                onClick={prevTestimonial}
                className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all shadow-sm active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Slider Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-8 bg-[#2563EB]" : "w-2 bg-slate-200"
                    }`}
                  ></button>
                ))}
              </div>

              <button 
                onClick={nextTestimonial}
                className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-[#0F172A] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all shadow-sm active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;