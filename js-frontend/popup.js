/* eslint-disable */
const popup = document.querySelector('.popup');

export const showPopup = (message) => {
  popup.textContent = message;

  popup.classList.add('popup--active');
};

export const hidePopup = () => {
  popup.classList.remove('popup--active');
};
