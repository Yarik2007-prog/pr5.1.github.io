document.addEventListener('DOMContentLoaded', () => {

  // ===== DOM =====
  const authBtn = document.querySelector('.button-auth');
  const authBtnText = authBtn?.querySelector('.button-text');
  const userLoginText = authBtn?.querySelector('.user-login');

  const modalAuth = document.querySelector('.modal-auth');
  const modalDialog = document.querySelector('.modal-dialog');
  const closeAuth = document.querySelector('.close-auth');
  const loginForm = document.getElementById('logInForm');

  const loginInput = document.getElementById('login');
  const passwordInput = document.getElementById('password');

  // ===== helpers =====
  const openAuthModal = () => {
    modalAuth.style.display = 'flex';
    clearErrors();
    document.body.style.overflow = 'hidden'; // прибираємо скрол
  };

  const closeAuthModal = () => {
    modalAuth.style.display = 'none';
    clearErrors();
    document.body.style.overflow = ''; // повертаємо скрол
  };

  const setError = (input) => {
    input.style.border = '2px solid red';
  };

  const clearError = (input) => {
    input.style.border = '1px solid #000';
  };

  const clearErrors = () => {
    clearError(loginInput);
    clearError(passwordInput);
  };

  const setLoggedState = (login) => {
    authBtnText.textContent = 'Вийти';
    userLoginText.textContent = login;
  };

  const setLoggedOutState = () => {
    authBtnText.textContent = 'Увійти';
    userLoginText.textContent = '';
  };

  // ===== init (localStorage) =====
  const savedLogin = localStorage.getItem('login');

  if (savedLogin && authBtn) {
    setLoggedState(savedLogin);
  }

  // ===== events =====

  // кнопка Увійти / Вийти
  authBtn?.addEventListener('click', () => {
    const isLogged = localStorage.getItem('login');

    if (!isLogged) {
      openAuthModal();
    } else {
      localStorage.removeItem('login');
      setLoggedOutState();
    }
  });

  // хрестик
  closeAuth?.addEventListener('click', closeAuthModal);

  // клік поза модалкою
  modalAuth?.addEventListener('click', (e) => {
    if (e.target === modalAuth) {
      closeAuthModal();
    }
  });

  // зняття помилки при вводі
  loginInput.addEventListener('input', () => clearError(loginInput));
  passwordInput.addEventListener('input', () => clearError(passwordInput));

  // submit форми
  loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const login = loginInput.value.trim();
  const password = passwordInput.value.trim();

  let hasError = false;

  if (!login) {
    setError(loginInput);
    hasError = true;
  }

  if (!password) {
    setError(passwordInput);
    hasError = true;
  }

  closeAuthModal();

  if (hasError) return;

  localStorage.setItem('login', login);
  setLoggedState(login);

  loginInput.value = '';
  passwordInput.value = '';
});


});
