// Carica le domande salvate dal localStorage
let questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];

// Funzione per creare il modulo del quiz con le domande
function loadQuiz() {
  const quizForm = document.getElementById('quiz-form');
  if (questions.length === 0) {
    alert("Non ci sono domande salvate. Crea prima un quiz.");
    window.location.href = 'creaQuiz.html';  // Ritorna alla pagina di creazione del quiz
    return;
  }

  // Aggiungi le domande al modulo
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('mb-4');
    
    // Crea la domanda
    const questionTitle = document.createElement('h5');
    questionTitle.textContent = `${index + 1}. ${question.question}`;
    questionDiv.appendChild(questionTitle);

    // Se la domanda è aperta
    if (question.type === 'open') {
      const input = document.createElement('textarea');
      input.classList.add('form-control');
      input.setAttribute('placeholder', 'Scrivi la tua risposta...');
      input.setAttribute('id', `open-answer-${index}`);
      questionDiv.appendChild(input);
    } else if (question.type === 'closed') {
      // Se la domanda è chiusa
      const options = question.options.split(',');
      options.forEach((option, i) => {
        const label = document.createElement('label');
        label.classList.add('form-check-label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `closed-answer-${index}`;
        input.value = option.trim();
        label.appendChild(input);
        label.appendChild(document.createTextNode(option.trim()));

        const div = document.createElement('div');
        div.classList.add('form-check');
        div.appendChild(label);
        questionDiv.appendChild(div);
      });
    }

    quizForm.appendChild(questionDiv);
  });
}

// Funzione per inviare le risposte e concludere il quiz
function submitQuiz() {
  const answers = [];
  questions.forEach((question, index) => {
    let answer = '';
    if (question.type === 'open') {
      // Domanda aperta
      answer = document.getElementById(`open-answer-${index}`).value;
    } else if (question.type === 'closed') {
      // Domanda chiusa
      const selectedOption = document.querySelector(`input[name="closed-answer-${index}"]:checked`);
      if (selectedOption) {
        answer = selectedOption.value;
      }
    }
    answers.push({ question: question.question, answer: answer });
  });

  // Mostra i risultati del quiz
  alert("Hai completato il quiz! I tuoi risultati sono stati registrati.");
  console.log("Risposte al quiz:", answers);
  // Puoi salvare i risultati in un file o database, qui mostriamo solo in console

  // Puoi reindirizzare l'utente alla homepage o altro
  window.location.href = 'index.html';
}

// Carica le domande del quiz al caricamento della pagina
loadQuiz();