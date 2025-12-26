
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ALL_YEARS, RAW_CONTENT, SMACKDOWN_CONTENT, PPV_CONTENT } from '../data';
import { ContentCard } from '../components/Cards';
import { ContentType } from '../types';

interface ShowListProps {
  type: ContentType;
}

export const ShowList: React.FC<ShowListProps> = ({ type }) => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [filterUnseen, setFilterUnseen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const content = useMemo(() => {
    let baseContent = [];
    if (type === 'RAW') {
      baseContent = RAW_CONTENT.find(y => y.year === selectedYear)?.episodes || [];
    } else if (type === 'SMACKDOWN') {
      baseContent = SMACKDOWN_CONTENT.find(y => y.year === selectedYear)?.episodes || [];
    } else {
      baseContent = PPV_CONTENT.find(y => y.year === selectedYear)?.ppvs || [];
    }
    return baseContent;
  }, [type, selectedYear]);

  const titleMap = {
    'RAW': 'WWE RAW Archive',
    'SMACKDOWN': 'SmackDown Archive',
    'PPV': 'PPV Events Archive'
  };

  // Auto-scroll to selected year in the horizontal list
  useEffect(() => {
    const activeBtn = scrollRef.current?.querySelector('.active-year');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedYear]);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-2">{titleMap[type]}</h1>
          <p className="text-slate-400 text-lg">Browsing the year <span className="text-violet-400 font-bold">{selectedYear}</span></p>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Select Year</h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 uppercase tracking-widest">Filter Unwatched</span>
              <div 
                onClick={() => setFilterUnseen(!filterUnseen)}
                className={`w-12 h-6 rounded-full transition-colors relative ${filterUnseen ? 'bg-violet-600' : 'bg-slate-700'}`}
              >
                 <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${filterUnseen ? 'translate-x-6' : ''}`} />
              </div>
            </label>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar -mx-2 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {ALL_YEARS.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`flex-shrink-0 min-w-[80px] py-3 rounded-2xl text-sm font-black transition-all border ${
                  selectedYear === year 
                    ? 'active-year bg-violet-600 text-white border-violet-500 shadow-lg shadow-violet-900/40' 
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {content.map(item => (
          // Correctly pass only valid props to ContentCard. The 'type' prop was invalid and unnecessary.
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
      
      {content.length === 0 && (
        <div className="py-20 text-center bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
          <p className="text-slate-500 text-lg italic">The archives for {selectedYear} are currently being processed...</p>
        </div>
      )}
    </div>
  );
};
