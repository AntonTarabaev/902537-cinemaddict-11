import FilmsListsComponent from "../components/films-lists/films-lists";
import SiteMenuComponent from "../components/site-menu/site-menu";
import FilterComponent, {FilterType} from "../components/filter/filter";
import FilmCardComponent from "../components/film-card/film-card";
import NoFilmsComponent from "../components/no-films/no-films";
import ShowMoreButtonComponent from "../components/show-more-button/show-more-button";
import FilmDetailsComponent from "../components/film-details/film-details";
import {isEscPressed} from "../utils/common";
import {render, replace, remove, RenderPosition} from "../utils/render";

const FilmSettings = {
  SHOWING_ON_START_COUNT: 5,
  SHOWING_BY_BUTTON: 5,
  EXTRA_COUNT: 2,
};

const renderFilmCard = (container, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);
  const siteMainElement = document.querySelector(`.main`);

  render(container, filmCardComponent, RenderPosition.BEFOREEND);

  filmCardComponent.setElementsClickHandler(() => {
    const oldFilmCard = siteMainElement.querySelector(`.film-details`);

    if (oldFilmCard) {
      replace(filmDetailsComponent, oldFilmCard);
    } else {
      render(siteMainElement, filmDetailsComponent, RenderPosition.BEFOREEND);
    }

    document.addEventListener(`keydown`, onEscapeKeyDown);
  });


  const onEscapeKeyDown = (evt) => isEscPressed(evt) && closeFilmDetail();
  const closeFilmDetail = () => {
    document.removeEventListener(`keydown`, onEscapeKeyDown);
    filmDetailsComponent.getElement().remove();
  };

  filmDetailsComponent.setCloseButtonClickHandler(closeFilmDetail);
};

const renderFilmsCards = (container, films) => {
  films.forEach((film) => renderFilmCard(container, film));
};

const getFilteredFilms = (films, filterType, from, to) => {
  let filteredFilms = [];

  switch (filterType) {
    case FilterType.DATE_DOWN:
      filteredFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case FilterType.DATE_UP:
      filteredFilms = films.slice().sort((a, b) => a.releaseDate - b.releaseDate);
      break;
    case FilterType.RATING_DOWN:
      filteredFilms = films.slice().sort((a, b) => b.rating - a.rating);
      break;
    case FilterType.RATING_UP:
      filteredFilms = films.slice().sort((a, b) => a.rating - b.rating);
      break;
    case FilterType.DEFAULT:
      filteredFilms = films;
      break;
  }

  return filteredFilms.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._filmsListsComponent = new FilmsListsComponent();
    this._filterComponent = new FilterComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    if (films.length === 0) {
      this._container.innerHTML = ``;
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    const topRatedFilms = films
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, FilmSettings.EXTRA_COUNT);
    const mostCommentedFilms = films
      .slice()
      .sort((a, b) => b.commentsCount - a.commentsCount)
      .slice(0, FilmSettings.EXTRA_COUNT);

    const filmsListsElement = this._filmsListsComponent.getElement();
    const mainFilmsList = filmsListsElement.querySelector(`.films-list .films-list__container`);
    const extraFilmsLists = filmsListsElement.querySelectorAll(`.films-list--extra .films-list__container`);

    let showingFilmsCount = FilmSettings.SHOWING_ON_START_COUNT;

    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      render(mainFilmsList, this._showMoreButtonComponent, RenderPosition.AFTEREND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += FilmSettings.SHOWING_BY_BUTTON;

        const filteredFilms = getFilteredFilms(films, this._filterComponent.getFilterType(), prevFilmsCount, showingFilmsCount);

        renderFilmsCards(mainFilmsList, filteredFilms);

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    render(this._container, new SiteMenuComponent(films), RenderPosition.BEFOREEND);
    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
    render(this._container, this._filmsListsComponent, RenderPosition.BEFOREEND);

    renderFilmsCards(mainFilmsList, films.slice(0, showingFilmsCount));
    renderFilmsCards(extraFilmsLists[0], topRatedFilms);
    renderFilmsCards(extraFilmsLists[1], mostCommentedFilms);

    renderShowMoreButton();

    this._filterComponent.setFilterTypeChangeHandler((filterType) => {
      showingFilmsCount = FilmSettings.SHOWING_BY_BUTTON;

      const filteredFilms = getFilteredFilms(films, filterType, 0, showingFilmsCount);

      mainFilmsList.innerHTML = ``;

      renderFilmsCards(mainFilmsList, filteredFilms);

      renderShowMoreButton();
    });
  }
}
