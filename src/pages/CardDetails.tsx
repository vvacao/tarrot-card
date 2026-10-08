import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { tarotCards } from '../data/cards';
import { useAppContext } from '../context/AppContext';

const CardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useAppContext();

  const card = tarotCards.find(c => c.id === id);

  if (!card) return <div className="p-8 text-center text-slate-400">Carta não encontrada.</div>;

  const favorite = isFavorite(card.id);

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-amber-400 mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-48 h-80 md:w-64 md:h-96 bg-slate-900 border-2 border-amber-400 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
             <img src={card.imagem} alt={card.nome} className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none"></div>
          </div>
          
          <button 
            onClick={() => toggleFavorite(card.id)}
            className={`mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all border ${
              favorite 
                ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-amber-500/50 hover:text-amber-400'
            }`}
          >
            <Heart size={20} className={favorite ? "fill-amber-500" : ""} />
            {favorite ? 'Favoritado' : 'Favoritar'}
          </button>
        </div>

        <div className="w-full md:w-2/3 space-y-8">
          <div>
            <h1 className="text-4xl font-serif text-slate-100 mb-2">{card.nome}</h1>
            <p className="text-indigo-300 text-lg">{card.descricao}</p>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-xl border border-indigo-900/30">
            <h3 className="text-amber-400 font-bold mb-3 uppercase tracking-wider text-sm">Palavras-chave</h3>
            <p className="text-slate-200 text-xl font-serif">{card.palavraChave}</p>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-serif text-amber-400 mb-3 border-b border-slate-800 pb-2">Significado Geral</h3>
              <p className="text-slate-300 leading-relaxed">{card.significado}</p>
            </section>

            <section>
              <h3 className="text-xl font-serif text-amber-400 mb-3 border-b border-slate-800 pb-2">Amor</h3>
              <p className="text-slate-300 leading-relaxed">{card.amor}</p>
            </section>

            <section>
              <h3 className="text-xl font-serif text-amber-400 mb-3 border-b border-slate-800 pb-2">Trabalho</h3>
              <p className="text-slate-300 leading-relaxed">{card.trabalho}</p>
            </section>

            <section>
              <h3 className="text-xl font-serif text-amber-400 mb-3 border-b border-slate-800 pb-2">Dinheiro</h3>
              <p className="text-slate-300 leading-relaxed">{card.dinheiro}</p>
            </section>
            
            <section>
              <h3 className="text-xl font-serif text-amber-400 mb-3 border-b border-slate-800 pb-2">Espiritualidade</h3>
              <p className="text-slate-300 leading-relaxed">{card.espiritualidade}</p>
            </section>

            <section className="bg-slate-900 p-5 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-slate-400 mb-2">Carta Invertida</h3>
              <p className="text-slate-400 leading-relaxed">{card.significadoInvertido}</p>
            </section>

            <section className="bg-amber-900/20 p-5 rounded-xl border border-amber-500/20">
              <h3 className="text-lg font-bold text-amber-500 mb-2">Conselho</h3>
              <p className="text-amber-100/80 leading-relaxed">{card.conselho}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
