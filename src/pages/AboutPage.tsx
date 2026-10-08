import React from 'react';
import { BookOpen } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-8 max-w-3xl mx-auto space-y-10">
      <div className="flex flex-col items-center text-center mb-12">
        <BookOpen className="text-amber-500 mb-4" size={48} />
        <h2 className="text-4xl font-serif text-slate-100 mb-4">Sobre o Tarot</h2>
        <p className="text-xl text-indigo-300">Um guia rápido para entender o Oráculo Místico</p>
      </div>

      <section className="bg-slate-900/50 p-8 rounded-2xl border border-indigo-900/50">
        <h3 className="text-2xl font-serif text-amber-400 mb-4">O que é o Tarot?</h3>
        <p className="text-slate-300 leading-relaxed mb-4">
          O Tarot é um baralho composto por 78 cartas, dividido em duas partes principais: os Arcanos Maiores (22 cartas) e os Arcanos Menores (56 cartas). A palavra "arcano" significa segredo ou mistério. Historicamente usado como um jogo na Europa, o Tarot evoluiu para uma poderosa ferramenta simbólica para reflexão, autoconhecimento e meditação.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-slate-900/50 p-8 rounded-2xl border border-indigo-900/50">
          <h3 className="text-2xl font-serif text-amber-400 mb-4">Arcanos Maiores</h3>
          <p className="text-slate-300 leading-relaxed">
            As 22 cartas dos Arcanos Maiores representam as grandes lições da vida, questões cármicas e os temas centrais da jornada humana (frequentemente chamada de "A Jornada do Louco"). Quando aparecem em uma leitura, costumam indicar energias poderosas e transformações significativas a longo prazo.
          </p>
        </section>

        <section className="bg-slate-900/50 p-8 rounded-2xl border border-indigo-900/50">
          <h3 className="text-2xl font-serif text-amber-400 mb-4">Arcanos Menores</h3>
          <p className="text-slate-300 leading-relaxed">
            As 56 cartas dos Arcanos Menores refletem os desafios, emoções e situações do nosso dia a dia. Eles oferecem detalhes práticos e demonstram como as energias dos Arcanos Maiores estão se manifestando na nossa rotina. São divididos em 4 naipes.
          </p>
        </section>
      </div>

      <section className="bg-slate-900/50 p-8 rounded-2xl border border-indigo-900/50">
        <h3 className="text-2xl font-serif text-amber-400 mb-6">Os Quatro Naipes</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-slate-800 p-4 rounded-xl">
            <h4 className="text-lg font-bold text-red-400 mb-2">🔥 Paus (Fogo)</h4>
            <p className="text-sm text-slate-400">Ação, criatividade, paixão, energia, motivação e crescimento pessoal.</p>
          </div>
          <div className="border border-slate-800 p-4 rounded-xl">
            <h4 className="text-lg font-bold text-blue-400 mb-2">💧 Copas (Água)</h4>
            <p className="text-sm text-slate-400">Emoções, intuição, relacionamentos, amor e o mundo interior.</p>
          </div>
          <div className="border border-slate-800 p-4 rounded-xl">
            <h4 className="text-lg font-bold text-gray-300 mb-2">💨 Espadas (Ar)</h4>
            <p className="text-sm text-slate-400">Pensamento, intelecto, comunicação, conflitos, verdades e clareza mental.</p>
          </div>
          <div className="border border-slate-800 p-4 rounded-xl">
            <h4 className="text-lg font-bold text-emerald-400 mb-2">🌍 Ouros (Terra)</h4>
            <p className="text-sm text-slate-400">Mundo material, finanças, trabalho, saúde, estabilidade e manifestação física.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 p-8 rounded-2xl border border-indigo-900/50">
        <h3 className="text-2xl font-serif text-amber-400 mb-4">Cartas Invertidas</h3>
        <p className="text-slate-300 leading-relaxed">
          Quando uma carta sai de cabeça para baixo em uma tiragem, ela é chamada de "invertida". Isso não significa necessariamente algo ruim. Geralmente, indica que a energia da carta está bloqueada, internalizada, ocorrendo em excesso ou falta, ou sofrendo algum tipo de atraso.
        </p>
      </section>
      
      <div className="mt-12 p-6 border border-amber-500/30 bg-amber-900/10 rounded-xl text-center">
        <p className="text-amber-200/70 text-sm font-light">
          <strong>Aviso:</strong> O Tarot é utilizado como ferramenta de reflexão, autoconhecimento e entretenimento. As interpretações apresentadas não são previsões garantidas e não substituem orientação profissional psicológica, médica, jurídica ou financeira.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
