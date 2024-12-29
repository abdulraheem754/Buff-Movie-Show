let quizData = [
    {
      question: "Who is the Hybrid?",

      options: ["Klaus Mikaelson", "Elijah Mikaelson", "Kol Mikaelson", "Fin Mikaelson"],
      correct: "Klaus Mikaelson",
    },
    {
      question: "What is the name of Klaus’s daughter?",
      options: ["Camille", "Rebekah", "Davina", "Hope"],
      correct: "Hope",
    },
    {
      question:
        "Which witch helps the Mikaelson family throughout the series?",
      options: [
        "Sophie Deveraux",
        "Freya Mikaelson",
        "Davina Claire",
        "Jane-Anne Deveraux",
      ],
      correct: "Davina Claire",
    },
    {
      question: "What city do the Mikaelsons primarily inhabit?",
      options: ["Mystic Falls","New Orleans"," Chicago", "Atlanta"],
      correct: "New Orleans",
    },
    {
      question: "Who is the primary antagonist in Season 1?",
      options: [
        "Marcel Gerard",
        "Klaus Mikaelson",
        "Finn Mikaelson",
        "Camille",
      ],
      correct: "Marcel Gerard",
    },
    {
      question: "What is the relationship between Klaus and Elijah?",
      options: [
        "Friends",
        "Cousins",
        "Brothers",
        "Enemies",
      ],
      correct: "Brothers",
    },
    {
      question: "Which character becomes the first female vampire in the series?",
      options: [
        "Rekebah Mikaelson",
        "Freya Mikaelson",
        "Hayley Marshall",
        "Aurora de Martel",
      ],
      correct: "Rebekah Mikaelson",
    },
    {
      question:
        "What is Hayley's primary goal throughout the series?",
      options: [
        "To become a witch",

        "To protect Hope",
        "To defeat Klaus",
        "To reclaim her pack",
      ],
      correct: "To protect Hope",
    },
    {
      question: "Who sacrifices themselves in the final season?",
      options: [
        "Klaus Mikaelson",
        "Elijah Mikaelson",
        "Kol Mikaelson",
        "Rebekah Mikaelson",
      ],
      correct: "Klaus Mikaelson",
    },
  ];
  
  const quizContainer = document.querySelector(".quiz-container");
  const question = document.querySelector(".quiz-container .question");
  const options = document.querySelector(".quiz-container .options");
  const nextBtn = document.querySelector(".quiz-container .next-btn");
  const quizResult = document.querySelector(".quiz-result");
  const startBtnContainer = document.querySelector(".start-btn-container");
  const startBtn = document.querySelector(".start-btn-container .start-btn");
  
  let questionNumber = 0;
  let score = 0;
  const MAX_QUESTIONS = 5;
  let timerInterval;
  
  const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
  };
  
  quizData = shuffleArray(quizData);
  
  const resetLocalStorage = () => {
    for (i = 0; i < MAX_QUESTIONS; i++) {
      localStorage.removeItem(`userAnswer_${i}`);
    }
  };
  
  resetLocalStorage();
  
  const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if (userAnswer === quizData[questionNumber].correct) {
      score++;
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("incorrect");
    }
  
    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);
  
    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach((o) => {
      o.classList.add("disabled");
    });
  };
  
  const createQuestion = () => {
    clearInterval(timerInterval);
  
    let secondsLeft = 9;
    const timerDisplay = document.querySelector(".quiz-container .timer");
    timerDisplay.classList.remove("danger");
  
    timerDisplay.textContent = `Time Left: 10 seconds`;
  
    timerInterval = setInterval(() => {
      timerDisplay.textContent = `Time Left: ${secondsLeft
        .toString()
        .padStart(2, "0")} seconds`;
      secondsLeft--;
  
      if (secondsLeft < 3) {
        timerDisplay.classList.add("danger");
      }
  
      if (secondsLeft < 0) {
        clearInterval(timerInterval);
        displayNextQuestion();
      }
    }, 1000);
  
    options.innerHTML = "";
    question.innerHTML = `<span class='question-number'>${
      questionNumber + 1
    }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;
  
    const shuffledOptions = shuffleArray(quizData[questionNumber].options);
  
    shuffledOptions.forEach((o) => {
      const option = document.createElement("button");
      option.classList.add("option");
      option.innerHTML = o;
      option.addEventListener("click", (e) => {
        checkAnswer(e);
      });
      options.appendChild(option);
    });
  };
  
  const retakeQuiz = () => {
    questionNumber = 0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();
  
    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
  };
  
  const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";
  
    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
    quizResult.appendChild(resultHeading);
  
    for (let i = 0; i < MAX_QUESTIONS; i++) {
      const resultItem = document.createElement("div");
      resultItem.classList.add("question-container");
  
      const userAnswer = localStorage.getItem(`userAnswer_${i}`);
      const correctAnswer = quizData[i].correct;
  
      let answeredCorrectly = userAnswer === correctAnswer;
  
      if (!answeredCorrectly) {
        resultItem.classList.add("incorrect");
      }
  
      resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
        quizData[i].question
      }</div>
      <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
      <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;
  
      quizResult.appendChild(resultItem);
    }
  
    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Retake Quiz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
  };
  
  const displayNextQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS - 1) {
      displayQuizResult();
      return;
    }
  
    questionNumber++;
    createQuestion();
  };
  
  nextBtn.addEventListener("click", displayNextQuestion);
  
  startBtn.addEventListener("click", () => {
    startBtnContainer.style.display = "none";
    quizContainer.style.display = "block";
    createQuestion();
  });