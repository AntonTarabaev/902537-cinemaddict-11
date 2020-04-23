import FilmCardComponent from "../components/film-card/film-card";
import FilmDetailsComponent from "../components/film-details/film-details";
import {isEscPressed} from "../utils/common";
import {render, RenderPosition, replace} from "../utils/render";

const State = {
  OPENED: `opened`,
  CLOSED: `closed`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._state = State.CLOSED;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmCardComponent.setElementsClickHandler(() => {
      this._openFilmDetails();
    });

    this._filmCardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._changeFilmWhatchlistPropery(film);
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._changeFilmWhatchedtPropery(film);
    });

    this._filmCardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._changeFilmFavoritePropery(film);
    });

    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      this._changeFilmWhatchlistPropery(film);
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      this._changeFilmWhatchedtPropery(film);
    });

    this._filmDetailsComponent.setFavoriteButtonClickHandler(() => {
      this._changeFilmFavoritePropery(film);
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._closeFilmDetails();
    });

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._state !== State.CLOSED) {
      this._closeFilmDetails();
    }
  }

  _openFilmDetails() {
    const siteMainElement = document.querySelector(`.main`);

    this._onViewChange();
    render(siteMainElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._state = State.OPENED;
  }

  _closeFilmDetails() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetailsComponent.reset();
    this._filmDetailsComponent.getElement().remove();
    this._state = State.CLOSED;
  }

  _changeFilmWhatchlistPropery(film) {
    this._onDataChange(this, film, Object.assign({}, film, {
      isInWatchlist: !film.isInWatchlist,
    }));
  }

  _changeFilmWhatchedtPropery(film) {
    this._onDataChange(this, film, Object.assign({}, film, {
      isWatched: !film.isWatched,
    }));
  }

  _changeFilmFavoritePropery(film) {
    this._onDataChange(this, film, Object.assign({}, film, {
      isFavorite: !film.isFavorite,
    }));
  }

  _onEscKeyDown(evt) {
    if (isEscPressed(evt)) {
      this._closeFilmDetails();
    }
  }
}
