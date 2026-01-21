// Firebase инициализация
let auth, db;

// Инициализация Firebase при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Инициализация Firebase
    initializeFirebase();
    
    // Инициализация приложения
    initializeApp();
});

function initializeFirebase() {
    try {
        // Используем конфиг из вашего Firebase проекта
        const firebaseConfig = {
            apiKey: "AIzaSyAWP2jTkKMUlBhp693hmq0JLj-UxzYspCM",
            authDomain: "englishproject-4c6d0.firebaseapp.com",
            projectId: "englishproject-4c6d0",
            storageBucket: "englishproject-4c6d0.firebasestorage.app",
            messagingSenderId: "524432394751",
            appId: "1:524432394751:web:a60536a71a3a1ca26d7fca"
        };
        
        // Инициализация Firebase
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        
        console.log("Firebase инициализирован успешно");
    } catch (error) {
        console.error("Ошибка инициализации Firebase:", error);
    }
}

function initializeApp() {
    // Навигация по вкладкам
    setupNavigation();
    
    // Настройка аутентификации
    setupAuthentication();
    
    // Настройка модальных окон
    setupModals();
    
    // Настройка тестов
    setupQuizzes();
    
    // Проверка состояния аутентификации
    checkAuthState();
}

// Навигация
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetTab = this.getAttribute('data-tab');
            
            // Обновляем активную ссылку
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем нужную вкладку
            tabContents.forEach(tab => tab.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
            
            // Закрываем мобильное меню
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-right').classList.remove('active');
            }
        });
    });
    
    // Мобильное меню
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const navRight = document.querySelector('.nav-right');
            navRight.classList.toggle('active');
        });
    }
}

// Аутентификация
function setupAuthentication() {
    // Кнопки открытия модальных окон
    document.getElementById('loginBtn')?.addEventListener('click', () => openModal('loginModal'));
    document.getElementById('signupBtn')?.addEventListener('click', () => openModal('signupModal'));
    
    // Переключение между формами
    document.getElementById('switchToSignup')?.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('loginModal');
        openModal('signupModal');
    });
    
    document.getElementById('switchToLogin')?.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('signupModal');
        openModal('loginModal');
    });
    
    // Восстановление пароля
    document.getElementById('forgotPasswordLink')?.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('loginModal');
        openModal('forgotPasswordModal');
    });
    
    document.getElementById('backToLogin')?.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('forgotPasswordModal');
        openModal('loginModal');
    });
    
    // Форма входа
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    
    // Форма регистрации
    document.getElementById('signupForm')?.addEventListener('submit', handleSignup);
    
    // Форма восстановления пароля
    document.getElementById('forgotPasswordForm')?.addEventListener('submit', handlePasswordReset);
    
    // Вход через Google
    document.getElementById('googleLogin')?.addEventListener('click', signInWithGoogle);
    document.getElementById('googleSignup')?.addEventListener('click', signInWithGoogle);
    
    // Выход
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
    
    // Показать/скрыть пароль
    setupPasswordToggles();
    
    // Проверка сложности пароля
    const signupPassword = document.getElementById('signupPassword');
    if (signupPassword) {
        signupPassword.addEventListener('input', checkPasswordStrength);
    }
}

// Модальные окна
function setupModals() {
    // Закрытие по кнопке
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Закрытие по клику вне окна
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal.id);
                }
            });
        }
    });
}

// Открыть модальное окно
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Закрыть модальное окно
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Очистка форм
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
            
            // Сброс сложности пароля
            const strengthFill = document.getElementById('passwordStrengthFill');
            const strengthText = document.getElementById('passwordStrengthText');
            if (strengthFill && strengthText) {
                strengthFill.style.width = '0%';
                strengthText.textContent = 'Сложность пароля: слабый';
            }
        }
    }
}

