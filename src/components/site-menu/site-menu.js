import AbstractComponent from "@components/abstract/abstract-component";
import {createSiteMenuTemplate} from "./site-menu-tpl";
import {MenuItem} from "../../consts";

export default class SiteMenu extends AbstractComponent {
  getTemplate() {
    return createSiteMenuTemplate();
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if ((!evt.target.classList.contains(`main-navigation__additional`) &&
          !evt.target.classList.contains(`main-navigation__item`)) ||
          evt.target.classList.contains(`main-navigation__additional--active`) ||
          evt.target.classList.contains(`main-navigation__item--active`)) {
        return;
      }

      let menuItem = MenuItem.REST;

      if (evt.target.classList.contains(`main-navigation__additional`)) {
        menuItem = MenuItem.STATISTICS;

        evt.target.classList.add(`main-navigation__additional--active`);
        this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
      } else {
        const statisticsActiveElement = this.getElement().querySelector(`.main-navigation__additional--active`);
        const menuActiveElement = this.getElement().querySelector(`.main-navigation__item--active`);
        menuItem = MenuItem.REST;

        if (statisticsActiveElement) {
          statisticsActiveElement.classList.remove(`main-navigation__additional--active`);
        }

        if (menuActiveElement) {
          menuActiveElement.classList.remove(`main-navigation__item--active`);
        }

        evt.target.classList.add(`main-navigation__item--active`);
      }

      handler(menuItem);
    });
  }
}
