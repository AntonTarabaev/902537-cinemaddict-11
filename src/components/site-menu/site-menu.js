import {createSiteMenuTemplate} from "./site-menu-tpl";
import {createElement} from "../../utils";

export default class SiteMenu {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
