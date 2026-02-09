
# Solana Pulse Hub - Operational Guide

Esta interface é o front-end de alta performance para o seu projeto Solana. Para que o projeto funcione em **produção**, aqui está o que falta:

### 1. Smart Contracts (Programas Solana)
- **NFT Collection**: Você precisará de um programa (contrato) implantado usando o padrão **Metaplex Core** ou **Candy Machine V3** para o "Automatic Mint".
- **Token Swap**: A integração visual simula o pump.fun, mas para funcionar, você deve conectar o SDK da **Raydium** ou **Jupiter Aggregator** apontando para o seu token mint address gerado no pump.fun.

### 2. Wallet Integration
- Atualmente, os botões de "Connect Wallet" são placeholders visuais. Você deve integrar a biblioteca `@solana/wallet-adapter-react` para permitir que usuários conectem Phantom, Solflare ou Backpack.

### 3. Metadata Storage
- As imagens dos NFTs precisam ser enviadas para um armazenamento descentralizado como **IPFS (via Pinata)** ou **Arweave**. O mint automático depende desses links de metadados estarem no contrato.

### 4. Pump.fun Bonding Curve
- Para o swap funcionar especificamente com o seu token recém-criado, você precisará monitorar a curva de vinculação (bonding curve) do pump.fun para calcular preços reais via API ou via on-chain data parsing.

### 5. API Key
- O sistema já utiliza Gemini AI para analisar o projeto e gerar lore de NFTs. Certifique-se de que a variável `process.env.API_KEY` esteja configurada em seu ambiente de build.

---
*Este projeto foi desenvolvido com foco em UI/UX Premium, simulando as interações de blockchain mais modernas da rede Solana.*
