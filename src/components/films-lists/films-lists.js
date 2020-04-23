import AbstractComponent from "../abstract-component";
import {createFilmsListsTemplate} from "./films-lists-tpl";

export default class FilmsLists extends AbstractComponent {
  getTemplate() {
    return createFilmsListsTemplate();
  }

  getMainList() {
    return this.getElement().querySelector(`.films-list .films-list__container`);
  }

  getExtraLists() {
    return this.getElement().querySelectorAll(`.films-list--extra .films-list__container`);
  }
}
