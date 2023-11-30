<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Vérifiez la méthode de la requête
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
  exit;
}

// Récupérez l'ID de l'utilisateur à partir des paramètres de requête
$userId = isset($_GET['userId']) ? $_GET['userId'] : null;

if (!$userId) {
  echo json_encode(['success' => false, 'message' => 'ID utilisateur manquant']);
  exit;
}

// Remplacez cette logique par la récupération du budget depuis votre base de données
// Exemple avec une connexion MySQLi (assurez-vous de configurer correctement votre connexion)
$mysqli = new mysqli('localhost', 'nom_utilisateur', 'mot_de_passe', 'financeflow');

if ($mysqli->connect_error) {
  echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']);
  exit;
}

$query = "SELECT budget FROM budget WHERE ID_utilisateur = $userId";
$result = $mysqli->query($query);

if ($result) {
  $row = $result->fetch_assoc();
  $budget = $row['budget'];

  echo json_encode(['success' => true, 'budget' => $budget]);
} else {
  echo json_encode(['success' => false, 'message' => 'Erreur lors de la récupération du budget']);
}

$mysqli->close();
?>
