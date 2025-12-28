
import React from 'react';
import { useApp } from '../store';
import { Episode, PPV } from '../types';

interface CardProps {
  item: Episode | PPV;
}

export const ContentCard: React.FC<CardProps> = ({ item }) => {
  const { isWatched, playVideo } = useApp();
  const id = item.id;
  const watched = isWatched(id);

  const title = 'title' in item ? item.title : item.name;
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      playVideo(item);
    }
  };

  return (
    <button 
      onClick={() => playVideo(item)}
      onKeyDown={handleKeyDown}
      className="group relative flex-shrink-0 w-36 md:w-44 lg:w-52 cursor-pointer transition-tv tv-focusable snap-item p-1"
      aria-label={`Play ${title}`}
    >
      <div className="aspect-[2/3] rounded-2xl overflow-hidden netflix-card-shadow relative bg-gray-100">
        <img 
          src={item.thumbnail} 
          alt={title} 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
        
        {watched && (
          <div className="absolute top-2 right-2 bg-[#e50914] backdrop-blur-md p-1 rounded-full shadow-lg">
            <span className="text-[10px] text-white font-black px-1">✓</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity flex flex-col justify-end p-4">
           <span className="text-[11px] text-white font-black leading-tight uppercase italic mb-1">{title}</span>
           <div className="flex justify-between items-center">
             <span className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">Season {item.year || (item as any).season}</span>
             <span className="text-[9px] text-gray-300 font-medium">{item.date}</span>
           </div>
        </div>
      </div>
    </button>
  );
};