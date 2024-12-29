let quizData = [
    {
      question: "Who plays the lead role in Stree 2?",

      options: ["Rajkummar Rao", "Varun Dhawan", "Ayushmann Khurrana", "Kartik Aaryan"],
      correct: "Rajkummar Rao",
    },
    {
      question: "What is the primary theme of Stree 2?",
      options: ["Supernatural horror", "Comedy and folklore","Romance", "Thriller"],
      correct: "Comedy and folklore",
    },
    {
      question:
        "Who directed Stree 2?",
      options: [
        "Amar Kaushik",
        "Rohit Shetty",
        "David Dhawan",
        "Zoya Akhtar",
      ],
      correct: "Amar Kaushik",
    },
    {
      question: "Which character is known for their signature line, 'O Stree, kal aana'?",
      options: ["Vicky","Bittu","Janna", "Rudra"],
      correct: "Vicky",
    },
    {
      question: "What supernatural entity is central to the plot of Stree and Stree 2?",
      options: [
        "A ghost",
        "A witch",
        "A demon",
        "A vampire",
      ],
      correct: "A witch",
    },
    {
      question: "What societal issue does Stree 2 address?",
      options: [
        "Gender equality",
        "Corruption",
        "Environmentalism",
        "Education",
      ],
      correct: "Gender equality",
    },
    {
      question: "What is the relationship between Vicky and the Stree?",
      options: [
        "They are enemies",
        "They are friends",
        "There is romantic tension",
        "They are family",
      ],
      correct: "There is romantic tension",
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