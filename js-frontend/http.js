/* eslint-disable */

export const deleteAccountRequest = async () => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: 'api/user/deleteMe',
    });

    if (res.status === 204) {
      setTimeout(() => location.assign('/'), 200);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const makeLogoutRequest = async () => {
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
};

export const makeFormRequest = async (
  formDOM,
  method,
  url,
  data,
  toHomePage = false
) => {
  formDOM.classList.add('auth__form--loading');
  const errDOM = formDOM.querySelector('.auth__error');
  errDOM.classList.add('hidden');
  try {
    const res = await axios({
      method,
      url,
      data,
    });

    if (res.data.status === 'success')
      setTimeout(() => {
        if (toHomePage) location.assign('/');
        else location.reload(true);
      }, 200);
  } catch (err) {
    formDOM.classList.remove('auth__form--loading');
    errDOM.classList.remove('hidden');
    console.log(errDOM);
    console.log(err);
    errDOM.textContent = err.response.data.message;
  }
};
