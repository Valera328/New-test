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
    // Получение элементов DOM для вопроса, текста вопроса, контейнера с вариантами ответов и кнопки "Следующий вопрос"
    const questionElement = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const nextButton = document.getElementById('nextQuestion');

    // Проверка, достигнут ли конец списка вопросов
    if (currentQuestionIndex >= questions.length) {
        // Если все вопросы отвечены, выводим результаты теста
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
        // Вывод текущего вопроса и вариантов ответов
        questionElement.textContent = `Вопрос ${currentQuestionIndex + 1}/${questions.length}`;
        questionText.textContent = questions[currentQuestionIndex].question;
        optionsContainer.innerHTML = '';

        // Кнопки для вариантов ответов
        questions[currentQuestionIndex].options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('clickMe');
            button.textContent = option;
            // Обработчик события для выбора ответа
            button.addEventListener('click', () => selectAnswer(option, button));
            optionsContainer.appendChild(button);
        });

        // Блокировка кнопки "Следующий вопрос" пока не выбран ответ
        nextButton.disabled = true;
    }
}

// Функция для выбора ответа на вопрос
function selectAnswer(selectedOption, selectedButton) {
    // Правильный ответ на текущий вопрос
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    // Получаем все кнопки с вариантами ответов
    const buttons = document.querySelectorAll('#optionsContainer .clickMe');
    // Отключаем все кнопки после выбора ответа
    buttons.forEach(button => {
        button.disabled = true;
        // Подсвечиваем правильный ответ зеленым цветом
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });

    // Если выбран правильный ответ, увеличиваем счетчик правильных ответов, иначе подсвечиваем красным цветом
    if (selectedOption === correctAnswer) {
        correctAnswers++;
        localStorage.setItem('correctAnswers', correctAnswers);
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Записываем выбранный ответ и разблокируем кнопку "Следующий вопрос"
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
