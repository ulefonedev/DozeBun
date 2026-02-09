
import React from 'react';
import { Section, WalletState } from '../types';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useI18n } from '../App';

interface NavigationProps {
  activeTab: Section;
  setActiveTab: (tab: Section) => void;
  scrolled: boolean;
  wallet: WalletState;
  onConnect: () => void;
  onOpenProfile: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, scrolled, wallet, onConnect, onOpenProfile }) => {
  const { t } = useI18n();
  
  const tabs: { id: Section; label: string }[] = [
    { id: 'home', label: t('nav_home') },
    { id: 'details', label: t('nav_details') },
    { id: 'blockchain', label: t('nav_blockchain') },
    { id: 'marketplace', label: t('nav_marketplace') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass-effect' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
          <div className="w-12 h-12 relative overflow-hidden rounded-full border-2 border-emerald-500/30 bg-[#0b0e14] shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <img 
              src="media/img/home/logo.png" 
              alt="DozeBun Logo" 
              className="w-full h-full object-cover scale-150 translate-y-2 group-hover:scale-125 transition-transform duration-500"
            />
          </div>
          <span className="text-xl font-bold font-display tracking-tight group-hover:text-emerald-400 transition-colors uppercase">$DOZE</span>
        </div>

        <div className="hidden md:flex items-center gap-1 glass-effect px-1 py-1 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <WalletMultiButton />
          {wallet.connected && (
            <button 
              onClick={onOpenProfile}
              className="bg-white/5 border border-white/10 hover:bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition-all group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">🐰</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