// Вход
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');
    
    // Показать индикатор загрузки
    btnText.style.display = 'none';
    spinner.style.display = 'block';
    submitBtn.disabled = true;
    
    try {
        // Установка persistence
        const persistence = rememberMe ? 
            firebase.auth.Auth.Persistence.LOCAL : 
            firebase.auth.Auth.Persistence.SESSION;
        
        await auth.setPersistence(persistence);
        
        // Вход пользователя
        await auth.signInWithEmailAndPassword(email, password);
        
        // Закрыть модальное окно
        closeModal('loginModal');
        
        showNotification('Вход выполнен успешно!', 'success');
        
    } catch (error) {
        console.error('Ошибка входа:', error);
        showNotification(getAuthErrorMessage(error), 'error');
    } finally {
        // Скрыть индикатор загрузки
        btnText.style.display = 'inline';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Регистрация
async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Проверка паролей
    if (password !== confirmPassword) {
        showNotification('Пароли не совпадают', 'error');
        return;
    }
    
    // Проверка сложности пароля
    if (!checkPasswordRequirements(password)) {
        showNotification('Пароль слишком слабый. Используйте минимум 6 символов, включая буквы и цифры', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');
    
    // Показать индикатор загрузки
    btnText.style.display = 'none';
    spinner.style.display = 'block';
    submitBtn.disabled = true;
    
    try {
        // Создание пользователя
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Создание профиля в Firestore
        await db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            level: 'beginner',
            goal: 'general',
            settings: {
                notifications: true,
                dailyReminder: true
            },
            stats: {
                completedTests: 0,
                correctAnswers: 0,
                totalAnswers: 0,
                studyDays: 1,
                currentStreak: 1,
                lastActive: new Date().toISOString()
            }
        });
        
        // Закрыть модальное окно
        closeModal('signupModal');
        
        showNotification('Регистрация успешна! Добро пожаловать!', 'success');
        
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        showNotification(getAuthErrorMessage(error), 'error');
    } finally {
        // Скрыть индикатор загрузки
        btnText.style.display = 'inline';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Вход через Google
async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        // Проверить, существует ли пользователь в Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        
        if (!userDoc.exists) {
            // Создать новый профиль
            await db.collection('users').doc(user.uid).set({
                name: user.displayName || user.email.split('@')[0],
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                level: 'beginner',
                goal: 'general',
                settings: {
                    notifications: true,
                    dailyReminder: true
                },
                stats: {
                    completedTests: 0,
                    correctAnswers: 0,
                    totalAnswers: 0,
                    studyDays: 1,
                    currentStreak: 1,
                    lastActive: new Date().toISOString()
                }
            });
        }
        
        closeModal('loginModal');
        closeModal('signupModal');
        
        showNotification('Вход через Google выполнен успешно!', 'success');
        
    } catch (error) {
        console.error('Ошибка входа через Google:', error);
        showNotification(getAuthErrorMessage(error), 'error');
    }
}

// Восстановление пароля
async function handlePasswordReset(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');
    
    // Показать индикатор загрузки
    btnText.style.display = 'none';
    spinner.style.display = 'block';
    submitBtn.disabled = true;
    
    try {
        await auth.sendPasswordResetEmail(email);
        
        showNotification('Ссылка для сброса пароля отправлена на ваш email', 'success');
        closeModal('forgotPasswordModal');
        
    } catch (error) {
        console.error('Ошибка восстановления пароля:', error);
        showNotification(getAuthErrorMessage(error), 'error');
    } finally {
        // Скрыть индикатор загрузки
        btnText.style.display = 'inline';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Выход
async function handleLogout() {
    try {
        await auth.signOut();
        showNotification('Вы успешно вышли из системы', 'success');
    } catch (error) {
        console.error('Ошибка выхода:', error);
        showNotification('Ошибка при выходе из системы', 'error');
    }
}

// Проверка состояния аутентификации
function checkAuthState() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // Пользователь авторизован
            updateUIForLoggedInUser(user);
            
            // Загрузить данные пользователя
            await loadUserData(user.uid);
            
        } else {
            // Пользователь не авторизован
            updateUIForLoggedOutUser();
        }
    });
}

