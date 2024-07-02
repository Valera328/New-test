// Инициализация переменных с использованием localStorage
let currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex')) || 0;
let correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0;

// Загрузка документа для начала работы скрипта
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
});

// Функция для загрузки вопроса и вариантов ответов
function loadQuestion() {
    const questionElement = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const nextButton = document.getElementById('nextQuestion');

    // Проверка, достигнут ли конец списка вопросов
    if (currentQuestionIndex >= questions.length) {
        document.body.innerHTML = `
            <h1 class="whiteText">Результаты теста</h1>
            <div class="textBlock">
                <p>Количество правильных ответов: ${correctAnswers}</p>
            </div>
            <div class="centeredButton">
                <button class="clickMe" onclick="restartQuiz()">Пройти тест заново</button>
            </div>
        `;
    } else {
        questionElement.textContent = `Вопрос ${currentQuestionIndex + 1}/${questions.length}`;
        questionText.textContent = questions[currentQuestionIndex].question;
        optionsContainer.innerHTML = '';

        questions[currentQuestionIndex].options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('clickMe');
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(option, button));
            optionsContainer.appendChild(button);
        });

        nextButton.disabled = true;
    }
}

// Функция для выбора ответа на вопрос
function selectAnswer(selectedOption, selectedButton) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    const buttons = document.querySelectorAll('#optionsContainer .clickMe');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });

    if (selectedOption === correctAnswer) {
        correctAnswers++;
        localStorage.setItem('correctAnswers', correctAnswers);
    } else {
        selectedButton.classList.add('incorrect');
    }
    localStorage.setItem('selectedOption', selectedOption);
    document.getElementById('nextQuestion').disabled = false;
}

// Функция для перехода к следующему вопросу
function nextQuestion() {
    currentQuestionIndex++;
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    loadQuestion();
}

// Функция для перезапуска теста
function restartQuiz() {
    correctAnswers = 0;
    currentQuestionIndex = 0;
    localStorage.setItem('correctAnswers', correctAnswers);
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    location.reload();
}
