import AbstractSmartComponent from "@components/abstract/abstract-smart-component";
import {createFilmDetailsTemplate} from "./film-details-tpl";

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
