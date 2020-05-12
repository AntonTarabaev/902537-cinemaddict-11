import PageController from "./controllers/page/page";
import SiteMenuComponent from "./components/site-menu/site-menu";
import UserRankComponent from "./components/user-rank/user-rank";
import FilmsCountComponent from "./components/films-count/films-count";
import MoviesModel from "./models/movies";
import SortController from "./controllers/sort";
import {generateFilms} from "./mock/film";
import {render, RenderPosition} from "./utils/render";
import {FILMS_TOTAL_COUNT} from "./consts";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMenuComponent = new SiteMenuComponent();

render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);

const films = generateFilms(FILMS_TOTAL_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setFilms(films);

const sortController = new SortController(siteMenuComponent.getElement(), moviesModel);
sortController.render();

render(siteHeaderElement, new UserRankComponent(films), RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement, moviesModel);

pageController.render(films);

const footerStatisticsElement = document.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FilmsCountComponent(films.length), RenderPosition.BEFOREEND);
