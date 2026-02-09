
import React from 'react';
import { NFTMetadata, WalletState } from '../types';
import { useI18n } from '../App';

interface MarketplaceSectionProps {
  nfts: NFTMetadata[];
  onBuy: (nft: NFTMetadata) => void;
  wallet: WalletState;
}

const MarketplaceSection: React.FC<MarketplaceSectionProps> = ({ nfts, onBuy, wallet }) => {
  const { t } = useI18n();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-1000 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="text-left w-full">
          <h2 className="text-5xl font-bold font-display mb-3 tracking-tighter uppercase">DozeBun Market</h2>
          <p className="text-gray-500 text-lg">Trade your awakened rabbits with the community using $DOZE utility.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/5 text-sm font-black uppercase tracking-widest text-emerald-500">
             {t('min_price')}: 1.02 SOL
           </div>
           <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/5 text-sm font-black uppercase tracking-widest text-purple-500">
             {t('total_trade')}: 1.2k SOL
           </div>
        </div>
      </div>

      {nfts.length === 0 ? (
        <div className="text-center py-32 glass-effect rounded-[3rem] border border-dashed border-white/10">
          <div className="text-8xl mb-6 grayscale opacity-20">🐰</div>
          <h3 className="text-2xl font-bold text-gray-500">{t('empty_burrow')}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {nfts.map((nft) => (
            <div key={nft.id} className="glass-effect rounded-[2.5rem] p-6 group hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-500/5">
              <div className="aspect-square rounded-[1.5rem] overflow-hidden mb-6 relative shadow-inner bg-black/50">
                <img src={nft.image} alt={nft.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-emerald-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg">
                  {nft.rarity}
                </div>
              </div>
              <h3 className="font-bold text-xl mb-1 text-left">{nft.name}</h3>
              <div className="flex justify-between items-center mb-6">
                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest truncate max-w-[100px]">{t('seller_label')}: {nft.owner}</div>
                <div className="text-emerald-500 font-black text-lg">{nft.price} SOL</div>
              </div>
              <button 
                onClick={() => onBuy(nft)}
                className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all duration-300"
              >
                {t('acquire_button')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplaceSection;
