import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Mail, Lock, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ফায়ারবেস সাইন-ইন
      await signInWithEmailAndPassword(auth, email, password);
      
      toast.success('Successfully logged in to Admin Panel');
      
      // লগইন সফল হলে অ্যাডমিন ড্যাশবোর্ডে রিডাইরেক্ট
      navigate('/admin');
    } catch (error: any) {
      console.error('Login Error:', error.message);
      
      // ভুলের ধরন অনুযায়ী এরর মেসেজ দেখানো
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        toast.error('Invalid email or password. Access Denied.');
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-12">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#2563EB]"></div>
      
      <div className="max-w-md w-full space-y-8">
        {/* Back to Home Button */}
        <div className="text-center md:text-left">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[#475569] hover:text-[#2563EB] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Website
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#E2E8F0] shadow-xl shadow-[#0F172A]/5 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2563EB]/10 text-[#2563EB] rounded-2xl mb-4">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0F172A]">Admin Login</h2>
            <p className="text-[#475569] text-sm mt-2 font-medium italic">
              "Restricted area for Musfikur Rahman Arnob only"
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest block px-1">
                Authorized Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#475569] group-focus-within:text-[#2563EB] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all text-sm font-medium"
                  placeholder="admin@musfikurrahmanarnob.dev"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-[#0F172A] uppercase tracking-widest block px-1">
                Secure Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#475569] group-focus-within:text-[#2563EB] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/5 transition-all text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#0F172A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-[#0F172A]/10 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#2563EB] active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-[#F8FAFC] flex items-center justify-center gap-2 text-[#475569] text-[10px] font-bold uppercase tracking-tighter">
            <AlertCircle size={14} className="text-amber-500" />
            Unauthorized attempts are logged and monitored
          </div>
        </div>

        {/* Brand Footer */}
        <p className="text-center text-[#475569] text-xs font-medium">
          © 2026 Musfikur Rahman Arnob. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;