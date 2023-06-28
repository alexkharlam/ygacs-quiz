/* eslint-disable */

const menuBtn = document.querySelector('.menu-btns');
const header = document.querySelector('.header');

export default () => {
  if (!menuBtn) return;

  menuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('clicked');

    header.classList.toggle('menu--active');
  });
};
