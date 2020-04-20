import AbstractComponent from "../abstract-component";
import {createFilmCardTemplate} from "./film-card-tpl";

const FILM_CARD_ELEMENTS = [
  `film-card__title`,
  `film-card__poster`,
  `film-card__comments`
];

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setElementsClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (FILM_CARD_ELEMENTS.some((element) => evt.target.classList.contains(element))) {
        handler();
      }
    });
  }
}
