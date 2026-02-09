
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const FloatingSocials: React.FC = () => {
  return (
    <div className="fixed right-6 bottom-32 z-40 flex flex-col gap-3">
      {SOCIAL_LINKS.map((social, i) => (
        <a
          key={i}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 glass-effect rounded-2xl flex items-center justify-center group hover:bg-emerald-500 transition-all duration-300 floating shadow-xl"
          style={{ animationDelay: `${i * 0.2}s` }}
          title={social.name}
        >
          <img 
            src={social.icon} 
            alt={social.name} 
            className="w-6 h-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:invert transition-all" 
          />
        </a>
      ))}
      <div className="w-12 h-px bg-white/10 my-2"></div>
      <button className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all group">
         <svg className="w-5 h-5 text-gray-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
      </button>
    </div>
  );
};

export default FloatingSocials;
