
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, Episode, PPV } from './types';

interface AppContextType {
  progress: UserProgress;
  activeVideo: Episode | PPV | null;
  playVideo: (item: Episode | PPV) => void;
  closeVideo: () => void;
  toggleWatched: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setLastWatched: (id: string) => void;
  isWatched: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'wwe_archive_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeVideo, setActiveVideo] = useState<Episode | PPV | null>(null);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { watchedIds: [], favorites: [] };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const playVideo = (item: Episode | PPV) => {
    setActiveVideo(item);
    if (!progress.watchedIds.includes(item.id)) {
      toggleWatched(item.id);
    }
  };

  const closeVideo = () => setActiveVideo(null);

  const toggleWatched = (id: string) => {
    setProgress(prev => {
      const exists = prev.watchedIds.includes(id);
      return {
        ...prev,
        watchedIds: exists 
          ? prev.watchedIds.filter(i => i !== id) 
          : [...prev.watchedIds, id]
      };
    });
  };

  const toggleFavorite = (id: string) => {
    setProgress(prev => {
      const exists = prev.favorites.includes(id);
      return {
        ...prev,
        favorites: exists 
          ? prev.favorites.filter(i => i !== id) 
          : [...prev.favorites, id]
      };
    });
  };

  const setLastWatched = (id: string) => {
    setProgress(prev => ({ ...prev, lastWatchedId: id }));
  };

  const isWatched = (id: string) => progress.watchedIds.includes(id);
  const isFavorite = (id: string) => progress.favorites.includes(id);

  return (
    <AppContext.Provider value={{ 
      progress, 
      activeVideo, 
      playVideo, 
      closeVideo, 
      toggleWatched, 
      toggleFavorite, 
      setLastWatched, 
      isWatched, 
      isFavorite 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
