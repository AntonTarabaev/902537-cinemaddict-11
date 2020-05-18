import API from "./api";
import PageController from "@controllers/page/page";
import SiteMenuComponent from "@components/site-menu/site-menu";
import UserRankComponent from "@components/user-rank/user-rank";
import FilmsCountComponent from "@components/films-count/films-count";
import StatisticsComponent from "@components/statistics/statistics";
import FilterComponent from "@components/filter/filter";
import LoaderComponent from "@components/loader/loader";
import MoviesModel from "@models/movies";
import SortController from "@controllers/sort";
import {render, remove, RenderPosition} from "@utils/render";
import {MenuItem} from "@consts";

const AUTHORIZATION = `Basic f1hjkS5sdfgsdfHJdjsk=`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent();
const loaderComponent = new LoaderComponent();
const emptyUserRankComponent = new UserRankComponent();
const emptyFilmsCountComponent = new FilmsCountComponent(0);
const temporaryFilterComponent = new FilterComponent();
const sortController = new SortController(siteMenuComponent.getElement(), moviesModel);
const pageController = new PageController(siteMainElement, moviesModel, api);

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
    case MenuItem.STATISTICS:
      pageController.hide();
      statisticsComponent.show();
      break;
    default:
      pageController.show();
      statisticsComponent.hide();
      break;
  }
});

api.getFilms()
  .then((films) => {
    moviesModel.setFilms(films);
    remove(emptyUserRankComponent);
    remove(emptyFilmsCountComponent);
    remove(temporaryFilterComponent);
    remove(loaderComponent);
    render(siteHeaderElement, new UserRankComponent(films), RenderPosition.BEFOREEND);
    pageController.render();
    render(footerStatisticsElement, new FilmsCountComponent(films.length), RenderPosition.BEFOREEND);
  });
