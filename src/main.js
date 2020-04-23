import PageController from "./controllers/page/page";
import UserRankComponent from "./components/user-rank/user-rank";
import FilmsCountComponent from "./components/films-count/films-count";
import {generateFilms} from "./mock/film";
import {render, RenderPosition} from "./utils/render";
import {FILMS_TOTAL_COUNT} from "./consts";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const films = generateFilms(FILMS_TOTAL_COUNT);

render(siteHeaderElement, new UserRankComponent(films), RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement);

pageController.render(films);

const footerStatisticsElement = document.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FilmsCountComponent(films.length), RenderPosition.BEFOREEND);
