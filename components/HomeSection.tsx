
import React from 'react';
import { TEAM, ROADMAP } from '../constants';
import { useI18n } from '../App';

const HomeSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-48 flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center space-y-10 py-12 relative flex flex-col items-center w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] -z-10"></div>
        
        {/* Hero Character Image */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-4 floating">
           <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full animate-pulse"></div>
           <img 
             src="https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/home/hero_bunny.png" 
             alt="DozeBun Hero" 
             className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]"
           />
        </div>

        <h1 className="text-6xl md:text-9xl font-bold font-display leading-tight max-w-5xl mx-auto uppercase">
          {t('hero_title')}
        </h1>
        <p className="text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed italic">
          {t('hero_subtitle')}
        </p>
        
        <div className="flex flex-col items-center gap-16 max-w-4xl mx-auto mt-20">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold font-display text-emerald-400 uppercase tracking-widest">Waking Up for $DOZE</h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              DozeBun is more than a collection—it's a movement. A rabbit that overslept is now waking up to a world of NFTs, 
              bringing humor, creativity, and the power of the $DOZE token to revolutionize the Solana meme market. 
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 w-full">
            <div className="glass-effect p-10 rounded-3xl border-l-8 border-red-500 text-left hover:scale-[1.02] transition-transform">
              <h4 className="font-black text-2xl text-red-500 mb-3 flex items-center gap-3 uppercase">
                <span>💤</span> {t('problem_title')}
              </h4>
              <p className="text-gray-400 text-lg">{t('problem_desc')}</p>
            </div>
            <div className="glass-effect p-10 rounded-3xl border-l-8 border-emerald-500 text-left hover:scale-[1.02] transition-transform shadow-[0_10px_40px_rgba(16,185,129,0.1)]">
              <h4 className="font-black text-2xl text-emerald-500 mb-3 flex items-center gap-3 uppercase">
                <span>⏰</span> {t('solution_title')}
              </h4>
              <p className="text-gray-400 text-lg">{t('solution_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Meme Factory Section */}
      <section className="glass-effect rounded-[4rem] p-16 grid lg:grid-cols-2 gap-16 items-center border border-emerald-500/10 w-full max-w-7xl shadow-2xl">
        <div className="space-y-8">
          <h2 className="text-5xl font-bold font-display leading-tight text-emerald-400 uppercase">{t('factory_title')}</h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            {t('factory_desc')}
          </p>
        </div>
        <div className="relative h-[450px] bg-black/40 rounded-[3rem] overflow-hidden border border-white/5 flex items-center justify-center shadow-inner group">
           <img 
             src="https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/home/artist_working.png" 
             alt="DozeBun Artist Working" 
             className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-700"
           />
        </div>
      </section>

      {/* Join the Burrow (Final CTA) */}
      <section className="text-center py-32 space-y-12 w-full max-w-4xl relative">
         <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] -z-10"></div>
         <h2 className="text-7xl font-black font-display tracking-tighter leading-tight uppercase">{t('cta_title')}</h2>
         <p className="text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
           {t('cta_desc')}
         </p>
         <button className="bg-emerald-500 text-black px-16 py-8 rounded-[2rem] font-black text-2xl hover:scale-110 hover:rotate-3 transition-all shadow-[0_0_80px_rgba(16,185,129,0.3)] group uppercase">
            {t('cta_button')} 
            <span className="inline-block ml-4 group-hover:translate-x-2 transition-transform">🚀</span>
         </button>
      </section>
    </div>
  );
};

export default HomeSection;
