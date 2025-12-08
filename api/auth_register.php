<?php
require 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];

$hash = password_hash($password, PASSWORD_DEFAULT);

try {
  $stmt = $pdo->prepare("INSERT INTO users (name,email,password_hash) VALUES (?,?,?)");
  $stmt->execute([$name,$email,$hash]);
  echo json_encode(["message"=>"Registered"]);
} catch (Exception $e) {
  echo json_encode(["error"=>"Email already exists"]);
}