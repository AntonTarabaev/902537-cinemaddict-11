import API from "@api/index";
import Store from "@api/store";
import Provider from "@api/provider";
import PageController from "@controllers/page/page";
import SiteMenuComponent from "@components/site-menu/site-menu";
import UserRankComponent from "@components/user-rank/user-rank";
import FilmsCountComponent from "@components/films-count/films-count";
import StatisticsComponent from "@components/statistics/statistics";
import FilterComponent from "@components/filter/filter";
import LoaderComponent from "@components/loader/loader";
import MoviesModel from "@models/movies";
import Movie from "@models/movie";
import SortController from "@controllers/sort";
import {render, remove, RenderPosition} from "@utils/render";
import {MenuItems, AUTHORIZATION, END_POINT, STORE_NAME, PAGE_STATUS_OFFLINE} from "@consts";

const api = new API(END_POINT, AUTHORIZATION);
const filmsStore = new Store(STORE_NAME.FILMS, window.localStorage);
const commentsStore = new Store(STORE_NAME.COMMENTS, window.localStorage);
const apiWithProvider = new Provider(api, filmsStore, commentsStore);
const moviesModel = new MoviesModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent(moviesModel);
const loaderComponent = new LoaderComponent();
const emptyUserRankComponent = new UserRankComponent();
const emptyFilmsCountComponent = new FilmsCountComponent(0);
const temporaryFilterComponent = new FilterComponent();

const sortController = new SortController(siteMenuComponent.getElement(), moviesModel);
const pageController = new PageController(siteMainElement, moviesModel, apiWithProvider);

render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);
sortController.render();
render(siteMainElement, temporaryFilterComponent, RenderPosition.BEFOREEND);
render(siteMainElement, loaderComponent, RenderPosition.BEFOREEND);
render(siteHeaderElement, emptyUserRankComponent, RenderPosition.BEFOREEND);
render(footerStatisticsElement, emptyFilmsCountComponent, RenderPosition.BEFOREEND);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItems.STATISTICS:
      pageController.hide();
      statisticsComponent.show();
      break;
    default:
      pageController.show();
      statisticsComponent.hide();
      break;
  }
});

apiWithProvider.getFilms()
  .then(Movie.parseFilms)
  .then((films) => {
    moviesModel.setFilms(films);
    remove(emptyUserRankComponent);
    remove(emptyFilmsCountComponent);
    remove(temporaryFilterComponent);
    remove(loaderComponent);
    render(siteHeaderElement, new UserRankComponent(films), RenderPosition.BEFOREEND);
    pageController.render();
    render(footerStatisticsElement, new FilmsCountComponent(films.length), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    loaderComponent.renderLoaderError();
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {}).catch(() => {});
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(PAGE_STATUS_OFFLINE, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += PAGE_STATUS_OFFLINE;
});
