import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SunMoon } from 'lucide-react';
import { tarotCards } from '../data/cards';
import type { CardData } from '../data/cards';
import { useAppContext } from '../context/AppContext';

const DailyCard: React.FC = () => {
  const { dailyCard, setDailyCard } = useAppContext();
  const [flipped, setFlipped] = useState(false);
  const [card, setCard] = useState<CardData | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (dailyCard && dailyCard.date === today) {
      setCard(dailyCard.card);
      setFlipped(true);
    } else {
      // Pick a random card that is not the same as previous (if any)
      let randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
      setCard(randomCard);
    }
  }, [dailyCard]);

  const handleReveal = () => {
    if (!flipped && card) {
      const today = new Date().toISOString().split('T')[0];
      setDailyCard(card, today);
      setFlipped(true);
    }
  };

  if (!card) return null;

  return (
    <div className="flex flex-col items-center py-10 min-h-[80vh]">
      <div className="flex items-center gap-3 mb-8">
        <SunMoon className="text-amber-500" size={32} />
        <h2 className="text-3xl font-serif text-slate-100">Sua Carta de Hoje</h2>
      </div>

      <p className="text-slate-400 mb-10 text-center max-w-md">
        {!flipped 
          ? "Conecte-se com sua intuição e clique na carta para revelar a energia que guiará o seu dia." 
          : "Esta é a energia predominante para o seu dia. Reflita sobre sua mensagem."}
      </p>

      <div className="relative w-48 h-80 md:w-64 md:h-96 cursor-pointer perspective-1000 mb-12" onClick={handleReveal}>
        <motion.div
          className="w-full h-full relative preserve-3d"
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-900 to-purple-950 border-2 border-amber-500/50 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.3)] flex flex-col items-center justify-center">
             <div className="w-[85%] h-[90%] border border-amber-500/30 rounded flex items-center justify-center">
               <SunMoon className="text-amber-500/60" size={48} />
             </div>
          </div>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-900 border-2 border-amber-400 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center">
             <img src={card.imagem} alt={card.nome} className="w-full h-full object-cover" />
             <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] pointer-events-none"></div>
          </div>
        </motion.div>
      </div>

      {flipped && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl bg-slate-900/80 p-8 rounded-2xl border border-indigo-900/50 shadow-xl space-y-6"
        >
          <div className="text-center">
            <span className="inline-block bg-indigo-900/50 text-amber-400 px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase mb-4">
              {card.palavraChave}
            </span>
          </div>
          
          <div>
            <h4 className="text-indigo-300 font-bold mb-2">Mensagem Principal</h4>
            <p className="text-slate-300 leading-relaxed">{card.significado}</p>
          </div>
          
          <div className="bg-amber-900/20 p-4 rounded-xl border border-amber-500/20">
            <h4 className="text-amber-400 font-bold mb-2 flex items-center gap-2">
              <span className="text-xl">✨</span> Conselho do Dia
            </h4>
            <p className="text-amber-100/80">{card.conselho}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DailyCard;
