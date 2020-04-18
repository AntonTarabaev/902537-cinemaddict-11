import {createUserRankTemplate} from "./user-rank-tpl";
import {createElement} from "../../utils";

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
