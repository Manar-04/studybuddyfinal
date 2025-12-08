<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("INSERT INTO flashcards (question,answer,deck_id) VALUES (?,?,?)");
$stmt->execute([$data['question'],$data['answer'],$data['deck_id']]);
echo json_encode(["message"=>"Flashcard added"]);