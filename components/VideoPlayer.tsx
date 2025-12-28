
import React, { useEffect, useMemo } from 'react';
import { useApp } from '../store';

export const VideoPlayer: React.FC = () => {
  const { activeVideo, closeVideo } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideo();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeVideo]);

  const embedUrl = useMemo(() => {
    if (!activeVideo?.videoUrl) return null;
    const url = activeVideo.videoUrl;
    if (url.includes('archive.org/download/')) {
      try {
        const parts = url.split('archive.org/download/');
        const pathParts = parts[1].split('/');
        const identifier = pathParts[0];
        const filename = pathParts.slice(1).join('/');
        return `https://archive.org/embed/${identifier}&file=/${identifier}/${filename}&autoplay=1`;
      } catch (e) {
        return url;
      }
    }
    return url;
  }, [activeVideo]);

  if (!activeVideo) return null;

  const title = 'title' in activeVideo ? activeVideo.title : activeVideo.name;

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col animate-in fade-in duration-500">
      <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center bg-gradient-to-b from-white via-white/40 to-transparent z-[210] opacity-0 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4">
          <button onClick={closeVideo} className="text-2xl p-2 hover:bg-black/5 rounded-full transition-colors">←</button>
          <div>
            <div className="flex items-center gap-2">
               <h2 className="text-sm font-black uppercase text-[#1a1a1a] tracking-tight">{title}</h2>
               <span className="px-2 py-0.5 bg-black text-white text-[9px] font-black rounded uppercase">{activeVideo.date}</span>
            </div>
            <p className="text-[10px] font-bold text-[#e50914] uppercase tracking-widest mt-0.5">Streaming from Archive.org • Multi-Language</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">WWE Network Quality</span>
        </div>
      </div>

      <div className="flex-1 bg-black overflow-hidden relative">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
            title={title}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f5f1ed]">
            <p className="font-black italic uppercase opacity-20">Video no disponible en archivo</p>
          </div>
        )}
      </div>
      
      {/* Red Progress Bar Vibe */}
      <div className="h-1.5 w-full bg-gray-100">
          <div className="h-full bg-[#e50914] w-[65%] animate-pulse"></div>
      </div>
    </div>
  );
};