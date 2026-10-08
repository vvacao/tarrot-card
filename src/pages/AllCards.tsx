import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { tarotCards } from '../data/cards';

const AllCards: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = useMemo(() => {
    return tarotCards.filter(card => 
      card.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      card.palavraChave.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (card.naipe && card.naipe.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const majorArcana = filteredCards.filter(c => c.arcano === 'Maior');
  const wands = filteredCards.filter(c => c.naipe === 'Paus');
  const cups = filteredCards.filter(c => c.naipe === 'Copas');
  const swords = filteredCards.filter(c => c.naipe === 'Espadas');
  const pentacles = filteredCards.filter(c => c.naipe === 'Ouros');

  const CardGrid = ({ cards, title }: { cards: typeof tarotCards, title: string }) => {
    if (cards.length === 0) return null;
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-serif text-amber-400 mb-6 border-b border-indigo-900/50 pb-2">{title}</h3>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cards.map(card => (
            <Link to={`/cartas/${card.id}`} key={card.id}>
              <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-lg overflow-hidden group transition-all aspect-[2/3] flex flex-col relative">
                <img src={card.imagem} alt={card.nome} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-center">
                   <div className="text-[10px] text-amber-400 font-bold uppercase">{card.numero}</div>
                   <div className="text-xs md:text-sm font-serif font-bold text-slate-100 leading-tight drop-shadow-md">{card.nome}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl font-serif text-slate-100">Todas as Cartas</h2>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar carta..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      <CardGrid cards={majorArcana} title="Arcanos Maiores" />
      <CardGrid cards={wands} title="Naipe de Paus" />
      <CardGrid cards={cups} title="Naipe de Copas" />
      <CardGrid cards={swords} title="Naipe de Espadas" />
      <CardGrid cards={pentacles} title="Naipe de Ouros" />
      
      {filteredCards.length === 0 && (
        <div className="text-center text-slate-500 mt-20">
          Nenhuma carta encontrada para "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default AllCards;
