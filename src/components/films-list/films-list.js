import AbstractComponent from "@components/abstract/abstract-component";
import {createFilmsListTemplate} from "./films-list-tpl";

export default class FilmsLists extends AbstractComponent {
  constructor(title, isExtra = false) {
    super();

    this._title = title;
    this._isExtra = isExtra;
  }

  getTemplate() {
    return createFilmsListTemplate(this._title, this._isExtra);
  }

  getFilmsContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
