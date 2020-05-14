import AbstractComponent from "Components/abstract/abstract-component";
import {createFilmsCountTemplate} from "./films-count-tpl";

export default class FilmsCount extends AbstractComponent {
  constructor(filmsCount) {
    super();

    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._filmsCount);
  }
}
