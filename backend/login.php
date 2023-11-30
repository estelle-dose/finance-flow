<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email']) && isset($data['password'])) {
    // Connexion à votre base de données
    $host = 'localhost';
    $db = 'financeflow';
    $user = 'root';
    $password = 'Etoile19*';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);

        // Vérification des informations de connexion
        $stmt = $pdo->prepare('SELECT * FROM utilisateurs WHERE email = ?');
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($data['password'], $user['mdep'])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Email et mot de passe requis']);
}

?>
