/* eslint-disable */
import {
  makeFormRequest,
  makeLogoutRequest,
  deleteAccountRequest,
} from './http';
const form = document.getElementById('auth__form');
const logoutBtn = document.getElementById('logout-btn');
const deleteAccountBtn = document.getElementById('delete-account-btn');
const deleteAccountText = document.getElementById(
  'delete-account-confirmation'
);

export default () => {
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', function (e) {
      e.preventDefault();

      deleteAccountText.classList.remove('hidden');

      deleteAccountBtn.addEventListener('click', function (e) {
        e.preventDefault();

        deleteAccountRequest();
      });
    });
  }

  if (logoutBtn)
    logoutBtn.addEventListener('click', (e) => makeLogoutRequest());

  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (e.target.classList.contains('auth__form--login')) {
      const body = { email, password };
      makeFormRequest(e.target, 'POST', '/api/auth/login', body, true);
    }

    if (e.target.classList.contains('auth__form--signup')) {
      const name = document.getElementById('name').value;
      const passwordConfirm = document.getElementById('password-confirm').value;
      const body = { name, email, password, passwordConfirm };
      makeFormRequest(e.target, 'POST', '/api/auth/signup', body, true);
    }
  });
};
