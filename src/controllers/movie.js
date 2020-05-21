import FilmCardComponent from "@components/film-card/film-card";
import FilmDetailsComponent from "@components/film-details/film-details";
import CommentsController from "@controllers/comment";
import CommentsModel from "@models/comments";
import Comment from "@models/comment";
import CommentsLoader from "@components/comments-loader/comments-loader";
import MovieModel from "@models/movie";
import {isEscPressed} from "@utils/common";
import {render, RenderPosition, replace, remove} from "@utils/render";
import {FilmButtons} from "@consts";

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

      return;
    }

    this._renderFilmCard();
    replace(this._filmCardComponent, this._oldFilmCardComponent);
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

  updateDetailsControlClass(target) {
    if (this._state === State.OPENED) {
      this._filmDetailsComponent.changeButtonActiveClass(target);
    }
  }

  updateCardControlClass(target) {
    if (this._state === State.CLOSED) {
      this._filmCardComponent.changeButtonActiveClass(target);
    }
  }

  shake() {
    if (this._state === State.CLOSED) {
      this._filmCardComponent.shake();
      return;
    }
    this._filmDetailsComponent.shake();
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
    if (this._commentsConroller) {
      this._commentsConroller.destroy();
      this._commentsConroller = null;
    }
  }

  _renderComments() {
    const commentsContainer = this._filmDetailsComponent.getCommentsContainer();
    const commentsLoader = new CommentsLoader();
    render(commentsContainer, commentsLoader, RenderPosition.BEFOREEND);

    this._api.getComments(this._film.id)
      .then(Comment.parseComments)
      .then((comments) => {
        remove(commentsLoader);
        this._commentsModel.setComments(comments);
        this._commentsConroller = new CommentsController(commentsContainer, this._onCommentDataChange);
        this._commentsConroller.render(this._commentsModel.getComments());
      })
      .catch(() => {
        commentsLoader.renderLoaderError();
      });
  }

  _addNewComment() {
    this._api.getComments(this._film.id)
      .then(Comment.parseComments)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._commentsConroller.renderFirstComment(this._commentsModel.getComments());
        this._commentsConroller.updateCommentsCount(comments.length);
      });
  }

  _changeFilmWhatchlistPropery(film) {
    const newFilm = MovieModel.clone(film);
    const target = FilmButtons.WATCHLIST;

    newFilm.isInWatchlist = !newFilm.isInWatchlist;

    this._onDataChange(this, film, newFilm, target);
  }

  _changeFilmWhatchedtPropery(film) {
    const newFilm = MovieModel.clone(film);
    const target = FilmButtons.HISTORY;

    newFilm.isWatched = !newFilm.isWatched;
    switch (newFilm.isWatched) {
      case true:
        newFilm.watchingDate = new Date();
        break;
      case false:
        newFilm.watchingDate = null;
        break;
    }

    this._onDataChange(this, film, newFilm, target);
  }

  _changeFilmFavoritePropery(film) {
    const newFilm = MovieModel.clone(film);
    const target = FilmButtons.FAVORITES;

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

    if (newData === null) {
      this._commentsConroller.changeCommentDeleteButtonText(oldDataId);
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

      return;
    }
    this._commentsConroller.changeFormElementsDisabledProperty(true);
    this._api.createComment(this._film.id, newData)
      .then(Comment.parseComment)
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

  _onCommentChange() {
    this._changeFilmComments(this._film);
  }

  _onEscKeyDown(evt) {
    if (isEscPressed(evt)) {
      this._closeFilmDetails();
    }
  }
}
