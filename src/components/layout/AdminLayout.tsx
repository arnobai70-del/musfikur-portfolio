import React, { useState } from 'react';
import { NavLink, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import { 
  LayoutDashboard, 
  Briefcase, 
  Award, 
  MessageSquare, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  User,
  ExternalLink,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';

// Admin Pages
import Messages from '../../pages/admin/Messages';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} />, end: true },
    { name: 'Manage Projects', path: '/admin/projects', icon: <Briefcase size={20} /> },
    { name: 'Certifications', path: '/admin/certifications', icon: <Award size={20} /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <Star size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'Legal Pages', path: '/admin/legal', icon: <FileText size={20} /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0F172A]/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0F172A] text-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-extrabold tracking-tighter">
                Arnob<span className="text-[#2563EB]">.Admin</span>
              </h1>
              <button onClick={toggleSidebar} className="lg:hidden text-white/70 hover:text-white">
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all duration-200
                  ${isActive 
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/20' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'}
                `}
              >
                {item.icon}
                <span className="text-sm uppercase tracking-wider">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <a 
              href="/" 
              target="_blank" 
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-white/60 hover:bg-white/5 hover:text-white transition-all text-sm uppercase tracking-wider"
            >
              <ExternalLink size={20} />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-sm uppercase tracking-wider"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-[#475569] hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-[#0F172A] font-extrabold text-lg hidden md:block">
              Control Panel
            </h2>
          </div>

          {/* User Profile Info */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-extrabold text-[#0F172A] leading-none">
                {user?.displayName || 'Musfikur Rahman'}
              </p>
              <p className="text-[10px] text-[#2563EB] font-bold uppercase tracking-widest mt-1">
                Super Admin
              </p>
            </div>
            <div className="w-10 h-10 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-center text-[#2563EB]">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[#F8FAFC]">
          <Routes>
            <Route path="/" element={<div className="font-bold text-[#475569]">Welcome to your Dashboard. Overview stats coming soon...</div>} />
            <Route path="/projects" element={<div className="font-bold text-[#475569]">Project Management page is being developed...</div>} />
            <Route path="/certifications" element={<div className="font-bold text-[#475569]">Certifications Management page is being developed...</div>} />
            <Route path="/testimonials" element={<div className="font-bold text-[#475569]">Testimonials Management page is being developed...</div>} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/legal" element={<div className="font-bold text-[#475569]">Legal Pages Management is being developed...</div>} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;