const loginForm = document.getElementById('loginForm');
const userIdInput = document.getElementById('userId');
const passwordInput = document.getElementById('password');
const userIdError = document.getElementById('userIdError');
const passwordError = document.getElementById('passwordError');

loginForm.addEventListener('submit', (event) => {
    let isValid = true;

    // IDのバリデーション
    if (!/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/.test(userIdInput.value)) {
        userIdError.textContent = 'IDは半角英数字記号のみで記入して下さい';
        userIdInput.classList.add('input-error');
        isValid = false;
    } else {
        userIdError.textContent = '';
        userIdInput.classList.remove('input-error');
    }

    // パスワードのバリデーション
    if (!/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/.test(passwordInput.value)) {
        passwordError.textContent = 'パスワードは半角英数字記号のみで記入して下さい';
        passwordInput.classList.add('input-error');
        isValid = false;
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('input-error');
    }

    if (!isValid) {
        event.preventDefault();
    }
});
