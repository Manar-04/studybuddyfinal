let userId = localStorage.getItem("userId");
function register() {
  fetch("api/auth_register.php", {
    method: "POST",
    body: JSON.stringify({
      name: document.getElementById("regName").value,
      email: document.getElementById("regEmail").value,
      password: document.getElementById("regPass").value
    })
  }).then(r=>r.json()).then(d=>alert(d.message||d.error));
}

function login() {
  fetch("api/auth_login.php", {
    method: "POST",
    body: JSON.stringify({
      email: document.getElementById("logEmail").value,
      password: document.getElementById("logPass").value
    })
  }).then(r=>r.json()).then(d=>{
    if(d.userId){
      localStorage.setItem("userId",d.userId);
      window.location="dashboard.php";
    } else alert(d.error);
  });
}

function logout(){
  localStorage.clear();
  window.location="index.php";
}

function loadMyDecks() {
  fetch("api/decks_user.php?userId=" + userId)
    .then(r => r.json())
    .then(decks => {
      let decksDiv = document.getElementById("deckSection");
      decksDiv.innerHTML = "<h2>Your Decks</h2>";

      decks.forEach(deck => {
        decksDiv.innerHTML += `
          <button onclick="selectDeck(${deck.id}, '${deck.title}', '${deck.subject}')">
            ${deck.title} (${deck.subject})
          </button><br>
        `;
      });

      // Add the "New Flashcard Deck" button
      decksDiv.innerHTML += `
        <br>
        <button onclick="showAddDeckForm()">➕ New Flashcard Deck</button>
        <div id="newDeckFormContainer"></div>
      `;
    });
}

function loadMyDecks() {
  fetch("api/decks_user.php?userId=" + userId)
    .then(r => r.json())
    .then(decks => {
      let decksDiv = document.getElementById("deckSection");
      decksDiv.innerHTML = "<h2>Your Decks</h2>";
      decks.forEach(deck => {
        decksDiv.innerHTML += `
          <button onclick="selectDeck(${deck.id}, '${deck.title}', '${deck.subject}')">
            ${deck.title} (${deck.subject})
          </button><br>
        `;
      });
    });
}

function selectDeck(deckId, title, subject) {
  // Show deck title
  document.getElementById("flashcardSection").innerHTML = `
    <h2>${title} (${subject})</h2>
    <div id="flashcardsList"></div>
    <button onclick="showAddFlashcardForm(${deckId})">Add Flashcard</button>
    <button onclick="startQuiz(${deckId})">Take Quiz</button>
    <div id="newDeckFormContainer"></div>
  `;
  loadFlashcards(deckId);
}

function showQuizButton(deckId) {
  let quizDiv = document.getElementById("quizSection");
  quizDiv.innerHTML = `<button onclick="startQuiz(${deckId})">Take Quiz</button>`;
}

function showAddDeckForm() {
  let formDiv = document.getElementById("newDeckFormContainer");
  formDiv.innerHTML = `
    <h3>Create New Deck</h3>
    <input id="newDeckTitle" placeholder="Deck Title"><br>
    <input id="newDeckSubject" placeholder="Subject"><br>
    <button onclick="addDeck()">Create</button>
  `;
}

function addDeck() {
  fetch("api/decks_add.php", {
    method: "POST",
    body: JSON.stringify({
      title: document.getElementById("newDeckTitle").value,
      subject: document.getElementById("newDeckSubject").value,
      owner_id: userId
    })
  })
  .then(r => r.json())
  .then(d => {
    console.log("Add deck response:", d);
    alert(d.message || d.error);
    loadMyDecks();
  });
}

function loadQuizzes() {
  fetch("api/quizzes_user.php?userId=" + userId)
    .then(r => r.json())
    .then(d => {
      //let quizDiv = document.getElementById("quizSection");
      //quizDiv.innerHTML = "";
      d.forEach(q => {
        quizDiv.innerHTML += `<p>Deck ${q.deck_id} → Score: ${q.score}</p>`;
      });
    });
}

