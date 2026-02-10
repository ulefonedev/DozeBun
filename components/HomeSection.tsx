
import React from 'react';
import { useI18n } from '../App';
import { TEAM, ROADMAP } from '../constants';

const HomeSection: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-48 flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center space-y-10 py-12 relative flex flex-col items-center w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] -z-10"></div>
        
        {/* Hero Character Image */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 mb-4 floating">
           <div className="absolute inset-0 bg-emerald-500/20 blur-[80px] rounded-full animate-pulse"></div>
           <img 
             src="https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/home/hero_bunny.png" 
             alt="DozeBun Hero" 
             className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(16,185,129,0.4)]"
             onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400?text=BUNNY")}
           />
        </div>

        <h1 className="text-6xl md:text-9xl font-black font-display leading-tight max-w-5xl mx-auto uppercase tracking-tighter">
          {t('hero_title')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed italic opacity-80 font-medium">
          {t('hero_subtitle')}
        </p>
        
        <div className="flex flex-col items-center gap-16 max-w-4xl mx-auto mt-20">
          <div className="grid md:grid-cols-2 gap-8 w-full">
            <div className="glass-effect p-10 rounded-[3rem] border-l-8 border-red-500 text-left hover:scale-[1.02] transition-transform">
              <h4 className="font-black text-2xl text-red-500 mb-3 flex items-center gap-3 uppercase">
                <span>💤</span> {t('problem_title')}
              </h4>
              <p className="text-gray-400 text-lg">{t('problem_desc')}</p>
            </div>
            <div className="glass-effect p-10 rounded-[3rem] border-l-8 border-emerald-500 text-left hover:scale-[1.02] transition-transform shadow-[0_10px_40px_rgba(16,185,129,0.1)]">
              <h4 className="font-black text-2xl text-emerald-500 mb-3 flex items-center gap-3 uppercase">
                <span>⏰</span> {t('solution_title')}
              </h4>
              <p className="text-gray-400 text-lg">{t('solution_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Meme Factory Section */}
      <section className="glass-effect rounded-[4rem] p-12 lg:p-20 grid lg:grid-cols-2 gap-16 items-center border border-emerald-500/10 w-full max-w-7xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full"></div>
        <div className="space-y-8 relative z-10">
          <h2 className="text-5xl md:text-6xl font-black font-display leading-tight text-emerald-400 uppercase tracking-tighter">{t('factory_title')}</h2>
          <p className="text-xl text-gray-400 leading-relaxed font-medium">
            {t('factory_desc')}
          </p>
        </div>
        <div className="relative h-[450px] bg-black/40 rounded-[3rem] overflow-hidden border border-white/5 flex items-center justify-center shadow-inner group p-4">
           <img 
             src="https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/home/artist_working.png" 
             alt="DozeBun Artist Working" 
             className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700"
             onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/500?text=ARTIST")}
           />
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="w-full max-w-7xl relative">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-6">
           <h3 className="text-5xl md:text-6xl font-black font-display uppercase tracking-tighter">{t('roadmap_title')}</h3>
           <div className="h-px flex-1 bg-white/10 hidden md:block mx-12"></div>
           <span className="text-emerald-500 font-black tracking-widest text-xs uppercase bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20">Phase 01 Active</span>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ROADMAP.map((item, i) => (
            <div key={i} className="glass-effect p-8 rounded-[3rem] border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="flex justify-between items-start mb-6">
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{item.quarter}</span>
                 <div className={`w-3 h-3 rounded-full ${
                   item.status === 'completed' ? 'bg-emerald-500' : 
                   item.status === 'ongoing' ? 'bg-yellow-500 animate-pulse' : 'bg-white/10'
                 }`}></div>
              </div>
              <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter leading-tight group-hover:text-emerald-400 transition-colors">{item.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full max-w-7xl">
        <div className="text-center mb-20 space-y-4">
           <h3 className="text-5xl font-black font-display uppercase tracking-tighter">{t('team_title')}</h3>
           <p className="text-gray-500 uppercase text-xs font-black tracking-[0.4em]">The Visionaries Behind the Alarm</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {TEAM.map((member, i) => (
            <div key={i} className="group flex flex-col items-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-all rounded-full"></div>
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ring-2 ring-white/5 ring-offset-8 ring-offset-[#0b0e14] group-hover:ring-emerald-500/50">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                </div>
              </div>
              <h4 className="font-black text-xl uppercase tracking-tighter mb-1 text-center">{member.name}</h4>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-center">{member.role}</p>
              <p className="text-gray-600 text-[11px] text-center leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 max-w-[180px]">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Burrow (Final CTA) */}
      <section className="text-center py-32 space-y-12 w-full max-w-4xl relative">
         <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] -z-10"></div>
         <h2 className="text-7xl md:text-8xl font-black font-display tracking-tighter leading-tight uppercase">{t('cta_title')}</h2>
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
