import React, { useRef } from 'react';
import { History as HistoryIcon, Trash2, Share2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { toPng } from 'html-to-image';

const HistoryPage: React.FC = () => {
  const { history, deleteHistory } = useAppContext();
  const historyRef = useRef<HTMLDivElement>(null);

  const handleShare = async (id: string) => {
    const el = document.getElementById(`history-card-${id}`);
    if (!el) return;

    try {
      const dataUrl = await toPng(el, { quality: 0.95, backgroundColor: '#020617' });
      
      if (navigator.share) {
        const file = new File([await (await fetch(dataUrl)).blob()], 'oraculo-mistico.png', { type: 'image/png' });
        await navigator.share({
          title: 'Minha Leitura do Oráculo Místico',
          text: 'Veja minha tiragem de Tarot!',
          files: [file]
        });
      } else {
        const link = document.createElement('a');
        link.download = `tiragem-tarot-${new Date().getTime()}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Erro ao compartilhar', err);
      // Fallback
      const link = document.createElement('a');
      const dataUrl = await toPng(el, { quality: 0.95, backgroundColor: '#020617' });
      link.download = `tiragem-tarot-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="py-8" ref={historyRef}>
      <div className="flex items-center gap-3 mb-10">
        <HistoryIcon className="text-amber-500" size={32} />
        <h2 className="text-3xl font-serif text-slate-100">Histórico de Consultas</h2>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
          <HistoryIcon className="mx-auto text-slate-700 mb-4" size={48} />
          <p className="text-xl text-slate-400 font-serif">Seu histórico está vazio.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {history.map(item => (
            <div 
              key={item.id} 
              id={`history-card-${item.id}`}
              className="bg-slate-900 rounded-2xl border border-indigo-900/50 p-6 md:p-8 shadow-lg relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-amber-500 text-sm font-bold tracking-wider uppercase mb-1">
                    {new Date(item.date).toLocaleDateString('pt-BR')} • {item.spreadType} Carta(s)
                  </div>
                  <h3 className="text-2xl font-serif text-slate-100">{item.question}</h3>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare(item.id)}
                    className="p-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/30 rounded-lg transition-colors"
                    title="Compartilhar"
                  >
                    <Share2 size={20} />
                  </button>
                  <button 
                    onClick={() => deleteHistory(item.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {item.cards.map((c, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-full aspect-[2/3] bg-slate-800 rounded-lg border border-slate-700 relative overflow-hidden group">
                      <img src={c.card.imagem} alt={c.card.nome} className={`absolute inset-0 w-full h-full object-cover ${c.isReversed ? 'rotate-180' : ''}`} />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                         <span className="text-xs font-bold text-white drop-shadow-md">{c.card.nome} {c.isReversed ? '(Inv)' : ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="text-slate-300 italic">{item.summary}</p>
              </div>
              
              {/* Marca d'água oculta para o print */}
              <div className="hidden print-watermark mt-6 text-center text-amber-500/50 font-serif border-t border-slate-800 pt-4">
                Oráculo Místico
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
