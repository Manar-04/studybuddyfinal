<?php
require 'db.php';
header('Content-Type: application/json');

$userId = $_GET['userId'] ?? null;

if (!$userId) {
  echo json_encode(["error" => "Missing userId"]);
  exit;
}

$stmt = $pdo->prepare("SELECT * FROM decks WHERE owner_id = ?");
$stmt->execute([$userId]);
$decks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($decks);
