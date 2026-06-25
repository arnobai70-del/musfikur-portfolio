import React from 'react';
import { Outlet } from 'react-router-dom';

// এখন ফাইলগুলো components ফোল্ডারে থাকায় এই পাথ ১০০% কাজ করবে
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-['Inter']">
      {/* Header / Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-20 md:pt-24">
        <Outlet />
      </main>

      {/* Footer Area */}
      <Footer />
    </div>
  );
};

export default Layout;