import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Quote, Star, Loader2, User, CheckCircle } from 'lucide-react';

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

    fetchTestimonials();
  }, []);

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Testimonials | Musfikur Rahman Arnob</title>
        <meta name="description" content="What clients and colleagues say about Musfikur Rahman Arnob's professional work in Engineering, SQA, and Web Development." />
      </Helmet>

      <section id="testimonials" className="py-24 bg-[#FFFFFF] relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 text-[#F8FAFC] pointer-events-none select-none">
          <Quote size={400} strokeWidth={1} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center mb-20">
            <h2 className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] mb-3">Testimonials</h2>
            <h3 className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight">Client Feedbacks</h3>
            <div className="w-16 h-1.5 bg-[#2563EB] mx-auto mt-6 rounded-full"></div>
            <p className="mt-8 text-[#475569] max-w-2xl mx-auto text-lg font-[400]">
              Collaborating with professionals across various industries to deliver excellence in every project.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#2563EB] mb-4" />
              <p className="text-[#475569] font-medium animate-pulse">Loading reviews...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20 bg-[#F8FAFC] rounded-[40px] border border-[#E2E8F0]">
              <User className="mx-auto w-12 h-12 text-[#475569]/30 mb-4" />
              <p className="text-[#475569] font-medium">No testimonials available yet.</p>
            </div>
          ) : (
            /* Testimonials Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#F8FAFC] p-10 rounded-[40px] border border-[#E2E8F0] hover:border-[#2563EB]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 group flex flex-col"
                >
                  <div className="flex-1 space-y-6">
                    {/* Stars & Icon */}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={`${i < item.rating ? 'text-[#2563EB] fill-[#2563EB]' : 'text-[#E2E8F0]'}`} 
                          />
                        ))}
                      </div>
                      <Quote size={24} className="text-[#2563EB]/20 group-hover:text-[#2563EB]/40 transition-colors" />
                    </div>

                    {/* Review Text */}
                    <p className="text-[#475569] text-base leading-relaxed italic font-[400]">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Profile Section */}
                  <div className="flex items-center gap-4 pt-10 mt-10 border-t border-[#E2E8F0]">
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-500">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-[#2563EB] text-white p-1 rounded-lg shadow-lg">
                        <CheckCircle size={10} />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-[#0F172A] font-[800] text-base leading-none mb-1 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[#475569] text-[10px] font-[700] uppercase tracking-[0.1em] truncate">
                        {item.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Trust Banner */}
          <div className="mt-24 text-center">
              <div className="inline-flex items-center gap-4 px-8 py-3 bg-white rounded-full border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all">
                  <div className="flex -space-x-3 overflow-hidden">
                      {testimonials.slice(0, 3).map((t) => (
                          <img key={t.id} src={t.image} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="client" />
                      ))}
                  </div>
                  <p className="text-[11px] font-[800] text-[#475569] uppercase tracking-[0.1em]">
                      Trusted by <span className="text-[#2563EB]">Global Professionals</span>
                  </p>
              </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Testimonials;