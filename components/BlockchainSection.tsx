
import React, { useState, useEffect } from 'react';
import { generateNFTLore } from '../services/geminiService';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
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

  useEffect(() => {
    const data = [];
    let price = 0.0001;
    for (let i = 0; i < 20; i++) {
      price = price * (0.95 + Math.random() * 0.2);
      data.push({ time: i, price: price.toFixed(6) });
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
      alert(`Swap confirmed!`);
    } catch (e: any) {
      alert("Swap Error: " + e.message);
    } finally {
      setSwapping(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 grid lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="glass-effect p-10 rounded-[2.5rem] border-emerald-500/20 border shadow-2xl">
          <h3 className="text-3xl font-bold mb-10 text-emerald-400 uppercase">Swap $DOZE</h3>
          <div className="space-y-6">
             <div className="bg-black/40 p-6 rounded-[2rem] border border-white/5">
                <input type="number" value={swapAmount} onChange={(e) => setSwapAmount(e.target.value)} className="bg-transparent text-3xl font-black focus:outline-none w-full" />
             </div>
          </div>
          <button onClick={handleSwap} disabled={swapping} className="w-full mt-10 bg-emerald-500 text-black py-5 rounded-3xl font-black uppercase">
            {swapping ? 'PROCESSING...' : t('swap_button')}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-effect p-10 rounded-[2.5rem] border-purple-500/20 border h-full flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="text-center py-16 space-y-8">
            <div className="w-48 h-48 mx-auto relative">
              <div className="relative w-full h-full bg-[#0b0e14] rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://raw.githubusercontent.com/ulefonedev/DozeBun/main/media/img/home/mint_bunny.png" 
                  className="w-full h-full object-cover scale-150 translate-y-4" 
                  alt="Mint Rabbit" 
                />
              </div>
            </div>
          </div>
          <button onClick={handleMint} disabled={minting} className="w-full py-6 rounded-3xl font-black bg-gradient-to-r from-emerald-500 to-purple-600 text-white uppercase">
            {minting ? 'WAITING WALLET...' : `${t('mint_button')} (${CONFIG.MINT_PRICE} SOL)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockchainSection;
