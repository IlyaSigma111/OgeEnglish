document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года в футере
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Навигация по вкладкам
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех ссылок
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Добавляем активный класс к текущей ссылке
            this.classList.add('active');
            
            // Получаем целевую вкладку
            const targetTab = this.getAttribute('data-tab');
            
            // Скрываем все вкладки
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Показываем целевую вкладку
            document.getElementById(targetTab).classList.add('active');
            
            // Закрываем меню на мобильных устройствах
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Мобильное меню
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Данные для викторин
    const quizData = {
        verbs: {
            title: "Викторина по неправильным глаголам",
            questions: [
                {
                    question: "Какая форма Past Simple у глагола 'begin'?",
                    options: ["begin", "began", "begun", "beginned"],
                    correct: 1
                },
                {
                    question: "Какой глагол имеет одинаковые формы Past Simple и Past Participle?",
                    options: ["break", "bring", "begin", "drink"],
                    correct: 1
                },
                {
                    question: "Какая форма Past Participle у глагола 'choose'?",
                    options: ["choose", "chose", "chosen", "choosed"],
                    correct: 2
                },
                {
                    question: "Какая форма Past Simple у глагола 'drink'?",
                    options: ["drink", "drank", "drunk", "drinked"],
                    correct: 1
                },
                {
                    question: "Как переводится глагол 'build'?",
                    options: ["строить", "покупать", "ломать", "приносить"],
                    correct: 0
                },
                {
                    question: "Какая форма Past Participle у глагола 'do'?",
                    options: ["do", "did", "done", "doed"],
                    correct: 2
                },
                {
                    question: "Какая форма Past Simple у глагола 'come'?",
                    options: ["come", "came", "comed", "coming"],
                    correct: 1
                },
                {
                    question: "Как переводится глагол 'break'?",
                    options: ["ломать", "строить", "выбирать", "приходить"],
                    correct: 0
                },
                {
                    question: "Какая форма Past Participle у глагола 'buy'?",
                    options: ["buy", "bought", "buyed", "buying"],
                    correct: 1
                },
                {
                    question: "Какие три формы у глагола 'be'?",
                    options: ["be - was - been", "be - were - been", "be - was/were - been", "be - been - was"],
                    correct: 2
                },
                {
                    question: "Какой глагол имеет форму Past Simple 'broke'?",
                    options: ["bring", "break", "build", "buy"],
                    correct: 1
                },
                {
                    question: "Какая форма Past Simple у глагола 'bring'?",
                    options: ["bring", "brang", "brought", "bringed"],
                    correct: 2
                }
            ]
        },
        grammar: {
            title: "Викторина по грамматике",
            questions: [
                {
                    question: "Какое время используется для выражения регулярных действий?",
                    options: ["Past Simple", "Present Simple", "Future Simple", "Present Continuous"],
                    correct: 1
                },
                {
                    question: "Какой модальный глагол выражает необходимость?",
                    options: ["can", "should", "must", "may"],
                    correct: 2
                },
                {
                    question: "Какое время используется для выражений действий, которые произошли в определенное время в прошлом?",
                    options: ["Past Simple", "Present Perfect", "Future Simple", "Present Continuous"],
                    correct: 0
                },
                {
                    question: "Какой модальный глагол используется для выражения способности?",
                    options: ["must", "should", "can", "may"],
                    correct: 2
                },
                {
                    question: "Какое время используется для спонтанных решений о будущем?",
                    options: ["Present Simple", "Past Simple", "Future Simple", "Present Perfect"],
                    correct: 2
                },
                {
                    question: "Какой модальный глагол выражает совет?",
                    options: ["must", "should", "can", "may"],
                    correct: 1
                },
                {
                    question: "Как образуется вопросительная форма в Present Simple?",
                    options: ["do/does + subject + verb", "subject + do/does + verb", "verb + subject + do/does", "does/do + verb + subject"],
                    correct: 0
                },
                {
                    question: "Какое время используется для действий, происходящих в момент речи?",
                    options: ["Present Simple", "Past Simple", "Present Continuous", "Future Simple"],
                    correct: 2
                },
                {
                    question: "Какой модальный глагол выражает разрешение?",
                    options: ["must", "should", "can", "will"],
                    correct: 2
                },
                {
                    question: "Как образуется отрицательная форма в Past Simple для правильных глаголов?",
                    options: ["subject + didn't + verb", "subject + didn't + verb (past)", "subject + don't + verb", "subject + not + verb (past)"],
                    correct: 0
                },
                {
                    question: "Какое время используется для выражения планов на будущее?",
                    options: ["Future Simple", "Present Continuous", "Present Simple", "Past Simple"],
                    correct: 1
                },
                {
                    question: "Какой модальный глагол выражает вероятность?",
                    options: ["must", "should", "can", "may"],
                    correct: 3
                }
            ]
        },
        vocabulary: {
            title: "Викторина по лексике",
            questions: [
                {
                    question: "Как переводится слово 'siblings'?",
                    options: ["родители", "братья и сестры", "друзья", "родственники"],
                    correct: 1
                },
                {
                    question: "Что означает фразовый глагол 'get up'?",
                    options: ["ложиться спать", "вставать", "надевать", "искать"],
                    correct: 1
                },
                {
                    question: "Как переводится слово 'homework'?",
                    options: ["школа", "класс", "урок", "домашнее задание"],
                    correct: 3
                },
                {
                    question: "Что означает фразовый глагол 'look for'?",
                    options: ["смотреть на", "искать", "выглядеть", "заботиться"],
                    correct: 1
                },
                {
                    question: "Как переводится слово 'acquaintance'?",
                    options: ["друг", "знакомый", "коллега", "родственник"],
                    correct: 1
                },
                {
                    question: "Что означает фразовый глагол 'give up'?",
                    options: ["давать", "поднимать", "сдаваться", "получать"],
                    correct: 2
                },
                {
                    question: "Как переводится слово 'leisure time'?",
                    options: ["рабочее время", "свободное время", "учебное время", "личное время"],
                    correct: 1
                },
                {
                    question: "Что означает фразовый глагол 'turn on'?",
                    options: ["выключать", "включать", "переворачивать", "возвращать"],
                    correct: 1
                },
                {
                    question: "Как переводится выражение 'be keen on'?",
                    options: ["любить", "ненавидеть", "увлекаться", "интересоваться"],
                    correct: 2
                },
                {
                    question: "Что означает фразовый глагол 'put on'?",
                    options: ["ставить", "класть", "надевать", "снимать"],
                    correct: 2
                },
                {
                    question: "Как переводится слово 'degree' в контексте образования?",
                    options: ["степень", "диплом", "класс", "предмет"],
                    correct: 0
                },
                {
                    question: "Что означает фразовый глагол 'take up a hobby'?",
                    options: ["бросить хобби", "заняться хобби", "обсуждать хобби", "развивать хобби"],
                    correct: 1
                }
            ]
        },
        writing: {
            title: "Викторина по письму",
            questions: [
                {
                    question: "Где в личном письме указывается адрес и дата?",
                    options: ["В левом верхнем углу", "В правом верхнем углу", "В конце письма", "После обращения"],
                    correct: 1
                },
                {
                    question: "Сколько вопросов нужно задать другу в личном письме на ОГЭ?",
                    options: ["1", "2", "3", "4"],
                    correct: 2
                },
                {
                    question: "Как начинается обращение в личном письме?",
                    options: ["Hello", "Dear", "Hi", "My dear"],
                    correct: 1
                },
                {
                    question: "Какая фраза подходит для начала письма?",
                    options: ["That's all for now", "Thanks for your letter", "Hope to hear from you soon", "Best wishes"],
                    correct: 1
                },
                {
                    question: "Как заканчивается личное письмо?",
                    options: ["Your friend", "Best wishes", "Goodbye", "See you"],
                    correct: 1
                },
                {
                    question: "Какой раздел письма следует после обращения?",
                    options: ["Ответы на вопросы друга", "Благодарность за письмо", "Задать вопросы другу", "Прощание"],
                    correct: 1
                },
                {
                    question: "Сколько баллов можно получить за лексико-грамматическое оформление письма?",
                    options: ["1", "2", "3", "4"],
                    correct: 1
                },
                {
                    question: "Какая фраза подходит для конца письма?",
                    options: ["Write soon!", "You asked me about...", "How are you?", "As for me..."],
                    correct: 0
                },
                {
                    question: "Какой критерий оценивает правильность выполнения коммуникативной задачи?",
                    options: ["Организация текста", "Лексико-грамматическое оформление", "Орфография и пунктуация", "Решение коммуникативной задачи"],
                    correct: 3
                },
                {
                    question: "Сколько всего баллов можно получить за письмо на ОГЭ?",
                    options: ["6", "8", "10", "12"],
                    correct: 1
                },
                {
                    question: "Какая фраза используется для перехода к ответам на вопросы?",
                    options: ["Well, that's all for now", "You asked me about...", "Hope to hear from you soon", "Best wishes"],
                    correct: 1
                },
                {
                    question: "Что следует после подписи в письме?",
                    options: ["Дата", "Адрес", "Ничего", "Постскриптум"],
                    correct: 2
                }
            ]
        }
    };
    
    // Переменные для управления викториной
    let currentQuiz = null;
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let quizStarted = false;
    
    // Элементы модального окна
    const quizModal = document.getElementById('quizModal');
    const quizTitle = document.getElementById('quizTitle');
    const quizContainer = document.getElementById('quizContainer');
    const currentQuestionEl = document.getElementById('currentQuestion');
    const totalQuestionsEl = document.getElementById('totalQuestions');
    const prevQuestionBtn = document.getElementById('prevQuestion');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const submitQuizBtn = document.getElementById('submitQuiz');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Кнопки начала викторины
    const startQuizButtons = document.querySelectorAll('.start-quiz');
    
    // Открытие викторины
    startQuizButtons.forEach(button => {
        button.addEventListener('click', function() {
            const quizType = this.getAttribute('data-tab');
            startQuiz(quizType);
        });
    });
    
    // Закрытие модального окна
    closeModalBtn.addEventListener('click', closeModal);
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(e) {
        if (e.target === quizModal) {
            closeModal();
        }
    });
    
    // Навигация по вопросам викторины
    prevQuestionBtn.addEventListener('click', showPreviousQuestion);
    nextQuestionBtn.addEventListener('click', showNextQuestion);
    submitQuizBtn.addEventListener('click', submitQuiz);
    
    // Функция начала викторины
    function startQuiz(quizType) {
        currentQuiz = quizType;
        currentQuestions = [...quizData[quizType].questions];
        
        // Выбираем 10 случайных вопросов
        shuffleArray(currentQuestions);
        currentQuestions = currentQuestions.slice(0, 10);
        
        // Сброс переменных
        currentQuestionIndex = 0;
        userAnswers = new Array(currentQuestions.length).fill(null);
        quizStarted = true;
        
        // Установка заголовка
        quizTitle.textContent = quizData[quizType].title;
        
        // Обновление счетчика вопросов
        currentQuestionEl.textContent = currentQuestionIndex + 1;
        totalQuestionsEl.textContent = currentQuestions.length;
        
        // Сброс кнопок навигации
        prevQuestionBtn.disabled = true;
        nextQuestionBtn.disabled = false;
        nextQuestionBtn.style.display = 'block';
        submitQuizBtn.style.display = 'none';
        
        // Показ первого вопроса
        displayQuestion();
        
        // Открытие модального окна
        quizModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Функция отображения вопроса
    function displayQuestion() {
        const question = currentQuestions[currentQuestionIndex];
        
        // Обновление счетчика
        currentQuestionEl.textContent = currentQuestionIndex + 1;
        
        // Создание HTML для вопроса
        let optionsHTML = '';
        question.options.forEach((option, index) => {
            const isSelected = userAnswers[currentQuestionIndex] === index;
            optionsHTML += `
                <button class="quiz-option ${isSelected ? 'selected' : ''}" data-index="${index}">
                    ${option}
                </button>
            `;
        });
        
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <h4>Вопрос ${currentQuestionIndex + 1}: ${question.question}</h4>
                <div class="quiz-options">
                    ${optionsHTML}
                </div>
            </div>
        `;
        
        // Добавление обработчиков для вариантов ответов
        const optionButtons = document.querySelectorAll('.quiz-option');
        optionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedIndex = parseInt(this.getAttribute('data-index'));
                
                // Снятие выделения со всех вариантов
                optionButtons.forEach(btn => btn.classList.remove('selected'));
                
                // Выделение выбранного варианта
                this.classList.add('selected');
                
                // Сохранение ответа пользователя
                userAnswers[currentQuestionIndex] = selectedIndex;
                
                // Активация кнопки "Следующий"
                nextQuestionBtn.disabled = false;
            });
        });
        
        // Обновление состояния кнопок навигации
        prevQuestionBtn.disabled = currentQuestionIndex === 0;
        
        // Показать кнопку "Завершить" на последнем вопросе
        if (currentQuestionIndex === currentQuestions.length - 1) {
            nextQuestionBtn.style.display = 'none';
            submitQuizBtn.style.display = 'block';
        } else {
            nextQuestionBtn.style.display = 'block';
            submitQuizBtn.style.display = 'none';
        }
    }
    
    // Функция перехода к предыдущему вопросу
    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    }
    
    // Функция перехода к следующему вопросу
    function showNextQuestion() {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        }
    }
    
    // Функция завершения викторины
    function submitQuiz() {
        // Проверка, все ли вопросы отвечены
        const unanswered = userAnswers.filter(answer => answer === null).length;
        
        if (unanswered > 0) {
            if (!confirm(`Вы ответили не на все вопросы. ${unanswered} вопрос(ов) осталось без ответа. Все равно завершить викторину?`)) {
                return;
            }
        }
        
        // Расчет результатов
        let correctCount = 0;
        const results = [];
        
        currentQuestions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            if (isCorrect) correctCount++;
            
            results.push({
                question: question.question,
                userAnswer: userAnswer !== null ? question.options[userAnswer] : "Нет ответа",
                correctAnswer: question.options[question.correct],
                isCorrect: isCorrect
            });
        });
        
        const score = Math.round((correctCount / currentQuestions.length) * 100);
        
        // Отображение результатов
        let resultsHTML = `
            <div class="quiz-results">
                <h3>Результаты викторины</h3>
                <div class="result-score">${score}%</div>
                <div class="result-message">Вы ответили правильно на ${correctCount} из ${currentQuestions.length} вопросов</div>
                
                <div class="result-details">
                    <h4>Детализация ответов:</h4>
        `;
        
        results.forEach((result, index) => {
            resultsHTML += `
                <div class="result-item">
                    <p><strong>Вопрос ${index + 1}:</strong> ${result.question}</p>
                    <p class="${result.isCorrect ? 'result-correct' : 'result-incorrect'}">
                        <strong>Ваш ответ:</strong> ${result.userAnswer}
                    </p>
                    ${!result.isCorrect ? `<p class="result-correct"><strong>Правильный ответ:</strong> ${result.correctAnswer}</p>` : ''}
                </div>
            `;
        });
        
        resultsHTML += `
                </div>
                <button id="restartQuiz" style="margin-top: 20px; padding: 12px 30px; background-color: #3498db; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Пройти викторину еще раз
                </button>
                <button id="closeResults" style="margin-top: 10px; padding: 12px 30px; background-color: #f8f9fa; color: #333; border: none; border-radius: 8px; cursor: pointer;">
                    Закрыть
                </button>
            </div>
        `;
        
        quizContainer.innerHTML = resultsHTML;
        
        // Скрытие элементов навигации
        document.querySelector('.quiz-info').style.display = 'none';
        document.querySelector('.quiz-controls').style.display = 'none';
        
        // Обработчики для кнопок результатов
        document.getElementById('restartQuiz').addEventListener('click', function() {
            startQuiz(currentQuiz);
        });
        
        document.getElementById('closeResults').addEventListener('click', closeModal);
    }
    
    // Функция закрытия модального окна
    function closeModal() {
        quizModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Сброс состояния викторины
        quizStarted = false;
        
        // Восстановление элементов управления
        document.querySelector('.quiz-info').style.display = 'flex';
        document.querySelector('.quiz-controls').style.display = 'flex';
    }
    
    // Вспомогательная функция для перемешивания массива
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Открытие первой вкладки по умолчанию
    document.querySelector('.nav-link.active').click();
});
