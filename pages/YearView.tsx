
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ALL_YEARS, RAW_CONTENT, SMACKDOWN_CONTENT, PPV_CONTENT } from '../data';
import { ContentCard } from '../components/Cards';
import { Episode, PPV } from '../types';
import { useApp } from '../store';

const STORAGE_KEY_YEAR = 'wwe_archive_selected_year';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface MonthSectionProps {
  monthName: string;
  items: (Episode | PPV)[];
}

const MonthSection: React.FC<MonthSectionProps> = ({ monthName, items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mb-14 px-6 relative group/row animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-baseline gap-3">
            <h3 className="text-2xl font-black tracking-tighter text-[#1a1a1a] uppercase italic">{monthName}</h3>
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">{items.length} EPISODES</span>
        </div>
        <div className="h-px flex-1 bg-gray-100/50 mx-6"></div>
      </div>

      <div className="relative">
        {/* Navigation Arrows for Mouse Users */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:scale-110 active:scale-95 text-xl font-bold border border-gray-100"
        >
          ‹
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:scale-110 active:scale-95 text-xl font-bold border border-gray-100"
        >
          ›
        </button>

        <div 
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto pb-8 pt-2 px-2 hide-scrollbar snap-carousel"
        >
          {items.map(item => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const YearView: React.FC = () => {
  const { playVideo } = useApp();
  const [selectedYear, setSelectedYear] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_YEAR);
    return saved ? parseInt(saved, 10) : 2000;
  });

  const chronologicalArchive = useMemo(() => {
    const raw = RAW_CONTENT.find(y => y.year === selectedYear)?.episodes || [];
    const sd = SMACKDOWN_CONTENT.find(y => y.year === selectedYear)?.episodes || [];
    const ppvs = PPV_CONTENT.find(y => y.year === selectedYear)?.ppvs || [];

    const allItems: (Episode | PPV)[] = [...raw, ...sd, ...ppvs];

    const sortedItems = allItems.sort((a, b) => {
      const dateA = new Date(a.date.replace(/\./g, '-')).getTime();
      const dateB = new Date(b.date.replace(/\./g, '-')).getTime();
      return dateA - dateB;
    });

    const grouped: Record<number, (Episode | PPV)[]> = {};
    sortedItems.forEach(item => {
      const date = new Date(item.date.replace(/\./g, '-'));
      if (!isNaN(date.getTime())) {
        const month = date.getMonth();
        if (!grouped[month]) grouped[month] = [];
        grouped[month].push(item);
      }
    });

    return grouped;
  }, [selectedYear]);

  const featuredItem = useMemo(() => {
    for (let i = 0; i < 12; i++) {
      if (chronologicalArchive[i] && chronologicalArchive[i].length > 0) {
        return chronologicalArchive[i][0];
      }
    }
    return null;
  }, [chronologicalArchive]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_YEAR, selectedYear.toString());
  }, [selectedYear]);

  return (
    <div className="animate-fade-in pb-24 bg-white">
      {/* Dynamic Hero Section - Large Format for TV */}
      <div className="relative mb-10">
        <div className="h-[520px] relative overflow-hidden hero-curved-mask shadow-2xl">
          <img 
            src={featuredItem?.thumbnail || 'https://image.tmdb.org/t/p/original/vxqChitYWBi8zyF8p50j69OtNhY.jpg'} 
            className="w-full h-full object-cover object-[center_15%] transition-transform duration-1000 hover:scale-105" 
            alt="Featured Content"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30"></div>
          
          <div className="absolute top-24 inset-x-10 flex justify-between z-20">
             <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 transition-tv hover:bg-white hover:text-black">←</button>
             <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 transition-tv hover:bg-white hover:text-black">❤️</button>
          </div>

          <button 
            onClick={() => featuredItem && playVideo(featuredItem)}
            className="absolute bottom-[-36px] left-1/2 -translate-x-1/2 w-20 h-20 bg-[#e50914] rounded-full flex items-center justify-center play-button-shadow z-30 transition-tv hover:scale-110 active:scale-90"
            autoFocus
          >
            <span className="text-white text-3xl ml-1">▶</span>
          </button>
        </div>

        <div className="mt-16 px-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black italic uppercase text-[#1a1a1a] tracking-tighter mb-2">
            {featuredItem && 'title' in featuredItem ? featuredItem.title : (featuredItem as any)?.name || `WWE SEASON ${selectedYear}`}
          </h1>
          <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.4em] mb-6">Unified Archive • 4K REMASTERED • TV-MA</p>
          
          <div className="flex items-center justify-center gap-14 mb-10">
            <div className="text-center">
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Timeline</p>
               <p className="font-black text-base text-[#1a1a1a]">{selectedYear}</p>
            </div>
            <div className="text-center">
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Premier</p>
               <p className="font-black text-base text-[#e50914]">{featuredItem?.date}</p>
            </div>
            <div className="text-center">
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Resolution</p>
               <p className="font-black text-base text-[#1a1a1a]">UHD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Year Selector - Focusable Pills */}
      <div className="px-10 mb-16">
         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">Historical Archives</h3>
         <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-carousel">
            {ALL_YEARS.map(y => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`flex-shrink-0 px-8 py-4 rounded-2xl font-black text-sm transition-all border tv-focusable snap-item ${selectedYear === y ? 'bg-[#1a1a1a] text-white border-black shadow-xl' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'}`}
              >
                {y}
              </button>
            ))}
         </div>
      </div>

      {/* Chronological Unified Rows */}
      <div className="space-y-12 pb-20">
        {MONTHS.map((monthName, index) => (
          <MonthSection 
            key={monthName} 
            monthName={monthName} 
            items={chronologicalArchive[index] || []} 
          />
        ))}

        {Object.keys(chronologicalArchive).length === 0 && (
          <div className="py-24 text-center">
             <span className="text-6xl opacity-10">📼</span>
             <p className="text-gray-300 font-black uppercase tracking-widest mt-6 text-xl">Archives offline</p>
          </div>
        )}
      </div>
    </div>
  );
};
