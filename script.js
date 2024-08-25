
let quiz = [];
let currentQuestionIndex = 0;
let score = 0;

document.getElementById('createQuizButton').addEventListener('click', () => {
    showSection('createQuizSection');
});

document.getElementById('takeQuizButton').addEventListener('click', () => {
    showSection('takeQuizSection');
    loadQuiz();
});

document.getElementById('addQuestionButton').addEventListener('click', addQuestion);
document.getElementById('finishQuizButton').addEventListener('click', finishQuiz);

function showSection(sectionId) {
    document.getElementById('createQuizSection').style.display = 'none';
    document.getElementById('takeQuizSection').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

function addQuestion() {
    const question = document.getElementById('questionInput').value;
    const options = [
        document.getElementById('option1Input').value,
        document.getElementById('option2Input').value,
        document.getElementById('option3Input').value,
        document.getElementById('option4Input').value
    ];
    const correctAnswer = parseInt(document.getElementById('correctAnswerInput').value) - 1;

    if (question && options.every(option => option) && correctAnswer >= 0 && correctAnswer < 4) {
        quiz.push({ question, options, correctAnswer });
        document.getElementById('quizCreatedMessage').textContent = "Question added!";
        clearInputs();
    } else {
        alert('Please fill in all fields and ensure the correct answer is between 1 and 4.');
    }
}

function clearInputs() {
    document.getElementById('questionInput').value = '';
    document.getElementById('option1Input').value = '';
    document.getElementById('option2Input').value = '';
    document.getElementById('option3Input').value = '';
    document.getElementById('option4Input').value = '';
    document.getElementById('correctAnswerInput').value = '';
}

function finishQuiz() {
    if (quiz.length > 0) {
        alert('Quiz saved! You can now take the quiz.');
        document.getElementById('quizCreatedMessage').textContent = '';
        clearInputs();
    } else {
        alert('Please add at least one question to the quiz.');
    }
}

function loadQuiz() {
    if (quiz.length === 0) {
        alert('No quiz available. Please create a quiz first.');
        return;
    }

    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

function displayQuestion() {
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = '';

    const question = quiz[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.className = 'quiz-question';
    questionElement.textContent = question.question;
    quizContent.appendChild(questionElement);

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(index));
        quizContent.appendChild(optionElement);
    });
}

function checkAnswer(selectedIndex) {
    const correctAnswer = quiz[currentQuestionIndex].correctAnswer;

    if (selectedIndex === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        displayQuestion();
    } else {
        displayResults();
    }
}

function displayResults() {
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = `<h3>Your Score: ${score}/${quiz.length}</h3>`;
}
