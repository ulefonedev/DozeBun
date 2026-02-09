
<?php
// Verifica se o arquivo de configuração existe
if (!file_exists('config.php')) {
    header('Location: install.php');
    exit;
}

require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Solana Pulse - PHP Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Space+Grotesk:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #0b0e14; color: #ffffff; }
        .font-display { font-family: 'Space+Grotesk', sans-serif; }
        .glass-effect { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
        /* Estilos do Wallet Adapter */
        .wallet-adapter-button { background-color: #10b981 !important; font-family: 'Space Grotesk', sans-serif !important; font-weight: 800 !important; border-radius: 9999px !important; color: black !important; height: 44px !important; font-size: 14px !important; }
    </style>
    <script>
        // Injeta configurações do PHP para o JavaScript
        window.APP_CONFIG = {
            API_KEY: '<?php echo GEMINI_API_KEY; ?>',
            TREASURY_WALLET: '<?php echo TREASURY_WALLET; ?>',
            DB_STATUS: 'connected'
        };
    </script>
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@^19.2.4",
        "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
        "react/": "https://esm.sh/react@^19.2.4/",
        "@google/genai": "https://esm.sh/@google/genai@^1.40.0",
        "recharts": "https://esm.sh/recharts@^3.7.0",
        "@solana/web3.js": "https://esm.sh/@solana/web3.js@^1.98.0",
        "@solana/wallet-adapter-react": "https://esm.sh/@solana/wallet-adapter-react@^0.15.35",
        "@solana/wallet-adapter-react-ui": "https://esm.sh/@solana/wallet-adapter-react-ui@^0.9.35",
        "@solana/wallet-adapter-wallets": "https://esm.sh/@solana/wallet-adapter-wallets@^0.19.32",
        "@solana/wallet-adapter-base": "https://esm.sh/@solana/wallet-adapter-base@^0.9.25"
      }
    }
    </script>
    <link rel="stylesheet" href="https://esm.sh/@solana/wallet-adapter-react-ui/styles.css">
</head>
<body>
    <div id="root"></div>
    <!-- O script index.js será carregado automaticamente pelo servidor em sistemas ESM ou você pode incluir index.tsx aqui se estiver usando um bundler dinâmico -->
    <script type="module" src="index.tsx"></script>
</body>
</html>
