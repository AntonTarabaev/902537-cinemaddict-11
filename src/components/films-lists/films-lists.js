import AbstractComponent from "@components/abstract/abstract-component";
import {createFilmsListTemplate} from "./films-lists-tpl";

export default class FilmsLists extends AbstractComponent {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
