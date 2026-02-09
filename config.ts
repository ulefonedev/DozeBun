
/**
 * ARQUIVO DE CONFIGURAÇÃO MESTRE - DOZEBUN
 */

export const CONFIG = {
  // REDE: 'devnet' para testes, 'mainnet-beta' para lançar oficialmente e ganhar SOL real.
  NETWORK: 'devnet' as 'devnet' | 'mainnet-beta',
  
  // SUA CARTEIRA: Onde os 0.5 SOL de cada mint e os Swaps serão depositados.
  TREASURY_ADDRESS: "Fk5MMpVzzeA5bGpHdeX7J2bikSSGvgvaHpzwipU1TEsg",
  
  // PREÇO DO MINT (em SOL)
  MINT_PRICE: 0.5,
  
  // TOKEN CONFIG (Simulado para o Swap)
  TOKEN_SYMBOL: "$DOZE",
  TOKEN_RATIO: 1250000, // Quantos tokens por 1 SOL
  
  // RPC ENDPOINT (Opcional: use um provedor como Helius ou QuickNode para mais velocidade na Mainnet)
  RPC_URL: null 
};
