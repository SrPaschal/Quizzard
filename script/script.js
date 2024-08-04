const questions = [
    {
        question: "Which of the following is an input device?",
        answers: [
            { option: "Printer", correct: false },
            { option: "Monitor", correct: false },
            { option: "Keyboard", correct: true },
            { option: "Speaker", correct: false }
        ]
    },
    {
        question: "What is the primary function of the CPU?",
        answers: [
            { option: "Store data", correct: false },
            { option: "Perform calculations", correct: true },
            { option: "Display output", correct: false },
            { option: "Connect devices", correct: false }
        ]
    },
    {
        question: "Which of these is an output device?",
        answers: [
            { option: "Mouse", correct: false },
            { option: "Microphone", correct: false },
            { option: "Printer", correct: true },
            { option: "Scanner", correct: false }
        ]
    },
    {
        question: "What does RAM stand for?",
        answers: [
            { option: "Read Access Memory", correct: false },
            { option: "Random Access Memory", correct: true },
            { option: "Read And Memory", correct: false },
            { option: "Random Access Module", correct: false }
        ]
    },
    {
        question: "Which component is responsible for the computer’s speed?",
        answers: [
            { option: "Hard Drive", correct: false },
            { option: "RAM", correct: true },
            { option: "Motherboard", correct: false },
            { option: "Power Supply", correct: false }
        ]
    },
    {
        question: "Which of these is a type of software?",
        answers: [
            { option: "Monitor", correct: false },
            { option: "Keyboard", correct: false },
            { option: "Operating System", correct: true },
            { option: "Hard Drive", correct: false }
        ]
    },
    {
        question: "What does BIOS stand for?",
        answers: [
            { option: "Basic Input Output System", correct: true },
            { option: "Binary Integrated Operating System", correct: false },
            { option: "Base Integrated Output System", correct: false },
            { option: "Binary Input Output System", correct: false }
        ]
    },
    {
        question: "Which device is used for inputting text?",
        answers: [
            { option: "Printer", correct: false },
            { option: "Scanner", correct: false },
            { option: "Keyboard", correct: true },
            { option: "Monitor", correct: false }
        ]
    },
    {
        question: "What is the function of an operating system?",
        answers: [
            { option: "Connect hardware devices", correct: true },
            { option: "Store files", correct: false },
            { option: "Print documents", correct: false },
            { option: "Calculate data", correct: false }
        ]
    },
    {
        question: "Which is a permanent storage device?",
        answers: [
            { option: "RAM", correct: false },
            { option: "SSD", correct: true },
            { option: "CPU", correct: false },
            { option: "GPU", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let selectedAnswers = [];
const numQuestions = 5;
let currentQuestions = [];
let remainingQuestions = numQuestions;
let timer;
let timeLeft = 60; // 60 seconds for the quiz

// Get a random set of questions
function getRandomQuestions() {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

// Load the current question and update the UI
function loadQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;

    const answersElement = document.querySelector('.quiz-answers');
    answersElement.innerHTML = '';

    question.answers.forEach((answer) => {
        const answerElement = document.createElement('h1');
        answerElement.className = 'answer';
        answerElement.textContent = answer.option;
        answerElement.addEventListener('click', () => selectAnswer(answer.correct, answerElement));
        answersElement.appendChild(answerElement);
    });

    document.querySelector('.ctrl-btn-pre').disabled = currentQuestionIndex === 0;
    document.querySelector('.ctrl-btn-next').textContent = currentQuestionIndex === numQuestions - 1 ? 'Submit' : 'Next';

    // Update remaining questions
    remainingQuestions = numQuestions - currentQuestionIndex - 1;
    document.querySelector('.total-remaining-qtn').textContent = `${remainingQuestions} Questions Remaining`;
}

// Handle the user's answer selection
function selectAnswer(isCorrect, selectedElement) {
    // Clear previous selections
    document.querySelectorAll('.answer').forEach(el => {
        el.classList.remove('selected');
        el.classList.remove('correct');
        el.classList.remove('incorrect');
    });

    // Mark the selected answer
    selectedElement.classList.add('selected');

    // Apply background color based on correctness
    if (isCorrect) {
        selectedElement.classList.add('correct');
    } else {
        selectedElement.classList.add('incorrect');
    }

    // Store the correctness of the selected answer
    selectedAnswers[currentQuestionIndex] = isCorrect;
}

// Show the final score and stop the timer
function showScore() {
    stopTimer(); // Stop the timer
    const scoreSection = document.querySelector('.score');
    const scoreElement = document.querySelector('.total-score');
    scoreSection.style.display = 'flex';
    document.querySelector('.answer-container').style.display = 'none';

    const correctAnswers = selectedAnswers.filter(Boolean).length;
    const scorePercentage = (correctAnswers / numQuestions) * 100;
    scoreElement.textContent = `${scorePercentage.toFixed(0)}%`;
}

// Restart the quiz and reset all necessary elements
function restartQuiz() {
    currentQuestionIndex = 0;
    selectedAnswers = [];
    currentQuestions = getRandomQuestions();
    remainingQuestions = numQuestions;
    document.querySelector('.score').style.display = 'none';
    document.querySelector('.answer-container').style.display = 'block';
    loadQuestion();
    startTimer(); // Start the timer
}

// Start the countdown timer
function startTimer() {
    timeLeft = 60;
    document.querySelector('.timeout').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.querySelector('.timeout').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showScore(); // Show score when time runs out
        }
    }, 1000);
}

// Stop the countdown timer
function stopTimer() {
    clearInterval(timer);
}

// Event listeners for the quiz controls
document.querySelector('.ctrl-btn-pre').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

document.querySelector('.ctrl-btn-next').addEventListener('click', () => {
    if (currentQuestionIndex === numQuestions - 1) {
        showScore();
    } else {
        currentQuestionIndex++;
        loadQuestion();
    }
});

document.querySelector('.restart').addEventListener('click', restartQuiz);

// Initialize the quiz
restartQuiz();