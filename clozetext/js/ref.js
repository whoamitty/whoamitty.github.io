function calculateScore(questions) {
    return Array.from(questions).reduce((score, question) => {
      const correctAnswer = question.dataset.correctAnswer;
      const correctAnswers = question.dataset.correctAnswers;
  
      if (correctAnswer) {
        const userAnswer = question.querySelector('.answer').value.trim().toLowerCase();
        if (userAnswer === correctAnswer) {
          score++;
        }
      }
  
      if (correctAnswers) {
        const userAnswers = [...question.querySelectorAll('.answer:checked')].map(input => input.value);
        const correctAnswersArray = correctAnswers.split(',');
        if (userAnswers.length === correctAnswersArray.length &&
            userAnswers.every(value => correctAnswersArray.includes(value))) {
          score++;
        }
      }
  
      return score;
    }, 0);
  }
  
  function displayCorrectAnswer(question) {
    const correctAnswer = question.dataset.correctAnswer;
    if (!correctAnswer) return;
  
    const answerElement = question.querySelector('.answer');
    if (answerElement.type === 'text') {
      answerElement.style.backgroundColor = 'green';
      answerElement.style.color = 'white';
    } else if (answerElement.type === 'checkbox') {
      const correctAnswers = correctAnswer.split(',');
      question.querySelectorAll('.answer').forEach(answer => {
        if (correctAnswers.includes(answer.value)) {
          answer.nextSibling.style.color = 'green';
        }
      });
    }
  }
  
  function submitAnswers() {
    const questions = document.querySelectorAll('.question');
    const score = calculateScore(questions);
  
    questions.forEach(question => {
      displayCorrectAnswer(question);
      markIncorrectAnswers([question]); // Passing an array with single question for consistency
    });
  
    alert(`Your score is: ${score}/${questions.length}`);
  }
  
  // The markIncorrectAnswers function can be used as is since it already handles different types of answers.