function submitAnswers() {
  const questions = document.querySelectorAll(".question");
  let score = 0;

  questions.forEach((question) => {
    const correctAnswer = question.dataset.correctAnswer;
    const correctAnswers = question.dataset.correctAnswers;
    const userAnswerElement = question.querySelector(".answer");

    const userAnswer = userAnswerElement.value.trim().toLowerCase();
    if (correctAnswer && userAnswer === correctAnswer) {
      score++;
      userAnswerElement.classList.remove("incorrect");
      userAnswerElement.classList.add("correct");
    } else if (correctAnswer) {
      userAnswerElement.classList.add("incorrect");
    }

    if (correctAnswers) {
      const selectedCheckboxes = question.querySelectorAll(".answer:checked");
      const selectedValues = Array.from(selectedCheckboxes).map(
        (checkbox) => checkbox.value
      );
      const correctAnswersArray = correctAnswers.split(",");
      if (
        selectedValues.length === correctAnswersArray.length &&
        selectedValues.every((value) => correctAnswersArray.includes(value))
      ) {
        score++;
        selectedCheckboxes.forEach((checkbox) => {
          checkbox.nextSibling.style.color = 'green';
        });
      } else {
        const incorrectCheckboxes = question.querySelectorAll(
          ".answer:not(:checked)"
        );
        incorrectCheckboxes.forEach((checkbox) => {
          if (correctAnswersArray.includes(checkbox.value)) {
            checkbox.classList.add("incorrect");
          }
        });
      }
    }
  });

  markIncorrectAnswers(questions);

  alert(`Your score is: ${score}/${questions.length}`);
}

function markIncorrectAnswers(questions) {
  questions.forEach((question) => {
    const correctAnswer = question.dataset.correctAnswer;
    const correctAnswers = question.dataset.correctAnswers;
    const userAnswerElement = question.querySelector(".answer");
    const userAnswer = userAnswerElement.value.trim().toLowerCase();

    if (userAnswerElement.type === 'text') {
      if (correctAnswer && userAnswer === correctAnswer) {
        userAnswerElement.style.backgroundColor = 'green';
        userAnswerElement.style.color = 'white';
        const correctResponse = document.createElement('p');
        correctResponse.textContent = `Bonne réponse: ${correctAnswer}`;
        correctResponse.style.color = 'green';
        question.appendChild(correctResponse);
      } else if (correctAnswer) {
        userAnswerElement.classList.add("incorrect");
      }

    } else if (userAnswerElement.type === 'checkbox') {
      if (correctAnswers) {
        const correctAnswersArray = correctAnswers.split(",");
        question.querySelectorAll(".answer").forEach((answer) => {
          if (correctAnswersArray.includes(answer.value)) {
            answer.nextSibling.style.color = answer.checked ? 'green' : 'red';
          }
        });
      }

    } else if (userAnswerElement.type === 'radio') {
      if (correctAnswer) {
        question.querySelectorAll(".answer").forEach((answer) => {
          if (answer.value === correctAnswer) {
            answer.nextSibling.style.color = 'green';
          }
        });
      }
    }

    if (correctAnswer && userAnswer !== correctAnswer) {
      userAnswerElement.classList.add("incorrect");

      const correctResponse = document.createElement('p');
      correctResponse.textContent = `Mauvaise réponse: ${correctAnswer}`;
      correctResponse.style.color = 'red';
      question.appendChild(correctResponse);

    }
  });
}