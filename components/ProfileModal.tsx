
import React, { useState } from 'react';
import { WalletState, NFTMetadata } from '../types';
import { useI18n } from '../App';

interface ProfileModalProps {
  wallet: WalletState;
  nfts: NFTMetadata[];
  onClose: () => void;
  onDisconnect: () => void;
  onSell: (nft: NFTMetadata, price: number) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ wallet, nfts, onClose, onDisconnect, onSell }) => {
  const [listingNftId, setListingNftId] = useState<number | null>(null);
  const [sellPrice, setSellPrice] = useState<string>("1.02");
  const { t } = useI18n();

  const handleConfirmSale = (nft: NFTMetadata) => {
    const price = parseFloat(sellPrice);
    if (isNaN(price) || price < 1.02) {
      alert("Minimum price is 1.02 SOL. Please adjust.");
      return;
    }
    onSell(nft, price);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative glass-effect w-full max-w-3xl rounded-[3rem] border border-white/10 overflow-hidden animate-in zoom-in-95 duration-300 shadow-[0_0_100px_rgba(16,185,129,0.15)]">
        
        {/* Header */}
        <div className="p-10 border-b border-white/5 flex justify-between items-start bg-gradient-to-b from-white/5 to-transparent">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[1.8rem] bg-gradient-to-tr from-emerald-500 to-purple-600 p-0.5 shadow-xl">
               <div className="w-full h-full bg-[#0b0e14] rounded-[1.7rem] flex items-center justify-center text-4xl overflow-hidden">
                 <img src="media/img/home/logo.png" className="w-full h-full object-cover scale-150 translate-y-2" alt="Profile Avatar" />
               </div>
            </div>
            <div className="text-left">
              <div className="text-xs text-emerald-500 font-black mb-1 tracking-[0.3em] uppercase">{t('profile_title')}</div>
              <div className="text-2xl font-black font-display tracking-tighter uppercase">{wallet.address}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-10 grid md:grid-cols-3 gap-12">
          
          {/* Wallet Stats Sidebar */}
          <div className="md:col-span-1 space-y-8 text-left">
            <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 shadow-inner">
              <div className="text-[10px] text-gray-500 font-black mb-2 uppercase tracking-widest">Balance</div>
              <div className="text-4xl font-black text-emerald-500 tabular-nums">{wallet.balance.toFixed(2)} <span className="text-lg">SOL</span></div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={onDisconnect}
                className="w-full py-4 rounded-2xl bg-red-500/5 text-red-500 font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all text-xs border border-red-500/10"
              >
                {t('disconnect')}
              </button>
            </div>
          </div>

          {/* NFT List */}
          <div className="md:col-span-2 space-y-6 text-left">
            <h4 className="font-black flex justify-between items-end uppercase tracking-tighter text-xl">
              <span>{t('my_nfts')}</span>
              <span className="text-gray-600 text-xs font-bold tracking-normal">{nfts.length} Rabbits</span>
            </h4>
            
            <div className="h-[380px] overflow-y-auto pr-4 space-y-4 custom-scrollbar">
              {nfts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-700 border-2 border-dashed border-white/5 rounded-[2rem] bg-black/20 p-8 text-center">
                  <span className="text-5xl mb-4 opacity-20">💤</span>
                  <span className="text-sm font-bold uppercase tracking-widest opacity-40">Shhh... burrows sleeping</span>
                </div>
              ) : (
                nfts.map((nft) => (
                  <div 
                    key={nft.id} 
                    className={`relative p-4 rounded-[1.8rem] border transition-all duration-300 ${
                      listingNftId === nft.id 
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                      : 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="relative cursor-pointer" onClick={() => setListingNftId(listingNftId === nft.id ? null : nft.id)}>
                        <img src={nft.image} className="w-20 h-20 rounded-2xl object-cover shadow-lg border border-white/5" alt={nft.name} />
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg">{t('awake_status')}</div>
                      </div>
                      
                      <div className="flex-1 cursor-pointer" onClick={() => setListingNftId(listingNftId === nft.id ? null : nft.id)}>
                        <div className="font-black text-lg tracking-tighter uppercase">{nft.name}</div>
                        <div className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">{nft.rarity} {t('rarity_rank')}</div>
                      </div>

                      {listingNftId !== nft.id && (
                        <button 
                          onClick={() => setListingNftId(nft.id)}
                          className="bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          {t('sell_button')}
                        </button>
                      )}
                    </div>

                    {/* Inline Sell Form */}
                    {listingNftId === nft.id && (
                      <div className="mt-4 pt-4 border-t border-white/10 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">{t('price_label')} (SOL)</label>
                              <div className="relative">
                                <input 
                                  type="number" 
                                  step="0.01"
                                  min="1.02"
                                  value={sellPrice}
                                  onChange={(e) => setSellPrice(e.target.value)}
                                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-colors text-white"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-500">SOL</span>
                              </div>
                            </div>
                            <div className="flex items-end gap-2">
                              <button 
                                onClick={() => handleConfirmSale(nft)}
                                className="bg-emerald-500 text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                              >
                                List
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
