import AbstractSmartComponent from "../abstract-smart-component";
import {createFilmDetailsTemplate, createEmojiMarkup} from "./film-details-tpl";

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._emoji = null;
    this._isWatched = film.isWatched;
    this._isInWatchlist = film.isInWatchlist;
    this._isFavorite = film.isFavorite;

    this._closeButtonClickHandler = null;
    this._watchlistButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoriteButtonClickHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      isWatched: this._isWatched,
      isInWatchlist: this._isInWatchlist,
      isFavorite: this._isFavorite,
    });
  }

  rerender() {
    super.rerender();
  }

  reset(film) {
    this._emoji = null;
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

    this._subscribeOnEvents();
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

  _subscribeOnEvents() {
    const element = this.getElement();
    const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    element.querySelectorAll(`.film-details__emoji-item`).forEach((it) => {
      it.addEventListener(`click`, () => {
        emojiContainer.innerHTML = createEmojiMarkup(it.value);

        this._emoji = it.value;
      });
    });
  }
}
