
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

  // Garantia de que o valor é numérico e válido para evitar NaN
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
      alert(`🎉 SWAP SUCCESS! You received ${dozeReceived.toLocaleString()} $DOZE!`);
    } catch (e: any) {
      console.error(e);
      alert("Swap failed. Check your balance or network connection.");
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
      alert(`🎉 BINGO! Your DozeBun #${id} has awakened!`);
    } catch (e: any) {
      alert("Minting failed: " + e.message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Gráfico de Preço */}
        <div className="lg:col-span-3">
          <div className="glass-effect p-8 rounded-[3rem] border border-emerald-500/20 shadow-2xl h-full">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-emerald-400 uppercase tracking-tighter italic">Live $DOZE Index</h3>
              <div className="text-xs bg-emerald-500/10 text-emerald-500 font-black px-4 py-1.5 rounded-full border border-emerald-500/20">
                1 SOL = {CONFIG.TOKEN_RATIO.toLocaleString()} $DOZE
              </div>
            </div>
            <div className="h-[280px] w-full">
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
                  <Area type="step" dataKey="price" stroke="#10b981" strokeWidth={4} fill="url(#colorP)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card de Swap */}
        <div className="lg:col-span-2">
          <div className="glass-effect p-8 rounded-[3rem] border border-white/5 shadow-2xl h-full flex flex-col justify-between">
            <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-gray-500">Fast Liquidity</h3>
            
            <div className="space-y-4">
              <div className="bg-black/40 p-6 rounded-[2rem] border border-white/5 group focus-within:border-emerald-500/50 transition-colors">
                <label className="text-[10px] font-black text-gray-600 uppercase mb-2 block tracking-[0.2em]">Pay</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    value={swapAmount} 
                    onChange={(e) => setSwapAmount(e.target.value.replace(/[^0-9.,]/g, ''))} 
                    className="bg-transparent text-3xl font-black focus:outline-none w-full tabular-nums"
                  />
                  <span className="text-emerald-500 font-black">SOL</span>
                </div>
              </div>

              <div className="flex justify-center -my-3 relative z-10">
                <button className="w-10 h-10 bg-[#0b0e14] border border-white/10 rounded-full flex items-center justify-center text-emerald-500 hover:rotate-180 transition-transform duration-500 shadow-xl">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 10l5 5 5-5"/></svg>
                </button>
              </div>

              <div className="bg-emerald-500/5 p-6 rounded-[2rem] border border-emerald-500/20">
                <label className="text-[10px] font-black text-emerald-600/60 uppercase mb-2 block tracking-[0.2em]">Receive</label>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-black text-white w-full tabular-nums">
                    {(dozeReceived || 0).toLocaleString()}
                  </div>
                  <span className="text-purple-500 font-black">$DOZE</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSwap} 
              disabled={swapping || safeSwapAmount <= 0} 
              className="w-full mt-8 bg-emerald-500 text-black py-6 rounded-2xl font-black uppercase hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]"
            >
              {swapping ? 'SENDING...' : 'SWAP NOW'}
            </button>
          </div>
        </div>
      </div>

      {/* Seção de Mint */}
      <div className="glass-effect p-12 rounded-[4rem] border-purple-500/20 border shadow-2xl relative overflow-hidden group">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full group-hover:bg-purple-500/10 transition-all"></div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-left relative z-10">
            <h3 className="text-5xl md:text-6xl font-black font-display uppercase tracking-tighter leading-none">
              Mint Your <br/> <span className="text-purple-500">Gen-Bunny</span>
            </h3>
            <p className="text-gray-400 text-xl leading-relaxed font-medium">
              Join the elite burrow. Automatic minting with instant rarity reveal on the Solana blockchain.
            </p>
            <div className="flex gap-6 items-center">
               <div className="glass-effect px-8 py-4 rounded-3xl">
                  <span className="text-[10px] text-gray-500 font-black block uppercase mb-1">Price</span>
                  <span className="text-2xl font-black text-emerald-500">{CONFIG.MINT_PRICE} SOL</span>
               </div>
               <div className="glass-effect px-8 py-4 rounded-3xl">
                  <span className="text-[10px] text-gray-500 font-black block uppercase mb-1">Status</span>
                  <span className="text-2xl font-black text-purple-500 tracking-tighter">LIVE</span>
               </div>
            </div>
          </div>
          
          <div className="relative flex flex-col items-center gap-10">
            <div className="w-72 h-72 relative group">
              <div className="absolute inset-0 bg-purple-500/20 blur-[60px] rounded-full animate-pulse"></div>
              <img 
                src="https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/home/mint_bunny.png" 
                className="relative z-10 w-full h-full object-contain floating" 
                alt="Mint Rabbit"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300?text=MINT")}
              />
            </div>
            <button 
              onClick={handleMint} 
              disabled={minting} 
              className="w-full max-w-sm py-8 rounded-3xl font-black bg-gradient-to-r from-emerald-500 to-purple-600 text-white text-xl uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_0_60px_rgba(168,85,247,0.3)]"
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
