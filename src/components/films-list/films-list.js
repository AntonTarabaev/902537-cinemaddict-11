import AbstractComponent from "../abstract-component";
import {createFilmsListTemplate} from "./films-list-tpl";

export default class FilmsLists extends AbstractComponent {
  getTemplate() {
    return createFilmsListTemplate();
  }

  getFilmsContainer() {
    return this.getElement().querySelector(`.films-list .films-list__container`);
  }
}