function loadFlashcards(deckId) {
  fetch("api/flashcards_deck.php?deckId=" + deckId)
    .then(r => r.json())
    .then(cards => {
      let list = document.getElementById("flashcardsList");
      list.innerHTML = "";
      cards.forEach(card => {
        list.innerHTML += `
          <button onclick="viewFlashcard(${card.id}, '${card.question}', '${card.answer}')">
            ${card.question}
          </button><br>
        `;
      });
    });
}

function viewFlashcard(id, question, answer) {
  let flashDiv = document.getElementById("flashcardSection");
  flashDiv.innerHTML = `
    <h3>${question}</h3>
    <p><strong>Answer:</strong> ${answer}</p>
    <button onclick="showUpdateFlashcardForm(${id}, '${question}', '${answer}')">Update</button>
    <button onclick="loadFlashcards()">Back to list</button>
  `;
}

function showAddFlashcardForm(deckId) {
  let flashDiv = document.getElementById("flashcardSection");
  flashDiv.innerHTML = `
    <h3>Add Flashcard</h3>
    <input id="newQuestion" placeholder="Question"><br>
    <input id="newAnswer" placeholder="Answer"><br>
    <button onclick="addFlashcard(${deckId})">Save</button>
    <button onclick="loadFlashcards(${deckId})">Cancel</button>
  `;
}

function addFlashcard(deckId) {
  fetch("api/flashcards_deck.php", {
    method: "POST",
    body: JSON.stringify({
      question: document.getElementById("newQuestion").value,
      answer: document.getElementById("newAnswer").value,
      deckId: deckId
    })
  }).then(r => r.json()).then(d => {
    alert(d.message || d.error);
    loadFlashcards(deckId);
  });
}

function showUpdateFlashcardForm(id, question, answer) {
  let flashDiv = document.getElementById("flashcardSection");
  flashDiv.innerHTML = `
    <h3>Update Flashcard</h3>
    <input id="updQuestion" value="${question}"><br>
    <input id="updAnswer" value="${answer}"><br>
    <button onclick="updateFlashcard(${id})">Save</button>
    <button onclick="loadFlashcards()">Cancel</button>
  `;
}

function updateFlashcard(id) {
  fetch("api/flashcards_update.php", {
    method: "POST",
    body: JSON.stringify({
      id: id,
      question: document.getElementById("updQuestion").value,
      answer: document.getElementById("updAnswer").value
    })
  }).then(r => r.json()).then(d => {
    alert(d.message || d.error);
    loadFlashcards();
  });
}



function startQuiz(deckId = 1) {
  fetch("api/flashcards_deck.php?deckId=" + deckId)
    .then(r => r.json())
    .then(cards => {
      let quizDiv = document.getElementById("quizSection");
      quizDiv.innerHTML = "<h3>Quiz</h3>";

      cards.forEach((card, index) => {
        // Build multiple choice options using answers from other flashcards
        let options = cards.map(c => c.answer);
        // Shuffle options
        options = options.sort(() => Math.random() - 0.5);

        quizDiv.innerHTML += `
          <p>${index + 1}. ${card.question}</p>
          ${options.map(opt => `
            <label>
              <input type="radio" name="q${index}" value="${opt}">
              ${opt}
            </label><br>
          `).join("")}
        `;
      });

      quizDiv.innerHTML += `<button onclick="submitQuiz(${deckId})">Submit Quiz</button>`;
    });
}

function submitQuiz(deckId) {
  fetch("api/flashcards_deck.php?deckId=" + deckId)
    .then(r => r.json())
    .then(cards => {
      let score = 0;
      cards.forEach((card, index) => {
        let selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === card.answer) {
          score++;
        }
      });

      let quizDiv = document.getElementById("quizSection");
      quizDiv.innerHTML = `<h3>Your Score: ${score}/${cards.length}</h3>`;
    });
}

window.onload = () => {
  console.log("Dashboard loaded. userId:", userId);
  if (userId) {
    loadMyDecks();
    //loadQuizzes();
    loadFlashcards(); // optional, to show flashcards for deck 1
  } else {
    console.log("No userId found in localStorage");
  }
};
