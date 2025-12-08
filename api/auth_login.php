<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE email=?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password_hash'])) {
  echo json_encode(["message"=>"Logged in","userId"=>$user['id']]);
} else {
  echo json_encode(["error"=>"Invalid credentials"]);
}