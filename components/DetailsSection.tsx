
import React from 'react';

const DetailsSection: React.FC = () => {
  const RAW_NFT_BASE = "https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/nft";

  const nftTiers = [
    { name: 'Snoozer', rarity: '60%', benefits: ['Meme Multiplier 1x', 'Doze Chat Access'], color: 'text-gray-400', img: `${RAW_NFT_BASE}/tier_snoozer.png` },
    { name: 'Dreamer', rarity: '30%', benefits: ['Staking 1.5x', 'Private Alpha', 'DAO Voting'], color: 'text-emerald-400', img: `${RAW_NFT_BASE}/tier_dreamer.png` },
    { name: 'Waker', rarity: '8%', benefits: ['Revenue Share 1%', 'Early Merch', 'VIP WL'], color: 'text-purple-400', img: `${RAW_NFT_BASE}/tier_waker.png` },
    { name: 'Enlightened', rarity: '2%', benefits: ['Rev-Share 5%', 'Exclusive Events', 'Advisory Role'], color: 'text-yellow-400', img: `${RAW_NFT_BASE}/tier_enlightened.png` },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-1000 space-y-24">
      <div className="max-w-4xl">
        <h2 className="text-5xl md:text-6xl font-black font-display mb-8 uppercase tracking-tighter">The Genesis Burrows</h2>
        <p className="text-xl text-gray-400 leading-relaxed font-medium">
          The DozeBun collection consists of 2,500 programmatically generated rabbits, each with distinct levels of awakening. 
          The rarer your rabbit, the deeper its connection to the $DOZE ecosystem.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {nftTiers.map((tier, i) => (
          <div key={i} className="glass-effect rounded-[3rem] p-8 hover:translate-y-[-10px] transition-all border border-white/5 hover:border-emerald-500/30 group shadow-2xl">
            <div className="aspect-square bg-black/40 rounded-[2rem] mb-8 relative overflow-hidden">
              <img 
                src={tier.img} 
                alt={tier.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/200?text=TIER")}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-12">
                <span className={`font-black uppercase tracking-widest text-[10px] ${tier.color}`}>{tier.rarity} CHANCE</span>
              </div>
            </div>
            <h3 className={`text-4xl font-black mb-6 font-display uppercase tracking-tighter ${tier.color}`}>{tier.name}</h3>
            <ul className="space-y-3">
               {tier.benefits.map((b, idx) => (
                 <li key={idx} className="text-xs text-gray-500 font-bold flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                    {b}
                 </li>
               ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Seção Extra Decorativa com Link RAW */}
      <div className="glass-effect rounded-[4rem] p-12 lg:p-20 grid lg:grid-cols-2 gap-20 items-center border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="space-y-10 text-left relative z-10">
          <h3 className="text-5xl font-black font-display uppercase tracking-tighter leading-none">Instant <br/> Awakening</h3>
          <p className="text-gray-400 text-xl font-medium leading-relaxed">
            No waiting. No whitelist. No sleep. <br/> Just pure Solana-speed minting that delivers your digital rabbit directly to the blockchain.
          </p>
        </div>
        <div className="relative group p-4">
          <div className="aspect-square glass-effect rounded-[3.5rem] p-6 border-white/10 shadow-inner overflow-hidden flex items-center justify-center bg-black/20">
             <img 
               src="https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/home/mint_hero.png" 
               alt="Mint Hero"
               className="rounded-[2.5rem] w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000" 
               onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400?text=HERO")}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
