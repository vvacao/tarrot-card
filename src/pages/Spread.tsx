import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tarotCards } from '../data/cards';
import type { CardData } from '../data/cards';
import { useAppContext } from '../context/AppContext';

// Tipos de tiragens e suas posições
const spreadPositions: Record<string, string[]> = {
  '1': ['Conselho do Momento'],
  '3': ['PASSADO', 'PRESENTE', 'FUTURO'],
  '5': ['Situação', 'Obstáculo', 'Influência', 'Conselho', 'Tendência'],
  '10': [
    'Situação atual', 'Desafio', 'Base da situação', 'Passado',
    'Possibilidade', 'Futuro próximo', 'Estado interior', 'Ambiente',
    'Esperanças e medos', 'Tendência'
  ]
};

// Componente para exibir uma carta com animação de flip
const TarotCard = ({ 
  card, 
  isReversed, 
  position, 
  onClick, 
  flipped 
}: { 
  card?: CardData, 
  isReversed?: boolean, 
  position?: string, 
  onClick?: () => void, 
  flipped: boolean
}) => {
  return (
    <div className="flex flex-col items-center">
      {position && <div className="text-amber-500/80 text-xs font-bold uppercase mb-2 h-4">{position}</div>}
      <div 
        className={`relative w-24 h-40 md:w-32 md:h-56 cursor-pointer perspective-1000 ${!flipped && onClick ? 'hover:scale-105 transition-transform' : ''}`}
        onClick={!flipped ? onClick : undefined}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-900 to-slate-900 border-2 border-amber-600/50 rounded-xl shadow-lg flex items-center justify-center">
            <div className="w-[85%] h-[90%] border border-amber-500/30 rounded flex items-center justify-center">
              <span className="text-amber-500/50 text-2xl">🌙</span>
            </div>
          </div>
          
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-800 border-2 border-amber-400 rounded-xl overflow-hidden shadow-2xl flex flex-col">
            {card && (
              <div className={`w-full h-full relative ${isReversed ? 'rotate-180' : ''}`}>
                <img src={card.imagem} alt={card.nome} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none"></div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      {flipped && card && (
        <div className="mt-3 text-center w-full max-w-[120px] md:max-w-[150px]">
          <div className="text-sm font-bold text-slate-200">{card.nome} {isReversed ? '(Invertida)' : ''}</div>
          <div className="text-xs text-slate-400 mt-1 line-clamp-2">{card.palavraChave}</div>
        </div>
      )}
    </div>
  );
};

