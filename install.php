
<?php
if (file_exists('config.php')) {
    header('Location: index.html');
    exit;
}

$error = '';
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db_host = $_POST['db_host'];
    $db_user = $_POST['db_user'];
    $db_pass = $_POST['db_pass'];
    $db_name = $_POST['db_name'];
    $gemini_key = $_POST['gemini_key'];
    $treasury = $_POST['treasury'];

    $conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);

    if ($conn->connect_error) {
        $error = "Falha na Conexão SQL: " . $conn->connect_error;
    } else {
        $sql = "CREATE TABLE IF NOT EXISTS minted_nfts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nft_id INT NOT NULL,
            owner_wallet VARCHAR(255) NOT NULL,
            mint_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        $conn->query($sql);

        $config_content = "<?php\n";
        $config_content .= "define('DB_HOST', '" . addslashes($db_host) . "');\n";
        $config_content .= "define('DB_USER', '" . addslashes($db_user) . "');\n";
        $config_content .= "define('DB_PASS', '" . addslashes($db_pass) . "');\n";
        $config_content .= "define('DB_NAME', '" . addslashes($db_name) . "');\n";
        $config_content .= "define('GEMINI_API_KEY', '" . addslashes($gemini_key) . "');\n";
        $config_content .= "define('TREASURY_WALLET', '" . addslashes($treasury) . "');\n";
        
        if (file_put_contents('config.php', $config_content)) {
            $success = true;
        } else {
            $error = "Não foi possível criar o arquivo config.php. Verifique as permissões de pasta.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Instalador DozeBun</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
    <style>
        body { background-color: #0b0e14; color: white; font-family: sans-serif; }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6">
    <div class="max-w-xl w-full glass p-10 rounded-[2.5rem] shadow-2xl">
        <div class="text-center mb-10">
            <h1 class="text-4xl font-display text-emerald-400 uppercase tracking-tighter">DozeBun Setup</h1>
            <p class="text-gray-500 mt-2">Banco de Dados & Solana Treasury</p>
        </div>

        <?php if ($success): ?>
            <div class="bg-emerald-500/10 border border-emerald-500 text-emerald-500 p-8 rounded-2xl text-center animate-in zoom-in duration-500">
                <p class="font-bold text-2xl">Sucesso!</p>
                <p class="text-sm mt-2 opacity-70">Sistema configurado e pronto.</p>
                <a href="index.html" class="inline-block mt-8 bg-emerald-500 text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-emerald-500/20">Acessar Painel</a>
            </div>
        <?php else: ?>
            <form method="POST" class="space-y-5">
                <?php if ($error): ?>
                    <div class="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl text-xs font-bold uppercase tracking-tight">
                        ⚠️ <?php echo $error; ?>
                    </div>
                <?php endif; ?>

                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-[10px] font-black text-gray-500 uppercase">Host SQL</label>
                        <input type="text" name="db_host" value="localhost" required class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none text-sm text-white">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-black text-gray-500 uppercase">Nome do Banco</label>
                        <input type="text" name="db_name" required class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none text-sm text-white">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <label class="text-[10px] font-black text-gray-500 uppercase">Usuário SQL</label>
                        <input type="text" name="db_user" required class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none text-sm text-white">
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-black text-gray-500 uppercase">Senha SQL</label>
                        <input type="password" name="db_pass" class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none text-sm text-white">
                    </div>
                </div>

                <div class="space-y-1">
                    <label class="text-[10px] font-black text-emerald-500 uppercase">Gemini API Key</label>
                    <input type="text" name="gemini_key" required class="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none text-sm text-white" placeholder="Sua chave do Google AI Studio">
                </div>

                <div class="space-y-1">
                    <label class="text-[10px] font-black text-purple-500 uppercase">Solana Treasury Address</label>
                    <input type="text" name="treasury" required class="w-full bg-purple-500/5 border border-purple-500/20 rounded-xl px-4 py-3 focus:border-purple-500 outline-none text-sm text-white" placeholder="Endereço que recebe os fundos do Mint">
                </div>

                <button type="submit" class="w-full bg-emerald-500 text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 mt-4 border-b-4 border-emerald-700">
                    Finalizar Instalação
                </button>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
