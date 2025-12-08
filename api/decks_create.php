<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("INSERT INTO decks (title,subject,owner_id) VALUES (?,?,?)");
$stmt->execute([$data['title'],$data['subject'],$data['owner_id']]);
echo json_encode(["message"=>"Deck created"]);