// Обновление UI для авторизованного пользователя
function updateUIForLoggedInUser(user) {
    // Скрыть кнопки авторизации
    document.getElementById('authButtons').style.display = 'none';
    
    // Показать профиль
    const userProfile = document.getElementById('userProfile');
    userProfile.style.display = 'flex';
    
    // Обновить имя пользователя
    const userName = document.getElementById('userName');
    userName.textContent = user.displayName || user.email.split('@')[0];
    
    // Показать статистику пользователя
    document.getElementById('userStats').style.display = 'block';
    document.getElementById('generalStats').style.display = 'none';
    
    // Обновить аватар
    const userAvatar = document.getElementById('userAvatar');
    if (user.photoURL) {
        userAvatar.innerHTML = `<img src="${user.photoURL}" alt="Аватар">`;
    }
}

// Обновление UI для неавторизованного пользователя
function updateUIForLoggedOutUser() {
    // Показать кнопки авторизации
    document.getElementById('authButtons').style.display = 'flex';
    
    // Скрыть профиль
    document.getElementById('userProfile').style.display = 'none';
    
    // Показать общую статистику
    document.getElementById('userStats').style.display = 'none';
    document.getElementById('generalStats').style.display = 'block';
    
    // Скрыть вкладку профиля
    const profileTab = document.getElementById('profile');
    profileTab.classList.remove('active');
    
    // Если активна вкладка профиля, переключить на главную
    if (profileTab.classList.contains('active')) {
        document.querySelector('.nav-link[data-tab="home"]').click();
    }
}

// Загрузка данных пользователя
async function loadUserData(userId) {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            
            // Обновить статистику
            updateUserStats(userData.stats);
            
            // Обновить профиль
            updateUserProfile(userData);
            
            // Обновить последнюю активность
            await updateLastActive(userId);
        }
    } catch (error) {
        console.error('Ошибка загрузки данных пользователя:', error);
    }
}

// Обновление статистики
function updateUserStats(stats) {
    const completedTests = document.getElementById('completedTests');
    const correctAnswers = document.getElementById('correctAnswers');
    const studyDays = document.getElementById('studyDays');
    const streak = document.getElementById('streak');
    
    if (completedTests) completedTests.textContent = stats.completedTests || 0;
    if (correctAnswers) {
        const percentage = stats.totalAnswers > 0 ? 
            Math.round((stats.correctAnswers / stats.totalAnswers) * 100) : 0;
        correctAnswers.textContent = `${percentage}%`;
    }
    if (studyDays) studyDays.textContent = stats.studyDays || 1;
    if (streak) streak.textContent = stats.currentStreak || 1;
}

// Обновление профиля
function updateUserProfile(userData) {
    const profileUserName = document.getElementById('profileUserName');
    const profileUserEmail = document.getElementById('profileUserEmail');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileLevel = document.getElementById('profileLevel');
    const profileGoal = document.getElementById('profileGoal');
    
    if (profileUserName) profileUserName.textContent = userData.name || 'Пользователь';
    if (profileUserEmail) profileUserEmail.textContent = userData.email || '';
    if (profileName) profileName.value = userData.name || '';
    if (profileEmail) profileEmail.value = userData.email || '';
    if (profileLevel) profileLevel.value = userData.level || 'beginner';
    if (profileGoal) profileGoal.value = userData.goal || 'general';
}

// Обновление последней активности
async function updateLastActive(userId) {
    try {
        const now = new Date();
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();
        
        if (userData && userData.stats) {
            const lastActive = new Date(userData.stats.lastActive || now);
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
            
            const dayDiff = Math.floor((today - lastActiveDay) / (1000 * 60 * 60 * 24));
            
            let updates = {
                'stats.lastActive': now.toISOString()
            };
            
            // Обновить streak
            if (dayDiff === 1) {
                // Пользователь активен подряд
                updates['stats.currentStreak'] = (userData.stats.currentStreak || 1) + 1;
            } else if (dayDiff > 1) {
                // Сбросить streak
                updates['stats.currentStreak'] = 1;
            }
            
            // Обновить studyDays
            if (dayDiff > 0) {
                updates['stats.studyDays'] = (userData.stats.studyDays || 1) + 1;
            }
            
            await db.collection('users').doc(userId).update(updates);
        }
    } catch (error) {
        console.error('Ошибка обновления активности:', error);
    }
}

