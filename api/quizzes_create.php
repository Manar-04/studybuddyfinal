<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$stmt = $pdo->prepare("INSERT INTO quizzes (user_id,deck_id,score) VALUES (?,?,?)");
$stmt->execute([$data['user_id'],$data['deck_id'],$data['score']]);
echo json_encode(["message"=>"Quiz submitted"]);