import FilmsListsComponent from "@components/films-list/films-lists";
import FilmsListComponent from "@components/films-extra-list/films-list";
import FilterComponent from "@components/filter/filter";
import NoFilmsComponent from "@components/no-films/no-films";
import ShowMoreButtonComponent from "@components/show-more-button/show-more-button";
import MovieController from "@controllers/movie";
import CommentsModel from "@models/comments";
import {render, remove, RenderPosition} from "@utils/render";
import {FilterType} from "@consts";
import {FilmSettings, filmsListName} from "./consts";
import {getFilteredFilms} from "./utils";

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._showedMovieControllers = [];
    this._showedTopRatedMovieControllers = [];
    this._showedMostCommentedMovieControllers = [];
    this._showingFilmsCount = FilmSettings.SHOWING_ON_START_COUNT;
    this._filmsListsComponent = new FilmsListsComponent();
    this._mainFilmsComponent = new FilmsListComponent(filmsListName.ALL);
    this._topRatedFilmsComponent = new FilmsListComponent(filmsListName.RATED, true);
    this._mostCommentedFilmsComponent = new FilmsListComponent(filmsListName.COMMENTED, true);
    this._filterComponent = new FilterComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilmDataChange = this._onFilmDataChange.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);
    this._moviesModel.setSortChangeHandler(this._onSortTypeChange);
  }

  render() {
    const films = this._moviesModel.getFilms();

    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);

    if (films.length === 0) {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._filmsListsComponent, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, this._showingFilmsCount));
    this._renderTopRatedFilms(films);
    this._renderMostCommentedFilms(films);

    this._renderShowMoreButton();
  }

  _removeFilms() {
    this._showedMovieControllers.forEach((it) => it.destroy());
    this._showedMovieControllers = [];
  }

  _removeTopRatedFilms() {
    this._showedTopRatedMovieControllers.forEach((it) => it.destroy());
    this._showedTopRatedMovieControllers = [];
  }

  _removeMostCommentedFilms() {
    this._showedMostCommentedMovieControllers.forEach((it) => it.destroy());
    this._showedMostCommentedMovieControllers = [];
  }

  _renderFilmsCards(container, films) {
    return films.map((film) => {
      const commentsModel = new CommentsModel();
      commentsModel.setComments(film.comments);

      const movieController = new MovieController(container, this._onDataChange, this._onViewChange, this._onFilmDataChange, commentsModel);
      movieController.render(film);

      return movieController;
    });
  }

  _renderFilms(films) {
    const filmsCountToRender = this._showingFilmsCount < FilmSettings.SHOWING_ON_START_COUNT ? this._moviesModel.getFilms().length : this._showingFilmsCount;
    const filteredFilms = getFilteredFilms(films, this._filterComponent.getFilterType(), 0, filmsCountToRender);

    render(this._filmsListsComponent.getElement(), this._mainFilmsComponent, RenderPosition.AFTERBEGIN);
    const filmsContainer = this._mainFilmsComponent.getFilmsContainer();

    const newFilms = this._renderFilmsCards(filmsContainer, filteredFilms);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
    this._showingFilmsCount = this._showedMovieControllers.length;
  }

  _renderTopRatedFilms(films) {
    const topRatedFilms = getFilteredFilms(films, FilterType.RATING, 0, FilmSettings.EXTRA_COUNT);

    if (topRatedFilms.every((film) => film.rating === 0)) {
      return;
    }

    render(this._mainFilmsComponent.getElement(), this._topRatedFilmsComponent, RenderPosition.AFTEREND);
    const filmsContainer = this._topRatedFilmsComponent.getFilmsContainer();

    const newTopRatedFilms = this._renderFilmsCards(filmsContainer, topRatedFilms);
    this._showedTopRatedMovieControllers = this._showedTopRatedMovieControllers.concat(newTopRatedFilms);
  }

  _renderMostCommentedFilms(films) {
    const mostCommentedFilms = getFilteredFilms(films, FilterType.COMMENTS, 0, FilmSettings.EXTRA_COUNT);

    if (mostCommentedFilms.every((film) => film.commentsCount === 0)) {
      return;
    }

    render(this._filmsListsComponent.getElement(), this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);
    const filmsContainer = this._mostCommentedFilmsComponent.getFilmsContainer();

    const newMostCommentedFilms = this._renderFilmsCards(filmsContainer, mostCommentedFilms);
    this._showedMostCommentedMovieControllers = this._showedMostCommentedMovieControllers.concat(newMostCommentedFilms);
  }

  _updateMainFilms(count) {
    this._removeFilms();
    this._renderFilms(this._moviesModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

  _updateTopRatedFilms() {
    this._removeTopRatedFilms();
    this._renderTopRatedFilms(this._moviesModel.getFilmsAll());
  }

  _updateMostCommentedFilms() {
    this._removeMostCommentedFilms();
    this._renderMostCommentedFilms(this._moviesModel.getFilmsAll());
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._moviesModel.getFilms().length || this._showingFilmsCount < FilmSettings.SHOWING_ON_START_COUNT) {
      return;
    }

    const mainFilmsList = this._mainFilmsComponent.getFilmsContainer();
    render(mainFilmsList, this._showMoreButtonComponent, RenderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
    this._showedMostCommentedMovieControllers.forEach((it) => it.setDefaultView());
    this._showedTopRatedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateFilm(oldData.id, newData);
    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onFilmDataChange(movieController) {
    if (this._showedTopRatedMovieControllers.indexOf(movieController) !== -1) {
      if (this._showingFilmsCount < FilmSettings.SHOWING_ON_START_COUNT) {
        this._updateMainFilms(this._moviesModel.getFilms().length);
      } else {
        this._updateMainFilms(this._showingFilmsCount);
      }
      this._updateMostCommentedFilms();
    } else if (this._showedMostCommentedMovieControllers.indexOf(movieController) !== -1) {
      if (this._showingFilmsCount < FilmSettings.SHOWING_ON_START_COUNT) {
        this._updateMainFilms(this._moviesModel.getFilms().length);
      } else {
        this._updateMainFilms(this._showingFilmsCount);
      }
      this._updateTopRatedFilms();
    } else {
      this._updateTopRatedFilms();
      this._updateMostCommentedFilms();
    }
  }

  _onSortTypeChange() {
    this._updateMainFilms(FilmSettings.SHOWING_ON_START_COUNT);

    this._filterComponent.setDefaultView();
  }

  _onFilterTypeChange(filterType) {
    this._showingFilmsCount = FilmSettings.SHOWING_BY_BUTTON;

    const filteredFilms = getFilteredFilms(this._moviesModel.getFilms(), filterType, 0, this._showingFilmsCount);

    this._removeFilms();
    this._renderFilms(filteredFilms);

    this._renderShowMoreButton();
  }

  _onShowMoreButtonClick() {
    const prevFilmsCount = this._showingFilmsCount;
    const films = this._moviesModel.getFilms();

    this._showingFilmsCount += FilmSettings.SHOWING_BY_BUTTON;

    const filteredFilms = getFilteredFilms(films, this._filterComponent.getFilterType(), prevFilmsCount, this._showingFilmsCount);
    this._renderFilms(filteredFilms);

    if (this._showingFilmsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }
}
