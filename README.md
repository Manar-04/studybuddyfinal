Study Buddy

Study Buddy is a full-stack flashcard web app that allows users to create decks, add flashcards, study interactively, and track quiz scores.
Built with PHP, MySQL, HTML/CSS, and vanilla JavaScript, it supports:

User registration and login

Personalized dashboards

Deck creation, editing, and deletion

Flashcard creation and flip animations

Quiz mode with correct/wrong tracking

Saved quiz history per user

Fully responsive and modern UI

The platform is deployed using InfinityFree with a live MySQL database.

Features
User Accounts

Register and log in securely

Sessions stored in localStorage

Personalized dashboard greeting

Deck Management

Create decks with titles and subjects

Edit or delete existing decks

Clean UI for browsing user-owned decks

Flashcards

Add unlimited flashcards

Click to flip between question and answer

Study cards visually with animations

Quiz Mode

Step-by-step quiz experience

“Show answer,” “I got it right,” and “I got it wrong” buttons

Tracks correct + wrong answers

Displays final score

Saves quiz history to the database

UI/UX

Fully responsive design

Interactive components

Clean, warm, academic color scheme

Live updates without page reloads

Tech Stack
Frontend

HTML

CSS (custom theme, glassmorphism, animations)

JavaScript (DOM manipulation, fetch API)

Backend

PHP (procedural and PDO prepared statements)

Database

MySQL (InfinityFree or localhost/XAMPP)

Hosting

InfinityFree (public deployment)

Setup Instructions
1. Upload Project Files (InfinityFree or Localhost)

Place all files into the htdocs folder (XAMPP) or the InfinityFree File Manager root.

Required structure:

index.php
dashboard.php
script.js
studybuddy_theme.css
/api/
    auth_login.php
    auth_register.php
    decks.php
    flashcards.php
    quizzes.php
    db.php

2. Create the MySQL Database

In phpMyAdmin:

Create Database:
CREATE DATABASE studybuddy;

Use the Database:
USE studybuddy;

Create Tables:
Users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

Decks
CREATE TABLE decks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  subject VARCHAR(255),
  owner_id INT,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

Flashcards
CREATE TABLE flashcards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT,
  answer TEXT,
  deck_id INT,
  FOREIGN KEY (deck_id) REFERENCES decks(id)
);

Quizzes
CREATE TABLE quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  deck_id INT,
  score INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (deck_id) REFERENCES decks(id)
);

3. Configure Database Connection

In api/db.php:

$host = "sqlXXX.infinityfree.com"; // or localhost
$user = "username";
$pass = "password";
$dbname = "studybuddy";

$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

4. Run the Application
InfinityFree:

Visit your assigned URL:

study-buddy.infinityfree.me


You will see:

Login/Register tabs

Deck dashboard

Flashcard creation

Quiz mode

API Routes
Authentication
POST /api/auth_register.php  → register user
POST /api/auth_login.php      → login user + return userId + name

Decks
POST /api/decks.php           → create/update/delete deck
GET  /api/decks.php?userId=X  → fetch decks for user

Flashcards
POST /api/flashcards.php               → create flashcard
GET  /api/flashcards.php?deckId=X      → retrieve flashcards

Quizzes
POST /api/quizzes.php                  → store quiz score
GET  /api/quizzes.php?userId=X         → fetch quiz history

script.js Overview
window.onload

Detects login status

Loads landing page or dashboard

register()

Sends name, email, password to backend

Displays success/error

login()

Authenticates user

Saves userId + name in localStorage

Redirects to dashboard

loadDecks()

Fetches all user decks

Shows them in sidebar

addFlashcard()

Adds a new card

Refreshes flashcard list

loadFlashcards()

Displays clickable flip cards

Quiz Functions

startQuiz() resets counters

showAnswer() reveals answer

correctBtn increments correct

wrongBtn increments wrong

finishQuiz() computes percentage + saves score

logout()

Clears session + redirects

Team Contributions
Nabila

Designed responsive UI

Styled application with academic theme

Implemented interactive elements (flip cards, buttons)

Connected frontend to PHP backend

Debugged InfinityFree deployment issues

Improved user flow & quiz experience

Manar

Developed PHP backend endpoints: users, decks, cards, quizzes

Built secure database logic using PDO

Structured API routing and JSON responses

Helped debug database connection + form submissions

Chad

Assisted with MySQL schema design

Tested backend endpoints

Helped debug login and deck creation issues

Provided feedback on UI flow and layout

Participated in integration and deployment testing

Future Improvements

Add spaced-repetition study mode

Timer-based quiz sessions

Drag-and-drop deck organization

User profile and settings

Dark/Light mode toggle

Export decks to CSV or Share links