const Spread: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { addHistory } = useAppContext();
  
  const question = new URLSearchParams(location.search).get('q') || '';
  const numCards = parseInt(type || '1', 10);
  const positions = spreadPositions[type || '1'];

  const [gameState, setGameState] = useState<'shuffling' | 'picking' | 'revealed'>('shuffling');
  const [deck, setDeck] = useState<{ card: CardData, isReversed: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<{ card: CardData, isReversed: boolean, position: string }[]>([]);

  useEffect(() => {
    // Inicializar e embaralhar
    setTimeout(() => {
      const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
      const withReversal = shuffled.map(card => ({
        card,
        isReversed: Math.random() > 0.5
      }));
      setDeck(withReversal);
      setGameState('picking');
    }, 2500);
  }, []);

  const handlePickCard = (index: number) => {
    if (gameState !== 'picking') return;
    
    const cardObj = deck[index];
    const newDeck = [...deck];
    newDeck.splice(index, 1);
    setDeck(newDeck);

    const newSelected = [
      ...selectedCards,
      { ...cardObj, position: positions[selectedCards.length] }
    ];
    setSelectedCards(newSelected);

    if (newSelected.length === numCards) {
      setGameState('revealed');
      // Salvar no histórico
      addHistory({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        question: question || 'Consulta Geral',
        spreadType: numCards.toString(),
        cards: newSelected.map(c => ({ card: c.card, isReversed: c.isReversed })),
        summary: `Tiragem de ${numCards} carta(s). Energias predominantes: ${newSelected.map(c => c.card.palavraChave).join(', ')}.`
      });
    }
  };

  const handleFinish = () => {
    navigate('/historico');
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-8">
      {question && (
        <div className="mb-8 text-center bg-slate-900/40 px-6 py-3 rounded-full border border-indigo-500/20">
          <span className="text-slate-400 text-sm mr-2">Sua pergunta:</span>
          <span className="text-amber-400 font-serif">{question}</span>
        </div>
      )}

      {gameState === 'shuffling' && (
        <div className="flex flex-col items-center justify-center h-64">
          <motion.div 
            animate={{ y: [0, -20, 0], rotateZ: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🎴
          </motion.div>
          <h2 className="text-2xl font-serif text-indigo-300 animate-pulse">Embaralhando as cartas...</h2>
        </div>
      )}

      {gameState === 'picking' && (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-serif text-amber-400 mb-2">Escolha suas cartas</h2>
          <p className="text-slate-400 mb-12">Selecione {numCards - selectedCards.length} carta(s)</p>
          
          <div className="relative w-full max-w-3xl h-48 md:h-64 flex justify-center mt-10">
            {deck.slice(0, 22).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute origin-bottom cursor-pointer hover:-translate-y-8 transition-transform"
                style={{
                  left: `calc(50% - 2.5rem + ${(i - 10) * 15}px)`,
                  transform: `rotate(${(i - 10) * 4}deg)`,
                  zIndex: i
                }}
                onClick={() => handlePickCard(i)}
              >
                <div className="w-16 h-28 md:w-20 md:h-32 bg-gradient-to-br from-indigo-900 to-slate-900 border border-amber-600/50 rounded-lg shadow-lg" />
              </motion.div>
            ))}
          </div>

          {selectedCards.length > 0 && (
            <div className="mt-16 w-full max-w-4xl">
              <h3 className="text-center text-slate-500 text-sm mb-4">CARTAS SELECIONADAS:</h3>
              <div className="flex flex-wrap justify-center gap-4 opacity-50">
                {selectedCards.map((_, i) => (
                  <div key={i} className="w-12 h-16 bg-amber-500 rounded border border-amber-300"></div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {gameState === 'revealed' && (
        <div className="w-full flex flex-col items-center animate-in fade-in duration-1000">
          <h2 className="text-3xl font-serif text-amber-400 mb-12">🔮 Sua Leitura</h2>
          
          <div className={`grid gap-8 mb-16 ${numCards === 1 ? 'grid-cols-1' : numCards === 3 ? 'grid-cols-1 md:grid-cols-3' : numCards === 5 ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-2 md:grid-cols-5'}`}>
            {selectedCards.map((sc, i) => (
              <TarotCard
                key={i}
                card={sc.card}
                isReversed={sc.isReversed}
                position={sc.position}
                flipped={true}
              />
            ))}
          </div>

          <div className="w-full max-w-3xl bg-slate-900/60 rounded-2xl p-6 md:p-8 border border-indigo-900/50 shadow-xl space-y-8">
            {selectedCards.map((sc, i) => (
              <div key={i} className="border-b border-slate-800 pb-6 last:border-0 last:pb-0">
                <h4 className="text-amber-500 font-bold text-sm mb-1 uppercase">{sc.position}</h4>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-2xl font-serif text-slate-200">{sc.card.nome} {sc.isReversed && '(Invertida)'}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  {sc.isReversed ? sc.card.significadoInvertido : sc.card.significado}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="text-indigo-400 font-bold mb-1">❤️ Amor</div>
                    <div className="text-slate-400">{sc.card.amor}</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="text-indigo-400 font-bold mb-1">💼 Trabalho</div>
                    <div className="text-slate-400">{sc.card.trabalho}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={handleFinish}
            className="mt-12 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg"
          >
            Ver no Histórico
          </button>
        </div>
      )}
    </div>
  );
};

export default Spread;
