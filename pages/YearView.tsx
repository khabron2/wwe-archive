import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ALL_YEARS, RAW_CONTENT, SMACKDOWN_CONTENT, PPV_CONTENT } from '../data';
import { ContentCard } from '../components/Cards';
import { Episode, PPV } from '../types';

// Definición de las épocas de la WWE para navegación rápida
const ERAS = [
  { name: 'Attitude Era', years: [2000, 2001, 2002], color: 'from-red-600 to-amber-600' },
  { name: 'Ruthless Aggression', years: [2003, 2004, 2005, 2006, 2007, 2008], color: 'from-blue-600 to-indigo-600' },
  { name: 'PG Era', years: [2009, 2010, 2011, 2012, 2013], color: 'from-violet-600 to-purple-600' },
  { name: 'Modern Era', years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], color: 'from-slate-600 to-slate-800' },
];

const STORAGE_KEY_YEAR = 'wwe_archive_selected_year';

const MonthRow = ({ monthName, items }: { monthName: string, items: (Episode | PPV)[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  if (items.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 50);
    }
  };

  return (
    <section className="mb-12 relative">
      <div className="flex items-center gap-4 px-6 md:px-12 mb-5">
        <div className="h-px flex-1 bg-white/5"></div>
        <h3 className="text-2xl font-heading font-black italic uppercase tracking-tighter text-white/90">
          {monthName}
        </h3>
        <div className="h-px flex-1 bg-white/5"></div>
      </div>

      <div className="relative group">
        <button 
          onClick={() => scroll('left')}
          className={`absolute left-0 top-0 bottom-6 w-12 md:w-16 z-30 bg-black/40 hover:bg-black/70 flex items-center justify-center transition-opacity duration-300 backdrop-blur-sm focus:bg-violet-600/50 outline-none
            ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll Left"
        >
          <span className="text-3xl font-bold">‹</span>
        </button>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-6 w-12 md:w-16 z-30 bg-black/40 hover:bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm focus:bg-violet-600/50 outline-none focus:opacity-100"
          aria-label="Scroll Right"
        >
          <span className="text-3xl font-bold">›</span>
        </button>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto px-6 md:px-12 pb-6 hide-scrollbar scroll-smooth relative"
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
  // Inicializamos el estado desde localStorage si existe
  const [selectedYear, setSelectedYear] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_YEAR);
    return saved ? parseInt(saved, 10) : 2005;
  });
  
  const [showYearGrid, setShowYearGrid] = useState(false);
  const yearsListRef = useRef<HTMLDivElement>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentEra = ERAS.find(era => era.years.includes(selectedYear)) || ERAS[0];

  const chronologicalCalendar = useMemo(() => {
    const raw = RAW_CONTENT.find(y => y.year === selectedYear)?.episodes || [];
    const sd = SMACKDOWN_CONTENT.find(y => y.year === selectedYear)?.episodes || [];
    const ppvs = PPV_CONTENT.find(y => y.year === selectedYear)?.ppvs || [];

    const allItems: (Episode | PPV)[] = [...raw, ...sd, ...ppvs];

    const sorted = allItems.sort((a, b) => {
      const dateA = new Date(a.date.replace(/\./g, '-')).getTime();
      const dateB = new Date(b.date.replace(/\./g, '-')).getTime();
      return dateA - dateB;
    });

    const grouped: { [key: number]: (Episode | PPV)[] } = {};
    sorted.forEach(item => {
      const dateString = item.date.replace(/\./g, '-');
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const monthIndex = date.getMonth();
        if (!grouped[monthIndex]) grouped[monthIndex] = [];
        grouped[monthIndex].push(item);
      }
    });

    return grouped;
  }, [selectedYear]);

  // Guardamos el año seleccionado cada vez que cambie
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_YEAR, selectedYear.toString());
  }, [selectedYear]);

  useEffect(() => {
    const activeButton = yearsListRef.current?.querySelector('.year-btn-active');
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedYear]);

  const handleNextYear = () => {
    const currentIndex = ALL_YEARS.indexOf(selectedYear);
    if (currentIndex < ALL_YEARS.length - 1) setSelectedYear(ALL_YEARS[currentIndex + 1]);
  };

  const handlePrevYear = () => {
    const currentIndex = ALL_YEARS.indexOf(selectedYear);
    if (currentIndex > 0) setSelectedYear(ALL_YEARS[currentIndex - 1]);
  };

  return (
    <div className="animate-fade-in relative">
      {/* Year Selector Full Grid Overlay */}
      {showYearGrid && (
        <div className="fixed inset-0 z-[200] apple-glass animate-in fade-in zoom-in duration-300 p-10 flex flex-col items-center justify-center">
          <button 
            onClick={() => setShowYearGrid(false)}
            className="absolute top-10 right-10 w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-2xl transition-tv"
          >✕</button>
          
          <h2 className="text-4xl font-heading font-black italic uppercase mb-12 tracking-widest opacity-50">Select Era & Year</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
            {ERAS.map(era => (
              <div key={era.name} className="space-y-4">
                <h3 className={`text-sm font-black uppercase tracking-widest mb-4 px-4 py-1 rounded bg-gradient-to-r ${era.color} inline-block`}>
                  {era.name}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {era.years.map(y => (
                    <button
                      key={y}
                      onClick={() => { setSelectedYear(y); setShowYearGrid(false); }}
                      className={`py-4 rounded-xl font-black transition-all border ${selectedYear === y ? 'bg-white text-black border-white scale-110 shadow-2xl' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'}`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Year Hero Header */}
      <div className="relative h-[65vh] flex flex-col justify-end px-6 md:px-12 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]">
            <img 
              src={`https://image.tmdb.org/t/p/original/vxqChitYWBi8zyF8p50j69OtNhY.jpg`} 
              className="w-full h-full object-cover opacity-10 scale-105 blur-[2px]" 
              alt="" 
            />
            <div className="absolute inset-0 netflix-gradient" />
        </div>
        
        <div className="relative z-10 w-full">
            <div className="flex items-center gap-4 mb-4">
              <span className={`bg-gradient-to-r ${currentEra.color} px-3 py-1 rounded-md text-[10px] font-black italic tracking-widest uppercase shadow-lg`}>
                {currentEra.name}
              </span>
              <div className="h-px w-20 bg-white/20"></div>
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Archive Active</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-6 group">
                <button 
                  onClick={handlePrevYear}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                >‹</button>
                
                <div className="cursor-pointer" onClick={() => setShowYearGrid(true)}>
                  <h1 className="text-8xl md:text-[140px] font-heading font-black italic uppercase leading-none tracking-tighter mb-2 hover:scale-105 transition-transform origin-left">
                      {selectedYear}
                  </h1>
                  <p className="text-slate-400 text-sm md:text-lg font-medium max-w-xl italic opacity-80 flex items-center gap-2">
                    Click to browse all years <span className="text-white/20 tracking-tighter">━━━━</span>
                  </p>
                </div>

                <button 
                  onClick={handleNextYear}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                >›</button>
              </div>

              {/* Navigation Rail - Quick Select */}
              <div className="w-full lg:max-w-xl">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Jump to Timeline</span>
                    <button onClick={() => setShowYearGrid(true)} className="text-[10px] font-black uppercase tracking-widest text-violet-400 hover:text-white transition-colors">View All Grid</button>
                 </div>
                 <div 
                  ref={yearsListRef}
                  className="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
                >
                  {ALL_YEARS.map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`year-btn flex-shrink-0 w-20 h-14 rounded-xl flex items-center justify-center text-sm font-black transition-all border
                        ${selectedYear === year 
                          ? 'year-btn-active bg-white text-black border-white scale-110 shadow-xl z-10' 
                          : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/20 hover:text-white'}`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Eras Quick Nav Bar (Sticky) */}
      <nav className="sticky top-20 z-[80] mx-6 md:mx-12 apple-glass border border-white/10 rounded-2xl p-2 flex gap-1 shadow-2xl overflow-x-auto no-scrollbar">
          {ERAS.map(era => (
            <button
              key={era.name}
              onClick={() => setSelectedYear(era.years[0])}
              className={`flex-1 min-w-[120px] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${currentEra.name === era.name ? `bg-gradient-to-r ${era.color} text-white shadow-lg` : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              {era.name}
            </button>
          ))}
      </nav>

      {/* Unified Chronological Feed */}
      <div className="relative z-20 pt-10 pb-20 bg-gradient-to-b from-transparent to-[#050505]">
        {months.map((monthName, index) => (
          <MonthRow 
            key={monthName} 
            monthName={monthName} 
            items={chronologicalCalendar[index] || []} 
          />
        ))}

        {Object.keys(chronologicalCalendar).length === 0 && (
          <div className="py-40 text-center opacity-30 flex flex-col items-center">
            <span className="text-6xl mb-4">📭</span>
            <p className="text-xl font-heading font-black italic uppercase tracking-widest">No archival data found for {selectedYear}</p>
            <p className="text-sm text-slate-500 mt-2">Archives are currently being indexed for this period.</p>
          </div>
        )}
      </div>
    </div>
  );
};
