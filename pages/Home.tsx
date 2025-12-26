
import React from 'react';
import { RAW_CONTENT, PPV_CONTENT } from '../data';
import { ContentCard } from '../components/Cards';
import { Link } from 'react-router-dom';

const Row = ({ title, items }: { title: string, items: any[] }) => (
    <section className="mb-12">
      <div className="flex items-center justify-between px-6 md:px-12 mb-5">
        <h3 className="text-xl font-heading font-black italic uppercase tracking-tight text-white/90">{title}</h3>
      </div>
      <div className="flex gap-4 overflow-x-auto px-6 md:px-12 pb-6 hide-scrollbar scroll-smooth">
        {items.map(item => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
);

export const Home: React.FC = () => {
  const currentPPVs = PPV_CONTENT.find(y => y.year === 2024)?.ppvs.slice(0, 10) || [];
  const attitudeRaw = RAW_CONTENT.find(y => y.year === 2000)?.episodes.slice(0, 10) || [];
  const legacyPPVs = PPV_CONTENT.find(y => y.year === 2005)?.ppvs.slice(0, 10) || [];

  return (
    <div className="animate-fade-in">
      {/* Immersive Cinematic Hero */}
      <section className="relative h-[85vh] flex flex-col justify-end pb-32 px-6 md:px-12">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1599411982361-9f939768600d?auto=format&fit=crop&q=80&w=1600&h=900" 
            alt="WWE Arena" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 netflix-gradient" />
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-red-600 px-3 py-1 rounded text-[10px] font-black italic">ULTRA HD</span>
             <span className="text-violet-400 font-black tracking-widest text-sm uppercase">Legacy Vault</span>
          </div>
          <h1 className="text-6xl md:text-[100px] font-heading font-black italic uppercase leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl">
            ENTER THE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-amber-500">SQUARED CIRCLE</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-2xl font-medium max-w-2xl mb-12 leading-relaxed opacity-80">
            From the Attitude Era to the present day. Re-live the most iconic matches, legends, and championships that defined the sport.
          </p>
          <div className="flex gap-4">
            <Link to="/browse" className="bg-white text-black font-black px-12 py-5 rounded-2xl transition-tv hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3 uppercase text-sm tracking-widest">
              <span>▶ Play Archive</span>
            </Link>
            <Link to="/favorites" className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-black px-12 py-5 rounded-2xl transition-tv hover:bg-white/20 uppercase text-sm tracking-widest">
              My Watchlist
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid Rows */}
      <div className="-mt-32 relative z-20">
        <Row title="Major PPV Events 2024" items={currentPPVs} />
        <Row title="Attitude Era: RAW 2000" items={attitudeRaw} />
        <Row title="Ruthless Aggression Classics" items={legacyPPVs} />
      </div>
    </div>
  );
};
