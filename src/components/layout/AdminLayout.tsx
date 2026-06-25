import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Award, 
  MessageSquare, 
  Users, 
  FileText, 
  LogOut, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

// Admin Pages Import
import Dashboard from '../../pages/admin/Dashboard';
import ProjectsManagement from '../../pages/admin/ProjectsManagement';
import CertificationsManagement from '../../pages/admin/Certifications';
import TestimonialsManagement from '../../pages/admin/Testimonials';
import Messages from '../../pages/admin/Messages';
import LegalPagesManagement from '../../pages/admin/LegalPagesManagement';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  // 💡 এখানে পাথগুলো আপডেট করে '/admin/...' করে দেওয়া হয়েছে
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Certifications', path: '/admin/certifications', icon: Award },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Users },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Legal Pages', path: '/admin/legal', icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col fixed inset-y-0 shadow-2xl z-50">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center font-bold">A</div>
            <h1 className="text-xl font-[800] tracking-tighter">
              Arnob<span className="text-[#2563EB]">.Admin</span>
            </h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'} // 💡 এখানে কন্ডিশন আপডেট করা হয়েছে
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                  ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">{item.name}</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-[#2563EB] transition-colors text-sm font-bold uppercase"
          >
            <ExternalLink size={20} />
            Visit Website
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-bold uppercase"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-slate-800 font-[800] text-lg uppercase tracking-widest">
            Control Panel
          </h2>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter leading-none">Administrator</p>
                <p className="text-sm font-[800] text-slate-800">Musfikur Rahman</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600">
                M
             </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-8">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsManagement />} />
            <Route path="certifications" element={<CertificationsManagement />} />
            <Route path="testimonials" element={<TestimonialsManagement />} />
            <Route path="messages" element={<Messages />} />
            <Route path="legal" element={<LegalPagesManagement />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;