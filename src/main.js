import UserRankComponent from "./components/user-rank/user-rank";
import SiteMenuComponent from "./components/site-menu/site-menu";
import FilterComponent from "./components/filter/filter";
import FilmsListsComponent from "./components/films-list/films-list";
import FilmCardComponent from "./components/film-card/film-card";
import NoFilmsComponent from "./components/no-films/no-films";
import ShowMoreButtonComponent from "./components/show-more-button/show-more-button";
import FilmDetailsComponent from "./components/film-details/film-details";
import FilmsCountComponent from "./components/films-count/films-count";
import {generateFilms} from "./mock/film";
import {render, RenderPosition, isEscPressed} from "./utils";

const FILM_CARD_ELEMENTS = [
  `film-card__title`,
  `film-card__poster`,
  `film-card__comments`
];

const FilmSettings = {
  TOTAL_COUNT: 22,
  SHOWING_ON_START_COUNT: 5,
  SHOWING_BY_BUTTON: 5,
  EXTRA_COUNT: 2
};

const renderFilmCard = (container, film) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);
  const closeButtonElement = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);

  render(container, filmCardComponent.getElement(), RenderPosition.BEFOREEND);

  filmCardComponent.getElement().addEventListener(`click`, (evt) => {
    if (FILM_CARD_ELEMENTS.some((element) => evt.target.classList.contains(element))) {
      const oldFilmCard = siteMainElement.querySelector(`.film-details`);

      if (oldFilmCard) {
        siteMainElement.replaceChild(filmDetailsComponent.getElement(), oldFilmCard);
      } else {
        render(siteMainElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
      }

      document.addEventListener(`keydown`, onEscapeKeyDown);
    }
  });


  const onEscapeKeyDown = (evt) => isEscPressed(evt) && closeFilmDetail();
  const closeFilmDetail = () => {
    document.removeEventListener(`keydown`, onEscapeKeyDown);
    filmDetailsComponent.getElement().remove();
  };

  closeButtonElement.addEventListener(`click`, () => closeFilmDetail());
};

const renderFilmsLists = (filmsListComponent, films, topRatedFilms, mostCommentedFilms) => {
  if (films.length === 0) {
    filmsListComponent.getElement().innerHTML = ``;
    render(filmsListComponent.getElement(), new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const showMoreButton = new ShowMoreButtonComponent();
  const mainFilmsList = filmsListComponent.getElement().querySelector(`.films-list .films-list__container`);
  const extraFilmsLists = filmsListComponent.getElement().querySelectorAll(`.films-list--extra .films-list__container`);
  let showingFilmsCount = FilmSettings.SHOWING_ON_START_COUNT;

  render(mainFilmsList, showMoreButton.getElement(), RenderPosition.AFTEREND);

  films.slice(0, showingFilmsCount)
    .forEach((film) => {
      renderFilmCard(mainFilmsList, film);
    });

  topRatedFilms.forEach((film) => renderFilmCard(extraFilmsLists[0], film));
  mostCommentedFilms.forEach((film) => renderFilmCard(extraFilmsLists[1], film));

  showMoreButton.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += FilmSettings.SHOWING_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilmCard(mainFilmsList, film));

    if (showingFilmsCount >= films.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = generateFilms(FilmSettings.TOTAL_COUNT);
const topRatedFilms = films
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, FilmSettings.EXTRA_COUNT);
const mostCommentedFilms = films
  .slice()
  .sort((a, b) => b.commentsCount - a.commentsCount)
  .slice(0, FilmSettings.EXTRA_COUNT);

render(siteHeaderElement, new UserRankComponent(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuComponent(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const filmsListsComponent = new FilmsListsComponent();
render(siteMainElement, filmsListsComponent.getElement(), RenderPosition.BEFOREEND);
renderFilmsLists(filmsListsComponent, films, topRatedFilms, mostCommentedFilms);

const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(footerStatisticsElement, new FilmsCountComponent(films.length).getElement(), RenderPosition.BEFOREEND);
