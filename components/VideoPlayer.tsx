
import React, { useEffect, useRef } from 'react';
import { useApp } from '../store';

export const VideoPlayer: React.FC = () => {
  const { activeVideo, closeVideo } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Back' || e.key === 'BrowserBack') {
        closeVideo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeVideo]);

  if (!activeVideo) return null;

  const title = 'title' in activeVideo ? activeVideo.title : activeVideo.name;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
      {/* Header with Close */}
      <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10 opacity-0 hover:opacity-100 transition-opacity">
        <h2 className="text-xl font-black italic uppercase text-white drop-shadow-lg">{title}</h2>
        <button 
          onClick={closeVideo}
          className="bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-md text-white font-bold"
          autoFocus
        >
          ✕ CLOSE
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative group">
        <video 
          ref={videoRef}
          src={activeVideo.videoUrl || "https://archive.org/download/WAR-2000/2000-01-03.mp4"} 
          className="max-w-full max-h-full aspect-video shadow-2xl"
          controls
          autoPlay
          onEnded={closeVideo}
        />
        
        {!activeVideo.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 flex-col text-center p-10">
            <span className="text-6xl mb-6">⚠️</span>
            <h3 className="text-2xl font-black italic uppercase mb-2">Streaming Not Available</h3>
            <p className="text-slate-400 max-w-md">The source for this specific episode is currently being archived. Try an episode from the year 2000!</p>
            <button onClick={closeVideo} className="mt-8 bg-violet-600 px-8 py-3 rounded-xl font-bold">RETURN TO BROWSER</button>
          </div>
        )}
      </div>
    </div>
  );
};
