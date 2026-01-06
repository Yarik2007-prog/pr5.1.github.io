document.addEventListener('DOMContentLoaded', () => {
  // ===== DOM =====
  const authBtn = document.querySelector('.button-auth');
  const cartBtn = document.getElementById('cart-button');

  const modalAuth = document.querySelector('.modal-auth');
  const closeAuth = document.querySelector('.close-auth');
  const loginForm = document.getElementById('logInForm');

  const loginInput = document.getElementById('login');
  const passwordInput = document.getElementById('password');

  const openAuthModal = () => {
    modalAuth.style.display = 'flex';
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
    input.style.border = '';
  };

  const clearErrors = () => {
    clearError(loginInput);
    clearError(passwordInput);
  };

  // ===== init =====
  const savedLogin = localStorage.getItem('login');
  if (savedLogin && authBtn) {
    authBtn.querySelector('.button-text').textContent = savedLogin;
  }

  // ===== events =====

  // кнопка Увійти / Вийти
  if (authBtn) {
    authBtn.addEventListener('click', () => {
      const isLogged = localStorage.getItem('login');

      if (!isLogged) {
        openAuthModal();
      } else {
        localStorage.removeItem('login');
        authBtn.querySelector('.button-text').textContent = 'Війти';
      }
    });
  }

  // хрестик
  if (closeAuth) {
    closeAuth.addEventListener('click', closeAuthModal);
  }

  // 🔥 КЛІК ПОЗА МОДАЛКОЮ (ДОДАНО)
  modalAuth.addEventListener('click', (e) => {
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

    if (hasError) return;

    localStorage.setItem('login', login);

    if (authBtn) {
      authBtn.querySelector('.button-text').textContent = login;
    }

    loginInput.value = '';
    passwordInput.value = '';
    closeAuthModal();
  });

});
