
export type ContentType = 'RAW' | 'SMACKDOWN' | 'PPV';

export interface Episode {
  id: string;
  showType: ContentType;
  season: number; // The Year
  episodeNumber: number;
  title: string;
  date: string;
  thumbnail: string;
  duration: string;
  description: string;
  videoUrl?: string;
}

export interface PPV {
  id: string;
  name: string;
  date: string;
  year: number;
  thumbnail: string;
  description: string;
  videoUrl?: string;
}

export interface UserProgress {
  watchedIds: string[];
  favorites: string[];
  lastWatchedId?: string;
}

export interface Season {
  year: number;
  episodes: Episode[];
  ppvs: PPV[];
}
