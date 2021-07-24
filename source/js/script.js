const popapMenu = document.querySelector('.popap-menu');
const headerMenu = document.querySelector('.header__wrapper-menu');
const headerButtonMenu = headerMenu.querySelector('.header__button-menu');
const popapClose = popapMenu.querySelector('.popap-menu__close');
const overlay = document.querySelector('.overlay');
const popapLinks = popapMenu.querySelectorAll('.popap-menu__link');

headerMenu.classList.add('d-block');
popapMenu.classList.add('d-none');

const onClickActiveMenu = (evt) => {
  evt.preventDefault();
  popapMenu.classList.remove('d-none');
  popapMenu.classList.add('active');
  overlay.classList.remove('d-none');
};

const onClickRemoveMenu = () => {
  popapMenu.classList.add('d-none');
  popapMenu.classList.remove('active');
  overlay.classList.add('d-none');
};

for (let popapLink of popapLinks) {
  popapLink.addEventListener('click', onClickRemoveMenu);
}

headerButtonMenu.addEventListener('click', onClickActiveMenu);
popapClose.addEventListener('click', onClickRemoveMenu);
