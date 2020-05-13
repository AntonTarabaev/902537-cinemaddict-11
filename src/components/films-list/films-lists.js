import AbstractComponent from "Components/abstract/abstract-component";
import {createFilmsListTemplate} from "./films-lists-tpl";

export default class FilmsLists extends AbstractComponent {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
