import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { tarotCards } from '../data/cards';
import { useAppContext } from '../context/AppContext';

const FavoritesPage: React.FC = () => {
  const { favorites } = useAppContext();

  const favoriteCards = tarotCards.filter(c => favorites.includes(c.id));

  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-10">
        <Heart className="text-amber-500 fill-amber-500" size={32} />
        <h2 className="text-3xl font-serif text-slate-100">Meus Favoritos</h2>
      </div>

      {favoriteCards.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
          <Heart className="mx-auto text-slate-700 mb-4" size={48} />
          <p className="text-xl text-slate-400 font-serif">Você ainda não favoritou nenhuma carta.</p>
          <Link to="/cartas" className="mt-6 inline-block text-amber-500 hover:text-amber-400 font-bold">
            Explorar todas as cartas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favoriteCards.map(card => (
            <Link to={`/cartas/${card.id}`} key={card.id}>
              <div className="bg-slate-900 border border-amber-500/30 hover:border-amber-500 rounded-xl overflow-hidden group transition-all aspect-[2/3] flex flex-col shadow-lg hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] relative">
                <img src={card.imagem} alt={card.nome} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-center">
                   <Heart className="absolute top-2 right-2 text-amber-500 fill-amber-500 opacity-50 group-hover:opacity-100" size={16} />
                   <div>
                     <div className="text-xs text-amber-400 uppercase tracking-widest">{card.arcano === 'Maior' ? card.numero : card.naipe}</div>
                     <div className="text-lg font-serif font-bold text-slate-100 leading-tight mt-1 drop-shadow-md">{card.nome}</div>
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
