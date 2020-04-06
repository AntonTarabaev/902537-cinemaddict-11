import {createUserRankTemplate} from "./components/user-rank.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createFilmsListTemplate} from "./components/films-list.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {createFilmsCountTemplate} from "./components/films-count.js";
import {removePopup, addPopupCloseHandlers} from "./components/popup.js";

const FilmSettings = {
  COUNT: 5,
  EXTRA_COUNT: 2
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserRankTemplate(), `beforeend`);

render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);

const filmsListsElements = siteMainElement.querySelectorAll(`.films-list__container`);

for (let i = 0; i < FilmSettings.COUNT; i++) {
  render(filmsListsElements[0], createFilmCardTemplate(), `beforeend`);
}

render(filmsListsElements[0], createShowMoreButtonTemplate(), `afterend`);

for (let i = 0; i < FilmSettings.EXTRA_COUNT; i++) {
  render(filmsListsElements[1], createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < FilmSettings.EXTRA_COUNT; i++) {
  render(filmsListsElements[2], createFilmCardTemplate(), `beforeend`);
}

const filmCardElements = siteMainElement.querySelectorAll(`.film-card`);

const renderFilmDetailsElement = () => {
  removePopup();
  render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
  addPopupCloseHandlers();
};

filmCardElements.forEach((it) => {
  it.querySelector(`.film-card__title`).onclick = () => renderFilmDetailsElement();
  it.querySelector(`.film-card__poster`).onclick = () => renderFilmDetailsElement();
  it.querySelector(`.film-card__comments`).onclick = () => renderFilmDetailsElement();
});

const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createFilmsCountTemplate(), `beforeend`);
