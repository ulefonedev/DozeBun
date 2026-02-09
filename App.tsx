
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { Section, NFTMetadata } from './types';
import { CONFIG } from './config';
import { Language, translations } from './i18n';
import Navigation from './components/Navigation';
import HomeSection from './components/HomeSection';
import DetailsSection from './components/DetailsSection';
import BlockchainSection from './components/BlockchainSection';
import MarketplaceSection from './components/MarketplaceSection';
import FloatingSocials from './components/FloatingSocials';
import ProfileModal from './components/ProfileModal';
import LanguageSelector from './components/LanguageSelector';

// Solana Imports
import { ConnectionProvider, WalletProvider, useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Create I18n Context
const I18nContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}>({ lang: 'en', setLang: () => {}, t: (k) => k });

export const useI18n = () => useContext(I18nContext);

const INITIAL_MARKETPLACE: NFTMetadata[] = [
  { id: 101, name: "DozeBun #101", rarity: "Waker", image: "./media/img/nft/tier_waker.png", price: 1.5, owner: "BunnyLord" },
  { id: 102, name: "DozeBun #102", rarity: "Enlightened", image: "./media/img/nft/tier_enlightened.png", price: 5.0, owner: "SolWhale" },
];

const AppContent: React.FC = () => {
  const { publicKey, connected, disconnect } = useWallet();
  const { connection } = useConnection();
  
  const [activeTab, setActiveTab] = useState<Section>('home');
  const [scrolled, setScrolled] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [ownedNFTs, setOwnedNFTs] = useState<NFTMetadata[]>([]);
  const [marketplaceNFTs, setMarketplaceNFTs] = useState<NFTMetadata[]>(INITIAL_MARKETPLACE);

  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (connected && publicKey) {
      const updateBalance = async () => {
        try {
          const bal = await connection.getBalance(publicKey);
          setBalance(bal / LAMPORTS_PER_SOL);
        } catch (e) {
          console.error("Erro ao carregar saldo:", e);
        }
      };
      updateBalance();
      const id = setInterval(updateBalance, 10000);
      return () => clearInterval(id);
    }
  }, [connected, publicKey, connection]);

  const walletState = {
    connected,
    address: publicKey ? publicKey.toBase58().substring(0, 4) + '...' + publicKey.toBase58().slice(-4) : null,
    balance: balance
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#0b0e14] text-white">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>

      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        scrolled={scrolled} 
        wallet={walletState} 
        onConnect={() => {}} 
        onOpenProfile={() => setShowProfile(true)}
      />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        {renderContent()}
      </main>

      <footer className="border-t border-white/10 py-12 px-4 text-center text-gray-500 text-sm">
        <p className="text-emerald-400 font-black mb-2 tracking-[0.4em] text-lg">$DOZE TOKEN</p>
      </footer>

      <FloatingSocials />
      <LanguageSelector />

      {showProfile && (
        <ProfileModal 
          wallet={walletState} 
          nfts={ownedNFTs} 
          onClose={() => setShowProfile(false)} 
          onDisconnect={() => disconnect()}
          onSell={(nft, price) => {
            setOwnedNFTs(prev => prev.filter(n => n.id !== nft.id));
            setMarketplaceNFTs(prev => [{...nft, price, owner: "Me"}, ...prev]);
            setShowProfile(false);
            setActiveTab('marketplace');
          }}
        />
      )}
    </div>
  );

  function renderContent() {
    switch (activeTab) {
      case 'home': return <HomeSection />;
      case 'details': return <DetailsSection />;
      case 'blockchain': return <BlockchainSection onMint={(nft) => setOwnedNFTs(p => [...p, nft])} wallet={walletState} />;
      case 'marketplace': return <MarketplaceSection nfts={marketplaceNFTs} onBuy={(nft) => {
         setMarketplaceNFTs(prev => prev.filter(n => n.id !== nft.id));
         setOwnedNFTs(prev => [...prev, nft]);
         alert("NFT Acquired!");
      }} wallet={walletState} />;
      default: return <HomeSection />;
    }
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  
  const i18nValue = useMemo(() => ({
    lang,
    setLang,
    t: (key: keyof typeof translations.en) => translations[lang][key] || key
  }), [lang]);

  const endpoint = useMemo(() => CONFIG.RPC_URL || clusterApiUrl(CONFIG.NETWORK), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  return (
    <I18nContext.Provider value={i18nValue}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <AppContent />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </I18nContext.Provider>
  );
};

export default App;
