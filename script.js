// Get the DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve progress from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Function to save progress in session storage
function saveProgress() {
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if the choice was previously selected
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save answer selection
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        saveProgress(); // Save progress when an answer is selected
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
    }

    questionsElement.appendChild(questionElement);
  }
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Store score in local storage
  localStorage.setItem("score", score);

  // Display score
  scoreElement.textContent = `Your score is ${score} out of 5.`;
}

// Event listener for submit button
submitButton.addEventListener("click", () => {
  calculateScore();
});

// Render questions on page load
renderQuestions();
