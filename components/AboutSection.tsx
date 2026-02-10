
import React from 'react';
import { TEAM, ROADMAP } from '../constants';

const AboutSection: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-1000 space-y-32 py-12">
      {/* Vision & Mission */}
      <section className="text-center max-w-4xl mx-auto space-y-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10"></div>
        <h2 className="text-6xl font-black font-display uppercase tracking-tighter">Waking Up the Ecosystem</h2>
        <p className="text-2xl text-gray-400 font-medium leading-relaxed italic">
          "The biggest problem with meme projects is that they launch, spike, and fall into a deep, permanent sleep. DozeBun is the alarm clock."
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-16">
          <div className="space-y-2">
            <div className="text-5xl font-black text-emerald-500">1.2M+</div>
            <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Tokens Circulating</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-black text-purple-500">2.5K</div>
            <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Unique Burrows</div>
          </div>
          <div className="space-y-2 col-span-2 md:col-span-1">
            <div className="text-5xl font-black text-blue-500">24/7</div>
            <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Awake Community</div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="relative">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-6">
           <h3 className="text-5xl font-black font-display uppercase tracking-tighter">The Journey</h3>
           <div className="h-px flex-1 bg-white/10 hidden md:block mx-12"></div>
           <span className="text-emerald-500 font-black tracking-widest text-xs uppercase bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20">Phase 01 Active</span>
        </div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <section>
        <div className="text-center mb-20 space-y-4">
           <h3 className="text-5xl font-black font-display uppercase tracking-tighter">Core Contributors</h3>
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

      {/* Join the Movement CTA */}
      <section className="glass-effect rounded-[5rem] p-16 lg:p-24 text-center space-y-12 relative overflow-hidden border border-white/5 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-purple-600 to-emerald-500"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 space-y-8">
          <h3 className="text-6xl md:text-8xl font-black font-display uppercase tracking-tighter leading-none">Don't Get <br/> Left Behind</h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            The $DOZE community is built on humor, speed, and absolute transparency. Join the Discord to vote on the next meme-factory content drop.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
             <a href="#" className="bg-white/5 hover:bg-white/10 px-10 py-5 rounded-[2rem] border border-white/10 transition-all flex flex-col items-center group">
                <span className="text-xl font-black group-hover:text-emerald-400 transition-colors">DISCORD</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">24/7 Support</span>
             </a>
             <a href="#" className="bg-white/5 hover:bg-white/10 px-10 py-5 rounded-[2rem] border border-white/10 transition-all flex flex-col items-center group">
                <span className="text-xl font-black group-hover:text-purple-400 transition-colors">TWITTER</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Daily Alpha</span>
             </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
