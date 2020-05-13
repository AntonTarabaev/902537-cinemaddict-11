import AbstractComponent from "Components/abstract/abstract-component";
import {createNoFilmsTemplate} from "./no-films-tpl";

export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
