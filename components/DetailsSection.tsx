
import React from 'react';

const DetailsSection: React.FC = () => {
  const nftTiers = [
    { name: 'Snoozer', rarity: '60%', benefits: ['Meme Multiplier 1x', 'Doze Chat Access'], color: 'text-gray-400', img: './media/img/nft/tier_snoozer.png' },
    { name: 'Dreamer', rarity: '30%', benefits: ['Staking 1.5x', 'Private Alpha', 'DAO Voting'], color: 'text-emerald-400', img: './media/img/nft/tier_dreamer.png' },
    { name: 'Waker', rarity: '8%', benefits: ['Revenue Share 1%', 'Early Merch', 'VIP WL'], color: 'text-purple-400', img: './media/img/nft/tier_waker.png' },
    { name: 'Enlightened', rarity: '2%', benefits: ['Rev-Share 5%', 'Exclusive Events', 'Advisory Role'], color: 'text-yellow-400', img: './media/img/nft/tier_enlightened.png' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-1000 space-y-16">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-bold font-display mb-6">DozeBun Genesis Collection</h2>
        <p className="text-xl text-gray-400 leading-relaxed">
          The DozeBun NFTs are your proof of awakening. Every rabbit has a story, a dream, and a unique utility within the $DOZE ecosystem. 
          Holding a DozeBun means you're part of the inner circle of the Solana meme revolution.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nftTiers.map((tier, i) => (
          <div key={i} className="glass-effect rounded-[2.5rem] p-8 hover:translate-y-[-10px] transition-all border border-white/5 hover:border-emerald-500/30 shadow-xl">
            <div className="aspect-square bg-white/5 rounded-3xl mb-6 relative overflow-hidden group">
              <img src={tier.img} alt={tier.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6">
                <span className={`font-black uppercase tracking-tighter text-sm ${tier.color}`}>{tier.rarity} RARITY</span>
              </div>
            </div>
            <h3 className={`text-3xl font-bold mb-4 font-display ${tier.color}`}>{tier.name}</h3>
            <ul className="space-y-3">
              {tier.benefits.map((b, bi) => (
                <li key={bi} className="text-sm text-gray-400 flex items-start gap-3">
                  <span className="text-emerald-500">★</span> {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass-effect rounded-[3rem] p-12 grid lg:grid-cols-2 gap-16 items-center border border-white/10 shadow-2xl">
        <div className="space-y-8">
          <h3 className="text-4xl font-bold font-display leading-tight">Instant Rabbit Awakening</h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Our automated minting system is as simple as waking up after a long nap. Just hold $DOZE, click a button, and watch your rabbit emerge from the digital burrow.
          </p>
          <div className="space-y-6">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center font-black text-2xl text-emerald-500 border border-emerald-500/20">01</div>
              <div>
                <h4 className="font-bold text-xl">Stock up on $DOZE</h4>
                <p className="text-gray-500">You need a balance of $DOZE to qualify for the mint.</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center font-black text-2xl text-purple-500 border border-purple-500/20">02</div>
              <div>
                <h4 className="font-bold text-xl">Confirm Mint (0.5 SOL)</h4>
                <p className="text-gray-500">Pay the awakening fee and get your random DozeBun instantly.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="aspect-square glass-effect rounded-[3rem] p-4 -rotate-2 border-white/10 shadow-2xl overflow-hidden group-hover:rotate-0 transition-transform duration-500">
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-purple-500/30 animate-pulse"></div>
             <img src="./media/img/home/mint_hero.png" className="rounded-[2.5rem] w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/90 px-6 py-3 rounded-full text-sm font-black border border-emerald-500 shadow-2xl tracking-[0.2em]">AWAKENING PROTOCOL</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
