/* eslint-disable */
import { makeFormRequest } from './http';
const dataForm = document.getElementById('update__data-form');
const passwordForm = document.getElementById('update__password-form');

export default () => {
  if (dataForm) {
    dataForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const processedform = new FormData();
      processedform.append(
        'name',
        document.getElementById('update__name').value
      );
      processedform.append(
        'email',
        document.getElementById('update__email').value
      );
      processedform.append(
        'photo',
        document.getElementById('update__photo').files[0]
      );

      makeFormRequest(dataForm, 'PATCH', '/api/user/updateMe', processedform);
    });

    if (passwordForm) {
      passwordForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const oldPassword = document.getElementById('update__password').value;
        const password = document.getElementById('update__new-password').value;
        const passwordConfirm = document.getElementById(
          'update__new-password-confirm'
        ).value;

        makeFormRequest(passwordForm, 'PATCH', '/api/user/updatePassword', {
          oldPassword,
          password,
          passwordConfirm,
        });
      });
    }
  }
};
