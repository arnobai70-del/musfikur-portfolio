import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Send, Loader2, MessageSquare, MapPin } from 'lucide-react';
import { db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const messagesRef = collection(db, 'contact_messages');
      await addDoc(messagesRef, {
        fullName: formData.fullName,
        email: formData.email,
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
        createdAt: serverTimestamp(),
      });
      
      toast.success('Message sent! I will get back to you shortly.');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error("Firestore Error:", error);
      toast.error('Submission failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Contact | Musfikur Rahman Arnob</title>
        <meta name="description" content="Get in touch with Musfikur Rahman Arnob for job opportunities, freelance projects, or professional networking." />
      </Helmet>

      <section id="contact" className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center mb-20">
            <h2 className="text-[#2563EB] text-sm font-[800] uppercase tracking-[0.2em] mb-3">Get In Touch</h2>
            <h3 className="text-3xl md:text-5xl font-[800] text-[#0F172A] tracking-tight">Let's Work Together</h3>
            <div className="w-16 h-1.5 bg-[#2563EB] mx-auto mt-6 rounded-full"></div>
            <p className="mt-8 text-[#475569] max-w-2xl mx-auto text-lg font-[400]">
              Have a vision or a challenge? I’m ready to help you build reliable systems and modern digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Professional Inquiry Card */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#0F172A] p-10 rounded-[40px] text-white relative overflow-hidden group shadow-2xl shadow-blue-900/20">
                 {/* Decorative background icon */}
                 <MessageSquare size={200} className="absolute -top-10 -right-10 text-white/5 rotate-12 transition-transform duration-700 group-hover:scale-110" />
                 
                 <div className="relative z-10 space-y-10">
                    <div>
                      <h4 className="text-2xl font-[800] mb-4">Contact Information</h4>
                      <p className="text-slate-400 text-sm leading-relaxed font-[400]">
                        Looking for a SQA Engineer, Production Engineer, or Web Developer? Reach out via the form or email directly.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-5 p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 group/item">
                        <div className="w-12 h-12 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20 group-hover/item:scale-110 transition-transform">
                          <Mail size={22} />
                        </div>
                        <div className="min-w-0 overflow-hidden">
                          <p className="text-white/40 text-[10px] uppercase font-[800] tracking-widest mb-1">Email Me</p>
                          <p className="text-white font-[600] text-sm md:text-base truncate">contact@musfikurrahmanarnob.dev</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-5 p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300 group/item">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover/item:bg-[#2563EB] transition-colors">
                          <MapPin size={22} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white/40 text-[10px] uppercase font-[800] tracking-widest mb-1">Location</p>
                          <p className="text-white font-[600] text-sm md:text-base">Dhaka, Bangladesh</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-white/10">
                      <p className="text-slate-300 leading-relaxed text-sm italic font-[400]">
                        "Quality is not an act, it is a habit. Let’s create something reliable today."
                      </p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right: Premium Form Container */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-[40px] border border-[#E2E8F0] shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div className="space-y-3">
                      <label htmlFor="fullName" className="text-xs font-[800] text-[#0F172A] uppercase tracking-widest block px-1">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Musfikur Rahman"
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-4 rounded-2xl focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all text-sm font-[500] text-[#0F172A]"
                        required
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-3">
                      <label htmlFor="email" className="text-xs font-[800] text-[#0F172A] uppercase tracking-widest block px-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="arnob@example.com"
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-4 rounded-2xl focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all text-sm font-[500] text-[#0F172A]"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-3">
                    <label htmlFor="subject" className="text-xs font-[800] text-[#0F172A] uppercase tracking-widest block px-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Collaboration / Job Opportunity"
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-4 rounded-2xl focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all text-sm font-[500] text-[#0F172A]"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <label htmlFor="message" className="text-xs font-[800] text-[#0F172A] uppercase tracking-widest block px-1">Message Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Share your requirements or message here..."
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-4 rounded-2xl focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all resize-none text-sm font-[500] text-[#0F172A]"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-[#0F172A] text-white py-5 rounded-2xl font-[700] flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-blue-900/10 group ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#2563EB] active:scale-[0.98]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Processing Inquiry...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-[#475569] text-[10px] font-[800] uppercase tracking-[0.15em]">
                     <div className="flex -space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                     </div>
                     Professional Engagement Guaranteed
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;