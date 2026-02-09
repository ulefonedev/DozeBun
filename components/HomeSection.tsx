
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
             src="media/img/home/hero_bunny.png" 
             alt="DozeBun Artist" 
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

      {/* Security, Trust & Audit */}
      <section className="text-center max-w-6xl mx-auto space-y-16 w-full">
        <h2 className="text-5xl font-bold font-display uppercase">{t('security_title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-effect p-10 rounded-[2.5rem] border border-white/5 space-y-4 hover:border-emerald-500/30 transition-all">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500 text-3xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">🛡️</div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter">{t('lp_burned')}</h3>
            <p className="text-gray-400 text-sm">{t('lp_burned_desc')}</p>
          </div>
          <div className="glass-effect p-10 rounded-[2.5rem] border border-white/5 space-y-4 hover:border-purple-500/30 transition-all">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto text-purple-500 text-3xl shadow-[0_0_20px_rgba(168,85,247,0.2)]">📜</div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter">{t('audit')}</h3>
            <p className="text-gray-400 text-sm">{t('audit_desc')}</p>
          </div>
          <div className="glass-effect p-10 rounded-[2.5rem] border border-white/5 space-y-4 hover:border-blue-500/30 transition-all">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-500 text-3xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">🔒</div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter">{t('ownership')}</h3>
            <p className="text-gray-400 text-sm">{t('ownership_desc')}</p>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="text-center max-w-4xl mx-auto space-y-12">
        <h2 className="text-5xl font-bold font-display uppercase">{t('manifesto_title')}</h2>
        <div className="glass-effect p-12 rounded-[3rem] border border-white/10 relative overflow-hidden group shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-colors"></div>
          <p className="text-xl text-gray-300 leading-relaxed relative z-10 italic">
            "In a market of copy-cats and sleepy projects, DOZE stands as a testament to the power of a second chance. 
            Our rabbit represents every investor who missed a trend because they were 'asleep'. 
            Today, we wake up together. We choose creativity over stagnation, humor over boredom, and community over isolation."
          </p>
        </div>
      </section>

      {/* Community Rewards & Staking */}
      <section className="text-center max-w-5xl mx-auto space-y-16 w-full">
        <h2 className="text-5xl font-bold font-display uppercase">{t('rewards_title')}</h2>
        <div className="grid lg:grid-cols-2 gap-10">
           <div className="glass-effect p-10 rounded-[3rem] flex flex-col items-center gap-6 border border-emerald-500/10">
              <div className="text-6xl">💰</div>
              <h3 className="text-3xl font-bold uppercase">{t('airdrops')}</h3>
              <p className="text-gray-400">{t('airdrops_desc')}</p>
              <div className="bg-emerald-500/10 text-emerald-400 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest">LOYALTY</div>
           </div>
           <div className="glass-effect p-10 rounded-[3rem] flex flex-col items-center gap-6 border border-purple-500/10">
              <div className="text-6xl">💎</div>
              <h3 className="text-3xl font-bold uppercase">{t('staking')}</h3>
              <p className="text-gray-400">{t('staking_desc')}</p>
              <div className="bg-purple-500/10 text-purple-400 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest">PASSIVE</div>
           </div>
        </div>
      </section>

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
             src="media/img/home/artist_working.png" 
             alt="DozeBun Artist Working" 
             className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-700"
           />
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="space-y-12 w-full text-center">
        <h2 className="text-5xl font-bold font-display mb-4 uppercase">{t('tokenomics_title')}</h2>
        <div className="grid md:grid-cols-4 gap-8 w-full">
          {[
            { label: "Total Supply", value: "1,000,000,000", detail: "$DOZE Tokens" },
            { label: "Liquidity", value: "Locked", detail: "Burned forever" },
            { label: "Tax", value: "0% / 0%", detail: "Buy & Sell" },
            { label: "Mint Price", value: "0.5 SOL", detail: "Fixed Genesis" },
          ].map((stat, i) => (
            <div key={i} className="glass-effect p-8 rounded-[2rem] text-center border border-white/5 hover:scale-105 transition-all">
              <div className="text-xs text-emerald-500 font-bold uppercase tracking-widest mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="max-w-4xl mx-auto space-y-16 w-full">
        <div className="text-center">
          <h2 className="text-5xl font-bold font-display mb-4 uppercase">{t('roadmap_title')}</h2>
        </div>
        <div className="grid gap-6 text-left">
          {ROADMAP.map((item, i) => (
            <div key={i} className="glass-effect p-10 rounded-[2.5rem] flex items-center gap-10 border border-white/5">
              <div className="text-4xl font-black text-white/5 shrink-0 font-display min-w-[120px]">
                {item.quarter}
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
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
