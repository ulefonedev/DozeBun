
# 🚀 Guia de Instalação e Ativos - DozeBun Solana

Este guia contém as instruções para configurar sua carteira e substituir as imagens do projeto.

## 🛠️ 1. Configure sua Carteira de Recebimento
Abra o arquivo `config.ts` e altere:
- `TREASURY_ADDRESS`: Seu endereço Solana que receberá os pagamentos.
- `NETWORK`: Mude para `'mainnet-beta'` quando estiver pronto para lançar.

## 🖼️ 2. Mapa de Imagens (Substitua pelos seus arquivos)
Para mudar o visual, coloque suas imagens na pasta `media/img/` seguindo estes nomes:

### Diretório: `media/img/home/`
- `logo.png`: Logotipo circular do projeto.
- `hero_bunny.png`: Imagem grande do mascote no topo do site.
- `artist_working.png`: Imagem para a seção "Meme Factory".
- `mint_bunny.png`: Ilustração que aparece no card de Mint.
- `mint_hero.png`: Imagem decorativa da seção de detalhes do Mint.

### Diretório: `media/img/nft/`
- `tier_snoozer.png`: Representação do nível Comum.
- `tier_dreamer.png`: Representação do nível Incomum.
- `tier_waker.png`: Representação do nível Raro.
- `tier_enlightened.png`: Representação do nível Lendário.

## 🌐 3. Multi-Linguagem
O site suporta Inglês (padrão), Português, Espanhol e Chinês. As traduções podem ser editadas em `i18n.ts`.

## 🐰 4. Como o Mint Funciona neste Código?
1. O usuário clica em **MINT**.
2. A carteira (Phantom/Solflare) solicita a aprovação de envio de **0.5 SOL** para sua `TREASURY_ADDRESS`.
3. Após a confirmação na rede, o site usa a **Gemini AI** para criar uma "Lore" (história) única para aquele NFT.
4. O NFT aparece instantaneamente no perfil do usuário no site.

---
**Nota de Produção:** Para que o NFT apareça dentro da carteira Phantom oficial do usuário (fora do seu site), você precisará registrar a coleção on-chain usando ferramentas como Metaplex Sugar. Este site lida com a parte de arrecadação e interface da comunidade.
