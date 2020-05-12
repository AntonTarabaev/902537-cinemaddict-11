import FilmsListComponent from "../../components/films-list/films-list";
import FilmsListExtraComponent from "../../components/films-extra-list/films-extra-list";
import FilterComponent from "../../components/filter/filter";
import NoFilmsComponent from "../../components/no-films/no-films";
import ShowMoreButtonComponent from "../../components/show-more-button/show-more-button";
import MovieController from "../movie";
import {render, remove, RenderPosition} from "../../utils/render";
import {FilmSettings, ExtraFilmsListName} from "./consts";
import {FilterType} from "../../consts";
import {getFilteredFilms} from "./utils";

const renderFilmsCards = (container, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._showedMovieControllers = [];
    this._showedTopRatedMovieControllers = [];
    this._showedMostCommentedMovieControllers = [];
    this._showingFilmsCount = FilmSettings.SHOWING_ON_START_COUNT;
    this._filmsListComponent = new FilmsListComponent();
    this._topRatedFilmsComponent = new FilmsListExtraComponent(ExtraFilmsListName.RATED);
    this._mostCommentedFilmsComponent = new FilmsListExtraComponent(ExtraFilmsListName.COMMENTED);
    this._filterComponent = new FilterComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
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
      this._container.innerHTML = ``;
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, this._showingFilmsCount));
    this._renderTopRatedFilms(films);
    this._renderMostCommentedFilms(films);

    this._renderShowMoreButton();
  }

  _removeFilms() {
    this._showedMovieControllers.forEach((it) => it.destroy());
    this._showedMovieControllers = [];
  }

  _renderFilms(films) {
    const filmsContainer = this._filmsListComponent.getFilmsContainer();

    const newFilms = renderFilmsCards(filmsContainer, films, this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
    this._showingFilmsCount = this._showedMovieControllers.length;
  }

  _renderTopRatedFilms(films) {
    const topRatedFilms = getFilteredFilms(films, FilterType.RATING, 0, FilmSettings.EXTRA_COUNT);

    if (topRatedFilms.every((film) => film.rating === 0)) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
    const filmsContainer = this._topRatedFilmsComponent.getFilmsContainer();

    const newTopRatedFilms = renderFilmsCards(filmsContainer, topRatedFilms, this._onDataChange, this._onViewChange);
    this._showedTopRatedMovieControllers = this._showedTopRatedMovieControllers.concat(newTopRatedFilms);
  }

  _renderMostCommentedFilms(films) {
    const mostCommentedFilms = getFilteredFilms(films, FilterType.COMMENTS, 0, FilmSettings.EXTRA_COUNT);

    if (mostCommentedFilms.every((film) => film.commentsCount === 0)) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);
    const filmsContainer = this._mostCommentedFilmsComponent.getFilmsContainer();

    const newMostCommentedFilms = renderFilmsCards(filmsContainer, mostCommentedFilms, this._onDataChange, this._onViewChange);
    this._showedMostCommentedMovieControllers = this._showedMostCommentedMovieControllers.concat(newMostCommentedFilms);
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._moviesModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= this._moviesModel.getFilms().length) {
      return;
    }

    const mainFilmsList = this._filmsListComponent.getFilmsContainer();
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

  _onSortTypeChange() {
    this._updateFilms(FilmSettings.SHOWING_ON_START_COUNT);

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
