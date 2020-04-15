import {calculateFilmsCountByFilter, createElement} from "../utils";

export const createUserRankTemplate = (films) => {
  const watchedFilms = calculateFilmsCountByFilter(films, `history`);
  let userRank = ``;

  if (watchedFilms > 20) {
    userRank = `Movie Buff`;
  } else if (watchedFilms > 10) {
    userRank = `Fan`;
  } else if (watchedFilms > 0) {
    userRank = `Novice`;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRank {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createUserRankTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
