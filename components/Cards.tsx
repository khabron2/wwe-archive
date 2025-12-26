
import React from 'react';
import { useApp } from '../store';
import { Episode, PPV } from '../types';

interface CardProps {
  item: Episode | PPV;
}

export const ContentCard: React.FC<CardProps> = ({ item }) => {
  const { isWatched, toggleFavorite, isFavorite, playVideo } = useApp();
  const id = item.id;
  const watched = isWatched(id);
  const favorite = isFavorite(id);

  const title = 'title' in item ? item.title : item.name;
  const dateStr = item.date;
  
  let showLabel = 'PPV';
  let labelColor = 'bg-amber-600';
  
  if ('showType' in item) {
    showLabel = item.showType;
    labelColor = item.showType === 'RAW' ? 'bg-red-600' : 'bg-blue-600';
  }

  return (
    <div 
      onClick={() => playVideo(item)}
      tabIndex={0}
      className="group relative flex-shrink-0 w-48 md:w-56 lg:w-64 focus-ring transition-tv card-hover-effect cursor-pointer rounded-xl overflow-hidden bg-[#111] card-shadow z-0"
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={item.thumbnail} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        
        {/* Indicators Overlay (Top) */}
        <div className="absolute top-0 inset-x-0 p-3 flex justify-between items-start z-10">
          <span className={`${labelColor} text-[8px] font-black px-2 py-0.5 rounded shadow-lg uppercase tracking-tighter italic`}>
            {showLabel}
          </span>
          <div className="flex flex-col gap-1 items-end">
            {watched && (
              <span className="bg-white/90 text-black text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase tracking-tighter">VISTO</span>
            )}
            {favorite && (
               <span className="text-amber-400 drop-shadow-md">★</span>
            )}
          </div>
        </div>

        {/* Information Layer (Bottom Hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-20">
           <div className="mb-4">
              <h4 className="font-heading font-black italic uppercase text-lg leading-tight mb-2">{title}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{dateStr}</p>
           </div>
           
           <div className="flex gap-2">
              <button className="flex-1 bg-white text-black text-[10px] font-black py-2.5 rounded-lg hover:bg-slate-200 transition-colors uppercase tracking-widest">VER AHORA</button>
           </div>
        </div>
      </div>

      {/* Static Info for Non-Hover */}
      <div className="p-3 bg-gradient-to-b from-[#151515] to-[#0a0a0a] group-hover:hidden border-t border-white/5">
        <h3 className="font-bold text-[11px] truncate uppercase italic tracking-tighter opacity-70 mb-1">{title}</h3>
        <p className="text-[9px] font-black text-slate-600 tracking-tighter">{dateStr}</p>
      </div>
    </div>
  );
};
