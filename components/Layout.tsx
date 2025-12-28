
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f1ed] text-[#1a1a1a]">
      {/* Top Navigation - Minimalist Style from Screenshot */}
      <header className={`
        fixed top-0 inset-x-0 z-[100] px-6 py-4 flex items-center justify-between transition-all duration-300
        ${scrolled ? 'apple-glass border-b border-black/5' : 'bg-transparent'}
      `}>
        <div className="flex items-center gap-4">
          <button className="text-xl p-2 hover:bg-black/5 rounded-full transition-colors">
            <span className="text-2xl">≡</span>
          </button>
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-black tracking-tighter text-[#e50914] italic uppercase">WWE ARCHIVE</h1>
        </Link>

        <div className="flex items-center gap-4">
          <button className="text-xl p-2 hover:bg-black/5 rounded-full transition-colors">
            <span className="text-xl">🔍</span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-black/5">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=wwe" alt="User" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1200px] mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden">
        {children}
      </main>

      {/* Mobile-Style Bottom Nav (Optional for desktop but fits the capture vibe) */}
      <div className="fixed bottom-0 inset-x-0 h-16 bg-white/80 backdrop-blur-xl border-t border-black/5 flex items-center justify-around z-50 md:hidden">
        <Link to="/" className={`p-2 ${location.pathname === '/' ? 'text-[#e50914]' : 'text-gray-400'}`}>🏠</Link>
        <Link to="/favorites" className={`p-2 ${location.pathname === '/favorites' ? 'text-[#e50914]' : 'text-gray-400'}`}>❤️</Link>
        <div className="p-2 text-gray-400">👤</div>
      </div>
    </div>
  );
};