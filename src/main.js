import UserRankComponent from "./components/user-rank";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import FilmsListsComponent from "./components/films-list";
import FilmCardComponent from "./components/film-card";
import NoFilmsComponent from "./components/no-films";
import ShowMoreButtonComponent from "./components/show-more-button";
import FilmDetailsComponent from "./components/film-details";
import FilmsCountComponent from "./components/films-count";
import {generateFilms} from "./mock/film";
import {render, RenderPosition} from "./utils";

const FilmSettings = {
  TOTAL_COUNT: 18,
  SHOWING_ON_START_COUNT: 5,
  SHOWING_BY_BUTTON: 5,
  EXTRA_COUNT: 2
};

const renderFilmCard = (filmsListElement, siteBodyElement, film) => {
  const removePopup = () => {
    siteBodyElement.removeChild(filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      removePopup();
    }
  };

  const renderFilmDetailsElement = () => {
    siteBodyElement.appendChild(filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const popupCloseButton = filmDetailsComponent.getElement().querySelector(`.film-details__close`);
  popupCloseButton.addEventListener(`click`, removePopup);

  const filmCardComponent = new FilmCardComponent(film);
  filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, renderFilmDetailsElement);
  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, renderFilmDetailsElement);
  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, renderFilmDetailsElement);

  render(filmsListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmsLists = (filmsListComponent, siteBodyElement, films, topRatedFilms, mostCommentedFilms) => {
  if (films.length === 0) {
    filmsListComponent.getElement().innerHTML = ``;
    render(filmsListComponent.getElement(), new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const mainFilmsList = filmsListComponent.getElement().querySelector(`.films-list .films-list__container`);
  const extraFilmsLists = filmsListComponent.getElement().querySelectorAll(`.films-list--extra .films-list__container`);

  topRatedFilms.forEach((film) => renderFilmCard(extraFilmsLists[0], siteBodyElement, film));
  mostCommentedFilms.forEach((film) => renderFilmCard(extraFilmsLists[1], siteBodyElement, film));

  let showingFilmsCount = FilmSettings.SHOWING_ON_START_COUNT;
  films.slice(0, showingFilmsCount)
    .forEach((film) => {
      renderFilmCard(mainFilmsList, siteBodyElement, film);
    });

  const showMoreButton = new ShowMoreButtonComponent();
  render(mainFilmsList, showMoreButton.getElement(), RenderPosition.AFTEREND);

  showMoreButton.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += FilmSettings.SHOWING_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilmCard(mainFilmsList, siteBodyElement, film));

    if (showingFilmsCount >= films.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });
};

const siteBodyElement = document.querySelector(`body`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);

const films = generateFilms(FilmSettings.TOTAL_COUNT);
const topRatedFilms = films
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, FilmSettings.EXTRA_COUNT);
const mostCommentedFilms = films
  .slice()
  .sort((a, b) => b.commentsCount - a.commentsCount)
  .slice(0, FilmSettings.EXTRA_COUNT);

render(siteHeaderElement, new UserRankComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuComponent(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const filmsListsComponent = new FilmsListsComponent();
render(siteMainElement, filmsListsComponent.getElement(), RenderPosition.BEFOREEND);
renderFilmsLists(filmsListsComponent, siteBodyElement, films, topRatedFilms, mostCommentedFilms);

const footerStatisticsElement = siteBodyElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, new FilmsCountComponent(films.length).getElement(), RenderPosition.BEFOREEND);
