import AbstractComponent from "Components/abstract/abstract-component";
import {createUserRankTemplate} from "./user-rank-tpl";

export default class UserRank extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createUserRankTemplate(this._films);
  }
}
