import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, SunMoon, Layers, History, Heart, BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 mb-4">
          Oráculo Místico
        </h1>
        <p className="text-xl md:text-2xl text-indigo-200 italic font-light">
          "Descubra novas perspectivas através das cartas."
        </p>
      </motion.div>

      <div className="relative w-full max-w-sm h-48 my-8 flex justify-center items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              rotate: [i * 15 - 15, i * 15 - 10, i * 15 - 15]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute w-24 h-40 bg-gradient-to-br from-indigo-900 to-purple-900 border border-amber-500/50 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center"
            style={{ zIndex: i, left: `calc(50% - 3rem + ${(i - 1) * 3}rem)` }}
          >
            <div className="w-[85%] h-[90%] border border-amber-500/30 rounded flex items-center justify-center">
              <SunMoon className="text-amber-500/50" size={32} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <HomeButton to="/consulta" icon={<Sparkles />} label="🔮 NOVA CONSULTA" primary />
        <HomeButton to="/carta-do-dia" icon={<SunMoon />} label="🌙 CARTA DO DIA" />
        <HomeButton to="/cartas" icon={<Layers />} label="🃏 TODAS AS CARTAS" />
        <HomeButton to="/historico" icon={<History />} label="📜 HISTÓRICO" />
        <HomeButton to="/favoritos" icon={<Heart />} label="❤️ FAVORITOS" />
        <HomeButton to="/sobre" icon={<BookOpen />} label="📖 SOBRE O TAROT" />
      </div>
    </div>
  );
};

const HomeButton = ({ to, icon, label, primary }: { to: string, icon: React.ReactNode, label: string, primary?: boolean }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-4 rounded-xl flex items-center justify-center gap-3 font-semibold transition-all shadow-lg border ${
        primary 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400 text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]' 
          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-amber-500/50 hover:text-amber-300'
      }`}
    >
      {icon}
      {label}
    </motion.div>
  </Link>
);

export default HomePage;
