import AbstractComponent from "@components/abstract/abstract-component";
import {createFilmCardTemplate} from "./film-card-tpl";
import {FilmButtons, SHAKE_ANIMATION_DURATION} from "@consts";

const FILM_CARD_ELEMENTS = [
  `film-card__title`,
  `film-card__poster`,
  `film-card__comments`
];

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  shake() {
    this.getElement().classList.add(`shake`);

    setTimeout(() => {
      this.getElement().classList.remove(`shake`);
    }, SHAKE_ANIMATION_DURATION);
  }

  changeButtonActiveClass(target) {
    switch (target) {
      case FilmButtons.WATCHLIST:
        this._changeTargetActiveClass(this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`));
        break;
      case FilmButtons.HISTORY:
        this._changeTargetActiveClass(this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`));
        break;
      case FilmButtons.FAVORITES:
        this._changeTargetActiveClass(this.getElement().querySelector(`.film-card__controls-item--favorite`));
        break;
    }
  }

  _changeTargetActiveClass(target) {
    target.classList.toggle(`film-card__controls-item--active`);
  }

  setElementsClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (FILM_CARD_ELEMENTS.some((element) => evt.target.classList.contains(element))) {
        handler();
      }
    });
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, (evt) => {
      this._onBtnClick(evt, handler);
    });
  }


  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, (evt) => {
      this._onBtnClick(evt, handler);
    });
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, (evt) => {
      this._onBtnClick(evt, handler);
    });
  }

  _onBtnClick(evt, handler) {
    evt.preventDefault();
    handler();
  }
}
