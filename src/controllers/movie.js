import FilmCardComponent from "../components/film-card/film-card";
import FilmDetailsComponent from "../components/film-details/film-details";
import {isEscPressed} from "../utils/common";
import {render, RenderPosition, replace, remove} from "../utils/render";

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
    this._oldFilmCardComponent = null;
    this._filmDetailsComponent = null;
    this._oldFilmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._film = film;

    if (!this._filmCardComponent && !this._filmDetailsComponent) {
      this._renderFilmCard();
      this._renderFilmDetails();

      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    } else if (this._state === State.CLOSED) {
      this._renderFilmDetails();
      replace(this._filmDetailsComponent, this._oldFilmDetailsComponent);
    } else {
      this._renderFilmCard();
      replace(this._filmCardComponent, this._oldFilmCardComponent);
    }
  }

  setDefaultView() {
    if (this._state !== State.CLOSED) {
      this._closeFilmDetails();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _renderFilmDetails() {
    this._oldFilmDetailsComponent = this._filmDetailsComponent;
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      this._changeFilmWhatchlistPropery(this._film);
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      this._changeFilmWhatchedtPropery(this._film);
    });

    this._filmDetailsComponent.setFavoriteButtonClickHandler(() => {
      this._changeFilmFavoritePropery(this._film);
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._closeFilmDetails();
    });
  }

  _renderFilmCard() {
    this._oldFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(this._film);

    this._filmCardComponent.setElementsClickHandler(() => {
      this._openFilmDetails();
    });

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      this._changeFilmWhatchlistPropery(this._film);
    });

    this._filmCardComponent.setWatchedButtonClickHandler(() => {
      this._changeFilmWhatchedtPropery(this._film);
    });

    this._filmCardComponent.setFavoriteButtonClickHandler(() => {
      this._changeFilmFavoritePropery(this._film);
    });
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
    this._filmDetailsComponent.reset(this._film);
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
