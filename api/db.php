<?php
header('Content-Type: application/json');
$pdo = new PDO("mysql:host=localhost;dbname=studybuddy;charset=utf8", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);