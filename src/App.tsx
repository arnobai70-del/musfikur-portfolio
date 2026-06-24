import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import { useAuthStore } from './store/authStore';

// Layouts & Pages
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import Login from './pages/Login';

// Scroll to Top Helper Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Component (Corporate Design)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FFFFFF]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#2563EB]/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#2563EB] rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-[#0F172A] font-[700] uppercase text-[10px] tracking-[0.3em] animate-pulse">
          Securing Environment
        </p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  // Initialize Firebase Auth Listener
  useAuth();

  const { loading } = useAuthStore();
  const location = useLocation();

  // Route specific logic
  const isAdminPath = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  // Global Loading State for Initial Auth Check
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FFFFFF]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-[3px] border-[#F8FAFC] border-t-[#2563EB] rounded-full animate-spin"></div>
          <div className="mt-4 text-[#0F172A] font-[800] text-lg tracking-tighter">
            MusfikurRahmanArnob<span className="text-[#2563EB]">.dev</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] font-inter">
      {/* Dynamic SEO Head */}
      <Helmet>
        <title>Musfikur Rahman Arnob | Production Engineer, SQA & Developer</title>
        <meta name="description" content="Professional portfolio of Musfikur Rahman Arnob. Specialized in Production Engineering, Quality Assurance, and modern Web Development." />
        <meta property="og:title" content="Musfikur Rahman Arnob | Portfolio" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Helmet>

      {/* Global Notifications Provider */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#2563EB',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      {/* Helper to reset scroll on route change */}
      <ScrollToTop />

      {/* Conditional Header Navigation */}
      {!isAdminPath && !isLoginPage && <Navbar />}

      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          {/* Public Main Route */}
          <Route path="/" element={<Home />} />
          
          {/* Authentication Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin Dashboard & Management (Protected) */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            } 
          />

          {/* Fallback for undefined routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Conditional Footer Navigation */}
      {!isAdminPath && !isLoginPage && <Footer />}
    </div>
  );
}

export default App;