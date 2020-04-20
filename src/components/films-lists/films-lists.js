import AbstractComponent from "../abstract-component";
import {createFilmsListsTemplate} from "./films-lists-tpl";

export default class FilmsLists extends AbstractComponent {
  getTemplate() {
    return createFilmsListsTemplate();
  }
}
