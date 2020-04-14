import {createUserRankTemplate} from "./components/user-rank.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createFilmsListTemplate} from "./components/films-list.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {createFilmsCountTemplate} from "./components/films-count.js";
import {removePopup, addPopupCloseHandlers} from "./components/popup.js";
import {generateFilms} from "./mock/film.js";

const FilmSettings = {
  TOTAL_COUNT: 28,
  SHOWING_ON_START_COUNT: 5,
  SHOWING_BY_BUTTON: 5,
  EXTRA_COUNT: 2
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);

const films = generateFilms(FilmSettings.TOTAL_COUNT);
const topRatedFilms = films
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, FilmSettings.EXTRA_COUNT);
const mostCommentedFilms = films
  .slice()
  .sort((a, b) => b.commentsCount - a.commentsCount)
  .slice(0, FilmSettings.EXTRA_COUNT);

render(siteHeaderElement, createUserRankTemplate(), `beforeend`);

render(siteMainElement, createSiteMenuTemplate(films), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmsListsElements = siteMainElement.querySelectorAll(`.films-list__container`);

films.slice(0, FilmSettings.SHOWING_ON_START_COUNT)
  .forEach((film) => render(filmsListsElements[0], createFilmCardTemplate(film), `beforeend`));

render(filmsListsElements[0], createShowMoreButtonTemplate(), `afterend`);

let showingFilmsCount = FilmSettings.SHOWING_ON_START_COUNT;

const showMoreButton = siteMainElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += FilmSettings.SHOWING_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsListsElements[0], createFilmCardTemplate(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

topRatedFilms.forEach((film) => render(filmsListsElements[1], createFilmCardTemplate(film), `beforeend`));
mostCommentedFilms.forEach((film) => render(filmsListsElements[2], createFilmCardTemplate(film), `beforeend`));

const filmCardElements = siteMainElement.querySelectorAll(`.films-list .film-card`);
const filmCardExtraElements = siteMainElement.querySelectorAll(`.films-list--extra .film-card`);

const renderFilmDetailsElement = (film) => {
  removePopup();
  render(siteFooterElement, createFilmDetailsTemplate(film), `afterend`);
  addPopupCloseHandlers();
};

const addFilmDetailsOpenHandlers = (filmCard, film) => {
  filmCard.querySelector(`.film-card__title`).onclick = () => renderFilmDetailsElement(film);
  filmCard.querySelector(`.film-card__poster`).onclick = () => renderFilmDetailsElement(film);
  filmCard.querySelector(`.film-card__comments`).onclick = () => renderFilmDetailsElement(film);
};

filmCardElements.forEach((it, i) => addFilmDetailsOpenHandlers(it, films[i]));
filmCardExtraElements.forEach((it, i) => addFilmDetailsOpenHandlers(it, [...topRatedFilms, ...mostCommentedFilms][i]));

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createFilmsCountTemplate(films.length), `beforeend`);
