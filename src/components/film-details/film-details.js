import AbstractSmartComponent from "@components/abstract/abstract-smart-component";
import {createFilmDetailsTemplate} from "./film-details-tpl";
import {FilmButton, SHAKE_ANIMATION_DURATION} from "@consts";

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._isWatched = film.isWatched;
    this._isInWatchlist = film.isInWatchlist;
    this._isFavorite = film.isFavorite;

    this._closeButtonClickHandler = null;
    this._watchlistButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      isWatched: this._isWatched,
      isInWatchlist: this._isInWatchlist,
      isFavorite: this._isFavorite,
    });
  }

  getCommentsContainer() {
    return this.getElement().querySelector(`.form-details__bottom-container`);
  }

  rerender() {
    super.rerender();
  }

  reset() {
    const film = this._film;

    this._isWatched = film.isWatched;
    this._isInWatchlist = film.isInWatchlist;
    this._isFavorite = film.isFavorite;

    this.rerender();
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setWatchlistButtonClickHandler(this._watchlistButtonClickHandler);
    this.setWatchedButtonClickHandler(this._watchedButtonClickHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonClickHandler);
  }

  shake() {
    this.getElement().classList.add(`shake`);

    setTimeout(() => {
      this.getElement().classList.remove(`shake`);
    }, SHAKE_ANIMATION_DURATION);
  }

  changeButtonActiveClass(target) {
    switch (target) {
      case FilmButton.WATCHLIST:
        this._changeTargetActiveClass(this.getElement().querySelector(`#watchlist`));
        break;
      case FilmButton.HISTORY:
        this._changeTargetActiveClass(this.getElement().querySelector(`#watched`));
        break;
      case FilmButton.FAVORITES:
        this._changeTargetActiveClass(this.getElement().querySelector(`#favorite`));
        break;
    }
  }

  _changeTargetActiveClass(target) {
    target.checked = !target.checked;
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);

    this._closeButtonClickHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, handler);

    this._watchlistButtonClickHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`).addEventListener(`click`, handler);

    this._watchedButtonClickHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, handler);

    this._favoriteButtonClickHandler = handler;
  }
}
