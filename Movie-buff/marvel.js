let quizData = [
    {
      question: "What is Thor’s hammer called?",

      options: ["Stormbreaker", "Mjolnir", "Excalibur", "Gungnir"],
      correct: "Mjolnir",
    },
    {
      question: "Who is the first Avenger?",
      options: [" Iron Man", "Captain America", "Thor", "Hulk"],
      correct: "Captain America",
    },
    {
      question:
        "What is the name of Black Panther’s home?",
      options: [
        "Zamunda",
        "Wakanda",
        "Atlantis",
        "Genosha",
      ],
      correct: "Wakanda",
    },
    {
      question: "Which Infinity Stone is known as the Space Stone?",
      options: ["Reality Stone","Mind Stone","Power Stone", "Tesseract"],
      correct: "Tesseract",
    },
    {
      question: "Who directed Guardians of the Galaxy?",
      options: [
        "Joss Whedon",
        "James Gunn",
        "Taika Waititi",
        "Ryan Coogler",
      ],
      correct: "James Gunn",
    },
    {
      question: "What is Iron Man’s real name?",
      options: [
        "Tony Stark",
        "Steve Rogers",
        "Bruce Banner",
        "Peter Parker",
      ],
      correct: "Tony Stark",
    },
    {
      question: "What is the name of the organization led by Nick Fury?",
      options: [
        "SHIELD",
        "HYDRA",
        "The Avengers",
        "AID",
      ],
      correct: "SHIELD",
    },
    {
      question:
        "Who is the main villain in Black Panther?",
      options: [
        "Ultron",

        "Thanos",
        "Erik Killmonger",
        "Loki",
      ],
      correct: "Erik Killmonger",
    },
    {
      question: "What item does Doctor Strange use to manipulate time?",
      options: [
        "The Eye of Agamotto",
        "The Time Stone",
        "The Tesseract",
        "The Darkhold",
      ],
      correct: "The Eye of Agamotto",
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