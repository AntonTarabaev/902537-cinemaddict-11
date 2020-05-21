import AbstractComponent from "@components/abstract/abstract-component";
import {createCommentsLoaderTemplate} from "./comments-loader-tpl";

const LOADING_ERROR_TEXT = `Error loading data, try again later...`;

export default class CommentsLoader extends AbstractComponent {
  getTemplate() {
    return createCommentsLoaderTemplate();
  }

  renderLoaderError() {
    this.getElement().textContent = LOADING_ERROR_TEXT;
  }
}
