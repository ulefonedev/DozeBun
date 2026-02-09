
<?php
header('Content-Type: application/json');

if (!file_exists('config.php')) {
    echo json_encode(['installed' => false]);
    exit;
}

require_once 'config.php';

// Retornamos apenas o que o frontend precisa saber
echo json_encode([
    'installed' => true,
    'gemini_key' => defined('GEMINI_API_KEY') ? GEMINI_API_KEY : '',
    'treasury' => defined('TREASURY_WALLET') ? TREASURY_WALLET : '',
    'db_status' => 'connected'
]);
