import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, getCountFromServer, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';
import { 
  Layout, 
  Award, 
  Users, 
  Mail, 
  ArrowRight, 
  Plus, 
  MessageSquare, 
  Briefcase,
  Loader2,
  Calendar
} from 'lucide-react';

interface Stats {
  projects: number;
  certifications: number;
  testimonials: number;
  messages: number;
}

interface RecentMessage {
  id: string;
  fullName: string;
  subject: string;
  createdAt: Timestamp | null;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    certifications: 0,
    testimonials: 0,
    messages: 0
  });
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch Counts (Optimized using getCountFromServer)
        const projectsSnap = await getCountFromServer(collection(db, 'projects'));
        const certsSnap = await getCountFromServer(collection(db, 'certifications'));
        const testimonialsSnap = await getCountFromServer(collection(db, 'testimonials'));
        const messagesSnap = await getCountFromServer(collection(db, 'contact_messages'));

        setStats({
          projects: projectsSnap.data().count,
          certifications: certsSnap.data().count,
          testimonials: testimonialsSnap.data().count,
          messages: messagesSnap.data().count
        });

        // Fetch Recent 3 Messages
        const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        const msgs: RecentMessage[] = [];
        querySnapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() } as RecentMessage);
        });
        setRecentMessages(msgs);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-500 font-medium">Loading Dashboard Overview...</p>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Projects', count: stats.projects, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', link: '/admin/projects' },
    { label: 'Certifications', count: stats.certifications, icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/admin/certifications' },
    { label: 'Testimonials', count: stats.testimonials, icon: Users, color: 'text-amber-600', bg: 'bg-amber-50', link: '/admin/testimonials' },
    { label: 'Messages', count: stats.messages, icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50', link: '/admin/messages' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">Welcome Back, Arnob!</h1>
          <p className="text-slate-400 mt-2 max-w-md">
            Here's what's happening with your portfolio today. You have {stats.messages} inquiries to review.
          </p>
          <div className="flex gap-3 mt-6">
            <Link to="/admin/projects" className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all">
              <Plus className="w-4 h-4 mr-2" /> New Project
            </Link>
            <Link to="/admin/messages" className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-all backdrop-blur-sm">
              View Messages
            </Link>
          </div>
        </div>
        <Layout className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link key={index} to={card.link} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <span className="text-slate-300 group-hover:text-blue-500 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{card.label}</h3>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{card.count}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Recent Inquiries
            </h2>
            <Link to="/admin/messages" className="text-sm font-bold text-blue-600 hover:underline">
              See All
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentMessages.length === 0 ? (
              <div className="p-10 text-center text-slate-500">No recent messages.</div>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900">{msg.fullName}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium line-clamp-1 mb-1">{msg.subject}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-lg shadow-blue-200">
            <h3 className="font-bold text-lg mb-2">Portfolio Tip</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Keep your certifications updated! Recruiters love to see continuous learning and upskilling in your profile.
            </p>
            <Link to="/admin/certifications" className="inline-flex items-center mt-4 text-sm font-bold text-white hover:gap-2 transition-all">
              Update Now <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/admin/projects" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 text-sm font-medium border border-transparent hover:border-slate-100">
                <Briefcase className="w-4 h-4 text-blue-600" /> Manage Projects
              </Link>
              <Link to="/admin/testimonials" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 text-sm font-medium border border-transparent hover:border-slate-100">
                <Users className="w-4 h-4 text-amber-600" /> Review Testimonials
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;