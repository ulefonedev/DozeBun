
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
    
    if (CONFIG.NETWORK === 'mainnet-beta') {
      const confirm = window.confirm(`Atenção: Você está na MAINNET. Esta ação custará ${CONFIG.MINT_PRICE} SOL reais. Deseja continuar?`);
      if (!confirm) return;
    }

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
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
      }, 'confirmed');

      // Sorteio de raridade local
      const rarities = ['Snoozer', 'Dreamer', 'Waker', 'Enlightened'];
      const rand = Math.random();
      let selectedRarity = 'Snoozer';
      if (rand > 0.98) selectedRarity = 'Enlightened';
      else if (rand > 0.90) selectedRarity = 'Waker';
      else if (rand > 0.60) selectedRarity = 'Dreamer';

      const id = Math.floor(Math.random() * 9000) + 1000;
      const lore = await generateNFTLore(id, selectedRarity);
      
      const newNFT: NFTMetadata = {
        id,
        name: `DozeBun #${id}`,
        rarity: selectedRarity,
        image: `/media/img/nft/tier_${selectedRarity.toLowerCase()}.png`, 
        lore,
        owner: publicKey.toBase58()
      };
      
      onMint(newNFT);
      alert(`🎉 SUCCESS!\nSignature: ${signature.substring(0, 10)}...\nYour DozeBun #${id} is awake!`);
    } catch (e: any) {
      alert("Transaction failed: " + e.message);
    } finally {
      setMinting(false);
    }
  };

  const handleSwap = async () => {
    if (!publicKey) return alert("Connect your wallet first!");
    const amount = parseFloat(swapAmount);
    if (isNaN(amount) || amount <= 0) return alert("Enter a valid amount.");
    
    setSwapping(true);
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(CONFIG.TREASURY_ADDRESS),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      alert(`Swap of ${amount} SOL confirmed! $DOZE tokens will be processed.`);
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
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-bold font-display tracking-tight text-emerald-400 uppercase">{t('swap_title')} {CONFIG.TOKEN_SYMBOL}</h3>
            <span className="text-[10px] font-black tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full text-emerald-500 uppercase border border-emerald-500/20">LIVE</span>
          </div>

          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-[2rem] border border-white/5">
              <div className="flex justify-between text-xs font-bold text-gray-600 mb-3 uppercase tracking-widest">
                <span>Pay</span>
                <span>Balance: {wallet.balance.toFixed(3)} SOL</span>
              </div>
              <div className="flex justify-between items-center">
                <input
                  type="number"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                  className="bg-transparent text-3xl font-black focus:outline-none w-1/2"
                />
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                  <span className="font-black">SOL</span>
                </div>
              </div>
            </div>

            <div className="bg-black/40 p-6 rounded-[2rem] border border-white/5">
              <div className="flex justify-between text-xs font-bold text-gray-600 mb-3 uppercase tracking-widest">
                <span>Receive {CONFIG.TOKEN_SYMBOL}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-black text-white">{(parseFloat(swapAmount || '0') * CONFIG.TOKEN_RATIO).toLocaleString()}</div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                  <span className="font-black">{CONFIG.TOKEN_SYMBOL}</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSwap}
            disabled={swapping}
            className="w-full mt-10 bg-emerald-500 text-black py-5 rounded-3xl font-black text-xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 uppercase"
          >
            {swapping ? 'PROCESSING...' : t('swap_button')}
          </button>
        </div>

        <div className="glass-effect p-8 rounded-[2rem] h-56 border border-white/5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={0.1} fill="#10b981" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-effect p-10 rounded-[2.5rem] border-purple-500/20 border h-full flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-bold font-display tracking-tight text-purple-400 uppercase">{t('mint_title')}</h3>
              <div className="bg-purple-500/10 text-purple-400 px-6 py-2 rounded-full text-xs font-black border border-purple-500/20 tracking-[0.2em]">{CONFIG.MINT_PRICE} SOL</div>
            </div>

            <div className="text-center py-16 space-y-8">
              <div className="w-48 h-48 mx-auto relative">
                <div className={`absolute inset-0 bg-purple-500 blur-[80px] opacity-20 ${minting ? 'animate-ping' : ''}`}></div>
                <div className="relative w-full h-full bg-[#0b0e14] rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden">
                  <img src="/media/img/home/mint_bunny.png" className="w-full h-full object-cover scale-150 translate-y-4" alt="Mint Rabbit" />
                </div>
              </div>
              <div className="space-y-2">
                 <h4 className="text-3xl font-black uppercase tracking-tighter">Awaken a DozeBun</h4>
                 <p className="text-gray-500 text-lg max-w-xs mx-auto font-medium opacity-60">
                   Funds are sent directly to the project treasury.
                 </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleMint}
            disabled={minting}
            className={`w-full py-6 rounded-3xl font-black transition-all text-xl uppercase tracking-widest ${
              minting
                ? 'bg-white/5 text-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-purple-600 text-white hover:scale-[1.02]'
            }`}
          >
            {minting ? 'WAITING WALLET...' : `${t('mint_button')} (${CONFIG.MINT_PRICE} SOL)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockchainSection;
