
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TemporaryPage = () => {
  const { pageName } = useParams();
  
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-xl w-full bg-card-bg/50 backdrop-blur-sm rounded-lg border border-white/10 p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-logo-gradient bg-[length:200%_100%] animate-logo-shine inline-block">
          {pageName || 'Página Temporária'}
        </h1>
        
        <div className="bg-white/5 rounded-lg p-8 mb-6">
          <p className="text-lg mb-4">
            Esta é uma página temporária para demonstração.
          </p>
          <p className="text-white/70">
            Em uma implementação completa, esta página teria conteúdo real relacionado a "{pageName || 'esta seção'}".
          </p>
        </div>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-neon-red hover:bg-neon-red/80 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para Home
        </Link>
      </div>
    </div>
  );
};

export default TemporaryPage;
