import AbstractComponent from "@components/abstract/abstract-component";
import {createSiteMenuTemplate} from "./site-menu-tpl";

export default class SiteMenu extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate(this._films);
  }
}
