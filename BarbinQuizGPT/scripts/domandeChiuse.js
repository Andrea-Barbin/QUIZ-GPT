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
      localStorage.setItem('quizTime', JSON.stringify(timeLeft)); // Aggiorna il tempo
    }
  }, 1000);
}

// Formatta il tempo in MM:SS
function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

// Carica e visualizza le domande chiuse
function loadClosedQuestions() {
  const closedQuestionsForm = document.getElementById('closed-questions-form');
  const closedQuestions = selectedQuiz.questions.filter(q => q.type === 'closed');

  closedQuestions.forEach((q, i) => {
    const div = document.createElement('div');
    div.classList.add('mb-3');
    
    const questionTitle = document.createElement('h5');
    questionTitle.textContent = `${i + 1}. ${q.question}`;
    div.appendChild(questionTitle);

    q.options.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('form-check');

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${i}`;
      input.value = option;
      input.classList.add('form-check-input');

      const label = document.createElement('label');
      label.classList.add('form-check-label');
      label.textContent = option;

      optionDiv.appendChild(input);
      optionDiv.appendChild(label);
      div.appendChild(optionDiv);
    });

    closedQuestionsForm.appendChild(div);
  });
}

// Funzione per inviare le risposte
function submitAnswers() {
  localStorage.removeItem('quizTime'); // Resetta solo il timer
  showPopup("COMPLIMENTI!","Quiz completato! Grazie per aver partecipato.")
  window.location.href = 'index.html'; // Torna alla homepage
}

document.getElementById('submit-button').addEventListener('click', submitAnswers);

// Carica le domande chiuse e avvia il timer
loadClosedQuestions();
startTimer();


// Funzione per mostrare il popup con titolo e messaggio personalizzati
function showPopup(title, message) {
// Imposta il titolo e il messaggio
document.getElementById('popup-title').textContent = title;
document.getElementById('popup-message').textContent = message;

// Mostra il popup (imposta display su flex)
document.getElementById('custom-popup').style.display = 'flex';
}

// Funzione per chiudere il popup
function closePopup() {
// Nasconde il popup (imposta display su none)
document.getElementById('custom-popup').style.display = 'none';
}



document.getElementById("ChiudiPop").addEventListener("mouseclick",  closePopup());