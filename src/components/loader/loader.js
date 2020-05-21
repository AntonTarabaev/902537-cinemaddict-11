import AbstractComponent from "@components/abstract/abstract-component";
import {createLoaderTemplate} from "./loader-tpl";

const LOADING_ERROR_TEXT = `Error loading data, try again later...`;

export default class Loader extends AbstractComponent {
  getTemplate() {
    return createLoaderTemplate();
  }

  renderLoaderError() {
    this.getElement().querySelector(`.films-list__title`).textContent = LOADING_ERROR_TEXT;
  }
}
