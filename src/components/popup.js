import {isEscEvent} from "../utils.js";

const removePopup = () => {
  const popupFilmDetails = document.querySelector(`.film-details`);

  if (popupFilmDetails !== null) {
    popupFilmDetails.remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
  }
};

const onPopupEscPress = (evt) => {
  isEscEvent(evt, removePopup);
};

const addPopupCloseHandlers = () => {
  const popupClose = document.querySelector(`.film-details__close`);

  document.addEventListener(`keydown`, onPopupEscPress);
  popupClose.onclick = () => removePopup();
};

export {removePopup, addPopupCloseHandlers};
