import AbstractComponent from "../abstract-component";
import {createFilmsListTemplate} from "./films-extra-list-tpl";

export default class FilmsLists extends AbstractComponent {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title);
  }

  getFilmsContainer() {
    return this.getElement().querySelector(`.films-list--extra .films-list__container`);
  }
}
