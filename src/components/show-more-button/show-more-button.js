import AbstractComponent from "@components/abstract/abstract-component";
import {createShowMoreButtonTemplate} from "./show-more-button-tpl";

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
