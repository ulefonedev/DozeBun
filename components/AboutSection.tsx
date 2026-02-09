
import React from 'react';
import { TEAM, ROADMAP } from '../constants';

const AboutSection: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-1000 space-y-24">
      {/* Vision */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold font-display">Our Vision & Goals</h2>
        <p className="text-xl text-gray-400">
          Solana Pulse was born out of the need for real utility in the high-velocity Solana meme ecosystem. Our goal is to create a sustainable flywheel where token value drives NFT demand, and NFT utility reinforces token liquidity.
        </p>
        <div className="flex justify-center gap-12 pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-500">10k+</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Holders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500">50m+</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Market Cap</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">2.5k</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">NFT Mints</div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section>
        <div className="flex items-center justify-between mb-12">
           <h3 className="text-3xl font-bold font-display">Core Contributors</h3>
           <div className="h-px flex-1 bg-white/10 mx-8"></div>
           <span className="text-gray-500 font-medium">5 Visionaries</span>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {TEAM.map((member, i) => (
            <div key={i} className="group relative">
              <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative glass-effect p-6 rounded-3xl text-center border border-white/5 hover:border-emerald-500/50 transition-all">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all ring-2 ring-white/10 ring-offset-4 ring-offset-[#0b0e14]">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="relative">
        <h3 className="text-3xl font-bold font-display mb-12 text-center">Development Roadmap</h3>
        <div className="max-w-4xl mx-auto space-y-8">
          {ROADMAP.map((item, i) => (
            <div key={i} className="relative pl-12 border-l-2 border-white/5 pb-8 last:pb-0 group">
              <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-[#0b0e14] ${
                item.status === 'completed' ? 'bg-emerald-500' : 
                item.status === 'ongoing' ? 'bg-yellow-500 animate-pulse' : 'bg-white/10'
              }`}></div>
              <div className="glass-effect p-6 rounded-2xl group-hover:translate-x-2 transition-transform">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.quarter}</span>
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                     item.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 
                     item.status === 'ongoing' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-white/5 text-gray-500'
                   }`}>{item.status}</span>
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Goals */}
      <section className="glass-effect rounded-[3rem] p-12 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-purple-600 to-emerald-500"></div>
        <h3 className="text-3xl font-bold font-display">Social Impact & Growth</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We aim to dominate social narratives through high-engagement content, influencer partnerships, and transparent developer updates. Join us on our journey to the moon.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
           <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
              <div className="text-xl font-bold">Discord</div>
              <div className="text-sm text-emerald-500">24/7 Community Support</div>
           </div>
           <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
              <div className="text-xl font-bold">Twitter</div>
              <div className="text-sm text-purple-500">Daily Alpha Drops</div>
           </div>
           <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
              <div className="text-xl font-bold">Telegram</div>
              <div className="text-sm text-blue-500">Instant Trade Alerts</div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