// Вспомогательные функции
function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthFill = document.getElementById('passwordStrengthFill');
    const strengthText = document.getElementById('passwordStrengthText');
    
    if (!strengthFill || !strengthText) return;
    
    let strength = 0;
    let text = 'слабый';
    let color = '#f72585'; // красный
    
    if (password.length >= 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    if (strength >= 75) {
        text = 'сильный';
        color = '#4cc9f0'; // синий
    } else if (strength >= 50) {
        text = 'средний';
        color = '#ffd166'; // желтый
    }
    
    strengthFill.style.width = `${strength}%`;
    strengthFill.style.backgroundColor = color;
    strengthText.textContent = `Сложность пароля: ${text}`;
    strengthText.style.color = color;
}

function checkPasswordRequirements(password) {
    return password.length >= 6 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}

function setupPasswordToggles() {
    // Для формы входа
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('loginPassword');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // Для формы регистрации
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    if (toggleSignupPassword) {
        toggleSignupPassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('signupPassword');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // Для подтверждения пароля
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('signupConfirmPassword');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
}

function getAuthErrorMessage(error) {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'Этот email уже используется';
        case 'auth/invalid-email':
            return 'Неверный формат email';
        case 'auth/weak-password':
            return 'Пароль слишком слабый';
        case 'auth/user-not-found':
            return 'Пользователь не найден';
        case 'auth/wrong-password':
            return 'Неверный пароль';
        case 'auth/network-request-failed':
            return 'Ошибка сети. Проверьте подключение к интернету';
        default:
            return 'Произошла ошибка. Пожалуйста, попробуйте снова';
    }
}

function showNotification(message, type = 'info') {
    // Создать элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Добавить стили
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4cc9f0' : '#f72585'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    // Добавить в body
    document.body.appendChild(notification);
    
    // Кнопка закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Автоматическое закрытие
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: 15px;
        }
    `;
    document.head.appendChild(style);
}

// Тесты (упрощенная версия)
function setupQuizzes() {
    // Обработчики для кнопок тестов
    document.querySelectorAll('.start-quiz').forEach(button => {
        button.addEventListener('click', function() {
            const quizType = this.getAttribute('data-quiz');
            startQuiz(quizType);
        });
    });
    
    // Обработчики для тем
    document.querySelectorAll('.start-topic').forEach(button => {
        button.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            startTopic(topic);
        });
    });
}

function startQuiz(quizType) {
    // Проверка авторизации
    if (!auth.currentUser) {
        showNotification('Пожалуйста, войдите в систему для прохождения тестов', 'error');
        openModal('loginModal');
        return;
    }
    
    // Здесь будет логика тестов
    showNotification('Функция тестов в разработке', 'info');
}

function startTopic(topic) {
    // Здесь будет логика изучения тем
    showNotification(`Начато изучение темы: ${topic}`, 'info');
}

// Сохранение результатов теста
async function saveQuizResult(userId, quizType, score, totalQuestions) {
    try {
        const result = {
            quizType: quizType,
            score: score,
            totalQuestions: totalQuestions,
            date: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        // Сохранить результат
        await db.collection('users').doc(userId).collection('quizResults').add(result);
        
        // Обновить статистику
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();
        const userData = userDoc.data();
        
        const updates = {
            'stats.completedTests': (userData.stats.completedTests || 0) + 1,
            'stats.correctAnswers': (userData.stats.correctAnswers || 0) + score,
            'stats.totalAnswers': (userData.stats.totalAnswers || 0) + totalQuestions
        };
        
        await userRef.update(updates);
        
    } catch (error) {
        console.error('Ошибка сохранения результата:', error);
    }
}
