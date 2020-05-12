import AbstractComponent from "../abstract-component";
import {createFilterTemplate} from "./filter-tpl";
import {FilterType} from "../../consts";

export default class Filter extends AbstractComponent {
  constructor() {
    super();

    this._currentFilterType = FilterType.DEFAULT;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  getFilterType() {
    return this._currentFilterType;
  }

  setDefaultView() {
    this._currentFilterType = FilterType.DEFAULT;

    this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
    this.getElement().querySelector(`.sort__button[data-filter-type="default"]`).classList.add(`sort__button--active`);
  }


  setFilterTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = evt.target.dataset.filterType;

      if (this._currentFilterType === filterType) {
        return;
      }

      this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);
      this._currentFilterType = filterType;

      handler(this._currentFilterType);
    });
  }
}
