import AbstractComponent from "@components/abstract/abstract-component";
import {createSortTemplate} from "./sort-tpl";
import {SortTypes} from "@consts";

export default class Sort extends AbstractComponent {
  constructor(sort) {
    super();

    this._sort = sort;
    this._activeSortType = SortTypes.ALL;
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

      if (!evt.target.classList.contains(`main-navigation__item`)) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._activeSortType === sortType) {
        return;
      }

      this._activeSortType = sortType;

      handler(this._activeSortType);
    });
  }
}
