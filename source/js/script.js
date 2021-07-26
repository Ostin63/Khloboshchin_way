/* eslint-disable id-length */
/* eslint-disable no-unused-vars */

const body = document.querySelector('body');
const popapMenu = body.querySelector('.popap-menu');
const headerMenu = body.querySelector('.header__wrapper-menu');
const headerButtonMenu = headerMenu.querySelector('.header__button-menu');
const popapMenuClose = popapMenu.querySelector('.popap-menu__close');
const overlay = body.querySelector('.overlay');
const popapLinks = popapMenu.querySelectorAll('.popap-menu__link');
const buyTourButtons = body.querySelectorAll('.travel-places__button');
const popapForm = body.querySelector('.popap-form');
const popapFormClose = popapForm.querySelector('.popap-form__close');
const popapPhoneField = popapForm.querySelectorAll('.popap-form__form-input--phone');
const popapMailField = popapForm.querySelectorAll('.popap-form__form-input--mail');
const pricesCartCutton = body.querySelectorAll('.prices__cart-button');
const questionsForm = body.querySelector('.questions__form');
const questionsPhoneField = questionsForm.querySelector('.questions__form-input--phone');
const questionsMailField = questionsForm.querySelector('.questions__form-input--mail');
const avatarTravels = body.querySelectorAll('.travels__item');
const travelLinks = body.querySelectorAll('.travel-places__link');
const travelCarts = body.querySelectorAll('.travel-places__item-cart');
const dataSabmitUrl = 'https://echo.htmlacademy.ru/';
const success = body.querySelector('#success')
  .content
  .querySelector('.success');

const cartActive = 'travel-places__item-cart--active';
const buttonActive = 'travel-places__link--active';

const successElement = success.cloneNode(true);

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

const onBuyTour = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  popapForm.classList.remove('d-none');
  overlay.classList.remove('d-none');
};

const onCloseBuyTour = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  popapForm.classList.add('d-none');
  overlay.classList.add('d-none');
};

for (const popapLink of popapLinks) {
  popapLink.addEventListener('click', onClickRemoveMenu);
}

for (const button of buyTourButtons) {
  button.addEventListener('click', onBuyTour);
}

for (const button of pricesCartCutton) {
  button.addEventListener('click', onBuyTour);
}

// eslint-disable-next-line no-undef
const isEscEvent = (evt) => evt.key === keys.escape || evt.key === keys.esc;

const alertError = () => {
  questionsPhoneField.classList.add('error');
};


const onSuccessRemove = () => {
  successElement.remove();
  document.removeEventListener('click', onSuccessRemove);
};

const onElementEscRemove = () => {
  if (isEscEvent) {
    onSuccessRemove();
    document.removeEventListener('keydown', onElementEscRemove);
  }
};

const alertSuccess = () => {
  body.append(successElement);
  document.addEventListener('keydown', onElementEscRemove);
  document.addEventListener('click', onSuccessRemove);
};

const resetForm = () => {
  questionsPhoneField.value = '';
  questionsMailField.value = '';
  popapPhoneField.value = '';
  popapMailField.value = '';
};

const alertForm = () => {
  alertSuccess();
  resetForm();
  onCloseBuyTour();
};

const sendData = (url, bodyForm, alertSucces, error) => {
  fetch(url, {
    method: 'POST',
    body: bodyForm,
  })
    .then((response) => {
      if (response.ok) {
        alertSucces();
      } else {
        error();
      }
    })
    .catch(() => {
      error();
    });
};

const onFormSend = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(dataSabmitUrl, formData, alertForm, alertError);
};

const switchSlides = (avatarSwitchers, switchers, slides) => {
  // eslint-disable-next-line id-length
  for (let i = 0; i < avatarSwitchers.length; i++) {
    avatarSwitchers[i].addEventListener('click', () => {

      // eslint-disable-next-line no-shadow
      for (let i = 0; i < avatarSwitchers.length; i++) {
        slides[i].classList.remove(cartActive);
        switchers[i].classList.remove(buttonActive);
      }

      slides[i].classList.add(cartActive);
      switchers[i].classList.add(buttonActive);
    });
  }
};

switchSlides(avatarTravels, travelLinks, travelCarts);
switchSlides(travelLinks, travelLinks, travelCarts);

questionsForm.addEventListener('submit', onFormSend);
popapForm.addEventListener('submit', onFormSend);
popapFormClose.addEventListener('click', onCloseBuyTour);
headerButtonMenu.addEventListener('click', onClickActiveMenu);
popapMenuClose.addEventListener('click', onClickRemoveMenu);
