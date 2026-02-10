
import React, { useState, useEffect, useMemo } from 'react';
import { generateNFTLore } from '../services/geminiService';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
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
  
  const [swapAmount, setSwapAmount] = useState<string>('0.1');
  const [minting, setMinting] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  // Garantia de que o valor é numérico e válido
  const safeSwapAmount = useMemo(() => {
    const parsed = parseFloat(swapAmount.replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
  }, [swapAmount]);

  const dozeReceived = safeSwapAmount * CONFIG.TOKEN_RATIO;

  useEffect(() => {
    const generateChartData = () => {
      const data = [];
      let price = 0.000042;
      for (let i = 0; i < 20; i++) {
        price = price * (0.95 + Math.random() * 0.12);
        data.push({ time: i, price: parseFloat(price.toFixed(8)) });
      }
      setChartData(data);
    };
    generateChartData();
  }, []);

  const handleSwap = async () => {
    if (!publicKey) return alert("Please connect your wallet first!");
    if (safeSwapAmount <= 0) return alert("Enter a valid amount!");
    
    setSwapping(true);
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(CONFIG.TREASURY_ADDRESS),
          lamports: Math.floor(safeSwapAmount * LAMPORTS_PER_SOL),
        })
      );
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      alert(`🎉 SUCCESS! ${dozeReceived.toLocaleString()} $DOZE is now yours!`);
    } catch (e: any) {
      console.error(e);
      alert("Swap failed. Verify your balance.");
    } finally {
      setSwapping(false);
    }
  };

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

      const id = Math.floor(Math.random() * CONFIG.NFT_TOTAL_SUPPLY) + 1;
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
      alert(`🎉 MINT COMPLETE! DozeBun #${id} is awake!`);
    } catch (e: any) {
      alert("Minting error: " + e.message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-16">
      {/* Swap Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tighter">Pump.fun Terminal</h2>
        <p className="text-gray-400 font-medium">Trading live for CA: <span className="text-emerald-500 font-mono break-all">{CONFIG.PUMP_FUN_CONTRACT}</span></p>
        <div className="flex justify-center gap-4">
           <a href={`https://pump.fun/${CONFIG.PUMP_FUN_CONTRACT}`} target="_blank" className="text-[10px] bg-white/5 border border-white/10 px-4 py-2 rounded-xl font-black uppercase hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all">View Chart</a>
           <a href="#" className="text-[10px] bg-white/5 border border-white/10 px-4 py-2 rounded-xl font-black uppercase hover:bg-purple-500/10 hover:border-purple-500/50 transition-all">Scan Contract</a>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Gráfico de Preço */}
        <div className="lg:col-span-3">
          <div className="glass-effect p-8 rounded-[3rem] border border-emerald-500/20 shadow-2xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 font-bold">D</div>
                <div>
                   <h3 className="font-black uppercase text-lg leading-tight">$DOZE / SOL</h3>
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Bonding Curve Pricing</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-emerald-500 font-black text-xl">+12.42%</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">Simulation Live</div>
              </div>
            </div>
            
            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0b0e14', border: '1px solid #10b98133', borderRadius: '16px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={4} fill="url(#colorP)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card de Swap */}
        <div className="lg:col-span-2">
          <div className="glass-effect p-8 rounded-[3.5rem] border border-white/5 shadow-2xl h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black uppercase tracking-widest text-gray-400">Swap</h3>
                <div className="flex gap-2">
                  <button onClick={() => setSwapAmount('0.1')} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all">0.1</button>
                  <button onClick={() => setSwapAmount('0.5')} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all">0.5</button>
                  <button onClick={() => setSwapAmount('1.0')} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all">1.0</button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-black/40 p-6 rounded-[2.5rem] border border-white/5 focus-within:border-emerald-500/40 transition-all">
                  <div className="flex justify-between mb-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">Pay (SOL)</div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="text"
                      value={swapAmount} 
                      onChange={(e) => setSwapAmount(e.target.value.replace(/[^0-9.,]/g, ''))} 
                      className="bg-transparent text-4xl font-black focus:outline-none w-full tabular-nums"
                      placeholder="0.0"
                    />
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                      <div className="w-5 h-5 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-full"></div>
                      <span className="font-black text-sm">SOL</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-4 relative z-10">
                  <div className="w-12 h-12 bg-[#0b0e14] border border-white/10 rounded-2xl flex items-center justify-center text-emerald-500 shadow-2xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 10l5 5 5-5"/></svg>
                  </div>
                </div>

                <div className="bg-emerald-500/5 p-6 rounded-[2.5rem] border border-emerald-500/20">
                  <div className="flex justify-between mb-3 text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">Receive ($DOZE)</div>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-black text-white w-full tabular-nums">
                      {dozeReceived.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-2xl border border-emerald-500/30">
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-black font-black">D</div>
                      <span className="font-black text-sm text-emerald-400">DOZE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSwap} 
              disabled={swapping || safeSwapAmount <= 0} 
              className="w-full mt-10 bg-emerald-500 text-black py-7 rounded-[2rem] font-black text-xl uppercase hover:scale-[1.02] active:scale-95 disabled:opacity-30 transition-all shadow-[0_0_50px_rgba(16,185,129,0.3)]"
            >
              {swapping ? 'PROCESSING...' : 'SWAP NOW'}
            </button>
          </div>
        </div>
      </div>

      {/* Mint Section */}
      <div className="glass-effect p-12 lg:p-20 rounded-[5rem] border-purple-500/20 border shadow-2xl relative overflow-hidden group">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full group-hover:bg-purple-500/10 transition-all duration-1000"></div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-left relative z-10">
            <h3 className="text-6xl md:text-7xl font-black font-display uppercase tracking-tighter leading-none">
              Genesis <br/> <span className="text-purple-500">Collection</span>
            </h3>
            <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-md">
              Total Supply: <span className="text-white font-black">{CONFIG.NFT_TOTAL_SUPPLY.toLocaleString()} Rabbits</span>. Join the first 10k genesis members and claim your utility-packed NFT.
            </p>
            <div className="flex gap-6 items-center">
               <div className="glass-effect px-10 py-5 rounded-[2rem] border border-white/5">
                  <span className="text-[10px] text-gray-500 font-black block uppercase mb-1 tracking-widest">Price</span>
                  <span className="text-3xl font-black text-emerald-500">{CONFIG.MINT_PRICE} SOL</span>
               </div>
               <div className="glass-effect px-10 py-5 rounded-[2rem] border border-white/5">
                  <span className="text-[10px] text-gray-500 font-black block uppercase mb-1 tracking-widest">Availability</span>
                  <span className="text-3xl font-black text-purple-500 tracking-tighter">10,000 / 10,000</span>
               </div>
            </div>
          </div>
          
          <div className="relative flex flex-col items-center gap-12">
            <div className="w-80 h-80 relative group">
              <div className="absolute inset-0 bg-purple-500/20 blur-[80px] rounded-full animate-pulse"></div>
              <img 
                src="https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/home/mint_bunny.png" 
                className="relative z-10 w-full h-full object-contain floating" 
                alt="Mint Rabbit"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400?text=MINT")}
              />
            </div>
            <button 
              onClick={handleMint} 
              disabled={minting} 
              className="w-full max-w-md py-8 rounded-[2.5rem] font-black bg-gradient-to-r from-emerald-500 to-purple-600 text-white text-2xl uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_0_80px_rgba(168,85,247,0.3)]"
            >
              {minting ? 'AWAKENING...' : 'AUTOMATIC MINT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainSection;
