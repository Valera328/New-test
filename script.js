// Массив вопросов с ответами
const questions = [
    {
        question: 'Флаг какой страны в мире единственный не имеет прямоугольную форму?',
        options: ['Непал', 'Камбоджа', 'Бутан', 'Шри-Ланка'],
        correctAnswer: 'Непал'
    },
    {
        question: 'Сколько спутников у Венеры?',
        options: ['Один', 'Два', 'Три', 'Ни одного'],
        correctAnswer: 'Ни одного'
    },
    {
        question: 'Какая страна находится между Францией и Испанией?',
        options: ['Лихтенштейн', 'Люксембург', 'Андорра', 'Сан-Марино'],
        correctAnswer: 'Андорра'
    },
    {
        question: 'Число Пи обычно округляют до 3.14. Какие следующие 3 цифры, если число Пи округлить до пяти цифр после запятой?',
        options: ['159', '471', '725', '094'],
        correctAnswer: '159'
    },
    {
        question: 'Сколько в среднем недель в одном году?',
        options: ['50', '51', '53', '52'],
        correctAnswer: '52'
    }
];

// Индекс текущего вопроса из localStorage
let currentQuestionIndex = localStorage.getItem('currentQuestionIndex') ? parseInt(localStorage.getItem('currentQuestionIndex')) : 0
// Счетчик правильных ответов из localStorage
let correctAnswers = localStorage.getItem('correctAnswers') ? parseInt(localStorage.getItem('correctAnswers')) : 0

// Массив страниц с вопросами и результатом
const questionPages = [
    'question1.html',
    'question2.html',
    'question3.html',
    'question4.html',
    'question5.html',
    'result.html'
];

// Функция для выбора ответа и разблокировки кнопки "Следующий вопрос"
function Selected(option) {
    document.getElementById('nextQuestion').disabled = false
    localStorage.setItem('selectedOption', option)
}

// Обработчик событий для загрузки контента после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.getElementById('nextQuestion')
    
    if (nextButton) {
        nextButton.onclick = function() {
            const selectedOption = localStorage.getItem('selectedOption')
            currentQuestionIndex++;
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex)
            // Переход на следующую страницу
            if (currentQuestionIndex < questionPages.length) {
                window.location.assign(questionPages[currentQuestionIndex])
            }
        };
    }
});

// Функция для перехода к предыдущему вопросу
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--
        localStorage.setItem('currentQuestionIndex', currentQuestionIndex)
        location.href = questionPages[currentQuestionIndex]
    }
}

// Функция для перезапуска теста
function restartQuiz() {
    correctAnswers = 0 // Сброс счетчика правильных ответов
    currentQuestionIndex = 0 // Сброс текущего вопроса
    localStorage.setItem('correctAnswers', correctAnswers)
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex)
    location.href = questionPages[0] // Переход к первому вопросу
}