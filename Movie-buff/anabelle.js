let quizData = [
    {
      question: "What is Annabelle?",

      options: [" A haunted doll", "A cursed book", "A possessed mirror","A ghost"],
      correct: " A haunted doll",
    },
    {
      question: "Who initially owns the Annabelle doll in the first movie?",
      options: ["Mia and John"," Ed and Lorraine Warren","A young girl","A priest"],
      correct: "Mia and John",
    },
    {
      question:
        "What year was the first 'Annabelle' movie released?",
      options: [
        "2013",
        "2014",
        "2017",
        "2019",
      ],
      correct: "2014",
    },
    {
      question: "What is the main theme of the Annabelle series?",
      options: [" Revenge","Possession","Family love"
, "Friendship"],
      correct: "Possession",
    },
    {
      question: "Which character tries to rid Annabelle of her evil spirit?",
      options: [
        "Mia",
        "John",
        "Father Perez",
        "Linda",
      ],
      correct: "father Perez",
    },
    {
      question: "In Annabelle: Creation, who creates the doll?",
      options: [
        "A dollmaker",
        "A scientist",
        "A witch",
        "A mother",
      ],
      correct: "A dollmaker",
    },
    {
      question: "What tragic event leads to Annabelle becoming a vessel for evil?",
      options: [
        "A fire",
        "A car accident",
        "The death of a child",
        "A betrayal",
      ],
      correct: "The death of a child",
    },
    {
      question:
        "Which character is possessed by Annabelle in Annabelle: Creation?",
      options: [
        "Janice",

        " Mia",
        " Linda",
        "John",
      ],
      correct: "Janice",
    },
    {
      question: "What type of establishment does Annabelle Comes Home take place in?",
      options: [
        "A Church",
        "A haunted house",
        "A museum",
        " A daycare",
      ],
      correct: " A museum",
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