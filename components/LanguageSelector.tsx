
import React, { useState } from 'react';
import { useI18n } from '../App';
import { Language } from '../i18n';

const LanguageSelector: React.FC = () => {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  const options: { id: Language; label: string; flag: string }[] = [
    { id: 'en', label: 'English', flag: '🇺🇸' },
    { id: 'pt', label: 'Português', flag: '🇧🇷' },
    { id: 'es', label: 'Español', flag: '🇪🇸' },
    { id: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  const currentFlag = options.find(o => o.id === lang)?.flag || '🇺🇸';

  return (
    <div className="fixed left-6 bottom-32 z-40">
      <div className={`flex flex-col gap-2 mb-2 transition-all duration-300 origin-bottom ${open ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-4'}`}>
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              setLang(opt.id);
              setOpen(false);
            }}
            className={`w-12 h-12 glass-effect rounded-2xl flex items-center justify-center text-xl transition-all hover:bg-emerald-500/20 border border-white/5 ${lang === opt.id ? 'border-emerald-500/50 bg-emerald-500/10' : ''}`}
            title={opt.label}
          >
            {opt.flag}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => setOpen(!open)}
        className={`w-12 h-12 glass-effect rounded-2xl flex items-center justify-center text-xl transition-all shadow-xl hover:scale-110 active:scale-95 border-2 ${open ? 'border-emerald-500' : 'border-white/5'}`}
      >
        <span className={open ? 'rotate-180 transition-transform' : 'transition-transform'}>
          {currentFlag}
        </span>
      </button>
    </div>
  );
};

export default LanguageSelector;
