import AbstractComponent from "../abstract-component";
import {createSortTemplate} from "./sort-tpl";
import {SortType} from "../../consts";

export default class Sort extends AbstractComponent {
  constructor(sort) {
    super();

    this._sort = sort;
    this._activeSortType = SortType.ALL;
  }

  getTemplate() {
    return createSortTemplate(this._sort);
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._activeSortType === sortType) {
        return;
      }

      this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
      evt.target.classList.add(`main-navigation__item--active`);
      this._activeSortType = sortType;

      handler(this._activeSortType);
    });
  }
}
