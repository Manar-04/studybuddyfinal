<?php
require 'db.php';
header('Content-Type: application/json');

$userId = $_GET['userId'] ?? null;

if (!$userId) {
  echo json_encode(["error" => "Missing userId"]);
  exit;
}

$stmt = $pdo->prepare("SELECT * FROM quizzes WHERE user_id = ?");
$stmt->execute([$userId]);
$quizzes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($quizzes);
