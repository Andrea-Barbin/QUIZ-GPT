let timeLeft = JSON.parse(localStorage.getItem('quizTime')) || 300; // Carica il tempo salvato o usa 300 secondi (default)

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

function resetTimer() {
  timeLeft = JSON.parse(localStorage.getItem('quizTime')); // Reset con il tempo configurato
}
