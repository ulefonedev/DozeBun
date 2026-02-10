
import React, { useState, useEffect } from 'react';
import { generateNFTLore } from '../services/geminiService';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { WalletState, NFTMetadata } from '../types';
import { CONFIG } from '../config';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useI18n } from '../App';

interface BlockchainSectionProps {
  onMint: (nft: NFTMetadata) => void;
  wallet: WalletState;
}

const BlockchainSection: React.FC<BlockchainSectionProps> = ({ onMint, wallet }) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { t } = useI18n();
  
  const [swapAmount, setSwapAmount] = useState('0.1');
  const [minting, setMinting] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  // Token conversion logic
  const dozeReceived = parseFloat(swapAmount || '0') * CONFIG.TOKEN_RATIO;

  useEffect(() => {
    const data = [];
    let price = 0.000042;
    for (let i = 0; i < 30; i++) {
      price = price * (0.98 + Math.random() * 0.15);
      data.push({ time: i, price: parseFloat(price.toFixed(8)) });
    }
    setChartData(data);
  }, []);

  const handleMint = async () => {
    if (!publicKey) return alert("Please connect your wallet first!");
    setMinting(true);
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(CONFIG.TREASURY_ADDRESS),
          lamports: CONFIG.MINT_PRICE * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      const rarities = ['snoozer', 'dreamer', 'waker', 'enlightened'];
      const rand = Math.random();
      let selectedRarity = 'snoozer';
      if (rand > 0.98) selectedRarity = 'enlightened';
      else if (rand > 0.90) selectedRarity = 'waker';
      else if (rand > 0.60) selectedRarity = 'dreamer';

      const id = Math.floor(Math.random() * 9000) + 1000;
      const lore = await generateNFTLore(id, selectedRarity.toUpperCase());
      
      const newNFT: NFTMetadata = {
        id,
        name: `DozeBun #${id}`,
        rarity: selectedRarity.charAt(0).toUpperCase() + selectedRarity.slice(1),
        image: `https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/nft/tier_${selectedRarity}.png`, 
        lore,
        owner: publicKey.toBase58()
      };
      
      onMint(newNFT);
      alert(`🎉 SUCCESS! Your DozeBun #${id} is awake!`);
    } catch (e: any) {
      alert("Transaction failed: " + e.message);
    } finally {
      setMinting(false);
    }
  };

  const handleSwap = async () => {
    if (!publicKey) return alert("Connect your wallet first!");
    if (parseFloat(swapAmount) <= 0) return alert("Enter a valid amount!");
    setSwapping(true);
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(CONFIG.TREASURY_ADDRESS),
          lamports: parseFloat(swapAmount) * LAMPORTS_PER_SOL,
        })
      );
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      alert(`Swap confirmed! You successfully acquired ${dozeReceived.toLocaleString()} $DOZE!`);
    } catch (e: any) {
      alert("Swap Error: " + e.message);
    } finally {
      setSwapping(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12">
      {/* Swap Section */}
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-effect p-8 rounded-[2.5rem] border-emerald-500/20 border shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-emerald-400 uppercase tracking-tighter">Live $DOZE/SOL Pulse</h3>
              <div className="flex items-center gap-2 text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-xs">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                 +12.4%
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0b0e14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass-effect p-8 rounded-[2.5rem] border-white/5 border shadow-2xl h-full flex flex-col justify-between">
            <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-gray-500">Fast Swap</h3>
            
            <div className="space-y-4">
               <div className="bg-black/40 p-5 rounded-3xl border border-white/5">
                  <div className="flex justify-between mb-2 text-[10px] font-black text-gray-500 uppercase">You Pay (SOL)</div>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      value={swapAmount} 
                      onChange={(e) => setSwapAmount(e.target.value)} 
                      className="bg-transparent text-2xl font-black focus:outline-none w-full"
                    />
                    <span className="text-emerald-500 font-black">SOL</span>
                  </div>
               </div>

               <div className="flex justify-center -my-2 relative z-10">
                  <div className="w-10 h-10 bg-[#0b0e14] border border-white/10 rounded-full flex items-center justify-center text-emerald-500 shadow-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10l5 5 5-5"/></svg>
                  </div>
               </div>

               <div className="bg-black/40 p-5 rounded-3xl border border-emerald-500/20">
                  <div className="flex justify-between mb-2 text-[10px] font-black text-gray-500 uppercase">You Receive ($DOZE)</div>
                  <div className="flex items-center">
                    <div className="text-2xl font-black text-white w-full">{dozeReceived.toLocaleString()}</div>
                    <span className="text-purple-500 font-black">$DOZE</span>
                  </div>
               </div>
            </div>

            <button 
              onClick={handleSwap} 
              disabled={swapping} 
              className="w-full mt-8 bg-emerald-500 text-black py-5 rounded-[1.8rem] font-black uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              {swapping ? 'SWAPPING...' : 'BUY $DOZE'}
            </button>
          </div>
        </div>
      </div>

      {/* Mint Section */}
      <div className="glass-effect p-12 rounded-[4rem] border-purple-500/20 border shadow-2xl relative overflow-hidden group">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-all duration-1000"></div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <h3 className="text-5xl font-black font-display uppercase leading-tight tracking-tighter">
              Awaken Your <br/> <span className="text-purple-500">Genesis Bunny</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Mint a unique DozeBun NFT and unlock exclusive community rewards, DAO voting rights, and the highest $DOZE staking multipliers.
            </p>
            <div className="flex gap-4 items-center pt-4">
               <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                  <span className="text-xs text-gray-500 font-bold block uppercase tracking-widest">Price</span>
                  <span className="text-xl font-black text-emerald-500">{CONFIG.MINT_PRICE} SOL</span>
               </div>
               <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                  <span className="text-xs text-gray-500 font-bold block uppercase tracking-widest">Remaining</span>
                  <span className="text-xl font-black text-purple-500">1422 / 2500</span>
               </div>
            </div>
          </div>
          
          <div className="relative flex flex-col items-center gap-8">
            <div className="w-64 h-64 relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-[50px] rounded-full animate-pulse"></div>
              <img 
                src="https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/home/mint_bunny.png" 
                className="relative z-10 w-full h-full object-contain floating" 
                alt="Mint Rabbit" 
              />
            </div>
            <button 
              onClick={handleMint} 
              disabled={minting} 
              className="w-full max-w-sm py-6 rounded-[2rem] font-black bg-gradient-to-r from-emerald-500 to-purple-600 text-white uppercase hover:scale-105 transition-all shadow-2xl"
            >
              {minting ? 'AWAKENING...' : 'MINT AUTOMATICALLY'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainSection;
