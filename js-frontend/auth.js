/* eslint-disable */
const form = document.querySelector('.auth__form');
const formErr = document.querySelector('.auth__error');

const logoutBtn = document.querySelector('.header__logout-btn');

const makeAuthRequest = async (data, type = 'login') => {
  form.classList.add('auth__form--loading');
  formErr.classList.remove('hidden');

  try {
    const res = await axios({
      method: 'POST',
      url: `/api/auth/${type === 'login' ? 'login' : 'signup'}`,
      data,
    });

    if (res.data.status === 'success') {
      form.classList.remove('auth__form--loading');

      setTimeout(() => location.assign('/'), 200);
    }
  } catch (err) {
    form.classList.remove('auth__form--loading');
    formErr.textContent = err.response.data.message;
    formErr.classList.remove('hidden');
  }
};

export default () => {
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async function (e) {
      e.preventDefault();

      try {
        const res = await axios({
          method: 'GET',
          url: '/api/auth/logout',
        });

        if (res.data.status === 'success') {
          setTimeout(() => {
            location.assign('/');
          }, 200);
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    });
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (e.target.classList.contains('auth__form--login')) {
      makeAuthRequest({ email, password }, 'login');
    }

    if (e.target.classList.contains('auth__form--signup')) {
      const name = document.getElementById('name').value;
      const passwordConfirm = document.getElementById('password-confirm').value;
      makeAuthRequest({ name, email, password, passwordConfirm }, 'signup');
    }
  });
};
