import FilmCardComponent from "@components/film-card/film-card";
import FilmDetailsComponent from "@components/film-details/film-details";
import CommentsController from "@controllers/comment";
import CommentsModel from "@models/comments";
import MovieModel from "@models/movie";
import {isEscPressed} from "@utils/common";
import {render, RenderPosition, replace, remove} from "@utils/render";
import {FilmButton} from "@consts";

const State = {
  OPENED: `opened`,
  CLOSED: `closed`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._api = api;

    this._commentsModel = new CommentsModel();
    this._commentsConroller = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._state = State.CLOSED;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onCommentChange = this._onCommentChange.bind(this);
    this._onCommentDataChange = this._onCommentDataChange.bind(this);

    this._commentsModel.setDataChangeHandler(this._onCommentChange);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._film = film;

    if (!this._filmCardComponent && !this._filmDetailsComponent) {
      this._renderFilmCard();
      this._renderFilmDetails();

      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._state === State.CLOSED) {
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

  updateControlClass(target) {
    if (this._state === State.CLOSED) {
      this._filmCardComponent.changeButtonActiveClass(target);
    } else {
      this._filmDetailsComponent.changeButtonActiveClass(target);
    }
  }

  shake() {
    if (this._state === State.CLOSED) {
      this._filmCardComponent.shake();
    } else {
      this._filmDetailsComponent.shake();
    }
  }

  _renderFilmDetails() {
    this._oldFilmDetailsComponent = this._filmDetailsComponent;
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    this._filmDetailsComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._changeFilmWhatchlistPropery(this._film);
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._changeFilmWhatchedtPropery(this._film);
    });

    this._filmDetailsComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
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
    this._renderFilmDetails();
    const siteMainElement = document.querySelector(`.main`);

    this._onViewChange();
    render(siteMainElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    this._renderComments();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._state = State.OPENED;
  }

  _closeFilmDetails() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._filmDetailsComponent.reset();
    this._filmDetailsComponent.getElement().remove();
    this._state = State.CLOSED;
    this._removeComments();
  }

  _removeComments() {
    this._commentsConroller.destroy();
    this._commentsConroller = null;
  }

  _renderComments() {
    const commentsContainer = this._filmDetailsComponent.getCommentsContainer();

    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._commentsConroller = new CommentsController(commentsContainer, this._onCommentDataChange);
        this._commentsConroller.render(this._commentsModel.getComments());
      });
  }

  _addNewComment() {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._commentsConroller.renderFirstComment(this._commentsModel.getComments());
        this._commentsConroller.updateCommentsCount(comments.length);
      });
  }

  _changeFilmWhatchlistPropery(film) {
    const newFilm = MovieModel.clone(film);
    const target = FilmButton.WATCHLIST;

    newFilm.isInWatchlist = !newFilm.isInWatchlist;
    if (newFilm.isInWatchlist) {
      newFilm.watchingDate = new Date();
    } else {
      newFilm.watchingDate = new Date(null);
    }

    this._onDataChange(this, film, newFilm, target);
  }

  _changeFilmWhatchedtPropery(film) {
    const newFilm = MovieModel.clone(film);
    const target = FilmButton.HISTORY;

    newFilm.isWatched = !newFilm.isWatched;

    this._onDataChange(this, film, newFilm, target);
  }

  _changeFilmFavoritePropery(film) {
    const newFilm = MovieModel.clone(film);
    const target = FilmButton.FAVORITES;

    newFilm.isFavorite = !newFilm.isFavorite;

    this._onDataChange(this, film, newFilm, target);
  }

  _changeFilmComments(film) {
    const newFilm = MovieModel.clone(film);
    newFilm.commentsCount = this._commentsModel.getComments().length;

    this._onDataChange(this, film, newFilm);
  }

  _onCommentDataChange(oldDataId, newData) {
    this._commentsConroller.changeFormElementsDisabledProperty(true);
    this._commentsConroller.changeCommentDeleteButtonText(oldDataId);
    if (newData === null) {
      this._api.deleteComment(oldDataId)
        .then(() => {
          this._commentsModel.removeComment(oldDataId);
          this._commentsConroller.removeCommentById(oldDataId);
          this._commentsConroller.updateCommentsCount(this._commentsModel.getComments().length);
          this._commentsConroller.changeFormElementsDisabledProperty(false);
        })
        .catch(() => {
          this._commentsConroller.shakeComment(oldDataId);
          this._commentsConroller.changeFormElementsDisabledProperty(false);
        });
    } else {
      this._commentsConroller.changeFormElementsDisabledProperty(true);
      this._api.createComment(this._film.id, newData)
        .then(() => {
          this._onCommentChange();
          this._addNewComment();
          this._commentsConroller.cleanForm();
          this._commentsConroller.changeFormElementsDisabledProperty(false);
        })
        .catch(() => {
          this._commentsConroller.shakeForm();
          this._commentsConroller.changeFormElementsDisabledProperty(false);
        });
    }
  }

  _onCommentChange() {
    this._changeFilmComments(this._film);
  }

  _onEscKeyDown(evt) {
    if (isEscPressed(evt)) {
      this._closeFilmDetails();
    }
  }
}
