<?php
require 'db.php';
$userId = $_GET['userId'];
$stmt = $pdo->prepare("SELECT * FROM quizzes WHERE user_id=?");
$stmt->execute([$userId]);
echo json_encode($stmt->fetchAll());