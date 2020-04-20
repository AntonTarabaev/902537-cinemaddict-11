import AbstractComponent from "../abstract-component";
import {createSiteMenuTemplate} from "./site-menu-tpl";

export default class SiteMenu extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._films);
  }
}