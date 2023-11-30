<?php
// updateBudget.php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Vérifiez la méthode de la requête
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
  exit;
}

// Récupérez les données JSON de la requête
$data = json_decode(file_get_contents('php://input'), true);

// Récupérez l'ID de l'utilisateur et le nouveau budget depuis les données JSON
$userId = isset($data['userId']) ? $data['userId'] : null;
$newBudget = isset($data['budget']) ? $data['budget'] : null;

if (!$userId || $newBudget === null) {
  echo json_encode(['success' => false, 'message' => 'Données manquantes']);
  exit;
}

// Remplacez cette logique par la mise à jour du budget dans votre base de données
// Exemple avec une connexion MySQLi (assurez-vous de configurer correctement votre connexion)
$mysqli = new mysqli('localhost', 'nom_utilisateur', 'mot_de_passe', 'financeflow');

if ($mysqli->connect_error) {
  echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']);
  exit;
}

$query = "UPDATE budget SET budget = $newBudget WHERE ID_utilisateur = $userId";
$result = $mysqli->query($query);

if ($result) {
  echo json_encode(['success' => true, 'message' => 'Budget mis à jour avec succès']);
} else {
  echo json_encode(['success' => false, 'message' => 'Erreur lors de la mise à jour du budget']);
}

$mysqli->close();
?>
