// The correct answer for each question
const answers = {
  q1: "a",
  q2: "b",
  q3: "c",
  q4: "b",
  q5: "a"
};

// Grab the elements we need from the page
const form = document.getElementById("quiz-form");
const progress = document.getElementById("progress");
const restartButton = document.getElementById("restart");
const total = Object.keys(answers).length; // 5 questions


// ---------- Functions ----------

// How many questions has the user answered so far?
function countAnswered() {
  let count = 0;
  for (let q in answers) {
    // .value is "" when no option is selected for that question
    if (form.elements[q].value !== "") {
      count++;
    }
  }
  return count;
}

// Update the "Answered: x / 5" text
function updateProgress() {
  progress.textContent = "Answered: " + countAnswered() + " / " + total;
}

// Remove the green / red marks from the questions
function clearMarks() {
  const sections = document.querySelectorAll(".question");
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("correct", "wrong");
  }
}

// Check the answers and return the score
function calculateScore() {
  let score = 0;
  for (let q in answers) {
    const section = document.getElementById(q);

    if (form.elements[q].value === answers[q]) {
      score++;
      section.classList.add("correct");
    } else {
      section.classList.add("wrong");
    }
  }
  return score;
}


// ---------- DOM events ----------

// 1. Every time an option is picked, update the progress text
form.addEventListener("change", updateProgress);

// 2. When Submit is pressed, mark the answers and show the score in an alert
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  if (countAnswered() < total) {
    alert("Please answer all the questions first!");
    return;
  }

  clearMarks();
  const score = calculateScore();

  let message = "You scored " + score + " out of " + total + ".";
  if (score === total) {
    message = message + " Perfect!";
  } else if (score >= 3) {
    message = message + " Good job!";
  } else {
    message = message + " Keep practicing!";
  }
  alert(message);
});

// 3. When Restart is clicked, clear everything
restartButton.addEventListener("click", function () {
  form.reset();
  clearMarks();
  updateProgress();
});
