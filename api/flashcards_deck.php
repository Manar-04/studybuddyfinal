<?php
require 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $question = $data['question'] ?? null;
    $answer   = $data['answer'] ?? null;
    $deckId   = $data['deckId'] ?? null;

    if (!$question || !$answer || !$deckId) {
        echo json_encode(["error" => "Missing fields"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO flashcards (question, answer, deck_id) VALUES (?, ?, ?)");
    $stmt->execute([$question, $answer, $deckId]);

    echo json_encode(["message" => "Flashcard added"]);
} else {
    $deckId = $_GET['deckId'] ?? null;
    if (!$deckId) {
        echo json_encode(["error" => "Missing deckId"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM flashcards WHERE deck_id = ?");
    $stmt->execute([$deckId]);
    $cards = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($cards);
}
