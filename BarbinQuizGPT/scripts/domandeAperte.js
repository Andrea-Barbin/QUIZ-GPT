let timeLeft = JSON.parse(localStorage.getItem('quizTime')) || 300;
const timerDiv = document.getElementById('timer');
const selectedQuiz = JSON.parse(localStorage.getItem('selectedQuiz')) || {};

// Avvia il timer
function startTimer() {
  const timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Tempo scaduto!");
      submitAnswers();
    } else {
      timeLeft--;
      timerDiv.textContent = `Tempo Rimasto: ${formatTime(timeLeft)}`;
      localStorage.setItem('quizTime', JSON.stringify(timeLeft)); // Salva il tempo corrente
    }
  }, 1000);
}

// Formatta il tempo in MM:SS
function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

// Carica le domande aperte
function loadOpenQuestions() {
  const openQuestionsForm = document.getElementById('open-questions-form');
  const openQuestions = selectedQuiz.questions.filter(q => q.type === 'open');

  openQuestions.forEach((q, i) => {
    const div = document.createElement('div');
    div.classList.add('mb-3');
    div.innerHTML = `
      <label class="form-label">${i + 1}. ${q.question}</label>
      <textarea class="form-control" name="q${i}" placeholder="Risposta..."></textarea>
    `;
    openQuestionsForm.appendChild(div);
  });
}

// Funzione per avanzare alla pagina delle domande chiuse
function goToClosedQuestions() {
  localStorage.setItem('quizTime', JSON.stringify(timeLeft)); // Salva il tempo corrente
  window.location.href = 'domandeChiuse.html'; // Reindirizza alla pagina delle domande chiuse
}

document.getElementById("vaiChiuse").addEventListener("mouseclick", goToClosedQuestions())

// Carica le domande aperte e avvia il timer
loadOpenQuestions();
startTimer();

function showPopup(title, message) {
document.getElementById('popup-title').textContent = title;
document.getElementById('popup-message').textContent = message;
document.getElementById('custom-popup').style.display = 'flex';
}

function closePopup() {
document.getElementById('custom-popup').style.display = 'none';
}