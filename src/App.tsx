import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Home, Sparkles, History, Heart, BookOpen, SunMoon } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import NewReading from './pages/NewReading';
import Spread from './pages/Spread';
import DailyCard from './pages/DailyCard';
import AllCards from './pages/AllCards';
import CardDetails from './pages/CardDetails';
import HistoryPage from './pages/HistoryPage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-64 flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              '--duration': `${Math.random() * 3 + 2}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      <nav className="fixed bottom-0 w-full bg-slate-900/90 backdrop-blur-md border-t border-indigo-900/50 md:left-0 md:top-0 md:w-64 md:border-r md:border-t-0 z-50 flex md:flex-col justify-around md:justify-start p-3 md:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] md:shadow-[4px_0_20px_rgba(0,0,0,0.5)]">
        <div className="hidden md:flex items-center gap-3 mb-10 text-indigo-400">
          <SunMoon size={32} />
          <h1 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Oráculo Místico</h1>
        </div>
        
        <NavLink to="/" icon={<Home />} label="Início" />
        <NavLink to="/consulta" icon={<Sparkles />} label="Tarot" />
        <NavLink to="/carta-do-dia" icon={<SunMoon />} label="Carta do Dia" />
        <NavLink to="/historico" icon={<History />} label="Histórico" />
        <NavLink to="/favoritos" icon={<Heart />} label="Favoritos" />
        <div className="hidden md:block mt-auto">
           <NavLink to="/sobre" icon={<BookOpen />} label="Sobre o Tarot" />
        </div>
      </nav>

      <main className="flex-1 p-4 md:p-8 z-10 w-full max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};

const NavLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <Link to={to} className="flex flex-col md:flex-row items-center gap-1 md:gap-4 p-2 md:p-3 text-slate-400 hover:text-amber-300 hover:bg-slate-800/50 rounded-xl transition-all group">
    <div className="group-hover:scale-110 transition-transform">{icon}</div>
    <span className="text-xs md:text-base font-medium">{label}</span>
  </Link>
);

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consulta" element={<NewReading />} />
            <Route path="/tiragem/:type" element={<Spread />} />
            <Route path="/carta-do-dia" element={<DailyCard />} />
            <Route path="/cartas" element={<AllCards />} />
            <Route path="/cartas/:id" element={<CardDetails />} />
            <Route path="/historico" element={<HistoryPage />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/sobre" element={<AboutPage />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
