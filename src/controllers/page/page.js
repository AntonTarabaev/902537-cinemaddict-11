import FilmsListsComponent from "../../components/films-lists/films-lists";
import SiteMenuComponent from "../../components/site-menu/site-menu";
import FilterComponent from "../../components/filter/filter";
import NoFilmsComponent from "../../components/no-films/no-films";
import ShowMoreButtonComponent from "../../components/show-more-button/show-more-button";
import {render, remove, RenderPosition} from "../../utils/render";
import {FilmSettings} from "./consts";
import {renderFilmsCards, getFilteredFilms} from "./utils";

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedMovieControllers = [];
    this._showingFilmsCount = FilmSettings.SHOWING_ON_START_COUNT;
    this._filmsListsComponent = new FilmsListsComponent();
    this._filterComponent = new FilterComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);

    this._filterComponent.setFilterTypeChangeHandler(this._onFilterTypeChange);
  }

  render(films) {
    this._films = films;

    if (this._films.length === 0) {
      this._container.innerHTML = ``;
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    const topRatedFilms = this._films
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, FilmSettings.EXTRA_COUNT);
    const mostCommentedFilms = this._films
      .slice()
      .sort((a, b) => b.commentsCount - a.commentsCount)
      .slice(0, FilmSettings.EXTRA_COUNT);

    const mainFilmsList = this._filmsListsComponent.getMainList();
    const extraFilmsLists = this._filmsListsComponent.getExtraLists();

    render(this._container, new SiteMenuComponent(films), RenderPosition.BEFOREEND);
    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsListsComponent, RenderPosition.BEFOREEND);

    const newFilms = renderFilmsCards(mainFilmsList, films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

    renderFilmsCards(extraFilmsLists[0], topRatedFilms, this._onDataChange, this._onViewChange);
    renderFilmsCards(extraFilmsLists[1], mostCommentedFilms, this._onDataChange, this._onViewChange);

    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    const mainFilmsList = this._filmsListsComponent.getMainList();

    render(mainFilmsList, this._showMoreButtonComponent, RenderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount += FilmSettings.SHOWING_BY_BUTTON;

      const filteredFilms = getFilteredFilms(this._films, this._filterComponent.getFilterType(), prevFilmsCount, this._showingFilmsCount);
      const newFilms = renderFilmsCards(mainFilmsList, filteredFilms, this._onDataChange, this._onViewChange);

      this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onViewChange() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _onFilterTypeChange(filterType) {
    this._showingFilmsCount = FilmSettings.SHOWING_BY_BUTTON;

    const filteredFilms = getFilteredFilms(this._films, filterType, 0, this._showingFilmsCount);
    const mainFilmsList = this._filmsListsComponent.getMainList();

    mainFilmsList.innerHTML = ``;

    const newFilms = renderFilmsCards(mainFilmsList, filteredFilms, this._onDataChange, this._onViewChange);

    this._showedMovieControllers = newFilms;

    this._renderShowMoreButton();
  }
}
