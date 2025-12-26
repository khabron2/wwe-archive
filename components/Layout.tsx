
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mainContainer = document.getElementById('main-content');
    const handleScroll = () => {
      setScrolled((mainContainer?.scrollTop || 0) > 50);
    };
    mainContainer?.addEventListener('scroll', handleScroll);
    return () => mainContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden text-slate-100 font-sans">
      {/* Side Menu (Apple TV Style Drawer) */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-20 md:w-24 bg-[#0a0a0a]/95 border-r border-white/5 flex flex-col items-center py-10 transition-transform duration-500
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <Link to="/" className="mb-12 group">
          <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center font-black text-2xl italic shadow-lg shadow-violet-900/40 transition-tv group-hover:scale-110">W</div>
        </Link>
        
        <nav className="flex-1 space-y-8 flex flex-col items-center">
          <Link to="/" title="Archive Feed" className={`p-4 rounded-2xl transition-tv focus-ring ${location.pathname === '/' ? 'text-white bg-white/10' : 'text-slate-500 hover:text-white'}`}>
             <span className="text-2xl">📅</span>
          </Link>
          <Link to="/favorites" title="My List" className={`p-4 rounded-2xl transition-tv focus-ring ${location.pathname === '/favorites' ? 'text-white bg-white/10' : 'text-slate-500 hover:text-white'}`}>
             <span className="text-2xl">⭐</span>
          </Link>
        </nav>

        <div className="mt-auto">
          <button className="p-4 text-slate-500 hover:text-white transition-tv focus-ring rounded-2xl">
            <span className="text-2xl">⚙️</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main id="main-content" className="flex-1 overflow-y-auto relative md:ml-24">
        {/* Top Bar */}
        <header className={`
          fixed top-0 right-0 left-0 md:left-24 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-300
          ${scrolled ? 'apple-glass py-4 shadow-2xl' : 'bg-transparent'}
        `}>
          <div className="flex items-center gap-8">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
              <span className="text-2xl">☰</span>
            </button>
            <div className="flex items-center gap-6 hidden sm:flex">
              <Link to="/" className="text-sm font-bold tracking-widest text-slate-300 hover:text-white transition-colors uppercase">Chronological Vault</Link>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-10 relative">
            <input 
              type="text" 
              placeholder="Search moments, matches, dates..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-6 text-sm focus:bg-white/10 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-5">
            <span className="text-xs font-black italic tracking-tighter text-slate-500 hidden lg:block uppercase">Live Stream Connected</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-[2px]">
              <div className="w-full h-full bg-black rounded-full overflow-hidden border-2 border-black">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=wwe" alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="min-h-screen">
          {children}
        </div>

        <footer className="py-20 text-center opacity-20 hover:opacity-100 transition-opacity">
           <p className="text-xs font-bold uppercase tracking-[0.5em]">WWE Network Replica • 2024</p>
        </footer>
      </main>
    </div>
  );
};
