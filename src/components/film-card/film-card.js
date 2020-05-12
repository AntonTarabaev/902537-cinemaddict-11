import AbstractComponent from "../abstract-component";
import {createFilmCardTemplate} from "./film-card-tpl";

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

  _onBtnClick(evt, handler) {
    evt.preventDefault();
    evt.target.classList.toggle(`film-card__controls-item--active`);
    handler();
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
}
