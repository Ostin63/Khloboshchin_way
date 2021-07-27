/* eslint-disable no-undef */
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
const popapPhoneField = popapForm.querySelector('.popap-form__form-input--phone');
const popapMailField = popapForm.querySelector('.popap-form__form-input--mail');
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

const errorSuccess = body.querySelector('#error-loading')
  .content
  .querySelector('.error-loading');

const cartActive = 'travel-places__item-cart--active';
const buttonActive = 'travel-places__link--active';

const successElement = success.cloneNode(true);
const errorElement = errorSuccess.cloneNode(true);

headerMenu.classList.add('d-block');
popapMenu.classList.add('d-none');

// eslint-disable-next-line no-undef
const isEscEvent = (evt) => evt.key === keys.escape || evt.key === keys.esc;

const alertError = () => {
  if (popapPhoneField) {
    popapPhoneField.classList.add('error');
  }
  if (questionsPhoneField) {
    questionsPhoneField.classList.add('error');
  }
};

const removeError = () => {
  if (popapPhoneField) {
    popapPhoneField.classList.remove('error');
  }
};

const onClickRemoveMenu = () => {
  popapMenu.classList.add('d-none');
  popapMenu.classList.remove('active');
  overlay.classList.add('d-none');
};

const onClickActiveMenu = (evt) => {
  evt.preventDefault();
  popapMenu.classList.remove('d-none');
  popapMenu.classList.add('active');
};

const onCloseBuyTour = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  popapForm.classList.add('d-none');
  overlay.classList.add('d-none');
};

const onEscRemove = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    onCloseBuyTour();
    document.removeEventListener('keydown', onCloseBuyTour);
  }
};

let isStorageSupport = true;
let storage = '';

try {
  storage = localStorage.getItem('phone');
} catch (err) {
  isStorageSupport = false;
}

const onBuyTour = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  popapForm.classList.remove('d-none');
  overlay.classList.remove('d-none');
  removeError();

  if (popapForm) {
    if (storage) {
      popapPhoneField.value = storage;
      popapMailField.focus();
    } else {
      popapPhoneField.focus();
    }
  }
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
};

const alertForm = () => {
  alertSuccess();
  resetForm();
  onCloseBuyTour();
};

const onErrorLoadingRemove = () => {
  errorElement.remove();
  document.removeEventListener('click', onErrorLoadingRemove);
};

const onEscRemoveRemove = () => {
  if (isEscEvent) {
    errorElement.remove();
    document.removeEventListener('keydown', onEscRemoveRemove);
  }
};

const alertErrorloading = () => {
  body.append(errorElement);
  document.addEventListener('keydown', onEscRemoveRemove);
  document.addEventListener('click', onErrorLoadingRemove);
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

const onCangeModalform = (evt) => {
  if (!popapPhoneField.value) {
    evt.preventDefault();
    alertError();
  } else {
    removeError();
    if (isStorageSupport) {
      localStorage.setItem('phone', popapPhoneField.value);
    }
  }
};

const onFormSend = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  sendData(dataSabmitUrl, formData, alertForm, alertErrorloading);
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

popapPhoneField.addEventListener('change', onCangeModalform);
questionsForm.addEventListener('submit', onFormSend);
popapForm.addEventListener('submit', onFormSend);
popapFormClose.addEventListener('click', onCloseBuyTour);
document.addEventListener('keydown', onEscRemove);
overlay.addEventListener('click', onCloseBuyTour);
headerButtonMenu.addEventListener('click', onClickActiveMenu);
popapMenuClose.addEventListener('click', onClickRemoveMenu);
