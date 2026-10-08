import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const spreads = [
  {
    id: '1',
    name: 'Conselho do Momento',
    description: 'Uma carta para representar a energia principal da sua situação.',
    cards: 1
  },
  {
    id: '3',
    name: 'Passado • Presente • Futuro',
    description: 'Três cartas para entender a evolução da situação.',
    cards: 3
  },
  {
    id: '5',
    name: 'Leitura Profunda',
    description: 'Cinco cartas explorando: Situação, Obstáculo, Influência, Conselho, Tendência.',
    cards: 5
  },
  {
    id: '10',
    name: 'Cruz Celta',
    description: 'Dez cartas para uma análise completa e profunda de todos os aspectos.',
    cards: 10
  }
];

const NewReading: React.FC = () => {
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();

  const handleSpreadSelect = (spreadId: string) => {
    navigate(`/tiragem/${spreadId}?q=${encodeURIComponent(question)}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 md:p-10 border border-indigo-900/50 shadow-2xl mb-12"
      >
        <h2 className="text-3xl font-serif text-amber-400 mb-6 text-center">Qual é a sua pergunta?</h2>
        <p className="text-slate-400 text-center mb-8">
          Concentre-se no que deseja saber. A pergunta não é enviada para nenhum lugar, serve apenas para guiar sua intuição e personalizar sua leitura.
        </p>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex: Como está minha vida amorosa?"
          className="w-full bg-slate-950 border border-indigo-500/30 rounded-xl p-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-lg"
        />
      </motion.div>

      <h3 className="text-2xl font-serif text-center text-indigo-300 mb-8">Escolha sua tiragem</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spreads.map((spread, i) => (
          <motion.div
            key={spread.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleSpreadSelect(spread.id)}
            className="cursor-pointer bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 p-6 rounded-xl transition-all flex flex-col items-center text-center shadow-lg group"
          >
            <div className="text-4xl text-amber-500 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
              {spread.cards === 1 ? '🃏' : spread.cards === 3 ? '🃏🃏🃏' : spread.cards === 5 ? '🔮' : '✝️'}
            </div>
            <h4 className="text-xl font-bold text-slate-200 mb-2">{spread.cards} CARTA{spread.cards > 1 ? 'S' : ''}</h4>
            <h5 className="text-amber-400 font-serif text-lg mb-3">{spread.name}</h5>
            <p className="text-slate-400 text-sm">{spread.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewReading;
