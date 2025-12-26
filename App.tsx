
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store';
import { Layout } from './components/Layout';
import { YearView } from './pages/YearView';
import { VideoPlayer } from './components/VideoPlayer';

const Favorites = () => (
  <div className="py-40 text-center flex flex-col items-center animate-fade-in">
    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center text-5xl mb-10 border border-white/10">⭐</div>
    <h1 className="text-5xl font-heading font-black italic uppercase mb-4 tracking-tighter">Your Favorites</h1>
    <p className="text-slate-500 font-medium max-w-md">Save the matches and events you love to see them organized here.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            {/* The primary view is now the YearView (Calendar) */}
            <Route path="/" element={<YearView />} />
            <Route path="/favorites" element={<Favorites />} />
            
            {/* Redirect old legacy routes to the new combined timeline */}
            <Route path="/browse" element={<Navigate to="/" replace />} />
            <Route path="/raw" element={<Navigate to="/" replace />} />
            <Route path="/smackdown" element={<Navigate to="/" replace />} />
            <Route path="/ppv" element={<Navigate to="/" replace />} />
            
            {/* Catch-all redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <VideoPlayer />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
