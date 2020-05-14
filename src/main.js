import PageController from "Controllers/page/page";
import SiteMenuComponent from "Components/site-menu/site-menu";
import UserRankComponent from "Components/user-rank/user-rank";
import FilmsCountComponent from "Components/films-count/films-count";
import MoviesModel from "Models/movies";
import SortController from "Controllers/sort";
import {generateFilms} from "./mock/film";
import {render, RenderPosition} from "Utils/render";
import {FILMS_TOTAL_COUNT} from "MainConsts";

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
